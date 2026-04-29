/**
 * Meta CAPI Helper Library
 *
 * Integrates Meta's official Parameter Builder (capi-param-builder-nodejs)
 * and Business SDK (facebook-nodejs-business-sdk) to send lead events
 * to Meta Conversions API with maximum data quality.
 *
 * Docs: https://developers.facebook.com/docs/marketing-api/conversions-api/parameter-builder-feature-library
 */

import { ParamBuilder } from 'capi-param-builder-nodejs';
import { createHash } from 'crypto';

// ---------------------------------------------------------------------------
// Normalization + Hashing Helpers (Meta CAPI Official Docs)
// https://developers.facebook.com/docs/marketing-api/conversions-api/parameters/customer-information-parameters
// ---------------------------------------------------------------------------

/**
 * Hash PII (email, name, city, country, state, zip) per Meta spec:
 * trim, lowercase, then SHA-256.
 */
function hashPII(value: string | undefined): string | undefined {
  if (!value) return undefined;
  const normalized = value.trim().toLowerCase();
  return createHash('sha256').update(normalized).digest('hex');
}

/**
 * Normalizes and hashes CITY per Meta spec:
 * lowercase, remove spaces, punctuation, special chars.
 * 'São Paulo' → 'saopaulo' (or keep UTF-8 encoded)
 */
function hashCity(value: string | undefined): string | undefined {
  if (!value) return undefined;
  // Normalize: lowercase, remove spaces and punctuation
  const normalized = value
    .trim()
    .toLowerCase()
    .normalize('NFD')                      // decompose accents
    .replace(/[̀-ͯ]/g, '')       // strip accent marks
    .replace(/[^a-z0-9]/g, '');           // keep only a-z, 0-9
  return createHash('sha256').update(normalized).digest('hex');
}

/**
 * Normalizes and hashes PHONE per Meta spec:
 * - Remove symbols, letters (keep digits only)
 * - MUST include country code (e.g. 5511999999999 for Brazil)
 * - Remove leading zeros
 */
function hashPhone(value: string | undefined): string | undefined {
  if (!value) return undefined;
  let normalized = value.replace(/\D/g, ''); // digits only
  normalized = normalized.replace(/^0+/, ''); // remove leading zeros
  return createHash('sha256').update(normalized).digest('hex');
}

/**
 * Normalizes STATE code per Meta spec:
 * 2-letter ANSI code, lowercase. (e.g. 'SP' → 'sp')
 * For non-US: lowercase, no punctuation/spaces.
 */
function normalizeState(value: string | undefined): string | undefined {
  if (!value) return undefined;
  // If it's already a short code (2 chars), just lowercase it
  if (value.trim().length <= 3) {
    return value.trim().toLowerCase();
  }
  // Otherwise normalize the full name (for non-US)
  return value.trim().toLowerCase().normalize('NFD').replace(/[̀-ͯ]/g, '').replace(/[^a-z]/g, '');
}

// ---------------------------------------------------------------------------
// Types
// ---------------------------------------------------------------------------

export interface RawRequestContext {
  /** e.g. "drtrafego.com.br" */
  host: string;
  /** Query params from the incoming request (e.g. { fbclid: "ABC123" }) */
  queryParams: Record<string, string>;
  /** Parsed cookies from the incoming request */
  cookies: Record<string, string>;
  /** Optional: Referer header */
  referer?: string | null;
  /** Optional: X-Forwarded-For header */
  xForwardedFor?: string | null;
  /** Optional: Remote address (socket) */
  remoteAddr?: string | null;
}

export interface LeadPII {
  email: string;
  phone: string;
  firstName?: string;
  lastName?: string;
  city?: string;
  state?: string;
  zip?: string;
  country?: string;
  /** Gender: 'f' or 'm' */
  gender?: string;
  /** Date of birth: YYYYMMDD */
  dateOfBirth?: string;
  externalId?: string;
  fbId?: string;
  fbLoginId?: string;
  fbp?: string;
  fbc?: string;
}

