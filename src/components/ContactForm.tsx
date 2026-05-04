"use client";

import { useState } from "react";
import { useSearchParams, usePathname } from "next/navigation";
import PhoneInputWithFlag from "./PhoneInputWithFlag";

interface ContactFormProps {
  theme: "dark" | "light" | "editorial";
}

export default function ContactForm({ theme }: ContactFormProps) {
  const searchParams = useSearchParams();
  const pathname = usePathname();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [isPhoneValid, setIsPhoneValid] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const isFormValid = name.trim().length > 0 && /\S+@\S+\.\S+/.test(email) && isPhoneValid;

  const handlePhoneChange = (value: string, valid: boolean) => {
    setPhone(value);
    setIsPhoneValid(valid);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!isFormValid) {
      alert("Por favor, preencha todos os campos corretamente.");
      return;
    }
    setIsLoading(true);
    fetch("/api/contact", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        name, email, phone,
        utm_source: searchParams.get("utm_source") || "",
        utm_medium: searchParams.get("utm_medium") || "",
        utm_campaign: searchParams.get("utm_campaign") || "",
        utm_term: searchParams.get("utm_term") || "",
        page_path: pathname,
      }),
    })
      .then(async (res) => {
        if (res.ok) {
          const data = await res.json();
          const eventId = data.eventId ?? ("lead_" + Date.now());

          // Meta Pixel — evento Lead com eventID para deduplicação com CAPI
          if (typeof window !== "undefined" && typeof (window as any).fbq === "function") {
            (window as any).fbq("track", "Lead", {}, { eventID: String(eventId) });
          }

          window.location.href = `/obrigado?id=${encodeURIComponent(String(eventId))}`;
        } else {
          setIsLoading(false);
          alert("Ocorreu um erro ao enviar. Tente novamente.");
        }
      })
      .catch(() => {
        setIsLoading(false);
        alert("Erro de conexão. Verifique sua internet.");
      });
  };

  const colors = {
    dark: {
      bg: "#0D3030",
      cardBg: "#072B31",
      border: "rgba(201,164,82,0.25)",
      topBar: "linear-gradient(90deg, #C1C156, #E8C97A)",
      label: "rgba(201,164,82,0.7)",
      inputBg: "#072B31",
      inputBorder: "rgba(201,164,82,0.2)",
      inputText: "#F5F0E8",
      inputPlaceholder: "rgba(245,240,232,0.35)",
      title: "#F5F0E8",
      subtitle: "rgba(245,240,232,0.5)",
      btn: "#C1C156",
      btnText: "#072B31",
      btnHover: "#B8943F",
      subtext: "rgba(245,240,232,0.45)",
      phoneBg: "#072B31",
      phoneBorder: "rgba(201,164,82,0.2)",
      phoneText: "#F5F0E8",
      phoneFlagBg: "#072B31",
      phoneListBg: "#0D3030",
      phoneListText: "#F5F0E8",
      phoneListHighlight: "#072B31",
      btnBorder: undefined as string | undefined,
    },
    light: {
      bg: "#F9F6F1",
      cardBg: "#FFFFFF",
      border: "#D8D0C4",
      topBar: "linear-gradient(90deg, #C1C156, #E8C97A)",
      label: "#9C9080",
      inputBg: "#F9F6F1",
      inputBorder: "#D8D0C4",
      inputText: "#1A1A1A",
      inputPlaceholder: "#9C9080",
      title: "#072B31",
      subtitle: "#9C9080",
      btn: "#072B31",
      btnText: "#FFFFFF",
      btnHover: "#0D3030",
      subtext: "#9C9080",
      phoneBg: "#F9F6F1",
      phoneBorder: "#D8D0C4",
      phoneText: "#1A1A1A",
      phoneFlagBg: "#F9F6F1",
      phoneListBg: "#FFFFFF",
      phoneListText: "#1A1A1A",
      phoneListHighlight: "#F9F6F1",
      btnBorder: undefined as string | undefined,
    },
    editorial: {
      bg: "#0E1A1A",
      cardBg: "#072B31",
      border: "rgba(212,175,96,0.15)",
      topBar: "linear-gradient(90deg, #C1C156, #F0D080)",
      label: "rgba(212,175,96,0.6)",
      inputBg: "#072B31",
      inputBorder: "rgba(212,175,96,0.15)",
      inputText: "#FFFFFF",
      inputPlaceholder: "rgba(255,255,255,0.25)",
      title: "#FFFFFF",
      subtitle: "rgba(255,255,255,0.45)",
      btn: "transparent",
      btnText: "#C1C156",
      btnHover: "#C1C156",
      subtext: "rgba(255,255,255,0.3)",
      phoneBg: "#072B31",
      phoneBorder: "rgba(212,175,96,0.15)",
      phoneText: "#FFFFFF",
      phoneFlagBg: "#072B31",
      phoneListBg: "#0E1A1A",
      phoneListText: "#FFFFFF",
      phoneListHighlight: "#0B1515",
      btnBorder: "1px solid rgba(212,175,96,0.5)",
    },
  };

  const c = colors[theme];

  return (
    <div style={{
      background: c.cardBg,
      border: `1px solid ${c.border}`,
      padding: "44px 40px",
      boxShadow: theme === "light" ? "0 12px 56px rgba(26,24,20,0.09)" : "0 12px 56px rgba(0,0,0,0.3)",
      position: "relative",
      maxWidth: "460px",
      width: "100%",
    }}>
      <div style={{
        position: "absolute", top: 0, left: 0, right: 0, height: "3px",
        background: c.topBar,
      }} />

      <div style={{
        fontFamily: "'PT Serif', Georgia, serif",
        fontSize: "1.3rem", fontWeight: 700,
        color: c.title, marginBottom: "4px",
      }}>
        Solicitar Atendimento
      </div>
      <div style={{
        fontFamily: "'Lato', system-ui, sans-serif",
        fontSize: ".8rem", color: c.subtitle, marginBottom: "28px",
      }}>
        Resposta em até 24h
      </div>

      <form onSubmit={handleSubmit}>
        <div style={{ marginBottom: "16px" }}>
          <label style={{
            display: "block",
            fontFamily: "'Lato', system-ui, sans-serif",
            fontSize: ".62rem", fontWeight: 700,
            letterSpacing: ".16em", textTransform: "uppercase",
            color: c.label, marginBottom: "7px",
          }}>
            Nome completo
          </label>
          <input
            type="text"
            placeholder="João Silva"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
            style={{
              width: "100%", background: c.inputBg,
              border: `1px solid ${c.inputBorder}`,
              borderRadius: "2px", padding: "12px 14px",
              color: c.inputText, fontSize: ".88rem",
              fontFamily: "'Lato', system-ui, sans-serif",
              outline: "none", boxSizing: "border-box",
            }}
          />
        </div>

        <div style={{ marginBottom: "16px" }}>
          <label style={{
            display: "block",
            fontFamily: "'Lato', system-ui, sans-serif",
            fontSize: ".62rem", fontWeight: 700,
            letterSpacing: ".16em", textTransform: "uppercase",
            color: c.label, marginBottom: "7px",
          }}>
            E-mail
          </label>
          <input
            type="email"
            placeholder="joao@email.com.br"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            style={{
              width: "100%", background: c.inputBg,
              border: `1px solid ${c.inputBorder}`,
              borderRadius: "2px", padding: "12px 14px",
              color: c.inputText, fontSize: ".88rem",
              fontFamily: "'Lato', system-ui, sans-serif",
              outline: "none", boxSizing: "border-box",
            }}
          />
        </div>

        <div className={`ct-phone-${theme}`} style={{ marginBottom: "24px" }}>
          <label style={{
            display: "block",
            fontFamily: "'Lato', system-ui, sans-serif",
            fontSize: ".62rem", fontWeight: 700,
            letterSpacing: ".16em", textTransform: "uppercase",
            color: c.label, marginBottom: "7px",
          }}>
            WhatsApp
          </label>
          <style>{`
            .ct-phone-${theme} .react-tel-input .form-control {
              background: ${c.phoneBg} !important;
              border: 1px solid ${c.phoneBorder} !important;
              border-radius: 2px !important;
              color: ${c.phoneText} !important;
              font-size: .88rem !important;
              font-family: 'Lato', system-ui, sans-serif !important;
              height: 48px !important;
              padding-left: 52px !important;
              width: 100% !important;
            }
            .ct-phone-${theme} .react-tel-input .flag-dropdown {
              background: ${c.phoneFlagBg} !important;
              border: 1px solid ${c.phoneBorder} !important;
              border-radius: 2px 0 0 2px !important;
            }
            .ct-phone-${theme} .react-tel-input .selected-flag:hover,
            .ct-phone-${theme} .react-tel-input .selected-flag:focus {
              background: ${c.phoneFlagBg} !important;
            }
            .ct-phone-${theme} .react-tel-input .country-list {
              background-color: ${c.phoneListBg} !important;
              color: ${c.phoneListText} !important;
              border: 1px solid ${c.phoneBorder} !important;
            }
            .ct-phone-${theme} .react-tel-input .country-list .country.highlight,
            .ct-phone-${theme} .react-tel-input .country-list .country:hover {
              background-color: ${c.phoneListHighlight} !important;
            }
            .ct-phone-${theme} .react-tel-input input::placeholder {
              color: ${c.inputPlaceholder} !important;
            }
          `}</style>
          <PhoneInputWithFlag
            value={phone}
            onChange={handlePhoneChange}
            placeholder="(11) 99999-9999"
          />
        </div>

        <button
          type="submit"
          disabled={!isFormValid || isLoading}
          style={{
            width: "100%",
            background: isFormValid && !isLoading ? c.btn : "rgba(128,128,128,0.3)",
            color: isFormValid && !isLoading ? c.btnText : "rgba(128,128,128,0.6)",
            border: (isFormValid && !isLoading && c.btnBorder) ? c.btnBorder : "none",
            fontFamily: "'Lato', system-ui, sans-serif",
            fontSize: ".7rem", fontWeight: 700,
            letterSpacing: ".16em", textTransform: "uppercase",
            padding: "15px 24px", cursor: isFormValid && !isLoading ? "pointer" : "not-allowed",
            transition: "background 0.2s",
          }}
        >
          {isLoading ? "Enviando..." : "Solicitar Atendimento"}
        </button>

        <div style={{
          marginTop: "14px", textAlign: "center",
          fontFamily: "'Lato', system-ui, sans-serif",
          fontSize: ".65rem", color: c.subtext,
          letterSpacing: ".06em",
        }}>
          Atendimento direto com advogado • 100% confidencial
        </div>
      </form>
    </div>
  );
}
