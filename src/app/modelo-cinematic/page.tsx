"use client";

import Image from "next/image";
import { Suspense, useRef, useEffect, useState } from "react";
import { motion, useInView, useScroll, useTransform, AnimatePresence } from "framer-motion";
import ContactForm from "@/components/ContactForm";

const checkItemStyle: React.CSSProperties = {
  display: "inline-block",
  width: "18px",
  height: "18px",
  minWidth: "18px",
  backgroundImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24' fill='none' stroke='%23072B31' stroke-width='2.5' stroke-linecap='round' stroke-linejoin='round'%3E%3Cpolyline points='20 6 9 17 4 12'/%3E%3C/svg%3E")`,
  backgroundRepeat: "no-repeat",
  backgroundSize: "contain",
  marginTop: "2px",
  flexShrink: 0,
};

function useCounter(target: number, duration = 1.5, inView: boolean) {
  const [count, setCount] = useState(0);
  useEffect(() => {
    if (!inView) return;
    let start = 0;
    const step = target / (duration * 60);
    const timer = setInterval(() => {
      start += step;
      if (start >= target) { setCount(target); clearInterval(timer); }
      else setCount(Math.floor(start));
    }, 1000 / 60);
    return () => clearInterval(timer);
  }, [inView, target, duration]);
  return count;
}

function StatCard({ number, suffix, label, delay }: { number: number; suffix: string; label: string; delay: number }) {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-60px" });
  const count = useCounter(number, 1.8, inView);
  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 32 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.7, delay, ease: [0.25, 0.1, 0.25, 1] }}
      style={{ textAlign: "center", padding: "2rem 1.5rem", backgroundColor: "#FFFFFF", border: "1px solid #E8E2D6" }}
    >
      <p style={{ fontFamily: "PT Serif, serif", fontSize: "clamp(2.5rem, 5vw, 3.5rem)", fontWeight: 700, color: "#072B31", lineHeight: 1, marginBottom: "0.5rem" }}>
        {count}{suffix}
      </p>
      <p style={{ fontFamily: "Inter, sans-serif", fontSize: "0.8rem", color: "#6B6B6B", textTransform: "uppercase", letterSpacing: "0.1em" }}>{label}</p>
    </motion.div>
  );
}

function RevealSection({ children, from = "bottom" }: { children: React.ReactNode; from?: "bottom" | "left" | "right" }) {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });
  const variants = {
    bottom: { hidden: { opacity: 0, y: 48 }, visible: { opacity: 1, y: 0 } },
    left:   { hidden: { opacity: 0, x: -64 }, visible: { opacity: 1, x: 0 } },
    right:  { hidden: { opacity: 0, x: 64 },  visible: { opacity: 1, x: 0 } },
  };
  return (
    <motion.div
      ref={ref}
      variants={variants[from]}
      initial="hidden"
      animate={inView ? "visible" : "hidden"}
      transition={{ duration: 0.85, ease: [0.16, 1, 0.3, 1] }}
    >
      {children}
    </motion.div>
  );
}

function SplitWords({ text, className, style }: { text: string; className?: string; style?: React.CSSProperties }) {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-60px" });
  const words = text.split(" ");
  return (
    <span ref={ref} className={className} style={{ ...style, display: "inline" }}>
      {words.map((word, i) => (
        <motion.span
          key={i}
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5, delay: i * 0.06, ease: [0.25, 0.1, 0.25, 1] }}
          style={{ display: "inline-block", marginRight: "0.25em" }}
        >
          {word}
        </motion.span>
      ))}
    </span>
  );
}

