function extractGaClientId(gaCookie: string): string {
  const parts = gaCookie.split('.');
  if (parts.length >= 4) return `${parts[2]}.${parts[3]}`;
  return gaCookie;
}

function generateClientId(): string {
  const rand = Math.floor(Math.random() * 2_147_483_647);
  const ts = Math.floor(Date.now() / 1000);
  return `${rand}.${ts}`;
}

function generateSessionId(): string {
  return String(Math.floor(Date.now() / 1000));
}

export async function sendGA4Lead(payload: {
  leadId: string | number;
  gaCookie?: string;
  userAgent?: string;
  ip?: string;
}): Promise<void> {
  const measurementId = process.env.GA_MEASUREMENT_ID;
  const apiSecret = process.env.GA_API_SECRET;

  if (!measurementId || !apiSecret) {
    console.warn('[GA4] GA_MEASUREMENT_ID ou GA_API_SECRET ausente — evento ignorado.');
    return;
  }

  const clientId = payload.gaCookie ? extractGaClientId(payload.gaCookie) : generateClientId();
  const sessionId = generateSessionId();

  const body = {
    client_id: clientId,
    non_personalized_ads: false,
    events: [
      {
        name: 'generate_lead',
        params: {
          engagement_time_msec: 100,
          session_id: sessionId,
          currency: 'BRL',
          value: 0,
          lead_source: 'landing_page',
          form_name: 'Lead Carvalho Teixeira',
          external_id: String(payload.leadId),
        },
      },
    ],
  };

  try {
    const url = `https://www.google-analytics.com/mp/collect?measurement_id=${measurementId}&api_secret=${apiSecret}`;
    const response = await fetch(url, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        ...(payload.userAgent && { 'User-Agent': payload.userAgent }),
      },
      body: JSON.stringify(body),
    });

    if (response.status !== 204 && !response.ok) {
      const errText = await response.text();
      console.error('[GA4] Erro na resposta:', response.status, errText);
      return;
    }

    console.log(`[GA4] generate_lead enviado. clientId=${clientId} leadId=${payload.leadId}`);
  } catch (err) {
    console.error('[GA4] Falha inesperada:', err);
  }
}
