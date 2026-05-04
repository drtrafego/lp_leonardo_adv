"use client";

import Image from "next/image";
import { Suspense } from "react";
import ContactForm from "@/components/ContactForm";

const checkGoldStyle: React.CSSProperties = {
  display: "inline-block",
  width: "16px",
  height: "16px",
  minWidth: "16px",
  backgroundImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24' fill='none' stroke='%23D4AF60' stroke-width='2' stroke-linecap='round' stroke-linejoin='round'%3E%3Cpolyline points='20 6 9 17 4 12'/%3E%3C/svg%3E")`,
  backgroundRepeat: "no-repeat",
  backgroundSize: "contain",
  marginTop: "3px",
  flexShrink: 0,
};

const tagStyle: React.CSSProperties = {
  display: "inline-block",
  border: "1px solid rgba(212,175,96,0.3)",
  color: "rgba(212,175,96,0.7)",
  fontFamily: "Inter, sans-serif",
  fontSize: "0.65rem",
  letterSpacing: "0.15em",
  textTransform: "uppercase",
  padding: "4px 12px",
};

export default function ModeloEditorialPage() {
  return (
    <>
      <style>{`
        html { scroll-behavior: smooth; }
        body { background-color: #072B31; color: #FFFFFF; font-family: 'Lato', sans-serif; }
        .font-serif { font-family: 'PT Serif', serif; }
        .section-mid { background-color: #0A3038; }
        .btn-outline-gold {
          border: 1px solid #C1C156;
          color: #C1C156;
          font-family: 'Lato', sans-serif;
          font-weight: 500;
          letter-spacing: 0.1em;
          transition: all 0.25s ease;
          background: transparent;
          text-decoration: none;
          display: inline-block;
        }
        .btn-outline-gold:hover { background-color: #C1C156; color: #072B31; }
        .btn-gold-solid {
          background-color: #C1C156;
          color: #072B31;
          font-family: 'Lato', sans-serif;
          font-weight: 600;
          letter-spacing: 0.1em;
          transition: background-color 0.2s ease;
          text-decoration: none;
          display: inline-block;
        }
        .btn-gold-solid:hover { background-color: #b8943e; }
        .number-giant {
          font-family: 'PT Serif', serif;
          font-weight: 300;
          color: transparent;
          -webkit-text-stroke: 1px rgba(212,175,96,0.25);
          line-height: 1;
          user-select: none;
          pointer-events: none;
        }
        .divider-thin-ed { border-top: 1px solid rgba(212,175,96,0.12); }
        .editorial-quote { border-left: 2px solid #C1C156; padding-left: 2rem; }
        .grid-editorial-ed {
          display: grid;
          grid-template-columns: 1fr;
          gap: 1px;
          background-color: rgba(212,175,96,0.1);
        }
        .grid-editorial-ed > * { background-color: #072B31; }
        @media (min-width: 768px) {
          .grid-editorial-ed { grid-template-columns: repeat(3, 1fr); }
        }
      `}</style>


      {/* HERO */}
      <section id="hero" style={{ minHeight: "100vh", display: "flex", flexDirection: "column", justifyContent: "flex-start", padding: "2rem 1.5rem", position: "relative", overflow: "hidden" }}>
        <div style={{ position: "absolute", inset: 0, pointerEvents: "none" }}>
          <div style={{ position: "absolute", top: "-10%", right: "-5%", width: "55%", height: "110%", background: "radial-gradient(ellipse at 80% 50%, rgba(212,175,96,0.04) 0%, transparent 55%)" }} />
          <div style={{ position: "absolute", bottom: 0, left: 0, right: 0, height: "1px", background: "linear-gradient(to right, transparent, rgba(212,175,96,0.3), transparent)" }} />
        </div>
        <div style={{ maxWidth: "56rem", margin: "0 auto", width: "100%", position: "relative", zIndex: 10, textAlign: "center" }}>
          <div style={{ display: "flex", alignItems: "center", justifyContent: "center", gap: "1rem", marginBottom: "2rem", flexWrap: "wrap" }}>
            <span style={tagStyle}>Advocacia Especializada</span>
            <span style={tagStyle}>Divórcio para Homens</span>
          </div>
          <h1 className="font-serif" style={{ fontWeight: 400, lineHeight: 1.1, marginBottom: "2rem", fontSize: "clamp(2.4rem, 6vw, 5rem)" }}>
            Divórcio para Homens:<br />
            <em style={{ color: "#C1C156", fontStyle: "normal" }}>Sem perder a convivência</em><br />
            <span style={{ color: "rgba(255,255,255,0.6)" }}>com seus filhos.</span>
          </h1>
          <div style={{ width: "80px", height: "1px", background: "rgba(193,193,86,0.4)", margin: "0 auto 2rem" }} />
          <p style={{ color: "rgba(255,255,255,0.55)", fontFamily: "Lato, sans-serif", fontWeight: 300, fontSize: "clamp(0.9rem, 2vw, 1.1rem)", lineHeight: 1.7, maxWidth: "42rem", margin: "0 auto 2rem" }}>
            Em uma sessão estratégica de 50 minutos, você terá um diagnóstico completo do seu caso, um plano jurídico personalizado e todas as suas dúvidas respondidas, antes de tomar qualquer decisão.
          </p>
          <div style={{ display: "flex", flexDirection: "row", gap: "1rem", alignItems: "center", justifyContent: "center", flexWrap: "wrap" }}>
            <a href="#cta-final" className="btn-gold-solid" style={{ padding: "1rem 2.5rem", fontSize: "0.75rem", textTransform: "uppercase", letterSpacing: "0.1em" }}>
              Quero Ser Atendido
            </a>
            <p style={{ color: "rgba(255,255,255,0.3)", fontSize: "0.75rem", fontFamily: "Lato, sans-serif", letterSpacing: "0.05em" }}>
              Online &nbsp;&bull;&nbsp; Vagas limitadas &nbsp;&bull;&nbsp; Confidencial
            </p>
          </div>
        </div>
      </section>

      {/* CREDENCIAIS */}
      <section id="credenciais" className="section-mid" style={{ padding: "2rem 1.5rem", position: "relative", overflow: "hidden" }}>
        <div style={{ position: "absolute", right: 0, top: 0, bottom: 0, display: "flex", alignItems: "center", paddingRight: "1rem", pointerEvents: "none", userSelect: "none" }} aria-hidden="true">
          <span className="number-giant" style={{ fontSize: "clamp(10rem, 22vw, 22rem)" }}>14</span>
        </div>
        <div style={{ maxWidth: "80rem", margin: "0 auto", position: "relative", zIndex: 10 }}>
          <div style={{ maxWidth: "40rem" }}>
            <span style={{ ...tagStyle, display: "inline-block", marginBottom: "2rem" }}>Credenciais</span>
            <h2 className="font-serif" style={{ fontWeight: 300, lineHeight: 1, marginBottom: "0.75rem", fontSize: "clamp(2.5rem, 5vw, 5rem)" }}>
              Dr. Leonardo Carvalho
            </h2>
            <p style={{ color: "#C1C156", fontFamily: "Inter, sans-serif", fontSize: "0.875rem", textTransform: "uppercase", letterSpacing: "0.15em", marginBottom: "2rem", fontWeight: 300 }}>
              14 anos de experiência em planejamento e proteção patrimonial
            </p>
            <ul style={{ display: "flex", flexDirection: "column", gap: 0, marginBottom: "1.5rem" }}>
              {[
                "Bacharel: Universidade do Estado do Rio de Janeiro (UERJ)",
                "Especialista: Fundação Getúlio Vargas (FGV)",
                "Mestrando: Universidade Gregoriana de Roma",
              ].map((item, i, arr) => (
                <li key={i} style={{
                  display: "flex", alignItems: "flex-start", gap: "16px",
                  color: "rgba(255,255,255,0.6)", fontSize: "0.875rem", fontFamily: "Inter, sans-serif", lineHeight: 1.6,
                  borderBottom: i < arr.length - 1 ? "1px solid rgba(255,255,255,0.05)" : "none",
                  paddingBottom: i < arr.length - 1 ? "20px" : 0,
                  marginBottom: i < arr.length - 1 ? "20px" : 0,
                }}>
                  <span style={checkGoldStyle} />
                  {item}
                </li>
              ))}
            </ul>
            <div className="editorial-quote">
              <p className="font-serif" style={{ fontSize: "1.25rem", fontWeight: 300, color: "rgba(255,255,255,0.8)", fontStyle: "italic", lineHeight: 1.6 }}>
                "Você não precisa atravessar esse momento no escuro e não precisa confiar sua situação a quem vai sumir depois da primeira conversa."
              </p>
            </div>
          </div>
        </div>
      </section>

      <div className="divider-thin-ed" style={{ maxWidth: "80rem", margin: "0 auto" }} />

      {/* DOR */}
      <section id="dor" style={{ padding: "2rem 1.5rem" }}>
        <div style={{ maxWidth: "80rem", margin: "0 auto" }}>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))", gap: "4rem" }}>
            <div>
              <span style={{ ...tagStyle, display: "inline-block", marginBottom: "2rem" }}>A realidade</span>
              <h2 className="font-serif" style={{ fontWeight: 300, lineHeight: 1.2, fontSize: "clamp(2rem, 4vw, 3.5rem)" }}>
                A verdade que poucos falam abertamente.
              </h2>
            </div>
            <div style={{ display: "flex", flexDirection: "column", justifyContent: "center", gap: "24px", color: "rgba(255,255,255,0.55)", fontFamily: "Inter, sans-serif", fontSize: "1rem", lineHeight: 1.7 }}>
              <p>
                O divórcio não é apenas o fim de um relacionamento. É um processo que redefine, na prática, sua relação com seus filhos e o destino do patrimônio que você construiu ao longo de anos.
              </p>
              <div style={{ border: "1px solid rgba(212,175,96,0.2)", padding: "1.5rem" }}>
                <p style={{ color: "rgba(255,255,255,0.8)", fontSize: "1.125rem", fontWeight: 300, lineHeight: 1.7, marginBottom: "0.75rem" }}>
                  44,6% das guardas são concedidas exclusivamente à mãe. E mesmo nos casos de guarda compartilhada, que hoje respondem por 44,6% dos divórcios, muitos pais relatam sentir que perderam presença e influência na vida dos filhos.
                </p>
                <p style={{ color: "rgba(212,175,96,0.5)", fontSize: "0.75rem", textTransform: "uppercase", letterSpacing: "0.15em" }}>Fonte: IBGE, 2024</p>
              </div>
              <p>
                Quando o processo começa sem estratégia, as consequências são difíceis de reverter. Decisões tomadas sob pressão, para "encerrar logo" e "ter paz", costumam cobrar um preço alto nos anos seguintes.
              </p>
              <p>
                Ao longo de 14 anos, acompanhei dezenas de casos em que isso aconteceu. Pais que passaram a conviver menos com os filhos do que gostariam. Homens que cederam mais patrimônio do que era necessário simplesmente por não terem orientação no momento certo.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* VIRADA */}
      <section id="virada" className="section-mid" style={{ padding: "2rem 1.5rem" }}>
        <div style={{ maxWidth: "80rem", margin: "0 auto" }}>
          <div style={{ marginBottom: "1.5rem" }}>
            <span style={{ ...tagStyle, display: "inline-block", marginBottom: "2rem" }}>A virada</span>
            <h2 className="font-serif" style={{ fontWeight: 300, lineHeight: 1.2, maxWidth: "64rem", fontSize: "clamp(2rem, 4.5vw, 4rem)" }}>
              É possível conduzir esse processo de forma diferente.
            </h2>
            <p style={{ color: "rgba(255,255,255,0.45)", fontFamily: "Inter, sans-serif", fontSize: "1rem", lineHeight: 1.7, maxWidth: "32rem", marginTop: "1.5rem" }}>
              Com um plano claro desde o primeiro movimento, com controle sobre cada decisão e com previsibilidade sobre o que vem pela frente, sem abrir mão da sua presença na vida dos seus filhos e sem comprometer o que você levou anos para construir.
            </p>
          </div>
          <div className="grid-editorial-ed" style={{ marginBottom: "1.5rem" }}>
            {[
              "Imagine manter uma convivência saudável com seus filhos, participando ativamente da vida deles, sem sentir que perdeu espaço, presença ou autoridade.",
              "Imagine atravessar o divórcio com seu patrimônio organizado, protegido e sob controle, sem surpresas e sem a sensação de que abdicou de mais do que deveria.",
              "Imagine passar por esse processo com clareza. Com a segurança de que cada decisão está sendo tomada com base estratégica, não em emoção ou pressão do momento.",
            ].map((text, i) => (
              <div key={i} style={{ padding: "1.5rem" }}>
                <div style={{ width: "24px", height: "1px", background: "#C1C156", marginBottom: "1rem" }} />
                <p className="font-serif" style={{ fontSize: "1.5rem", fontWeight: 300, lineHeight: 1.6, color: "rgba(255,255,255,0.85)" }}>
                  {text}
                </p>
              </div>
            ))}
          </div>
          <div className="divider-thin-ed" style={{ paddingTop: "2rem" }}>
            <p style={{ color: "#C1C156", fontFamily: "Inter, sans-serif", fontSize: "0.75rem", textTransform: "uppercase", letterSpacing: "0.15em", fontWeight: 300 }}>
              É exatamente isso que a consultoria estratégica foi desenhada para entregar.
            </p>
          </div>
        </div>
      </section>

      <div className="divider-thin-ed" style={{ maxWidth: "80rem", margin: "0 auto" }} />

      {/* COMO FUNCIONA */}
      <section id="como-funciona" style={{ padding: "2rem 1.5rem", position: "relative", overflow: "hidden" }}>
        <div style={{ position: "absolute", left: "-2rem", top: 0, bottom: 0, display: "flex", alignItems: "center", pointerEvents: "none", userSelect: "none" }} aria-hidden="true">
          <span className="number-giant" style={{ fontSize: "clamp(10rem, 20vw, 20rem)" }}>50</span>
        </div>
        <div style={{ maxWidth: "80rem", margin: "0 auto", position: "relative", zIndex: 10 }}>
          <div style={{ maxWidth: "40rem", marginLeft: "auto" }}>
            <span style={{ ...tagStyle, display: "inline-block", marginBottom: "2rem" }}>Como funciona</span>
            <h2 className="font-serif" style={{ fontWeight: 300, lineHeight: 1.2, marginBottom: "1rem", fontSize: "clamp(2rem, 4vw, 3.5rem)" }}>
              Não é uma consulta genérica.<br />
              <em style={{ fontStyle: "normal", color: "#C1C156" }}>É uma sessão estratégica estruturada.</em>
            </h2>
            <p style={{ color: "rgba(255,255,255,0.45)", fontFamily: "Inter, sans-serif", fontSize: "0.875rem", lineHeight: 1.7, marginBottom: "3rem" }}>
              Em 50 minutos de atendimento direto com o Dr. Leonardo Carvalho, você sai com clareza total sobre o seu caso, sem enrolação, sem respostas vagas, sem precisar marcar um segundo encontro para entender o que fazer.
            </p>
            <ul style={{ display: "flex", flexDirection: "column", gap: 0 }}>
              {[
                "Análise da sua estrutura familiar e da dinâmica de convivência com os filhos",
                "Mapeamento do seu patrimônio e identificação dos principais riscos",
                "Diagnóstico dos pontos sensíveis do seu caso específico",
                "Direcionamento claro sobre como conduzir o processo desde o início",
                "Definição de quais decisões tomar e quais evitar",
                "Estratégia para preservar sua convivência com os filhos e proteger o que você construiu",
                "Espaço para todas as suas dúvidas, respondidas com precisão, sem rodeios",
              ].map((item, i) => (
                <li key={i} style={{
                  display: "flex", alignItems: "flex-start", gap: "16px",
                  color: "rgba(255,255,255,0.6)", fontSize: "0.875rem", fontFamily: "Inter, sans-serif", lineHeight: 1.6,
                  borderBottom: "1px solid rgba(255,255,255,0.05)",
                  padding: "1rem 0",
                }}>
                  <span style={checkGoldStyle} />
                  {item}
                </li>
              ))}
            </ul>
            <div style={{ marginTop: "2rem", border: "1px solid rgba(212,175,96,0.3)", padding: "1.5rem" }}>
              <p className="font-serif" style={{ fontSize: "1.5rem", fontWeight: 300, color: "#FFFFFF" }}>
                Você não sai com dúvidas. Sai com um plano.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* DIFERENCIAL */}
      <section id="diferencial" className="section-mid" style={{ padding: "2rem 1.5rem" }}>
        <div style={{ maxWidth: "80rem", margin: "0 auto" }}>
          <span style={{ ...tagStyle, display: "inline-block", marginBottom: "2rem" }}>Diferencial</span>
          <h2 className="font-serif" style={{ fontWeight: 300, lineHeight: 1.2, maxWidth: "48rem", marginBottom: "1.5rem", fontSize: "clamp(2rem, 4.5vw, 4rem)" }}>
            O que diferencia esse atendimento do padrão de mercado.
          </h2>
          <p style={{ color: "rgba(255,255,255,0.45)", fontFamily: "Inter, sans-serif", fontSize: "1rem", lineHeight: 1.7, maxWidth: "32rem", marginBottom: "1rem" }}>
            No atendimento jurídico tradicional, você fala com o advogado no início. Depois passa a lidar com secretárias, respostas genéricas e pouca orientação estratégica.
          </p>
          <p style={{ color: "#C1C156", fontFamily: "Inter, sans-serif", fontSize: "0.75rem", textTransform: "uppercase", letterSpacing: "0.15em", marginBottom: "1.5rem" }}>Aqui é diferente</p>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))", gap: "1px", backgroundColor: "rgba(255,255,255,0.05)" }}>
            {[
              "Contato direto com o Dr. Leonardo Carvalho em cada etapa",
              "Retorno rápido e acesso facilitado ao longo de todo o processo",
              "Relatório periódico informando o andamento do caso",
              "Nível de especialização técnica acima da média, com formação nacional e internacional (FGV e Universidade Gregoriana de Roma)",
            ].map((text, i) => (
              <div key={i} style={{ backgroundColor: "#072B31", padding: "1.5rem", display: "flex", alignItems: "flex-start", gap: "24px" }}>
                <div style={{ width: "1px", height: "64px", background: "#C1C156", flexShrink: 0, marginTop: "4px" }} />
                <p style={{ color: "rgba(255,255,255,0.65)", fontFamily: "Inter, sans-serif", fontSize: "0.875rem", lineHeight: 1.6 }}>{text}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <div className="divider-thin-ed" style={{ maxWidth: "80rem", margin: "0 auto" }} />

      {/* ESCASSEZ */}
      <section id="escassez" style={{ padding: "2rem 1.5rem", position: "relative", overflow: "hidden" }}>
        <div style={{ position: "absolute", right: "-2rem", top: 0, bottom: 0, display: "flex", alignItems: "center", pointerEvents: "none", userSelect: "none" }} aria-hidden="true">
          <span className="number-giant" style={{ fontSize: "clamp(10rem, 20vw, 20rem)" }}>10</span>
        </div>
        <div style={{ maxWidth: "80rem", margin: "0 auto", position: "relative", zIndex: 10 }}>
          <div style={{ maxWidth: "40rem" }}>
            <span style={{ ...tagStyle, display: "inline-block", marginBottom: "2rem" }}>Disponibilidade</span>
            <h2 className="font-serif" style={{ fontWeight: 300, lineHeight: 1.2, marginBottom: "1.5rem", fontSize: "clamp(2rem, 4vw, 3.5rem)" }}>
              Atendimento por disponibilidade limitada.
            </h2>
            <div style={{ display: "flex", flexDirection: "column", gap: "20px", color: "rgba(255,255,255,0.55)", fontFamily: "Inter, sans-serif", fontSize: "1rem", lineHeight: 1.7 }}>
              <p>
                Para garantir análise individual e profundidade no diagnóstico, o número de atendimentos é intencionalmente limitado a <span style={{ color: "#C1C156", fontWeight: 500 }}>10 por semana</span>.
              </p>
              <p>
                Quando a agenda fecha, novos atendimentos são abertos apenas no mês seguinte.
              </p>
              <p>
                O processo começa com um contato inicial, nossa equipe vai entender o seu caso e, se fizer sentido para os dois lados, você recebe o convite para a sessão estratégica.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA FINAL */}
      <section id="cta-final" style={{ padding: "2.5rem 1.5rem", position: "relative", overflow: "hidden", background: "linear-gradient(135deg, #0A3038 0%, #072B31 60%, #0B2020 100%)" }}>
        <div style={{ position: "absolute", inset: 0, pointerEvents: "none", background: "radial-gradient(ellipse at 50% 50%, rgba(212,175,96,0.05) 0%, transparent 60%)" }} />
        <div style={{ maxWidth: "64rem", margin: "0 auto", textAlign: "center", position: "relative", zIndex: 10 }}>
          <div style={{ width: "64px", height: "1px", background: "#C1C156", margin: "0 auto 1.5rem" }} />
          <h2 className="font-serif" style={{ fontWeight: 300, lineHeight: 1, marginBottom: "1.25rem", fontSize: "clamp(2.5rem, 6vw, 5.5rem)", letterSpacing: "-0.02em" }}>
            Se você chegou até aqui,<br />
            <em style={{ fontStyle: "normal", color: "#C1C156" }}>entendeu o que está em jogo.</em>
          </h2>
          <p style={{ color: "rgba(255,255,255,0.45)", fontFamily: "Inter, sans-serif", fontSize: "1rem", lineHeight: 1.7, maxWidth: "32rem", margin: "0 auto 2rem" }}>
            A pergunta agora é simples: você vai tomar essa decisão com estratégia, ou no improviso?
          </p>
          <div style={{ display: "flex", justifyContent: "center" }}>
            <Suspense>
              <ContactForm theme="editorial" />
            </Suspense>
          </div>
        </div>
      </section>

      {/* FOOTER */}
      <footer style={{ padding: "1.5rem 1.5rem", borderTop: "1px solid rgba(255,255,255,0.05)" }}>
        <div style={{ maxWidth: "80rem", margin: "0 auto", display: "flex", flexDirection: "row", alignItems: "center", justifyContent: "space-between", flexWrap: "wrap", gap: "1.5rem" }}>
          <div style={{ display: "flex", flexDirection: "column", alignItems: "flex-start", gap: "12px" }}>
            <Image src="/Monograma.png" alt="CT" width={52} height={52} style={{ mixBlendMode: "screen", opacity: 0.85 }} />
            <p className="font-serif" style={{ color: "rgba(212,175,96,0.5)", fontSize: "0.875rem", fontStyle: "italic" }}>Para quem tem muito a preservar</p>
          </div>
          <p style={{ color: "rgba(255,255,255,0.2)", fontFamily: "Inter, sans-serif", fontSize: "0.75rem" }}>© 2025 Carvalho Teixeira</p>
        </div>
      </footer>
    </>
  );
}
