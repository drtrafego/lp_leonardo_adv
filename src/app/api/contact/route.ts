import { neon } from '@neondatabase/serverless';
import { NextRequest, NextResponse } from 'next/server';
import nodemailer from 'nodemailer';

async function sendEmailNotification(lead: any) {
  try {
    console.log('--- INICIANDO NOTIFICAÇÃO DE EMAIL ---');
    const host = process.env.EMAIL_HOST;
    const portEnv = process.env.EMAIL_PORT;
    const user = process.env.EMAIL_USER;
    const pass = process.env.EMAIL_PASS;
    const to = process.env.EMAIL_TO;

    if (!host || !portEnv || !user || !pass || !to) {
      return;
    }

    const port = parseInt(portEnv);

    const transporter = nodemailer.createTransport({
      host,
      port,
      secure: port === 465,
      auth: {
        user,
        pass,
      },
      tls: {
        rejectUnauthorized: false
      },
      connectionTimeout: 5000,
      greetingTimeout: 5000,
      socketTimeout: 5000,
    });

    const cleanPhone = lead.whatsapp.replace(/\D/g, '');
    const whatsappLink = `https://wa.me/${cleanPhone}`;

    const mailOptions = {
      from: `"Carvalho Teixeira Lead" <${user}>`,
      to,
      subject: `Novo Lead - Sessão Estratégica: ${lead.name}`,
      text: `
        Novo lead capturado no site!

        Nome: ${lead.name}
        Email: ${lead.email}
        Telefone: ${lead.whatsapp}
        Link WhatsApp: ${whatsappLink}

        Origem: ${lead.utm_source || 'N/A'}
        Mídia: ${lead.utm_medium || 'N/A'}
        Campanha: ${lead.utm_campaign || 'N/A'}
        Termo: ${lead.utm_term || 'N/A'}
        Página: ${lead.page_path || 'N/A'}

        Data: ${new Date().toLocaleString('pt-BR')}
      `,
      html: `
        <div style="font-family: Arial, sans-serif; color: #333;">
          <h2 style="color: #0B2828;">Novo Lead - Sessão Estratégica 🏛️</h2>
          <p>Um novo cliente em potencial acabou de se cadastrar no site Carvalho Teixeira.</p>
          <table style="width: 100%; border-collapse: collapse; margin-top: 20px;">
            <tr>
              <td style="padding: 10px; border-bottom: 1px solid #ddd;"><strong>Nome:</strong></td>
              <td style="padding: 10px; border-bottom: 1px solid #ddd;">${lead.name}</td>
            </tr>
            <tr>
              <td style="padding: 10px; border-bottom: 1px solid #ddd;"><strong>Email:</strong></td>
              <td style="padding: 10px; border-bottom: 1px solid #ddd;">${lead.email}</td>
            </tr>
            <tr>
              <td style="padding: 10px; border-bottom: 1px solid #ddd;"><strong>WhatsApp:</strong></td>
              <td style="padding: 10px; border-bottom: 1px solid #ddd;">
                <a href="${whatsappLink}" style="color: #C9A452; text-decoration: none; font-weight: bold;" target="_blank">
                  ${lead.whatsapp}
                </a>
              </td>
            </tr>
            <tr>
              <td style="padding: 10px; border-bottom: 1px solid #ddd; background-color: #f9f9f9;"><strong>Origem (UTM):</strong></td>
              <td style="padding: 10px; border-bottom: 1px solid #ddd; background-color: #f9f9f9;">${lead.utm_source || '-'} / ${lead.utm_medium || '-'}</td>
            </tr>
            <tr>
              <td style="padding: 10px; border-bottom: 1px solid #ddd; background-color: #f9f9f9;"><strong>Campanha:</strong></td>
              <td style="padding: 10px; border-bottom: 1px solid #ddd; background-color: #f9f9f9;">${lead.utm_campaign || '-'}</td>
            </tr>
            <tr>
              <td style="padding: 10px; border-bottom: 1px solid #ddd; background-color: #f9f9f9;"><strong>Termo:</strong></td>
              <td style="padding: 10px; border-bottom: 1px solid #ddd; background-color: #f9f9f9;">${lead.utm_term || '-'}</td>
            </tr>
            <tr>
              <td style="padding: 10px; border-bottom: 1px solid #ddd; background-color: #f9f9f9;"><strong>Página:</strong></td>
              <td style="padding: 10px; border-bottom: 1px solid #ddd; background-color: #f9f9f9;">${lead.page_path || '-'}</td>
            </tr>
            <tr>
              <td style="padding: 10px; border-bottom: 1px solid #ddd;"><strong>Data:</strong></td>
              <td style="padding: 10px; border-bottom: 1px solid #ddd;">${new Date().toLocaleString('pt-BR')}</td>
            </tr>
          </table>
          <p style="margin-top: 20px; font-size: 12px; color: #666;">Este é um email automático enviado pelo sistema do site Carvalho Teixeira.</p>
        </div>
      `,
    };

    const info = await transporter.sendMail(mailOptions);
    console.log('Email de notificação enviado:', info.messageId);

  } catch (error) {
    console.error('Erro ao enviar email de notificação:', error);
  }
}

async function saveToNeon(lead: any) {
  try {
    console.log('Tentando salvar no Neon (Nova Instância):', {
      name: lead.name,
      email: lead.email,
      phone: lead.phone
    });

    const sql = neon(process.env.DATABASE_URL!);

    const organizationId = process.env.ORGANIZATION_ID!;

    console.log(`Usando Organization ID: ${organizationId}`);

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
      throw new Error('O comando INSERT rodou mas não retornou nenhum dado. Verifique permissões RLS ou triggers.');
    }

    const countResult = await sql`SELECT count(*) FROM leads`;
    const totalCount = countResult[0].count;

    const savedLead = result[0];
    console.log('SUCESSO NEON! Lead salvo/atualizado:', savedLead);

    const dbUrl = process.env.DATABASE_URL || '';
    const host = dbUrl.split('@')[1]?.split('/')[0] || 'Desconhecido';

    return { ...savedLead, _meta: { host, count: totalCount } };
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

  return Promise.race([
    promise.finally(() => clearTimeout(timeoutId)),
    timeoutPromise
  ]);
};

export const dynamic = 'force-dynamic';

export async function POST(request: NextRequest) {
  try {
    console.log('--- INICIANDO PROCESSAMENTO DE LEAD (Versão: Produção Estável) ---');
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
      console.log('Iniciando tentativa de salvar no Neon...');
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
        page_path: initialLead.page_path
      };
    }

    const eventId = (savedLead as Record<string, unknown>)?.id ?? ('lead_' + Date.now());

    try {
      await withTimeout(sendEmailNotification(savedLead), 5000);
    } catch (bgError) {
      console.error('Alerta: Email falhou:', bgError);
    }

    return NextResponse.json({
      message: 'Lead processado com sucesso.',
      lead: savedLead,
      eventId: String(eventId)
    }, { status: 200 });

  } catch (error: any) {
    console.error('Erro ao processar a requisição:', error);
    return NextResponse.json({
      message: 'Erro interno do servidor.',
      error: error.message || String(error)
    }, { status: 500 });
  }
}
