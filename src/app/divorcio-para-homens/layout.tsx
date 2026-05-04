import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Advogado de Divórcio para Homens no Rio de Janeiro | Dr. Leonardo Carvalho",
  description:
    "Sessão estratégica de 50 minutos com o Dr. Leonardo Carvalho, especialista em divórcio masculino com 14 anos de experiência. Proteja seu patrimônio e mantenha a convivência com seus filhos. Atendimento online. Rio de Janeiro.",
  keywords: [
    "advogado divórcio homens",
    "divórcio masculino Rio de Janeiro",
    "advogado divórcio RJ",
    "guarda compartilhada homens",
    "proteção patrimonial divórcio",
    "consultoria jurídica divórcio",
    "Dr. Leonardo Carvalho advogado",
    "Carvalho Teixeira advocacia",
    "divórcio para homens",
  ],
  authors: [{ name: "Dr. Leonardo Carvalho" }],
  creator: "Carvalho Teixeira Advocacia",
  publisher: "Carvalho Teixeira Advocacia",
  alternates: {
    canonical: "https://leonardo-adv.vercel.app/divorcio-para-homens",
  },
  openGraph: {
    type: "website",
    locale: "pt_BR",
    url: "https://leonardo-adv.vercel.app/divorcio-para-homens",
    siteName: "Carvalho Teixeira Advocacia",
    title: "Advogado de Divórcio para Homens | Dr. Leonardo Carvalho",
    description:
      "Sessão estratégica de 50 minutos. Diagnóstico completo do seu caso, plano jurídico personalizado e proteção do que você construiu. 14 anos de experiência. Rio de Janeiro.",
    images: [
      {
        url: "https://leonardo-adv.vercel.app/og-image.jpg",
        width: 1200,
        height: 630,
        alt: "Dr. Leonardo Carvalho — Advogado de Divórcio para Homens",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Advogado de Divórcio para Homens | Dr. Leonardo Carvalho",
    description:
      "Sessão estratégica de 50 minutos. Proteja seu patrimônio e a convivência com seus filhos. 14 anos de experiência. Rio de Janeiro.",
  },
  robots: {
    index: true,
    follow: true,
    googleBot: { index: true, follow: true },
  },
};

const jsonLdLegalService = {
  "@context": "https://schema.org",
  "@type": "LegalService",
  name: "Carvalho Teixeira Advocacia",
  description:
    "Escritório especializado em divórcio para homens. Proteção patrimonial, guarda compartilhada e planejamento jurídico com atendimento direto do advogado em cada etapa.",
  url: "https://leonardo-adv.vercel.app/divorcio-para-homens",
  telephone: "+55-21-97507-5776",
  contactPoint: {
    "@type": "ContactPoint",
    telephone: "+55-21-97507-5776",
    contactType: "customer service",
    availableLanguage: "Portuguese",
  },
  address: {
    "@type": "PostalAddress",
    addressLocality: "Rio de Janeiro",
    addressRegion: "RJ",
    addressCountry: "BR",
  },
  areaServed: {
    "@type": "State",
    name: "Rio de Janeiro",
  },
  priceRange: "$$",
  openingHours: "Mo-Fr 09:00-18:00",
  knowsAbout: [
    "Divórcio Masculino",
    "Direito de Família",
    "Guarda Compartilhada",
    "Proteção Patrimonial",
    "Planejamento Patrimonial",
  ],
};

const jsonLdPerson = {
  "@context": "https://schema.org",
  "@type": "Person",
  name: "Leonardo Carvalho",
  honorificPrefix: "Dr.",
  jobTitle: "Advogado especialista em divórcio para homens",
  description:
    "Advogado com 14 anos de experiência em planejamento e proteção patrimonial. Especialista em divórcio masculino, guarda compartilhada e direito de família.",
  alumniOf: [
    {
      "@type": "EducationalOrganization",
      name: "Universidade do Estado do Rio de Janeiro",
      alternateName: "UERJ",
    },
    {
      "@type": "EducationalOrganization",
      name: "Fundação Getúlio Vargas",
      alternateName: "FGV",
    },
    {
      "@type": "EducationalOrganization",
      name: "Universidade Gregoriana de Roma",
    },
  ],
  worksFor: {
    "@type": "LegalService",
    name: "Carvalho Teixeira Advocacia",
  },
  knowsAbout: [
    "Divórcio Masculino",
    "Guarda Compartilhada",
    "Proteção Patrimonial",
    "Direito de Família",
    "Planejamento Patrimonial",
  ],
};

const jsonLdFAQ = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: [
    {
      "@type": "Question",
      name: "O que é a sessão estratégica de divórcio para homens?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "É uma consulta de 50 minutos com o Dr. Leonardo Carvalho, onde você recebe um diagnóstico completo do seu caso, um plano jurídico personalizado e todas as suas dúvidas respondidas antes de tomar qualquer decisão sobre o divórcio.",
      },
    },
    {
      "@type": "Question",
      name: "Como funciona a guarda compartilhada no divórcio?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "A guarda compartilhada é o regime mais comum no Brasil, representando 44,6% dos casos. Com orientação estratégica desde o início do processo, é possível garantir presença ativa na vida dos filhos e preservar seus direitos como pai.",
      },
    },
    {
      "@type": "Question",
      name: "Como posso proteger meu patrimônio no divórcio?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Com planejamento jurídico desde o primeiro movimento. O Dr. Leonardo Carvalho realiza o mapeamento completo do patrimônio e identifica os principais riscos para que você tome decisões estratégicas e não abra mão de mais do que é necessário.",
      },
    },
    {
      "@type": "Question",
      name: "O atendimento jurídico do Dr. Leonardo Carvalho é presencial ou online?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "O atendimento é realizado online, com vagas limitadas a 10 por semana para garantir qualidade e atenção individualizada. O Dr. Leonardo Carvalho atende pessoalmente em cada etapa do processo, sem intermediários.",
      },
    },
    {
      "@type": "Question",
      name: "Qual é a formação acadêmica do Dr. Leonardo Carvalho?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "O Dr. Leonardo Carvalho é bacharel pela UERJ (Universidade do Estado do Rio de Janeiro), especialista pela FGV (Fundação Getúlio Vargas) e mestrando pela Universidade Gregoriana de Roma. Possui 14 anos de experiência em planejamento e proteção patrimonial.",
      },
    },
    {
      "@type": "Question",
      name: "Qual é o valor da consulta estratégica de divórcio?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Para saber o valor e verificar disponibilidade, entre em contato pelo formulário ou pelo WhatsApp +55 21 97507-5776. O processo começa com um contato inicial para entender o seu caso.",
      },
    },
  ],
};

export default function DivorcioParaHomensLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLdLegalService) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLdPerson) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLdFAQ) }}
      />
      {children}
    </>
  );
}