export interface CAPIEventData {
  /** Hashed email (SHA256) */
  em: string;
  /** Hashed phone (SHA256) */
  ph: string;
  /** Hashed first name (SHA256) or undefined */
  fn?: string;
  /** Hashed last name (SHA256) or undefined */
  ln?: string;
  /** Hashed city (SHA256) or undefined */
  ct?: string;
  /** Hashed state (SHA256) or undefined */
  st?: string;
  /** Hashed zip (SHA256) or undefined */
  zp?: string;
  /** Hashed country (SHA256) or undefined */
  country?: string;
  /** External ID (Não convertido em hash) or undefined */
  external_id?: string;
  /** Hashed gender (SHA256) - 'f' or 'm' */
  ge?: string;
  /** Hashed date of birth (SHA256) - YYYYMMDD */
  db?: string;
  /** Facebook Login ID (Não convertido em hash) or undefined */
  fbLoginId?: string;
  /** fbc value extracted from cookies/URL */
  fbc?: string;
  /** fbp value extracted from cookies */
  fbp?: string;
  /** Client IP address */
  clientIpAddress?: string;
  /** Event currency (e.g. "BRL") */
  currency?: string;
  /** Event value (e.g. 50.00) */
  value?: number;
  /** Cookies recommended by ParamBuilder to be set on the response */
  cookiesToSet: Array<{ name: string; value: string; maxAge?: number; domain?: string }>;
}

// ---------------------------------------------------------------------------
// Main helper: buildCAPIParams
// Extracts all parameters from the incoming request and hashes PII.
// ---------------------------------------------------------------------------

export function buildCAPIParams(
  requestCtx: RawRequestContext,
  pii: LeadPII
): CAPIEventData {
  const domain = process.env.META_DOMAIN ?? requestCtx.host.replace(/^www\./, '');

  // Initialize the ParamBuilder with your domain(s)
  const builder = new ParamBuilder([domain, `www.${domain}`]);

  // Let the library process the request and determine fbc/fbp/ip
  builder.processRequest(
    requestCtx.host,
    requestCtx.queryParams,
    requestCtx.cookies,
    requestCtx.referer ?? null,
    // Ensure only the first IP is used if it's a comma-separated list from Vercel/Proxy
    requestCtx.xForwardedFor?.split(',')[0].trim() ?? null,
    requestCtx.remoteAddr ?? null
  );

  // Extract the computed values
  const cookiesToSet = builder.getCookiesToSet
    ? (builder.getCookiesToSet() ?? [])
    : [];

  const fbcBuilder = builder.getFbc?.() ?? undefined;
  const fbc = pii.fbc || fbcBuilder || requestCtx.cookies['_fbc'] || undefined;

  const fbpBuilder = builder.getFbp?.() ?? undefined;
  const fbp = pii.fbp || fbpBuilder || requestCtx.cookies['_fbp'] || undefined;

  const clientIpAddress = builder.getClientIpAddress?.() ?? undefined;

  // Use full Meta-spec normalization:
  const em = hashPII(pii.email) ?? '';
  const ph = hashPhone(pii.phone) ?? ''; // Must include country code, digits only, leading zeros removed
  const fn = hashPII(pii.firstName); // lowercase, a-z recommended
  const ln = hashPII(pii.lastName);
  const ct = hashCity(pii.city); // lowercase, no spaces/punctuation
  const st = normalizeState(pii.state) ? hashPII(normalizeState(pii.state)) : undefined; // 2-char ANSI code, lowercase
  const zp = pii.zip ? hashPII(pii.zip.replace(/\D/g, '').replace(/^0+/, '') || pii.zip) : undefined;
  const country = hashPII(pii.country); // 2-letter ISO code, lowercase (e.g. 'br')

  // Gender: single lowercase letter 'f' or 'm', then SHA-256
  const ge = pii.gender ? hashPII(pii.gender.trim().toLowerCase().charAt(0)) : undefined;
  // Date of birth: YYYYMMDD format, then SHA-256
  const db = pii.dateOfBirth ? hashPII(pii.dateOfBirth.replace(/\D/g, '')) : undefined;

  // external_id: per docs "recommended to hash", but MUST match whatever format is used in the Pixel.
  // We send it WITHOUT hash so it matches the plain text value sent by fbq() in the browser.
  const external_id = pii.externalId ?? undefined; // Plain text, NO SHA-256 — must match Pixel
  const fbLoginId = pii.fbId ?? pii.fbLoginId ?? undefined;

  return { em, ph, fn, ln, ct, st, zp, country, ge, db, external_id, fbLoginId, fbc, fbp, clientIpAddress, cookiesToSet };
}