function HeroSection() {
  const ref = useRef(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start start", "end start"] });
  const bgY = useTransform(scrollYProgress, [0, 1], ["0%", "15%"]);
  const textOpacity = useTransform(scrollYProgress, [0, 0.6], [1, 0]);

  return (
    <section ref={ref} id="hero" style={{
      minHeight: "100vh", display: "flex", flexDirection: "column",
      alignItems: "center", justifyContent: "center",
      textAlign: "center", padding: "3rem 1.5rem",
      position: "relative", overflow: "hidden",
      backgroundColor: "#F9F6F1",
    }}>
      <motion.div
        style={{ y: bgY, position: "absolute", inset: "-20%", pointerEvents: "none" }}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1 }}
      >
        <div style={{
          position: "absolute", inset: 0,
          background: "radial-gradient(ellipse at 30% 50%, rgba(193,193,86,0.12) 0%, transparent 60%), radial-gradient(ellipse at 70% 20%, rgba(7,43,49,0.06) 0%, transparent 50%)",
        }} />
      </motion.div>

      <motion.div style={{ opacity: textOpacity, position: "relative", zIndex: 10, maxWidth: "60rem", margin: "0 auto" }}>
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
          style={{ marginBottom: "2rem" }}
        >
          <Image src="/Monograma.png" alt="CT" width={52} height={52} style={{ margin: "0 auto", opacity: 0.6 }} />
        </motion.div>

        <motion.div
          initial={{ opacity: 0, scaleX: 0 }}
          animate={{ opacity: 1, scaleX: 1 }}
          transition={{ duration: 0.6, delay: 0.4 }}
          style={{ width: "48px", height: "2px", backgroundColor: "#C1C156", margin: "0 auto 1.5rem", transformOrigin: "left" }}
        />

        <h1 className="font-serif" style={{
          fontSize: "clamp(2.2rem, 6vw, 4.8rem)", fontWeight: 400,
          lineHeight: 1.15, color: "#1A1A1A", marginBottom: "1.5rem",
        }}>
          <motion.span
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.5, ease: [0.16, 1, 0.3, 1] }}
            style={{ display: "block" }}
          >
            Divórcio para Homens:
          </motion.span>
          <motion.span
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.7, ease: [0.16, 1, 0.3, 1] }}
            style={{ display: "block", color: "#072B31", fontWeight: 700 }}
          >
            Sem perder a convivência<br />com seus filhos.
          </motion.span>
          <motion.span
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.9, ease: [0.16, 1, 0.3, 1] }}
            style={{ display: "block", fontSize: "0.65em", fontWeight: 300, color: "#4A4A4A" }}
          >
            Sem ceder mais patrimônio do que você deve.
          </motion.span>
        </h1>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 1.1 }}
          style={{ color: "#5A5A5A", fontSize: "clamp(0.9rem, 2vw, 1.125rem)", lineHeight: 1.7, maxWidth: "40rem", margin: "0 auto 2.5rem", fontFamily: "Inter, sans-serif" }}
        >
          Em uma sessão estratégica de 50 minutos, você terá um diagnóstico completo do seu caso, um plano jurídico personalizado e todas as suas dúvidas respondidas, antes de tomar qualquer decisão.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 1.3 }}
          style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: "1rem" }}
        >
          <a href="#cta-final" style={{
            backgroundColor: "#072B31", color: "#FFFFFF",
            fontFamily: "Lato, sans-serif", fontWeight: 600,
            fontSize: "0.875rem", textTransform: "uppercase", letterSpacing: "0.1em",
            padding: "1rem 2.5rem", textDecoration: "none", display: "inline-block",
            transition: "background-color 0.2s ease, transform 0.2s ease, box-shadow 0.2s ease",
          }}
            onMouseEnter={e => { (e.currentTarget as HTMLElement).style.backgroundColor = "#C1C156"; (e.currentTarget as HTMLElement).style.color = "#072B31"; (e.currentTarget as HTMLElement).style.transform = "translateY(-2px)"; (e.currentTarget as HTMLElement).style.boxShadow = "0 8px 24px rgba(7,43,49,0.2)"; }}
            onMouseLeave={e => { (e.currentTarget as HTMLElement).style.backgroundColor = "#072B31"; (e.currentTarget as HTMLElement).style.color = "#FFFFFF"; (e.currentTarget as HTMLElement).style.transform = ""; (e.currentTarget as HTMLElement).style.boxShadow = ""; }}
          >
            Quero Ser Atendido
          </a>
          <p style={{ color: "#9A9A9A", fontSize: "0.75rem", fontFamily: "Inter, sans-serif", letterSpacing: "0.05em" }}>
            Atendimento online &nbsp;|&nbsp; Vagas limitadas por semana &nbsp;|&nbsp; Processo confidencial
          </p>
        </motion.div>
      </motion.div>

      <motion.div
        animate={{ y: [0, 8, 0] }}
        transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
        style={{ position: "absolute", bottom: "2rem", left: "50%", transform: "translateX(-50%)" }}
      >
        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="rgba(7,43,49,0.3)" strokeWidth="1.5">
          <polyline points="6 9 12 15 18 9" />
        </svg>
      </motion.div>
    </section>
  );
}

