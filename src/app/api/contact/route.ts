import { neon } from '@neondatabase/serverless';
import { NextRequest, NextResponse } from 'next/server';
import { buildCAPIParams, parseCookieString, parseQueryString, sendLeadEventToMeta } from '@/lib/facebook';

async function saveToNeon(lead: any) {
  try {
    console.log('Tentando salvar no Neon:', { name: lead.name, email: lead.email, phone: lead.phone });

    const sql = neon(process.env.DATABASE_URL!);
    const organizationId = process.env.ORGANIZATION_ID!;

    const result = await sql`
      INSERT INTO public.leads (
        name, email, whatsapp,
        status, position, organization_id,
        utm_source, utm_medium, utm_campaign, utm_term
      )
      VALUES (
        ${lead.name}, ${lead.email}, ${lead.phone},
        'novo', 0, ${organizationId},
        ${lead.utm_source || null}, ${lead.utm_medium || null}, ${lead.utm_campaign || null}, ${lead.utm_term || null}
      )
      RETURNING *;
    `;

    if (!result || result.length === 0) {
      throw new Error('INSERT não retornou dados. Verifique permissões RLS ou triggers.');
    }

    const savedLead = result[0];
    console.log('SUCESSO NEON! Lead salvo:', savedLead);
    return savedLead;
  } catch (error) {
    console.error('Erro detalhado ao salvar no Neon:', error);
    throw error;
  }
}

const withTimeout = <T>(promise: Promise<T>, ms: number): Promise<T> => {
  let timeoutId: NodeJS.Timeout;
  const timeoutPromise = new Promise<T>((_, reject) => {
    timeoutId = setTimeout(() => {
      reject(new Error(`Operação abortada por timeout após ${ms}ms`));
    }, ms);
  });
  return Promise.race([promise.finally(() => clearTimeout(timeoutId)), timeoutPromise]);
};

export const dynamic = 'force-dynamic';

export async function POST(request: NextRequest) {
  try {
    console.log('--- INICIANDO PROCESSAMENTO DE LEAD ---');
    const body = await request.json();
    const {
      name, nome,
      email,
      phone, telefone, whatsapp,
      utm_source, utm_medium, utm_campaign, utm_term, page_path,
    } = body;

    const finalName = name || nome;
    const rawPhone = phone || telefone || whatsapp;
    const finalPhone = rawPhone ? String(rawPhone).replace(/\D/g, '') : '';

    if (!finalName || !email || !finalPhone) {
      return NextResponse.json({ message: 'Nome, email e telefone são obrigatórios.', received: body }, { status: 400 });
    }

    const initialLead = {
      name: finalName,
      email,
      phone: finalPhone,
      utm_source,
      utm_medium,
      utm_campaign,
      utm_term,
      page_path,
      created_at: new Date().toISOString(),
    };

    let savedLead;

    try {
      savedLead = await withTimeout(saveToNeon(initialLead), 5000);
    } catch (dbError: any) {
      console.error('FALHA OU TIMEOUT NO NEON:', dbError);
      savedLead = {
        id: 'backup_timeout_' + Date.now(),
        name: initialLead.name,
        email: initialLead.email,
        whatsapp: initialLead.phone,
        created_at: initialLead.created_at,
        utm_source: initialLead.utm_source,
        utm_medium: initialLead.utm_medium,
        utm_campaign: initialLead.utm_campaign,
        utm_term: initialLead.utm_term,
        page_path: initialLead.page_path,
      };
    }

    const eventId = (savedLead as Record<string, unknown>)?.id ?? ('lead_' + Date.now());

    try {
      const url = new URL(request.url);
      const cookieHeader = request.headers.get('cookie');
      const userAgent = request.headers.get('user-agent') ?? undefined;
      const referer = request.headers.get('referer');
      const xForwardedFor = request.headers.get('x-forwarded-for');

      const nameParts = initialLead.name.trim().split(' ');
      const firstName = nameParts[0];
      const lastName = nameParts.length > 1 ? nameParts.slice(1).join(' ') : undefined;

      const capiData = buildCAPIParams(
        {
          host: url.hostname,
          queryParams: parseQueryString(url.search),
          cookies: parseCookieString(cookieHeader),
          referer,
          xForwardedFor,
          remoteAddr: null,
        },
        {
          email: initialLead.email,
          phone: initialLead.phone,
          firstName,
          lastName,
          country: 'br',
        }
      );

      const eventSourceUrl = page_path
        ? `https://${url.hostname}${page_path}`
        : referer ?? url.origin;

      await withTimeout(
        sendLeadEventToMeta({ eventId: String(eventId), eventSourceUrl, userAgent, capiData }),
        6000
      );
    } catch (capiError) {
      console.error('Alerta: Meta CAPI falhou:', capiError);
    }

    return NextResponse.json({
      message: 'Lead processado com sucesso.',
      lead: savedLead,
      eventId: String(eventId),
    }, { status: 200 });

  } catch (error: any) {
    console.error('Erro ao processar a requisição:', error);
    return NextResponse.json({
      message: 'Erro interno do servidor.',
      error: error.message || String(error),
    }, { status: 500 });
  }
}
