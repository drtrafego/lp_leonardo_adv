"use client";

import Image from "next/image";
import { Suspense } from "react";
import ContactForm from "@/components/ContactForm";

const checkItemStyle: React.CSSProperties = {
  display: "inline-block",
  width: "18px",
  height: "18px",
  minWidth: "18px",
  backgroundImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24' fill='none' stroke='%23C9A452' stroke-width='2.5' stroke-linecap='round' stroke-linejoin='round'%3E%3Cpolyline points='20 6 9 17 4 12'/%3E%3C/svg%3E")`,
  backgroundRepeat: "no-repeat",
  backgroundSize: "contain",
  marginTop: "2px",
  flexShrink: 0,
};

const goldAccent: React.CSSProperties = {
  width: "48px",
  height: "3px",
  backgroundColor: "#C9A452",
  display: "block",
};

export default function ModeloLightPage() {
  return (
    <>
      <style>{`
        html { scroll-behavior: smooth; }
        body { background-color: #F9F6F1; color: #1A1A1A; font-family: 'Inter', sans-serif; }
        .font-serif { font-family: 'Cormorant Garamond', serif; }
        .section-white { background-color: #FFFFFF; }
        .section-cream { background-color: #F9F6F1; }
        .btn-teal {
          background-color: #0B2828;
          color: #FFFFFF;
          font-family: 'Inter', sans-serif;
          font-weight: 600;
          letter-spacing: 0.05em;
          transition: background-color 0.2s ease;
          text-decoration: none;
          display: inline-block;
        }
        .btn-teal:hover { background-color: #C9A452; color: #0B2828; }
        .divider-light { border-top: 1px solid #E8E2D6; }
        .card-hover-light {
          transition: box-shadow 0.2s ease, transform 0.2s ease;
        }
        .card-hover-light:hover {
          box-shadow: 0 8px 40px rgba(11,40,40,0.08);
          transform: translateY(-2px);
        }
      `}</style>

      {/* NAVBAR */}
      <nav style={{
        position: "fixed", top: 0, left: 0, right: 0, zIndex: 50,
        backgroundColor: "rgba(249,246,241,0.97)",
        backdropFilter: "blur(8px)",
        borderBottom: "1px solid rgba(201,164,82,0.2)",
      }}>
        <div style={{ maxWidth: "72rem", margin: "0 auto", padding: "1rem 1.5rem", display: "flex", alignItems: "center", justifyContent: "space-between" }}>
          <div style={{ display: "flex", alignItems: "center", gap: "12px" }}>
            <span className="font-serif" style={{ fontSize: "1.65rem", color: "#C9A452", letterSpacing: "0.04em", lineHeight: 1 }}>CT</span>
            <div style={{ width: "1px", height: "28px", background: "rgba(11,40,40,0.2)" }} />
            <div>
              <div className="font-serif" style={{ fontSize: "0.68rem", letterSpacing: "0.22em", color: "#0B2828", lineHeight: 1.3 }}>CARVALHO TEIXEIRA</div>
              <div style={{ fontFamily: "Inter, sans-serif", fontSize: "0.5rem", letterSpacing: "0.16em", color: "rgba(11,40,40,0.45)", lineHeight: 1.4 }}>PARA QUEM TEM MUITO A PRESERVAR</div>
            </div>
          </div>
          <a href="#cta-final" className="btn-teal" style={{ padding: "0.625rem 1.5rem", fontSize: "0.875rem", textTransform: "uppercase", letterSpacing: "0.1em" }}>
            Quero Ser Atendido
          </a>
        </div>
      </nav>

      {/* HERO */}
      <section id="hero" className="section-white" style={{ minHeight: "100vh", display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "flex-start", padding: "5rem 1.5rem 3rem" }}>
        <div style={{ maxWidth: "64rem", margin: "0 auto", width: "100%" }}>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))", gap: "4rem", alignItems: "center" }}>
            <div>
              <span style={{ ...goldAccent, marginBottom: "2rem" }} />
              <h1 className="font-serif" style={{ fontSize: "clamp(2.2rem, 5vw, 3.75rem)", fontWeight: 600, lineHeight: 1.2, color: "#0B2828", marginBottom: "1.5rem" }}>
                Divórcio para Homens:<br />
                <span style={{ fontWeight: 300, color: "#C9A452" }}>Sem perder a convivência com seus filhos.</span><br />
                Sem ceder mais patrimônio do que você deve.
              </h1>
              <p style={{ color: "#4B5563", fontFamily: "Inter, sans-serif", fontSize: "1rem", lineHeight: 1.7, marginBottom: "2rem" }}>
                Em uma sessão estratégica de 50 minutos, você terá um diagnóstico completo do seu caso, um plano jurídico personalizado e todas as suas dúvidas respondidas, antes de tomar qualquer decisão.
              </p>
              <a href="#cta-final" className="btn-teal" style={{ padding: "1rem 2.5rem", fontSize: "0.875rem", textTransform: "uppercase", letterSpacing: "0.1em", marginBottom: "1rem" }}>
                Quero Ser Atendido
              </a>
              <p style={{ color: "#9CA3AF", fontSize: "0.75rem", fontFamily: "Inter, sans-serif", letterSpacing: "0.05em", marginTop: "0.75rem" }}>
                Atendimento online &nbsp;&bull;&nbsp; Vagas limitadas por semana &nbsp;&bull;&nbsp; Processo confidencial
              </p>
            </div>
            <div style={{ backgroundColor: "#F9F6F1", padding: "2.5rem", border: "1px solid rgba(201,164,82,0.2)" }}>
              <p style={{ color: "#C9A452", fontFamily: "Inter, sans-serif", fontSize: "0.75rem", textTransform: "uppercase", letterSpacing: "0.15em", marginBottom: "1.5rem" }}>O que você recebe na sessão</p>
              <ul style={{ display: "flex", flexDirection: "column", gap: "20px" }}>
                {[
                  "Plano de ação claro para defender sua convivência com os filhos desde o início do processo",
                  "Mapeamento dos riscos patrimoniais e medidas para evitar perdas desnecessárias",
                  "Controle e previsibilidade em cada etapa do processo",
                  "Contato direto com advogado especialista, sem intermediários, sem sumiço",
                ].map((item, i) => (
                  <li key={i} style={{ display: "flex", alignItems: "flex-start", gap: "12px", color: "#374151", fontSize: "0.875rem", fontFamily: "Inter, sans-serif", lineHeight: 1.6 }}>
                    <span style={checkItemStyle} />
                    {item}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* CREDENCIAIS */}
      <section id="credenciais" className="section-cream" style={{ padding: "3.5rem 1.5rem" }}>
        <div style={{ maxWidth: "64rem", margin: "0 auto" }}>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))", gap: "3rem", alignItems: "flex-start" }}>
            <div style={{ gridColumn: "span 1" }}>
              <span style={{ ...goldAccent, marginBottom: "1.5rem" }} />
              <p style={{ color: "#C9A452", fontFamily: "Inter, sans-serif", fontSize: "0.75rem", textTransform: "uppercase", letterSpacing: "0.15em", marginBottom: "0.75rem" }}>Quem vai te atender</p>
              <h2 className="font-serif" style={{ fontSize: "clamp(2rem, 4vw, 3rem)", color: "#0B2828", fontWeight: 600, marginBottom: "0.5rem" }}>Dr. Leonardo Carvalho</h2>
              <p style={{ color: "#6B7280", fontFamily: "Inter, sans-serif", fontSize: "0.875rem", marginBottom: "2rem" }}>Advogado com 14 anos de experiência em planejamento e proteção patrimonial.</p>
              <ul style={{ display: "flex", flexDirection: "column", gap: "16px", marginBottom: "2rem" }}>
                {[
                  "Bacharel: Universidade do Estado do Rio de Janeiro (UERJ)",
                  "Especialista: Fundação Getúlio Vargas (FGV)",
                  "Mestrando: Universidade Gregoriana de Roma",
                ].map((item, i) => (
                  <li key={i} style={{ display: "flex", alignItems: "flex-start", gap: "12px", color: "#374151", fontSize: "0.875rem", fontFamily: "Inter, sans-serif" }}>
                    <span style={checkItemStyle} />
                    {item}
                  </li>
                ))}
              </ul>
            </div>
            <div>
              <div style={{ backgroundColor: "#0B2828", color: "#FFFFFF", padding: "2.5rem" }}>
                <p className="font-serif" style={{ fontSize: "clamp(1.1rem, 2.5vw, 1.375rem)", fontWeight: 300, lineHeight: 1.6, fontStyle: "italic", color: "rgba(255,255,255,0.9)" }}>
                  "Você não precisa atravessar esse momento no escuro e não precisa confiar sua situação a quem vai sumir depois da primeira conversa."
                </p>
                <div style={{ width: "32px", height: "1px", background: "#C9A452", marginTop: "1.5rem" }} />
                <p style={{ color: "rgba(201,164,82,0.8)", fontSize: "0.75rem", fontFamily: "Inter, sans-serif", textTransform: "uppercase", letterSpacing: "0.15em", marginTop: "1rem" }}>Dr. Leonardo Carvalho</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      <div className="divider-light" style={{ maxWidth: "72rem", margin: "0 auto" }} />

      {/* DOR */}
      <section id="dor" className="section-white" style={{ padding: "3.5rem 1.5rem" }}>
        <div style={{ maxWidth: "48rem", margin: "0 auto" }}>
          <span style={{ ...goldAccent, marginBottom: "1.5rem" }} />
          <h2 className="font-serif" style={{ fontSize: "clamp(2rem, 4vw, 3rem)", color: "#0B2828", fontWeight: 600, marginBottom: "2rem", lineHeight: 1.2 }}>
            A verdade que poucos falam abertamente.
          </h2>
          <div style={{ display: "flex", flexDirection: "column", gap: "24px", color: "#4B5563", fontFamily: "Inter, sans-serif", fontSize: "1rem", lineHeight: 1.7 }}>
            <p>
              O divórcio não é apenas o fim de um relacionamento. É um processo que redefine, na prática, sua relação com seus filhos e o destino do patrimônio que você construiu ao longo de anos.
            </p>
            <div style={{ backgroundColor: "#F9F6F1", borderLeft: "4px solid #C9A452", paddingLeft: "2rem", paddingTop: "1.5rem", paddingBottom: "1.5rem", margin: "0.5rem 0" }}>
              <p style={{ color: "#1F2937", fontSize: "1.125rem", lineHeight: 1.7 }}>
                44,6% das guardas são concedidas exclusivamente à mãe. E mesmo nos casos de guarda compartilhada, que hoje respondem por 44,6% dos divórcios, muitos pais relatam sentir que perderam presença e influência na vida dos filhos.
              </p>
              <p style={{ color: "#C9A452", fontSize: "0.75rem", textTransform: "uppercase", letterSpacing: "0.15em", marginTop: "1rem", fontWeight: 600 }}>Fonte: IBGE, 2024</p>
            </div>
            <p>
              Quando o processo começa sem estratégia, as consequências são difíceis de reverter. Decisões tomadas sob pressão, para "encerrar logo" e "ter paz", costumam cobrar um preço alto nos anos seguintes.
            </p>
            <p>
              Ao longo de 14 anos, acompanhei dezenas de casos em que isso aconteceu. Pais que passaram a conviver menos com os filhos do que gostariam. Homens que cederam mais patrimônio do que era necessário simplesmente por não terem orientação no momento certo.
            </p>
          </div>
        </div>
      </section>

      {/* VIRADA */}
      <section id="virada" className="section-cream" style={{ padding: "3.5rem 1.5rem" }}>
        <div style={{ maxWidth: "64rem", margin: "0 auto" }}>
          <span style={{ ...goldAccent, marginBottom: "1.5rem" }} />
          <h2 className="font-serif" style={{ fontSize: "clamp(2rem, 4vw, 3rem)", color: "#0B2828", fontWeight: 600, marginBottom: "1.5rem", lineHeight: 1.2 }}>
            É possível conduzir esse processo de forma diferente.
          </h2>
          <p style={{ color: "#4B5563", fontFamily: "Inter, sans-serif", fontSize: "1rem", lineHeight: 1.7, maxWidth: "48rem", marginBottom: "2rem" }}>
            Com um plano claro desde o primeiro movimento, com controle sobre cada decisão e com previsibilidade sobre o que vem pela frente, sem abrir mão da sua presença na vida dos seus filhos e sem comprometer o que você levou anos para construir.
          </p>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(240px, 1fr))", gap: "1.5rem", marginBottom: "3rem" }}>
            {[
              "Imagine manter uma convivência saudável com seus filhos, participando ativamente da vida deles, sem sentir que perdeu espaço, presença ou autoridade.",
              "Imagine atravessar o divórcio com seu patrimônio organizado, protegido e sob controle, sem surpresas e sem a sensação de que abdicou de mais do que deveria.",
              "Imagine passar por esse processo com clareza. Com a segurança de que cada decisão está sendo tomada com base estratégica, não em emoção ou pressão do momento.",
            ].map((text, i) => (
              <div key={i} className="card-hover-light section-white" style={{ border: "1px solid #F3F4F6", padding: "2rem" }}>
                <div style={{ width: "40px", height: "40px", backgroundColor: "rgba(11,40,40,0.05)", display: "flex", alignItems: "center", justifyContent: "center", marginBottom: "1.5rem" }}>
                  <div style={{ width: "20px", height: "1px", background: "#C9A452" }} />
                </div>
                <p className="font-serif" style={{ fontSize: "1.25rem", color: "#0B2828", lineHeight: 1.6 }}>
                  {text}
                </p>
              </div>
            ))}
          </div>
          <div style={{ backgroundColor: "#0B2828", color: "#FFFFFF", padding: "2rem", display: "flex", alignItems: "center", gap: "1.5rem" }}>
            <div style={{ width: "4px", height: "48px", background: "#C9A452", flexShrink: 0 }} />
            <p className="font-serif" style={{ fontSize: "1.25rem", fontWeight: 300 }}>
              É exatamente isso que a consultoria estratégica foi desenhada para entregar.
            </p>
          </div>
        </div>
      </section>

      <div className="divider-light" style={{ maxWidth: "72rem", margin: "0 auto" }} />

      {/* COMO FUNCIONA */}
      <section id="como-funciona" className="section-white" style={{ padding: "3.5rem 1.5rem" }}>
        <div style={{ maxWidth: "56rem", margin: "0 auto" }}>
          <span style={{ ...goldAccent, marginBottom: "1.5rem" }} />
          <h2 className="font-serif" style={{ fontSize: "clamp(2rem, 4vw, 3rem)", color: "#0B2828", fontWeight: 600, marginBottom: "1rem", lineHeight: 1.2 }}>
            Não é uma consulta genérica.<br />É uma sessão estratégica estruturada.
          </h2>
          <p style={{ color: "#6B7280", fontFamily: "Inter, sans-serif", fontSize: "1rem", lineHeight: 1.7, maxWidth: "36rem", marginBottom: "2rem" }}>
            Em 50 minutos de atendimento direto com o Dr. Leonardo Carvalho, você sai com clareza total sobre o seu caso, sem enrolação, sem respostas vagas, sem precisar marcar um segundo encontro para entender o que fazer.
          </p>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(240px, 1fr))", gap: "0 3rem", marginBottom: "3rem" }}>
            {[
              "Análise da sua estrutura familiar e da dinâmica de convivência com os filhos",
              "Mapeamento do seu patrimônio e identificação dos principais riscos",
              "Diagnóstico dos pontos sensíveis do seu caso específico",
              "Direcionamento claro sobre como conduzir o processo desde o início",
              "Definição de quais decisões tomar e quais evitar",
              "Estratégia para preservar sua convivência com os filhos e proteger o que você construiu",
              "Espaço para todas as suas dúvidas, respondidas com precisão, sem rodeios",
            ].map((item, i) => (
              <div key={i} style={{ display: "flex", alignItems: "flex-start", gap: "16px", padding: "1rem 0", borderBottom: "1px solid #F3F4F6" }}>
                <span style={checkItemStyle} />
                <p style={{ color: "#374151", fontFamily: "Inter, sans-serif", fontSize: "0.875rem", lineHeight: 1.6 }}>{item}</p>
              </div>
            ))}
          </div>
          <div style={{ backgroundColor: "#0B2828", color: "#FFFFFF", padding: "1.5rem 2rem", display: "flex", alignItems: "center", gap: "1.5rem" }}>
            <div style={{ width: "4px", height: "40px", background: "#C9A452", flexShrink: 0 }} />
            <p className="font-serif" style={{ fontSize: "1.5rem", fontWeight: 300 }}>Você não sai com dúvidas. Sai com um plano.</p>
          </div>
        </div>
      </section>

      {/* DIFERENCIAL */}
      <section id="diferencial" className="section-cream" style={{ padding: "3.5rem 1.5rem" }}>
        <div style={{ maxWidth: "64rem", margin: "0 auto" }}>
          <span style={{ ...goldAccent, marginBottom: "1.5rem" }} />
          <h2 className="font-serif" style={{ fontSize: "clamp(2rem, 4vw, 3rem)", color: "#0B2828", fontWeight: 600, marginBottom: "1.5rem", lineHeight: 1.2 }}>
            O que diferencia esse atendimento do padrão de mercado.
          </h2>
          <p style={{ color: "#4B5563", fontFamily: "Inter, sans-serif", fontSize: "1rem", lineHeight: 1.7, maxWidth: "48rem", marginBottom: "1rem" }}>
            No atendimento jurídico tradicional, você fala com o advogado no início. Depois passa a lidar com secretárias, respostas genéricas e pouca orientação estratégica.
          </p>
          <p style={{ color: "#C9A452", fontFamily: "Inter, sans-serif", fontSize: "0.75rem", textTransform: "uppercase", letterSpacing: "0.15em", fontWeight: 600, marginBottom: "1.5rem" }}>Aqui é diferente</p>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(240px, 1fr))", gap: "1.5rem" }}>
            {[
              "Contato direto com o Dr. Leonardo Carvalho em cada etapa",
              "Retorno rápido e acesso facilitado ao longo de todo o processo",
              "Relatório periódico informando o andamento do caso",
              "Nível de especialização técnica acima da média, com formação nacional e internacional (FGV e Universidade Gregoriana de Roma)",
            ].map((text, i) => (
              <div key={i} className="card-hover-light section-white" style={{ border: "1px solid #F3F4F6", padding: "2rem", display: "flex", alignItems: "flex-start", gap: "20px" }}>
                <div style={{ width: "4px", height: "48px", background: "#C9A452", flexShrink: 0, marginTop: "4px" }} />
                <p style={{ color: "#374151", fontFamily: "Inter, sans-serif", fontSize: "0.875rem", lineHeight: 1.6 }}>{text}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <div className="divider-light" style={{ maxWidth: "72rem", margin: "0 auto" }} />

      {/* ESCASSEZ */}
      <section id="escassez" className="section-white" style={{ padding: "3.5rem 1.5rem" }}>
        <div style={{ maxWidth: "48rem", margin: "0 auto" }}>
          <span style={{ ...goldAccent, marginBottom: "1.5rem" }} />
          <h2 className="font-serif" style={{ fontSize: "clamp(2rem, 4vw, 3rem)", color: "#0B2828", fontWeight: 600, marginBottom: "2rem", lineHeight: 1.2 }}>
            Atendimento por disponibilidade limitada.
          </h2>
          <div style={{ display: "flex", flexDirection: "column", gap: "20px", color: "#4B5563", fontFamily: "Inter, sans-serif", fontSize: "1rem", lineHeight: 1.7 }}>
            <p>
              Para garantir análise individual e profundidade no diagnóstico, o número de atendimentos é intencionalmente limitado a <span style={{ color: "#0B2828", fontWeight: 600 }}>10 por semana</span>.
            </p>
            <p>
              Quando a agenda fecha, novos atendimentos são abertos apenas no mês seguinte.
            </p>
            <p>
              O processo começa com um contato inicial, nossa equipe vai entender o seu caso e, se fizer sentido para os dois lados, você recebe o convite para a sessão estratégica.
            </p>
          </div>
        </div>
      </section>

      {/* CTA FINAL */}
      <section id="cta-final" style={{ backgroundColor: "#0B2828", padding: "4rem 1.5rem" }}>
        <div style={{ maxWidth: "48rem", margin: "0 auto", textAlign: "center" }}>
          <span style={{ width: "48px", height: "1px", background: "#C9A452", display: "block", margin: "0 auto 2rem" }} />
          <h2 className="font-serif" style={{ fontSize: "clamp(2.2rem, 6vw, 4rem)", fontWeight: 300, color: "#FFFFFF", marginBottom: "1.5rem", lineHeight: 1.2 }}>
            Se você chegou até aqui,<br />
            entendeu o que está em jogo.
          </h2>
          <p style={{ color: "rgba(255,255,255,0.7)", fontFamily: "Inter, sans-serif", fontSize: "1rem", lineHeight: 1.7, marginBottom: "3rem" }}>
            A pergunta agora é simples: você vai tomar essa decisão com estratégia, ou no improviso?
          </p>
          <div style={{ display: "flex", justifyContent: "center" }}>
            <Suspense>
              <ContactForm theme="light" />
            </Suspense>
          </div>
        </div>
      </section>

      {/* FOOTER */}
      <footer className="section-cream" style={{ padding: "3rem 1.5rem", borderTop: "1px solid #E5E7EB" }}>
        <div style={{ maxWidth: "72rem", margin: "0 auto", display: "flex", flexDirection: "row", alignItems: "center", justifyContent: "space-between", flexWrap: "wrap", gap: "1.5rem" }}>
          <div style={{ display: "flex", flexDirection: "column", alignItems: "flex-start", gap: "8px" }}>
            <span className="font-serif" style={{ fontSize: "2rem", color: "#C9A452", letterSpacing: "0.04em", lineHeight: 1 }}>CT</span>
            <div className="font-serif" style={{ fontSize: "0.6rem", letterSpacing: "0.2em", color: "#0B2828" }}>CARVALHO TEIXEIRA</div>
            <p className="font-serif" style={{ color: "#C9A452", fontSize: "0.875rem", fontStyle: "italic" }}>Para quem tem muito a preservar</p>
          </div>
          <p style={{ color: "#9CA3AF", fontFamily: "Inter, sans-serif", fontSize: "0.75rem" }}>© 2025 Carvalho Teixeira</p>
        </div>
      </footer>
    </>
  );
}