export default function ModeloCinematicPage() {
  return (
    <>
      <style>{`
        html { scroll-behavior: smooth; }
        body { background-color: #F9F6F1; color: #1A1A1A; font-family: 'Lato', sans-serif; }
        .font-serif { font-family: 'PT Serif', serif; }
        .section-white { background-color: #FFFFFF; }
        .section-teal { background-color: #072B31; }
        .divider-light { border-top: 1px solid #E8E2D6; }
        .card-cinematic {
          border: 1px solid #E8E2D6;
          padding: 2rem;
          background: #FFFFFF;
          transition: border-color 0.3s, transform 0.4s cubic-bezier(0.16, 1, 0.3, 1), box-shadow 0.4s;
          cursor: default;
        }
        .card-cinematic:hover {
          border-color: #C1C156;
          transform: translateY(-6px) scale(1.01);
          box-shadow: 0 20px 48px rgba(0,0,0,0.1);
        }
        .check-dark {
          display: inline-block;
          width: 18px; height: 18px; min-width: 18px;
          background-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24' fill='none' stroke='%23072B31' stroke-width='2.5' stroke-linecap='round' stroke-linejoin='round'%3E%3Cpolyline points='20 6 9 17 4 12'/%3E%3C/svg%3E");
          background-repeat: no-repeat;
          background-size: contain;
          margin-top: 2px;
          flex-shrink: 0;
        }
      `}</style>

      <HeroSection />

      {/* STATS */}
      <section style={{ padding: "1.5rem 1.5rem", backgroundColor: "#FFFFFF", borderTop: "1px solid #E8E2D6" }}>
        <div style={{ maxWidth: "64rem", margin: "0 auto" }}>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(180px, 1fr))", gap: "1.5rem" }}>
            <StatCard number={14} suffix=" anos" label="de experiência" delay={0} />
            <StatCard number={50} suffix=" min" label="sessão estratégica" delay={0.1} />
            <StatCard number={10} suffix="" label="vagas por semana" delay={0.2} />
          </div>
        </div>
      </section>

      <div className="divider-light" />

      {/* CREDENCIAIS */}
      <section id="credenciais" style={{ padding: "2rem 1.5rem", backgroundColor: "#F9F6F1" }}>
        <div style={{ maxWidth: "64rem", margin: "0 auto" }}>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))", gap: "4rem", alignItems: "center" }}>
            <RevealSection from="left">
              <div>
                <motion.span
                  initial={{ width: 0 }}
                  whileInView={{ width: "48px" }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.6 }}
                  style={{ height: "3px", backgroundColor: "#C1C156", display: "block", marginBottom: "1.5rem" }}
                />
                <h2 className="font-serif" style={{ fontSize: "clamp(2rem, 4vw, 3rem)", fontWeight: 400, color: "#1A1A1A", marginBottom: "0.75rem" }}>Dr. Leonardo Carvalho</h2>
                <p style={{ color: "#072B31", fontFamily: "Inter, sans-serif", fontSize: "0.75rem", textTransform: "uppercase", letterSpacing: "0.15em", marginBottom: "2rem" }}>
                  Advogado especialista em divórcio para homens
                </p>
                <p style={{ color: "#5A5A5A", fontFamily: "Inter, sans-serif", fontSize: "1rem", lineHeight: 1.7, marginBottom: "2rem" }}>
                  Advogado com 14 anos de experiência em planejamento e proteção patrimonial.
                </p>
                <ul style={{ display: "flex", flexDirection: "column", gap: "12px" }}>
                  {[
                    "Bacharel: Universidade do Estado do Rio de Janeiro (UERJ)",
                    "Especialista: Fundação Getúlio Vargas (FGV)",
                    "Mestrando: Universidade Gregoriana de Roma",
                  ].map((item, i) => (
                    <motion.li
                      key={i}
                      initial={{ opacity: 0, x: -20 }}
                      whileInView={{ opacity: 1, x: 0 }}
                      viewport={{ once: true }}
                      transition={{ duration: 0.5, delay: 0.1 + i * 0.1 }}
                      style={{ display: "flex", alignItems: "flex-start", gap: "12px", color: "#3A3A3A", fontSize: "0.875rem", fontFamily: "Inter, sans-serif" }}
                    >
                      <span className="check-dark" style={{ backgroundImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24' fill='none' stroke='%23C1C156' stroke-width='2.5' stroke-linecap='round' stroke-linejoin='round'%3E%3Cpolyline points='20 6 9 17 4 12'/%3E%3C/svg%3E")` }} />
                      {item}
                    </motion.li>
                  ))}
                </ul>
              </div>
            </RevealSection>
            <RevealSection from="right">
              <div style={{ backgroundColor: "#072B31", padding: "1.5rem", position: "relative" }}>
                <div style={{ position: "absolute", top: 0, left: 0, width: "4px", height: "100%", backgroundColor: "#C1C156" }} />
                <p className="font-serif" style={{ fontSize: "clamp(1.2rem, 3vw, 1.75rem)", fontWeight: 300, color: "rgba(245,240,232,0.9)", lineHeight: 1.6, fontStyle: "italic" }}>
                  "Você não precisa atravessar esse momento no escuro e não precisa confiar sua situação a quem vai sumir depois da primeira conversa."
                </p>
                <div style={{ width: "40px", height: "1px", background: "#C1C156", marginTop: "2rem" }} />
              </div>
            </RevealSection>
          </div>
        </div>
      </section>

      <div className="divider-light" />

      {/* DOR */}
      <section id="dor" style={{ padding: "2rem 1.5rem", backgroundColor: "#FFFFFF" }}>
        <div style={{ maxWidth: "48rem", margin: "0 auto" }}>
          <RevealSection from="bottom">
            <motion.span
              initial={{ width: 0 }}
              whileInView={{ width: "48px" }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              style={{ height: "3px", backgroundColor: "#C1C156", display: "block", marginBottom: "1.5rem" }}
            />
            <h2 className="font-serif" style={{ fontSize: "clamp(2rem, 4vw, 3rem)", fontWeight: 400, color: "#1A1A1A", marginBottom: "2rem", lineHeight: 1.2 }}>
              A verdade que poucos falam abertamente.
            </h2>
            <div style={{ display: "flex", flexDirection: "column", gap: "20px", color: "#5A5A5A", fontFamily: "Inter, sans-serif", fontSize: "1rem", lineHeight: 1.7 }}>
              <p>O divórcio não é apenas o fim de um relacionamento. É um processo que redefine, na prática, sua relação com seus filhos e o destino do patrimônio que você construiu ao longo de anos.</p>
              <motion.div
                initial={{ opacity: 0, x: -24 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true, margin: "-60px" }}
                transition={{ duration: 0.7, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
                style={{ borderLeft: "3px solid #C1C156", paddingLeft: "1.5rem", margin: "1rem 0", backgroundColor: "#F9F6F1", padding: "1.5rem 1.5rem 1.5rem 2rem" }}
              >
                <p style={{ color: "#1A1A1A", fontSize: "1.125rem", lineHeight: 1.7 }}>
                  44,6% das guardas são concedidas exclusivamente à mãe. E mesmo nos casos de guarda compartilhada, que hoje respondem por 44,6% dos divórcios, muitos pais relatam sentir que perderam presença e influência na vida dos filhos.
                </p>
                <p style={{ color: "#9A9A9A", fontSize: "0.75rem", textTransform: "uppercase", letterSpacing: "0.15em", marginTop: "0.75rem" }}>Fonte: IBGE, 2024</p>
              </motion.div>
              <p>Quando o processo começa sem estratégia, as consequências são difíceis de reverter. Decisões tomadas sob pressão, para "encerrar logo" e "ter paz", costumam cobrar um preço alto nos anos seguintes.</p>
              <p>Ao longo de 14 anos, acompanhei dezenas de casos em que isso aconteceu. Pais que passaram a conviver menos com os filhos do que gostariam. Homens que cederam mais patrimônio do que era necessário simplesmente por não terem orientação no momento certo.</p>
            </div>
          </RevealSection>
        </div>
      </section>

      <div className="divider-light" />

      {/* VIRADA */}
      <section id="virada" style={{ padding: "2rem 1.5rem", backgroundColor: "#F9F6F1" }}>
        <div style={{ maxWidth: "64rem", margin: "0 auto" }}>
          <RevealSection from="bottom">
            <motion.span
              initial={{ width: 0 }}
              whileInView={{ width: "48px" }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              style={{ height: "3px", backgroundColor: "#C1C156", display: "block", marginBottom: "1.5rem" }}
            />
            <h2 className="font-serif" style={{ fontSize: "clamp(2rem, 4vw, 3rem)", fontWeight: 400, color: "#1A1A1A", marginBottom: "1.5rem", lineHeight: 1.2 }}>
              É possível conduzir esse processo de forma diferente.
            </h2>
            <p style={{ color: "#5A5A5A", fontFamily: "Inter, sans-serif", fontSize: "1rem", lineHeight: 1.7, maxWidth: "48rem", marginBottom: "2rem" }}>
              Com um plano claro desde o primeiro movimento, com controle sobre cada decisão e com previsibilidade sobre o que vem pela frente, sem abrir mão da sua presença na vida dos seus filhos e sem comprometer o que você levou anos para construir.
            </p>
          </RevealSection>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(240px, 1fr))", gap: "1.5rem", marginBottom: "2rem" }}>
            {[
              "Imagine manter uma convivência saudável com seus filhos, participando ativamente da vida deles, sem sentir que perdeu espaço, presença ou autoridade.",
              "Imagine atravessar o divórcio com seu patrimônio organizado, protegido e sob controle, sem surpresas e sem a sensação de que abdicou de mais do que deveria.",
              "Imagine passar por esse processo com clareza. Com a segurança de que cada decisão está sendo tomada com base estratégica, não em emoção ou pressão do momento.",
            ].map((text, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 40, scale: 0.97 }}
                whileInView={{ opacity: 1, y: 0, scale: 1 }}
                viewport={{ once: true, margin: "-40px" }}
                transition={{ duration: 0.7, delay: i * 0.13, ease: [0.16, 1, 0.3, 1] }}
              >
                <div className="card-cinematic">
                  <div style={{ width: "32px", height: "2px", background: "#C1C156", marginBottom: "1.5rem" }} />
                  <p className="font-serif" style={{ fontSize: "1.125rem", fontWeight: 400, color: "#1A1A1A", lineHeight: 1.6 }}>
                    {text}
                  </p>
                </div>
              </motion.div>
            ))}
          </div>
          <RevealSection from="bottom">
            <div style={{ borderTop: "1px solid #E8E2D6", paddingTop: "2rem" }}>
              <p style={{ color: "#072B31", fontFamily: "Inter, sans-serif", fontSize: "0.75rem", textTransform: "uppercase", letterSpacing: "0.15em" }}>
                É exatamente isso que a consultoria estratégica foi desenhada para entregar.
              </p>
            </div>
          </RevealSection>
        </div>
      </section>

      <div className="divider-light" />

      {/* COMO FUNCIONA */}
      <section id="como-funciona" style={{ padding: "2rem 1.5rem", backgroundColor: "#FFFFFF" }}>
        <div style={{ maxWidth: "56rem", margin: "0 auto" }}>
          <RevealSection from="left">
            <motion.span
              initial={{ width: 0 }}
              whileInView={{ width: "48px" }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              style={{ height: "3px", backgroundColor: "#C1C156", display: "block", marginBottom: "1.5rem" }}
            />
            <h2 className="font-serif" style={{ fontSize: "clamp(2rem, 4vw, 3rem)", fontWeight: 400, color: "#1A1A1A", marginBottom: "1rem", lineHeight: 1.2 }}>
              Não é uma consulta genérica.<br />É uma sessão estratégica estruturada.
            </h2>
            <p style={{ color: "#5A5A5A", fontFamily: "Inter, sans-serif", fontSize: "1rem", lineHeight: 1.7, maxWidth: "36rem", marginBottom: "2rem" }}>
              Em 50 minutos de atendimento direto com o Dr. Leonardo Carvalho, você sai com clareza total sobre o seu caso, sem enrolação, sem respostas vagas, sem precisar marcar um segundo encontro para entender o que fazer.
            </p>
          </RevealSection>
          <div style={{ marginBottom: "1.5rem" }}>
            {[
              "Análise da sua estrutura familiar e da dinâmica de convivência com os filhos",
              "Mapeamento do seu patrimônio e identificação dos principais riscos",
              "Diagnóstico dos pontos sensíveis do seu caso específico",
              "Direcionamento claro sobre como conduzir o processo desde o início",
              "Definição de quais decisões tomar e quais evitar",
              "Estratégia para preservar sua convivência com os filhos e proteger o que você construiu",
              "Espaço para todas as suas dúvidas, respondidas com precisão, sem rodeios",
            ].map((item, i, arr) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, x: -32 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true, margin: "-40px" }}
                transition={{ duration: 0.55, delay: i * 0.07, ease: [0.16, 1, 0.3, 1] }}
                style={{
                  display: "flex", alignItems: "flex-start", gap: "16px",
                  color: "#3A3A3A", fontFamily: "Inter, sans-serif", fontSize: "1rem",
                  borderBottom: i < arr.length - 1 ? "1px solid #E8E2D6" : "none",
                  padding: "1.25rem 0",
                }}
              >
                <span style={checkItemStyle} />
                {item}
              </motion.div>
            ))}
          </div>
          <RevealSection from="bottom">
            <div style={{ backgroundColor: "#072B31", padding: "2rem", display: "flex", alignItems: "center", gap: "1.5rem" }}>
              <div style={{ width: "4px", height: "48px", background: "#C1C156", flexShrink: 0 }} />
              <p className="font-serif" style={{ fontSize: "1.5rem", color: "#F5F0E8", fontWeight: 300 }}>
                Você não sai com dúvidas. Sai com um plano.
              </p>
            </div>
          </RevealSection>
        </div>
      </section>

      <div className="divider-light" />

      {/* DIFERENCIAL */}
      <section id="diferencial" style={{ padding: "2rem 1.5rem", backgroundColor: "#F9F6F1" }}>
        <div style={{ maxWidth: "64rem", margin: "0 auto" }}>
          <RevealSection from="bottom">
            <motion.span
              initial={{ width: 0 }}
              whileInView={{ width: "48px" }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              style={{ height: "3px", backgroundColor: "#C1C156", display: "block", marginBottom: "1.5rem" }}
            />
            <h2 className="font-serif" style={{ fontSize: "clamp(2rem, 4vw, 3rem)", fontWeight: 400, color: "#1A1A1A", marginBottom: "1.5rem", lineHeight: 1.2 }}>
              O que diferencia esse atendimento do padrão de mercado.
            </h2>
            <p style={{ color: "#5A5A5A", fontFamily: "Inter, sans-serif", fontSize: "1rem", lineHeight: 1.7, maxWidth: "48rem", marginBottom: "1.5rem" }}>
              No atendimento jurídico tradicional, você fala com o advogado no início. Depois passa a lidar com secretárias, respostas genéricas e pouca orientação estratégica.
            </p>
            <p style={{ color: "#072B31", fontFamily: "Inter, sans-serif", fontSize: "0.75rem", textTransform: "uppercase", letterSpacing: "0.15em", marginBottom: "2rem" }}>Aqui é diferente</p>
          </RevealSection>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(240px, 1fr))", gap: "1.5rem" }}>
            {[
              "Contato direto com o Dr. Leonardo Carvalho em cada etapa",
              "Retorno rápido e acesso facilitado ao longo de todo o processo",
              "Relatório periódico informando o andamento do caso",
              "Nível de especialização técnica acima da média, com formação nacional e internacional (FGV e Universidade Gregoriana de Roma)",
            ].map((text, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 32 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-40px" }}
                transition={{ duration: 0.65, delay: i * 0.1, ease: [0.16, 1, 0.3, 1] }}
                style={{ backgroundColor: "#FFFFFF", padding: "1.25rem", border: "1px solid #E8E2D6" }}
              >
                <motion.div
                  initial={{ height: 0 }}
                  whileInView={{ height: "40px" }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.4, delay: 0.3 + i * 0.1 }}
                  style={{ width: "2px", background: "#C1C156", marginBottom: "1rem" }}
                />
                <p style={{ color: "#3A3A3A", fontFamily: "Inter, sans-serif", fontSize: "1rem", lineHeight: 1.7 }}>
                  {text}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      <div className="divider-light" />

      {/* ESCASSEZ */}
      <section id="escassez" style={{ padding: "2rem 1.5rem", backgroundColor: "#FFFFFF" }}>
        <div style={{ maxWidth: "48rem", margin: "0 auto", textAlign: "center" }}>
          <RevealSection from="bottom">
            <motion.span
              initial={{ width: 0 }}
              whileInView={{ width: "48px" }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              style={{ height: "3px", backgroundColor: "#C1C156", display: "block", margin: "0 auto 1.5rem" }}
            />
            <h2 className="font-serif" style={{ fontSize: "clamp(2rem, 4vw, 3rem)", fontWeight: 400, color: "#1A1A1A", marginBottom: "1.5rem", lineHeight: 1.2 }}>
              Atendimento por disponibilidade limitada.
            </h2>
            <div style={{ display: "flex", flexDirection: "column", gap: "20px", color: "#5A5A5A", fontFamily: "Inter, sans-serif", fontSize: "1rem", lineHeight: 1.7 }}>
              <p>Para garantir análise individual e profundidade no diagnóstico, o número de atendimentos é intencionalmente limitado a <span style={{ color: "#072B31", fontWeight: 700 }}>10 por semana</span>.</p>
              <p>Quando a agenda fecha, novos atendimentos são abertos apenas no mês seguinte.</p>
              <p>O processo começa com um contato inicial, nossa equipe vai entender o seu caso e, se fizer sentido para os dois lados, você recebe o convite para a sessão estratégica.</p>
            </div>
          </RevealSection>
        </div>
      </section>

      {/* CTA FINAL */}
      <section id="cta-final" style={{ padding: "2.5rem 1.5rem", backgroundColor: "#072B31" }}>
        <div style={{ maxWidth: "48rem", margin: "0 auto", textAlign: "center" }}>
          <RevealSection from="bottom">
            <motion.span
              initial={{ width: 0 }}
              whileInView={{ width: "48px" }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              style={{ height: "2px", backgroundColor: "#C1C156", display: "block", margin: "0 auto 1.25rem" }}
            />
            <h2 className="font-serif" style={{ fontSize: "clamp(2.2rem, 6vw, 4rem)", fontWeight: 300, color: "#F5F0E8", marginBottom: "1.5rem", lineHeight: 1.2 }}>
              Se você chegou até aqui,<br />entendeu o que está em jogo.
            </h2>
            <p style={{ color: "rgba(245,240,232,0.7)", fontFamily: "Inter, sans-serif", fontSize: "1rem", lineHeight: 1.7, marginBottom: "1.5rem" }}>
              A pergunta agora é simples: você vai tomar essa decisão com estratégia, ou no improviso?
            </p>
          </RevealSection>
          <RevealSection from="bottom">
            <div style={{ display: "flex", justifyContent: "center" }}>
              <Suspense>
                <ContactForm theme="dark" />
              </Suspense>
            </div>
          </RevealSection>
        </div>
      </section>

      {/* FOOTER */}
      <footer style={{ padding: "1.5rem 1.5rem", borderTop: "1px solid rgba(201,164,82,0.15)", backgroundColor: "#072B31" }}>
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
