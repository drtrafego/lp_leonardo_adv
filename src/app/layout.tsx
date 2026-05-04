import type { Metadata } from "next";
import { PT_Serif, Lato } from "next/font/google";
import "./globals.css";

const ptSerif = PT_Serif({
  subsets: ["latin"],
  weight: ["400", "700"],
  variable: "--font-serif",
  display: "swap",
});

const lato = Lato({
  subsets: ["latin"],
  weight: ["300", "400", "700", "900"],
  variable: "--font-sans",
  display: "swap",
});

export const metadata: Metadata = {
  title: "Carvalho Teixeira | Divórcio para Homens",
  description: "Sessão estratégica de 50 minutos com o Dr. Leonardo Carvalho. Diagnóstico completo, plano jurídico personalizado. Sem perder a convivência com seus filhos. Sem ceder mais patrimônio do que você deve.",
  robots: "index, follow",
};

const GTM_ID = process.env.NEXT_PUBLIC_GTM_ID;
const GA4_ID = process.env.NEXT_PUBLIC_GA4_ID;

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="pt-BR">
      <head>
        {/* UTMs + dataLayer init */}
        <script dangerouslySetInnerHTML={{ __html: `
          window.dataLayer = window.dataLayer || [];
          (function() {
            try {
              var pushData = {};
              var urlParams = new URLSearchParams(window.location.search);
              ['utm_source','utm_medium','utm_campaign','utm_content','utm_term','gclid'].forEach(function(k) {
                var v = urlParams.get(k);
                if (v) pushData[k] = v;
              });
              if (Object.keys(pushData).length > 0) window.dataLayer.push(pushData);
            } catch(e) {}
          })();
        ` }} />

        {/* Google Tag Manager */}
        {GTM_ID && GTM_ID !== 'PLACEHOLDER_GTM_ID' && (
          <script dangerouslySetInnerHTML={{ __html: `
            (function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':
            new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],
            j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src=
            'https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);
            })(window,document,'script','dataLayer','${GTM_ID}');
          ` }} />
        )}

        {/* GA4 direto — garante window.gtag disponível independente do GTM */}
        {GA4_ID && (
          <>
            <script async src={`https://www.googletagmanager.com/gtag/js?id=${GA4_ID}`} />
            <script dangerouslySetInnerHTML={{ __html: `
              window.dataLayer = window.dataLayer || [];
              function gtag(){dataLayer.push(arguments);}
              gtag('js', new Date());
              gtag('config', '${GA4_ID}', { send_page_view: false });
            ` }} />
          </>
        )}
      </head>
      <body className={`${ptSerif.variable} ${lato.variable}`}>
        {GTM_ID && GTM_ID !== 'PLACEHOLDER_GTM_ID' && (
          <noscript dangerouslySetInnerHTML={{ __html: `<iframe src="https://www.googletagmanager.com/ns.html?id=${GTM_ID}" height="0" width="0" style="display:none;visibility:hidden"></iframe>` }} />
        )}
        {children}
      </body>
    </html>
  );
}
