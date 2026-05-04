"use client";

import { useEffect, useRef, Suspense } from "react";
import { useSearchParams } from "next/navigation";

const WHATSAPP_NUMBER = process.env.NEXT_PUBLIC_WHATSAPP_NUMBER || "5521975075776";
const WHATSAPP_MESSAGE = process.env.NEXT_PUBLIC_WHATSAPP_MESSAGE || "Olá, gostaria de agendar uma sessão estratégica com o Dr. Leonardo Carvalho.";

function ObrigadoContent() {
  const firedRef = useRef(false);
  const params = useSearchParams();
  const leadId = params.get("id") ?? ("lead_" + Date.now());

  const whatsappUrl = `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(WHATSAPP_MESSAGE)}`;

  useEffect(() => {
    if (firedRef.current) return;
    firedRef.current = true;

    const payload = {
      event: "generate_lead",
      currency: "BRL",
      value: 0,
      lead_source: "landing_page",
      form_name: "Lead Carvalho Teixeira",
      lead_id: leadId,
    };

    const fireEvent = () => {
      window.dataLayer = window.dataLayer || [];
      window.dataLayer.push(payload);
      if (typeof (window as any).gtag === "function") {
        (window as any).gtag("event", "generate_lead", {
          currency: payload.currency,
          value: payload.value,
          lead_source: payload.lead_source,
          form_name: payload.form_name,
          lead_id: payload.lead_id,
        });
      }
    };

    // Aguarda o GTM inicializar (objeto google_tag_manager presente) antes de disparar
    // Polling a cada 200ms, timeout máximo de 4s
    const startedAt = Date.now();
    const pollInterval = setInterval(() => {
      const gtmReady = typeof (window as any).google_tag_manager !== "undefined";
      const timedOut = Date.now() - startedAt >= 4000;
      if (gtmReady || timedOut) {
        clearInterval(pollInterval);
        fireEvent();
      }
    }, 200);

    const timer = setTimeout(() => {
      window.location.href = whatsappUrl;
    }, 10000);

    return () => {
      clearInterval(pollInterval);
      clearTimeout(timer);
    };
  }, []);

  return (
    <div style={{
      minHeight: "100vh",
      background: "#072B31",
      display: "flex",
      flexDirection: "column",
      alignItems: "center",
      justifyContent: "center",
      padding: "2rem",
      fontFamily: "'Lato', system-ui, sans-serif",
    }}>
      <div style={{
        maxWidth: "480px",
        width: "100%",
        textAlign: "center",
      }}>
        <div style={{
          fontFamily: "'PT Serif', Georgia, serif",
          fontSize: "3.5rem",
          fontWeight: 700,
          color: "#C1C156",
          letterSpacing: "0.04em",
          lineHeight: 1,
          marginBottom: "8px",
        }}>
          CT
        </div>
        <div style={{
          fontSize: "0.55rem",
          letterSpacing: "0.22em",
          color: "rgba(201,164,82,0.6)",
          textTransform: "uppercase",
          marginBottom: "48px",
        }}>
          CARVALHO TEIXEIRA
        </div>

        <div style={{
          width: "40px",
          height: "1px",
          background: "#C1C156",
          margin: "0 auto 32px",
        }} />

        <h1 style={{
          fontFamily: "'PT Serif', Georgia, serif",
          fontSize: "clamp(1.8rem, 5vw, 2.4rem)",
          fontWeight: 300,
          color: "#F5F0E8",
          lineHeight: 1.3,
          marginBottom: "16px",
        }}>
          Solicitação recebida com sucesso
        </h1>

        <p style={{
          fontSize: "0.9rem",
          color: "rgba(245,240,232,0.6)",
          lineHeight: 1.7,
          marginBottom: "40px",
          maxWidth: "380px",
          margin: "0 auto 40px",
        }}>
          Em instantes você será redirecionado para o WhatsApp do Dr. Leonardo Carvalho para confirmar seu agendamento.
        </p>

        <CountdownBar whatsappUrl={whatsappUrl} />

        <a
          href={whatsappUrl}
          style={{
            display: "inline-block",
            background: "#C1C156",
            color: "#072B31",
            fontFamily: "'Lato', system-ui, sans-serif",
            fontSize: "0.7rem",
            fontWeight: 700,
            letterSpacing: "0.16em",
            textTransform: "uppercase",
            padding: "14px 32px",
            textDecoration: "none",
            marginTop: "32px",
          }}
        >
          Ir para o WhatsApp agora
        </a>

        <p style={{
          marginTop: "16px",
          fontSize: "0.65rem",
          color: "rgba(245,240,232,0.3)",
          letterSpacing: "0.06em",
        }}>
          Atendimento direto com advogado • 100% confidencial
        </p>
      </div>
    </div>
  );
}

function CountdownBar({ whatsappUrl }: { whatsappUrl: string }) {
  const canvasRef = useRef<HTMLDivElement>(null);
  const timerRef = useRef<NodeJS.Timeout | null>(null);
  const countRef = useRef(10);

  useEffect(() => {
    const bar = canvasRef.current?.querySelector(".progress-bar") as HTMLElement | null;
    const numberEl = canvasRef.current?.querySelector(".countdown-number") as HTMLElement | null;

    if (!bar || !numberEl) return;

    timerRef.current = setInterval(() => {
      countRef.current -= 1;
      if (numberEl) numberEl.textContent = String(countRef.current);
      if (bar) bar.style.width = `${(countRef.current / 10) * 100}%`;
      if (countRef.current <= 0) {
        if (timerRef.current) clearInterval(timerRef.current);
      }
    }, 1000);

    return () => {
      if (timerRef.current) clearInterval(timerRef.current);
    };
  }, []);

  return (
    <div ref={canvasRef} style={{ width: "100%", maxWidth: "380px", margin: "0 auto" }}>
      <div style={{
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        gap: "12px",
        marginBottom: "12px",
      }}>
        <span style={{
          fontSize: "0.72rem",
          color: "rgba(245,240,232,0.45)",
          letterSpacing: "0.08em",
        }}>
          Redirecionando em
        </span>
        <span className="countdown-number" style={{
          fontFamily: "'PT Serif', Georgia, serif",
          fontSize: "1.4rem",
          fontWeight: 600,
          color: "#C1C156",
        }}>
          10
        </span>
        <span style={{
          fontSize: "0.72rem",
          color: "rgba(245,240,232,0.45)",
          letterSpacing: "0.08em",
        }}>
          segundos
        </span>
      </div>
      <div style={{
        width: "100%",
        height: "2px",
        background: "rgba(201,164,82,0.15)",
        borderRadius: "1px",
        overflow: "hidden",
      }}>
        <div
          className="progress-bar"
          style={{
            height: "100%",
            width: "100%",
            background: "linear-gradient(90deg, #C1C156, #E8C97A)",
            transition: "width 1s linear",
          }}
        />
      </div>
    </div>
  );
}

export default function ObrigadoPage() {
  return (
    <Suspense>
      <ObrigadoContent />
    </Suspense>
  );
}
