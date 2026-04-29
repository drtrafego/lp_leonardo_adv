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

const goldLine: React.CSSProperties = {
  width: "60px",
  height: "1px",
  backgroundColor: "#C9A452",
  display: "block",
};

const goldLineLong: React.CSSProperties = {
  width: "120px",
  height: "1px",
  backgroundColor: "#C9A452",
  display: "block",
};

export default function ModeloDarkPage() {
  return (
    <>
      <style>{`
        html { scroll-behavior: smooth; }
        body { background-color: #0B2828; color: #F5F0E8; font-family: 'Inter', sans-serif; }
        .font-serif { font-family: 'Cormorant Garamond', serif; }
        .divider-gold { border-top: 1px solid rgba(201,164,82,0.3); }
        .btn-gold {
          background-color: #C9A452;
          color: #0B2828;
          font-family: 'Inter', sans-serif;
          font-weight: 600;
          letter-spacing: 0.05em;
          transition: background-color 0.2s ease;
          text-decoration: none;
          display: inline-block;
        }
        .btn-gold:hover { background-color: #a8893a; }
        .section-alt { background-color: #0D3030; }
        .card-virada {
          border: 1px solid rgba(201,164,82,0.2);
          padding: 2rem;
          transition: border-color 0.3s;
        }
        .card-virada:hover { border-color: rgba(201,164,82,0.5); }
      `}</style>

      {/* NAVBAR */}
      <nav style={{
        position: "fixed", top: 0, left: 0, right: 0, zIndex: 50,
        backgroundColor: "rgba(11,40,40,0.95)",
        backdropFilter: "blur(4px)",
        borderBottom: "1px solid rgba(201,164,82,0.1)",
      }}>
        <div style={{ maxWidth: "72rem", margin: "0 auto", padding: "1rem 1.5rem", display: "flex", alignItems: "center", justifyContent: "space-between" }}>
          <div style={{ display: "flex", alignItems: "center", gap: "12px" }}>
            <span className="font-serif" style={{ fontSize: "1.65rem", color: "#C9A452", letterSpacing: "0.04em", lineHeight: 1 }}>CT</span>
            <div style={{ width: "1px", height: "28px", background: "rgba(201,164,82,0.35)" }} />
            <div>
              <div className="font-serif" style={{ fontSize: "0.68rem", letterSpacing: "0.22em", color: "#C9A452", lineHeight: 1.3 }}>CARVALHO TEIXEIRA</div>
              <div style={{ fontFamily: "Inter, sans-serif", fontSize: "0.5rem", letterSpacing: "0.16em", color: "rgba(201,164,82,0.55)", lineHeight: 1.4 }}>PARA QUEM TEM MUITO A PRESERVAR</div>
            </div>
          </div>
          <a href="#cta-final" className="btn-gold" style={{ padding: "0.625rem 1.5rem", fontSize: "0.875rem", textTransform: "uppercase", letterSpacing: "0.1em" }}>
            Quero Ser Atendido
          </a>
        </div>
      </nav>

      {/* HERO */}
      <section id="hero" style={{
        minHeight: "100vh", display: "flex", flexDirection: "column",
        alignItems: "center", justifyContent: "center",
        textAlign: "center", padding: "6rem 1.5rem 3rem",
        position: "relative",
      }}>
        <div style={{
          position: "absolute", inset: 0, pointerEvents: "none",
          background: "radial-gradient(ellipse at 50% 0%, rgba(201,164,82,0.06) 0%, transparent 60%)",
        }} />
        <div style={{ maxWidth: "56rem", margin: "0 auto", position: "relative", zIndex: 10 }}>
          <h1 className="font-serif" style={{
            fontSize: "clamp(2.2rem, 6vw, 4.5rem)", fontWeight: 300,
            lineHeight: 1.2, color: "#F5F0E8", marginBottom: "1.5rem",
          }}>
            Divórcio para Homens:<br />
            <span style={{ color: "#C9A452", fontWeight: 600 }}>Sem perder a convivência com seus filhos.</span><br />
            Sem ceder mais patrimônio do que você deve.
          </h1>
          <span style={{ ...goldLine, margin: "0 auto 2rem" }} />
          <p style={{
            color: "rgba(245,240,232,0.7)", fontSize: "clamp(0.9rem, 2vw, 1.125rem)",
            lineHeight: 1.7, maxWidth: "40rem", margin: "0 auto 2.5rem",
            fontFamily: "Inter, sans-serif",
          }}>
            Em uma sessão estratégica de 50 minutos, você terá um diagnóstico completo do seu caso, um plano jurídico personalizado e todas as suas dúvidas respondidas, antes de tomar qualquer decisão.
          </p>
          <ul style={{ textAlign: "left", display: "inline-flex", flexDirection: "column", gap: "12px", marginBottom: "3rem" }}>
            {[
              "Plano de ação claro para defender sua convivência com os filhos desde o início do processo",
              "Mapeamento dos riscos patrimoniais e medidas para evitar perdas desnecessárias",
              "Controle e previsibilidade em cada etapa do processo",
              "Contato direto com advogado especialista, sem intermediários, sem sumiço",
            ].map((item, i) => (
              <li key={i} style={{ display: "flex", alignItems: "flex-start", gap: "12px", color: "rgba(245,240,232,0.8)", fontSize: "clamp(0.85rem, 2vw, 1rem)", fontFamily: "Inter, sans-serif" }}>
                <span style={checkItemStyle} />
                {item}
              </li>
            ))}
          </ul>
          <a href="#cta-final" className="btn-gold" style={{ padding: "1rem 2.5rem", fontSize: "0.875rem", textTransform: "uppercase", letterSpacing: "0.1em", marginBottom: "1rem" }}>
            Quero Ser Atendido
          </a>
          <p style={{ color: "rgba(245,240,232,0.4)", fontSize: "0.75rem", fontFamily: "Inter, sans-serif", letterSpacing: "0.05em", marginTop: "0.5rem" }}>
            Atendimento online &nbsp;|&nbsp; Vagas limitadas por semana &nbsp;|&nbsp; Processo confidencial
          </p>
        </div>
      </section>

      <div className="divider-gold" style={{ maxWidth: "72rem", margin: "0 auto" }} />

      {/* CREDENCIAIS */}
      <section id="credenciais" className="section-alt" style={{ padding: "3.5rem 1.5rem" }}>
        <div style={{ maxWidth: "64rem", margin: "0 auto" }}>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))", gap: "4rem", alignItems: "center" }}>
            <div>
              <span style={{ ...goldLine, marginBottom: "1.5rem" }} />
              <h2 className="font-serif" style={{ fontSize: "clamp(2rem, 4vw, 3rem)", fontWeight: 300, color: "#F5F0E8", marginBottom: "0.75rem" }}>Dr. Leonardo Carvalho</h2>
              <p style={{ color: "#C9A452", fontFamily: "Inter, sans-serif", fontSize: "0.75rem", textTransform: "uppercase", letterSpacing: "0.15em", marginBottom: "2rem" }}>
                Advogado especialista em divórcio para homens
              </p>
              <p style={{ color: "rgba(245,240,232,0.7)", fontFamily: "Inter, sans-serif", fontSize: "1rem", lineHeight: 1.7, marginBottom: "2rem" }}>
                Advogado com 14 anos de experiência em planejamento e proteção patrimonial.
              </p>
              <ul style={{ display: "flex", flexDirection: "column", gap: "16px" }}>
                {[
                  "Bacharel: Universidade do Estado do Rio de Janeiro (UERJ)",
                  "Especialista: Fundação Getúlio Vargas (FGV)",
                  "Mestrando: Universidade Gregoriana de Roma",
                ].map((item, i) => (
                  <li key={i} style={{ display: "flex", alignItems: "flex-start", gap: "12px", color: "rgba(245,240,232,0.8)", fontSize: "0.875rem", fontFamily: "Inter, sans-serif" }}>
                    <span style={checkItemStyle} />
                    {item}
                  </li>
                ))}
              </ul>
            </div>
            <div style={{ border: "1px solid rgba(201,164,82,0.2)", padding: "2.5rem" }}>
              <p className="font-serif" style={{ fontSize: "clamp(1.2rem, 3vw, 1.75rem)", fontWeight: 300, color: "rgba(245,240,232,0.9)", lineHeight: 1.6, fontStyle: "italic" }}>
                "Você não precisa atravessar esse momento no escuro e não precisa confiar sua situação a quem vai sumir depois da primeira conversa."
              </p>
              <span style={{ ...goldLine, marginTop: "2rem" }} />
            </div>
          </div>
        </div>
      </section>

      <div className="divider-gold" style={{ maxWidth: "72rem", margin: "0 auto" }} />

      {/* DOR */}
      <section id="dor" style={{ padding: "3.5rem 1.5rem" }}>
        <div style={{ maxWidth: "48rem", margin: "0 auto" }}>
          <span style={{ ...goldLine, marginBottom: "1.5rem" }} />
          <h2 className="font-serif" style={{ fontSize: "clamp(2rem, 4vw, 3rem)", fontWeight: 300, color: "#F5F0E8", marginBottom: "2rem", lineHeight: 1.2 }}>
            A verdade que poucos falam abertamente.
          </h2>
          <div style={{ display: "flex", flexDirection: "column", gap: "20px", color: "rgba(245,240,232,0.7)", fontFamily: "Inter, sans-serif", fontSize: "1rem", lineHeight: 1.7 }}>
            <p>
              O divórcio não é apenas o fim de um relacionamento. É um processo que redefine, na prática, sua relação com seus filhos e o destino do patrimônio que você construiu ao longo de anos.
            </p>
            <div style={{ borderLeft: "2px solid #C9A452", paddingLeft: "1.5rem", margin: "1rem 0" }}>
              <p style={{ color: "rgba(245,240,232,0.9)", fontSize: "1.125rem", lineHeight: 1.7 }}>
                44,6% das guardas são concedidas exclusivamente à mãe. E mesmo nos casos de guarda compartilhada, que hoje respondem por 44,6% dos divórcios, muitos pais relatam sentir que perderam presença e influência na vida dos filhos.
              </p>
              <p style={{ color: "rgba(201,164,82,0.6)", fontSize: "0.75rem", textTransform: "uppercase", letterSpacing: "0.15em", marginTop: "0.75rem" }}>Fonte: IBGE, 2024</p>
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

      <div className="divider-gold" style={{ maxWidth: "72rem", margin: "0 auto" }} />

      {/* VIRADA */}
      <section id="virada" className="section-alt" style={{ padding: "3.5rem 1.5rem" }}>
        <div style={{ maxWidth: "64rem", margin: "0 auto" }}>
          <span style={{ ...goldLine, marginBottom: "1.5rem" }} />
          <h2 className="font-serif" style={{ fontSize: "clamp(2rem, 4vw, 3rem)", fontWeight: 300, color: "#F5F0E8", marginBottom: "1.5rem", lineHeight: 1.2 }}>
            É possível conduzir esse processo de forma diferente.
          </h2>
          <p style={{ color: "rgba(245,240,232,0.7)", fontFamily: "Inter, sans-serif", fontSize: "1rem", lineHeight: 1.7, maxWidth: "48rem", marginBottom: "2rem" }}>
            Com um plano claro desde o primeiro movimento, com controle sobre cada decisão e com previsibilidade sobre o que vem pela frente, sem abrir mão da sua presença na vida dos seus filhos e sem comprometer o que você levou anos para construir.
          </p>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(240px, 1fr))", gap: "1.5rem", marginBottom: "2rem" }}>
            {[
              "Imagine manter uma convivência saudável com seus filhos, participando ativamente da vida deles, sem sentir que perdeu espaço, presença ou autoridade.",
              "Imagine atravessar o divórcio com seu patrimônio organizado, protegido e sob controle, sem surpresas e sem a sensação de que abdicou de mais do que deveria.",
              "Imagine passar por esse processo com clareza. Com a segurança de que cada decisão está sendo tomada com base estratégica, não em emoção ou pressão do momento.",
            ].map((text, i) => (
              <div key={i} className="card-virada">
                <div style={{ width: "32px", height: "1px", background: "#C9A452", marginBottom: "1.5rem" }} />
                <p className="font-serif" style={{ fontSize: "1.25rem", fontWeight: 300, color: "rgba(245,240,232,0.9)", lineHeight: 1.6 }}>
                  {text}
                </p>
              </div>
            ))}
          </div>
          <div style={{ borderTop: "1px solid rgba(201,164,82,0.2)", paddingTop: "2rem" }}>
            <p style={{ color: "#C9A452", fontFamily: "Inter, sans-serif", fontSize: "0.75rem", textTransform: "uppercase", letterSpacing: "0.15em" }}>
              É exatamente isso que a consultoria estratégica foi desenhada para entregar.
            </p>
          </div>
        </div>
      </section>

      <div className="divider-gold" style={{ maxWidth: "72rem", margin: "0 auto" }} />

      {/* COMO FUNCIONA */}
      <section id="como-funciona" style={{ padding: "3.5rem 1.5rem" }}>
        <div style={{ maxWidth: "56rem", margin: "0 auto" }}>
          <span style={{ ...goldLine, marginBottom: "1.5rem" }} />
          <h2 className="font-serif" style={{ fontSize: "clamp(2rem, 4vw, 3rem)", fontWeight: 300, color: "#F5F0E8", marginBottom: "1rem", lineHeight: 1.2 }}>
            Não é uma consulta genérica.<br />É uma sessão estratégica estruturada.
          </h2>
          <p style={{ color: "rgba(245,240,232,0.7)", fontFamily: "Inter, sans-serif", fontSize: "1rem", lineHeight: 1.7, maxWidth: "36rem", marginBottom: "2rem" }}>
            Em 50 minutos de atendimento direto com o Dr. Leonardo Carvalho, você sai com clareza total sobre o seu caso, sem enrolação, sem respostas vagas, sem precisar marcar um segundo encontro para entender o que fazer.
          </p>
          <ul style={{ display: "flex", flexDirection: "column", gap: 0, marginBottom: "3rem" }}>
            {[
              "Análise da sua estrutura familiar e da dinâmica de convivência com os filhos",
              "Mapeamento do seu patrimônio e identificação dos principais riscos",
              "Diagnóstico dos pontos sensíveis do seu caso específico",
              "Direcionamento claro sobre como conduzir o processo desde o início",
              "Definição de quais decisões tomar e quais evitar",
              "Estratégia para preservar sua convivência com os filhos e proteger o que você construiu",
              "Espaço para todas as suas dúvidas, respondidas com precisão, sem rodeios",
            ].map((item, i, arr) => (
              <li key={i} style={{
                display: "flex", alignItems: "flex-start", gap: "16px",
                color: "rgba(245,240,232,0.8)", fontFamily: "Inter, sans-serif", fontSize: "1rem",
                borderBottom: i < arr.length - 1 ? "1px solid rgba(201,164,82,0.1)" : "none",
                padding: "1.25rem 0",
              }}>
                <span style={checkItemStyle} />
                {item}
              </li>
            ))}
          </ul>
          <div style={{ backgroundColor: "rgba(201,164,82,0.1)", border: "1px solid rgba(201,164,82,0.3)", padding: "2rem" }}>
            <p className="font-serif" style={{ fontSize: "1.5rem", color: "#F5F0E8", fontWeight: 300 }}>
              Você não sai com dúvidas. Sai com um plano.
            </p>
          </div>
        </div>
      </section>

      <div className="divider-gold" style={{ maxWidth: "72rem", margin: "0 auto" }} />

      {/* DIFERENCIAL */}
      <section id="diferencial" className="section-alt" style={{ padding: "3.5rem 1.5rem" }}>
        <div style={{ maxWidth: "64rem", margin: "0 auto" }}>
          <span style={{ ...goldLine, marginBottom: "1.5rem" }} />
          <h2 className="font-serif" style={{ fontSize: "clamp(2rem, 4vw, 3rem)", fontWeight: 300, color: "#F5F0E8", marginBottom: "1.5rem", lineHeight: 1.2 }}>
            O que diferencia esse atendimento do padrão de mercado.
          </h2>
          <p style={{ color: "rgba(245,240,232,0.7)", fontFamily: "Inter, sans-serif", fontSize: "1rem", lineHeight: 1.7, maxWidth: "48rem", marginBottom: "3rem" }}>
            No atendimento jurídico tradicional, você fala com o advogado no início. Depois passa a lidar com secretárias, respostas genéricas e pouca orientação estratégica.
          </p>
          <div style={{ marginBottom: "1.5rem" }}>
            <p style={{ color: "#C9A452", fontFamily: "Inter, sans-serif", fontSize: "0.75rem", textTransform: "uppercase", letterSpacing: "0.15em", marginBottom: "2rem" }}>Aqui é diferente</p>
            <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(240px, 1fr))", gap: "1.5rem" }}>
              {[
                "Contato direto com o Dr. Leonardo Carvalho em cada etapa",
                "Retorno rápido e acesso facilitado ao longo de todo o processo",
                "Relatório periódico informando o andamento do caso",
                "Nível de especialização técnica acima da média, com formação nacional e internacional (FGV e Universidade Gregoriana de Roma)",
              ].map((text, i) => (
                <div key={i} style={{ display: "flex", alignItems: "flex-start", gap: "16px" }}>
                  <div style={{ width: "1px", height: "48px", background: "#C9A452", flexShrink: 0, marginTop: "4px" }} />
                  <p style={{ color: "rgba(245,240,232,0.8)", fontFamily: "Inter, sans-serif", fontSize: "1rem", lineHeight: 1.7 }}>
                    {text}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      <div className="divider-gold" style={{ maxWidth: "72rem", margin: "0 auto" }} />

      {/* ESCASSEZ */}
      <section id="escassez" style={{ padding: "3.5rem 1.5rem" }}>
        <div style={{ maxWidth: "48rem", margin: "0 auto", textAlign: "center" }}>
          <span style={{ ...goldLine, margin: "0 auto 1.5rem" }} />
          <h2 className="font-serif" style={{ fontSize: "clamp(2rem, 4vw, 3rem)", fontWeight: 300, color: "#F5F0E8", marginBottom: "1.5rem", lineHeight: 1.2 }}>
            Atendimento por disponibilidade limitada.
          </h2>
          <div style={{ display: "flex", flexDirection: "column", gap: "20px", color: "rgba(245,240,232,0.7)", fontFamily: "Inter, sans-serif", fontSize: "1rem", lineHeight: 1.7 }}>
            <p>
              Para garantir análise individual e profundidade no diagnóstico, o número de atendimentos é intencionalmente limitado a <span style={{ color: "#C9A452", fontWeight: 600 }}>10 por semana</span>.
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

      <div className="divider-gold" style={{ maxWidth: "72rem", margin: "0 auto" }} />

      {/* CTA FINAL */}
      <section id="cta-final" className="section-alt" style={{ padding: "4rem 1.5rem" }}>
        <div style={{ maxWidth: "48rem", margin: "0 auto", textAlign: "center" }}>
          <span style={{ ...goldLine, margin: "0 auto 2rem" }} />
          <h2 className="font-serif" style={{ fontSize: "clamp(2.2rem, 6vw, 4rem)", fontWeight: 300, color: "#F5F0E8", marginBottom: "1.5rem", lineHeight: 1.2 }}>
            Se você chegou até aqui,<br />
            entendeu o que está em jogo.
          </h2>
          <p style={{ color: "rgba(245,240,232,0.7)", fontFamily: "Inter, sans-serif", fontSize: "1rem", lineHeight: 1.7, marginBottom: "3rem" }}>
            A pergunta agora é simples: você vai tomar essa decisão com estratégia, ou no improviso?
          </p>
          <div style={{ display: "flex", justifyContent: "center" }}>
            <Suspense>
              <ContactForm theme="dark" />
            </Suspense>
          </div>
        </div>
      </section>

      {/* FOOTER */}
      <footer style={{ padding: "3rem 1.5rem", borderTop: "1px solid rgba(201,164,82,0.1)" }}>
        <div style={{ maxWidth: "72rem", margin: "0 auto", display: "flex", flexDirection: "row", alignItems: "center", justifyContent: "space-between", flexWrap: "wrap", gap: "1.5rem" }}>
          <div style={{ display: "flex", flexDirection: "column", alignItems: "flex-start", gap: "12px" }}>
            <Image src="/Monograma.png" alt="CT" width={56} height={56} style={{ mixBlendMode: "screen", opacity: 0.9 }} />
            <p className="font-serif" style={{ color: "rgba(201,164,82,0.7)", fontSize: "0.875rem", fontStyle: "italic" }}>Para quem tem muito a preservar</p>
          </div>
          <p style={{ color: "rgba(245,240,232,0.3)", fontFamily: "Inter, sans-serif", fontSize: "0.75rem" }}>© 2025 Carvalho Teixeira</p>
        </div>
      </footer>
    </>
  );
}