// ---------------------------------------------------------------------------
// sendLeadEventToMeta
// Sends a Lead event to the Meta Conversions API using the official SDK.
// ---------------------------------------------------------------------------

export async function sendLeadEventToMeta(params: {
  eventId: string;
  eventSourceUrl: string;
  userAgent?: string;
  capiData: CAPIEventData;
}): Promise<void> {
  const pixelId = process.env.META_PIXEL_ID;
  const accessToken = process.env.META_CAPI_ACCESS_TOKEN;

  if (!pixelId || !accessToken) {
    console.warn('[Meta CAPI] Skipping: META_PIXEL_ID or META_CAPI_ACCESS_TOKEN not configured.');
    return;
  }

  try {
    // Lazy-import to avoid issues in environments without the package
    const bizSdk = await import('facebook-nodejs-business-sdk');
    const { ServerEvent, UserData, EventRequest } = bizSdk;

    const userData = new UserData()
      .setEmails([params.capiData.em])
      .setPhones([params.capiData.ph]);

    if (params.capiData.fn) userData.setFirstNames([params.capiData.fn]);
    if (params.capiData.ln) userData.setLastNames([params.capiData.ln]);
    if (params.capiData.ct) userData.setCities([params.capiData.ct]);
    if (params.capiData.st) userData.setStates([params.capiData.st]);
    if (params.capiData.zp) userData.setZipCodes([params.capiData.zp]);
    if (params.capiData.country) userData.setCountries([params.capiData.country]);
    if (params.capiData.ge) userData.setGenders([params.capiData.ge]);
    if (params.capiData.db) userData.setDatesOfBirth([params.capiData.db]);
    if (params.capiData.external_id) userData.setExternalIds([params.capiData.external_id]);

    if (params.capiData.fbLoginId) userData.setFbLoginId(params.capiData.fbLoginId);

    if (params.capiData.fbc) userData.setFbc(params.capiData.fbc);
    if (params.capiData.fbp) userData.setFbp(params.capiData.fbp);
    if (params.capiData.clientIpAddress) userData.setClientIpAddress(params.capiData.clientIpAddress);
    if (params.userAgent) userData.setClientUserAgent(params.userAgent);

    const serverEvent = new ServerEvent()
      .setEventName('Lead')
      .setEventTime(Math.floor(Date.now() / 1000))
      .setEventId(params.eventId)
      .setEventSourceUrl(params.eventSourceUrl)
      .setActionSource('website')
      .setUserData(userData);

    const eventsData = [serverEvent];
    const eventRequest = new EventRequest(accessToken, pixelId)
      .setEvents(eventsData);

    const response = await eventRequest.execute();
    console.log('[Meta CAPI] Lead event sent successfully:', JSON.stringify(response));
  } catch (error) {
    // Non-fatal — log but don't break the lead capture flow
    console.error('[Meta CAPI] Error sending Lead event:', error);
  }
}

// ---------------------------------------------------------------------------
// Helper: parse cookie string into a key-value map
// ---------------------------------------------------------------------------

export function parseCookieString(cookieHeader: string | null): Record<string, string> {
  if (!cookieHeader) return {};
  return Object.fromEntries(
    cookieHeader.split(';').map((c) => {
      const [key, ...vals] = c.trim().split('=');
      return [key.trim(), vals.join('=').trim()];
    })
  );
}

// ---------------------------------------------------------------------------
// Helper: parse query string into a key-value map
// ---------------------------------------------------------------------------

export function parseQueryString(searchString: string): Record<string, string> {
  if (!searchString) return {};
  const params = new URLSearchParams(searchString);
  const result: Record<string, string> = {};
  params.forEach((value, key) => { result[key] = value; });
  return result;
}
