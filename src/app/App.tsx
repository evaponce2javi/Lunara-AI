import { useState, useRef, useEffect, useCallback } from "react";
import {
  Shield, Heart, Upload, FileText, X, ChevronRight,
  AlertCircle, Phone, MessageCircle, Scale, Globe,
  Info, Lock, AlertTriangle, Moon, ArrowLeft, Sun,
  Sparkles, Users, Building2, Check, Star,
} from "lucide-react";

// ─── Theme System ─────────────────────────────────────────────────────────────

type Theme = "light" | "dark" | "high-contrast";

interface ThemeVars {
  bg: string; card: string; support: string; bubble: string;
  text: string; muted: string; subtle: string; medium: string;
  primary: string; primaryLt: string; primaryDk: string;
  border: string; surfaceA: string; surfaceB: string; surfaceC: string;
  navIdle: string; navScroll: string; navBorder: string;
  footerText: string; footerStrong: string;
  btnGradient: string; btnShadow: string; btnHoverGradient: string;
}

const THEMES: Record<Theme, ThemeVars> = {
  light: {
    bg: "#F4F1FA", card: "#ffffff", support: "#FDFBF9", bubble: "#F0EDE9",
    text: "#2F293A", muted: "#7A6E8E", subtle: "#B3A5FF", medium: "#5E5473",
    primary: "#9D8DF1", primaryLt: "#B3A5FF", primaryDk: "#7B68D8",
    border: "rgba(157,141,241,0.18)", surfaceA: "rgba(157,141,241,0.06)",
    surfaceB: "rgba(157,141,241,0.12)", surfaceC: "rgba(157,141,241,0.20)",
    navIdle: "rgba(244,241,250,0.6)", navScroll: "rgba(244,241,250,0.88)",
    navBorder: "rgba(157,141,241,0.15)",
    footerText: "#A89CBE", footerStrong: "#8A7EA8",
    btnGradient: "linear-gradient(135deg,#9D8DF1 0%,#B3A5FF 100%)",
    btnShadow: "0 4px 24px rgba(157,141,241,0.35)",
    btnHoverGradient: "linear-gradient(135deg,#7B68D8 0%,#9D8DF1 100%)",
  },
  dark: {
    bg: "#1B1628", card: "#251E35", support: "#1E1830", bubble: "#2E2540",
    text: "#EDE9FB", muted: "#9D90C0", subtle: "#6B5FA0", medium: "#C4B8FF",
    primary: "#B3A5FF", primaryLt: "#CFC6FF", primaryDk: "#9D8DF1",
    border: "rgba(179,165,255,0.14)", surfaceA: "rgba(179,165,255,0.06)",
    surfaceB: "rgba(179,165,255,0.11)", surfaceC: "rgba(179,165,255,0.18)",
    navIdle: "rgba(27,22,40,0.6)", navScroll: "rgba(27,22,40,0.92)",
    navBorder: "rgba(179,165,255,0.12)",
    footerText: "#6B5F8A", footerStrong: "#9D90C0",
    btnGradient: "linear-gradient(135deg,#9D8DF1 0%,#CFC6FF 100%)",
    btnShadow: "0 4px 24px rgba(179,165,255,0.28)",
    btnHoverGradient: "linear-gradient(135deg,#7B68D8 0%,#B3A5FF 100%)",
  },
  "high-contrast": {
    bg: "#000000", card: "#0D0D0D", support: "#050505", bubble: "#1C1C1C",
    text: "#FFFFFF", muted: "#DDDDDD", subtle: "#AAAAAA", medium: "#FFFFFF",
    primary: "#A08AFF", primaryLt: "#C0AAFF", primaryDk: "#7C5CF0",
    border: "rgba(255,255,255,0.38)", surfaceA: "rgba(255,255,255,0.05)",
    surfaceB: "rgba(255,255,255,0.10)", surfaceC: "rgba(255,255,255,0.18)",
    navIdle: "rgba(0,0,0,0.7)", navScroll: "rgba(0,0,0,0.96)",
    navBorder: "rgba(255,255,255,0.22)",
    footerText: "#999999", footerStrong: "#DDDDDD",
    btnGradient: "linear-gradient(135deg,#7C5CF0 0%,#A08AFF 100%)",
    btnShadow: "0 4px 20px rgba(160,138,255,0.5)",
    btnHoverGradient: "linear-gradient(135deg,#5A3DD8 0%,#7C5CF0 100%)",
  },
};

function applyTheme(t: Theme) {
  const v = THEMES[t];
  const r = document.documentElement;
  r.style.setProperty("--luna-bg", v.bg);
  r.style.setProperty("--luna-card", v.card);
  r.style.setProperty("--luna-support", v.support);
  r.style.setProperty("--luna-bubble", v.bubble);
  r.style.setProperty("--luna-text", v.text);
  r.style.setProperty("--luna-muted", v.muted);
  r.style.setProperty("--luna-subtle", v.subtle);
  r.style.setProperty("--luna-medium", v.medium);
  r.style.setProperty("--luna-primary", v.primary);
  r.style.setProperty("--luna-primary-lt", v.primaryLt);
  r.style.setProperty("--luna-primary-dk", v.primaryDk);
  r.style.setProperty("--luna-border", v.border);
  r.style.setProperty("--luna-surface-a", v.surfaceA);
  r.style.setProperty("--luna-surface-b", v.surfaceB);
  r.style.setProperty("--luna-surface-c", v.surfaceC);
  r.style.setProperty("--luna-nav-idle", v.navIdle);
  r.style.setProperty("--luna-nav-scroll", v.navScroll);
  r.style.setProperty("--luna-nav-border", v.navBorder);
  r.style.setProperty("--luna-footer-text", v.footerText);
  r.style.setProperty("--luna-footer-strong", v.footerStrong);
  r.style.setProperty("--luna-btn-gradient", v.btnGradient);
  r.style.setProperty("--luna-btn-shadow", v.btnShadow);
  r.style.setProperty("--luna-btn-hover-gradient", v.btnHoverGradient);
}

// Shorthand helpers for common inline style values
const C = {
  bg:          "var(--luna-bg)",
  card:        "var(--luna-card)",
  support:     "var(--luna-support)",
  bubble:      "var(--luna-bubble)",
  text:        "var(--luna-text)",
  muted:       "var(--luna-muted)",
  subtle:      "var(--luna-subtle)",
  medium:      "var(--luna-medium)",
  primary:     "var(--luna-primary)",
  primaryLt:   "var(--luna-primary-lt)",
  primaryDk:   "var(--luna-primary-dk)",
  border:      "var(--luna-border)",
  surfA:       "var(--luna-surface-a)",
  surfB:       "var(--luna-surface-b)",
  surfC:       "var(--luna-surface-c)",
  navIdle:     "var(--luna-nav-idle)",
  navScroll:   "var(--luna-nav-scroll)",
  navBorder:   "var(--luna-nav-border)",
  footerText:  "var(--luna-footer-text)",
  footerStrong:"var(--luna-footer-strong)",
  btnGrad:     "var(--luna-btn-gradient)",
  btnShadow:   "var(--luna-btn-shadow)",
  btnHoverGrad:"var(--luna-btn-hover-gradient)",
} as const;

// ─── Types ────────────────────────────────────────────────────────────────────

type Page = "landing" | "analysis" | "plans";
type AnalysisState = "upload" | "loading" | "results";
type RiskLevel = "none" | "mild" | "moderate" | "important" | "critical";

interface RiskConfig { label: string; bg: string; text: string; dot: string; }

const RISK_CONFIGS: Record<RiskLevel, RiskConfig> = {
  none:      { label: "Sin señales relevantes",      bg: "#D4F0E0", text: "#1F6B45", dot: "#3AB26A" },
  mild:      { label: "Señales leves",               bg: "#FDF3C4", text: "#7A5A00", dot: "#D4A017" },
  moderate:  { label: "Señales importantes",         bg: "#FDDFC1", text: "#8A4800", dot: "#E07830" },
  important: { label: "Señales preocupantes",        bg: "#F0D4CC", text: "#7A3022", dot: "#C05040" },
  critical:  { label: "Necesita atención inmediata", bg: "#F0CCCC", text: "#6B1A1A", dot: "#C03030" },
};

const MOCK_MESSAGES = [
  { text: "A mi q me importa q esté mal. Tu te quedai en la casa porque yo quiero.", explanation: "Este mensaje podría reflejar un intento de control sobre tus decisiones individuales y una baja consideración por tu bienestar emocional." },
  { text: "Si me dejas te arrepentirás. Sé dónde vives y dónde trabaja tu mamá.", explanation: "Esta expresión contiene elementos de amenaza directa y podría representar una conducta de intimidación y coacción hacia tu entorno cercano." },
  { text: "Eres una inútil, nadie más te va a querer como yo te quiero.", explanation: "Este tipo de mensaje puede indicar una dinámica de desvalorización emocional utilizada para crear dependencia y erosionar tu autoestima." },
  { text: "Cuéntame con quién estabas, te vi en las historias. Respóndeme ahora mismo.", explanation: "El monitoreo constante de tus redes sociales y la exigencia de rendición de cuentas pueden ser indicadores de vigilancia y control digital." },
  { text: "Ya le dije a tus amigas lo que hiciste. Así que mejor no me falles más.", explanation: "La divulgación de información personal como herramienta de presión refleja una dinámica de coerción social y daño reputacional deliberado." },
];

// ─── Logo SVG ─────────────────────────────────────────────────────────────────

function LunaraLogo({ size = 32 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
      <rect x="7" y="6" width="20" height="16" rx="7" fill={C.primary} />
      <path d="M10 22 L8 27 L16 22" fill={C.primary} />
      <path d="M7 14 C4 10 4 6 7 4 C3 5 1 9 1 13 C1 19 5 23 10 23 C8 22 7 18 7 14 Z" fill={C.medium} opacity="0.85" />
    </svg>
  );
}

// ─── Contrast Icon ────────────────────────────────────────────────────────────

function ContrastIcon({ size = 15 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 16 16" fill="none" aria-hidden="true">
      <circle cx="8" cy="8" r="6.5" stroke="currentColor" strokeWidth="1.5" />
      <path d="M8 1.5a6.5 6.5 0 0 1 0 13V1.5z" fill="currentColor" />
    </svg>
  );
}

// ─── Navbar ───────────────────────────────────────────────────────────────────

function Navbar({
  onSupportClick,
  theme,
  onThemeChange,
}: {
  onSupportClick: () => void;
  theme: Theme;
  onThemeChange: (t: Theme) => void;
}) {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handler = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", handler, { passive: true });
    return () => window.removeEventListener("scroll", handler);
  }, []);

  function toggleTheme(selected: Theme) {
    onThemeChange(theme === selected ? "light" : selected);
  }

  const themeBtn = (active: boolean) => ({
    background: active ? C.surfC : C.surfA,
    color: active ? C.primary : C.muted,
    border: `1px solid ${active ? C.primary : C.border}`,
    transition: "all 0.18s",
  });

  return (
    <nav
      style={{
        background: scrolled ? C.navScroll : C.navIdle,
        backdropFilter: "blur(16px)",
        WebkitBackdropFilter: "blur(16px)",
        borderBottom: scrolled ? `1px solid ${C.navBorder}` : "1px solid transparent",
        transition: "background 0.3s, border-color 0.3s",
      }}
      className="fixed top-0 left-0 right-0 z-50 px-4 md:px-10 py-3.5 flex items-center justify-between gap-3"
    >
      {/* Brand */}
      <div className="flex items-center gap-2.5 select-none flex-shrink-0">
        <LunaraLogo size={32} />
        <span className="text-xl font-bold tracking-tight" style={{ color: C.text, fontFamily: "'Plus Jakarta Sans', sans-serif", letterSpacing: "-0.03em" }}>
          Lunara
        </span>
      </div>

      {/* Right controls */}
      <div className="flex items-center gap-2 flex-wrap justify-end">
        {/* Dark mode toggle */}
        <button
          onClick={() => toggleTheme("dark")}
          aria-pressed={theme === "dark"}
          aria-label="Modo oscuro"
          className="flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-semibold transition-all duration-150 active:scale-95 select-none"
          style={themeBtn(theme === "dark")}
        >
          {theme === "dark" ? <Sun size={13} strokeWidth={2.5} /> : <Moon size={13} strokeWidth={2.5} />}
          <span className="hidden sm:inline">Oscuro</span>
        </button>

        {/* High contrast toggle */}
        <button
          onClick={() => toggleTheme("high-contrast")}
          aria-pressed={theme === "high-contrast"}
          aria-label="Alto contraste"
          className="flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-semibold transition-all duration-150 active:scale-95 select-none"
          style={themeBtn(theme === "high-contrast")}
        >
          <ContrastIcon size={13} />
          <span className="hidden sm:inline">Alto contraste</span>
        </button>

        {/* Support link */}
        <button
          onClick={onSupportClick}
          className="flex items-center gap-1.5 px-4 py-1.5 rounded-full text-xs font-semibold transition-all duration-150 active:scale-95 flex-shrink-0"
          style={{
            background: C.surfA,
            color: C.medium,
            border: `1px solid ${C.surfC}`,
          }}
        >
          <Heart size={13} strokeWidth={2.5} style={{ color: C.primary }} />
          <span>Red de Apoyo</span>
        </button>
      </div>
    </nav>
  );
}

// ─── Evidence Cards ───────────────────────────────────────────────────────────

function EvidenceCard({ stat, index }: { stat: { number: string; title: string; body: string; source: string }; index: number }) {
  const ref = useRef<HTMLDivElement>(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) setVisible(true); },
      { threshold: 0.15 }
    );
    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, []);

  return (
    <div
      ref={ref}
      className="rounded-2xl p-6 transition-all duration-700"
      style={{
        background: C.card,
        border: `1px solid ${C.border}`,
        boxShadow: "0 2px 20px rgba(94,84,115,0.06)",
        opacity: visible ? 1 : 0,
        transform: visible ? "translateY(0)" : "translateY(24px)",
        transitionDelay: `${index * 100}ms`,
      }}
    >
      <div className="text-3xl font-bold mb-2 leading-none" style={{ color: C.primary, fontFamily: "'Plus Jakarta Sans', sans-serif" }}>
        {stat.number}
      </div>
      <h3 className="text-sm font-bold mb-2" style={{ color: C.text }}>{stat.title}</h3>
      <p className="text-sm leading-relaxed mb-3" style={{ color: C.muted }}>{stat.body}</p>
      <span className="text-xs font-medium px-2 py-1 rounded-full" style={{ background: C.surfB, color: C.primary }}>
        {stat.source}
      </span>
    </div>
  );
}

// ─── Landing Page ─────────────────────────────────────────────────────────────

function LandingPage({ onCTAClick, onPlansClick }: { onCTAClick: () => void; onPlansClick: () => void }) {
  const stats = [
    { number: "~50%", title: "Falta de Protección Legal", body: "Cerca del 50% de las mujeres y niñas a nivel mundial carecen de una protección jurídica específica frente al abuso digital, lo que invisibiliza estas conductas en el sistema.", source: "ONU Mujeres, 2025" },
    { number: "98%", title: "Prevalencia en Parejas (VBGFT)", body: "En contextos de violencia doméstica, hasta un 98% de los casos documentados incluyen dinámicas tecnológicas como el rastreo o el envío masivo de mensajes.", source: "eSafety Commissioner / NNEDV" },
    { number: "1 de 3", title: "Impacto en la Adolescencia", body: "1 de cada 3 adolescentes ha reportado ser víctima de conductas de control a través de sus redes sociales, normalizando dinámicas tóxicas a temprana edad.", source: "UNICEF / Red.es" },
    { number: "↑ Global", title: "Vector de Ataque (Coerción)", body: "Los reportes globales muestran un incremento masivo en casos de extorsión y coerción digital, confirmando al mensaje de texto como la vía principal para estas prácticas.", source: "CyberTipline — NCMEC" },
  ];

  return (
    <main className="min-h-screen pt-24 pb-20 px-6 md:px-12" style={{ background: C.bg }}>
      {/* Hero */}
      <section className="max-w-2xl mx-auto text-center pt-16 pb-20">
        <div className="flex justify-center mb-6">
          <LunaraLogo size={56} />
        </div>

        <h1 className="text-5xl md:text-6xl font-bold mb-4 tracking-tight" style={{ color: C.text, fontFamily: "'Plus Jakarta Sans', sans-serif", letterSpacing: "-0.04em" }}>
          Lunara
        </h1>

        <p className="text-lg md:text-xl font-medium mb-10" style={{ color: C.muted }}>
          Ver las señales también es cuidarte.
        </p>

        <button
          onClick={onCTAClick}
          className="inline-flex items-center gap-2 px-8 py-4 rounded-2xl text-white font-semibold text-lg transition-all duration-300 hover:shadow-lg active:scale-95 mb-10"
          style={{ background: C.btnGrad, boxShadow: C.btnShadow }}
          onMouseEnter={(e) => { (e.currentTarget as HTMLButtonElement).style.background = C.btnHoverGrad; }}
          onMouseLeave={(e) => { (e.currentTarget as HTMLButtonElement).style.background = C.btnGrad; }}
        >
          Revisar conversación
          <ChevronRight size={18} strokeWidth={2.5} />
        </button>

        {/* Context card */}
        <div className="text-left rounded-2xl p-6 text-sm leading-relaxed" style={{ background: C.surfA, border: `1px solid ${C.border}`, color: C.medium }}>
          <p>
            Sentirte constantemente culpable, vigilada, menospreciada o con miedo de{" "}
            <em>"hacer enojar"</em> a alguien no debería ser normal. Entender lo que ocurre también es una forma de cuidarte.
          </p>
        </div>
      </section>

      {/* Evidence section */}
      <section className="max-w-4xl mx-auto">
        <p className="text-xs font-semibold uppercase tracking-widest text-center mb-8" style={{ color: C.primaryLt }}>
          Contexto y datos
        </p>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-5 mb-10">
          {stats.map((s, i) => <EvidenceCard key={i} stat={s} index={i} />)}
        </div>

        {/* Mission CTA */}
        <div className="text-center">
          <button
            onClick={onPlansClick}
            className="inline-flex items-center gap-2.5 px-7 py-3.5 rounded-2xl font-semibold text-sm transition-all duration-200 active:scale-95"
            style={{
              background: C.surfA,
              color: C.primary,
              border: `1.5px solid ${C.border}`,
            }}
            onMouseEnter={(e) => { (e.currentTarget as HTMLButtonElement).style.background = C.surfB; }}
            onMouseLeave={(e) => { (e.currentTarget as HTMLButtonElement).style.background = C.surfA; }}
          >
            <Sparkles size={15} strokeWidth={2.5} />
            Apoya Nuestra Misión y Conoce los Modelos de Sostenibilidad
          </button>
        </div>
      </section>
    </main>
  );
}

// ─── Upload Zone ──────────────────────────────────────────────────────────────

function UploadZone({ onFileReady }: { onFileReady: (file: File) => void }) {
  const [dragging, setDragging] = useState(false);
  const [file, setFile] = useState<File | null>(null);
  const [error, setError] = useState<string | null>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  const validate = useCallback((f: File) => {
    if (f.name.endsWith(".txt") || f.type === "text/plain") {
      setFile(f); setError(null);
    } else {
      setFile(null); setError("¡Ups! Te has equivocado en el formato. Recuerda que debe ser un archivo de texto plano (.txt)");
    }
  }, []);

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault(); setDragging(false);
    if (e.dataTransfer.files[0]) validate(e.dataTransfer.files[0]);
  };

  const borderColor = error ? "#E07E7E" : dragging ? C.primary : C.border;
  const zoneBg = error ? "rgba(224,126,126,0.04)" : dragging ? C.surfA : "transparent";

  return (
    <div className="max-w-xl mx-auto">
      <label
        className="block rounded-2xl p-10 flex flex-col items-center gap-4 cursor-pointer transition-all duration-200 mb-4"
        style={{ border: `2px dashed ${borderColor}`, background: zoneBg }}
        onDragOver={(e) => { e.preventDefault(); setDragging(true); }}
        onDragLeave={() => setDragging(false)}
        onDrop={handleDrop}
      >
        <input
          ref={inputRef}
          type="file"
          accept=".txt,text/plain"
          className="sr-only"
          onChange={(e) => { if (e.target.files?.[0]) validate(e.target.files[0]); }}
        />
        {error ? (
          <AlertCircle size={36} style={{ color: "#E07E7E" }} strokeWidth={1.5} />
        ) : file ? (
          <FileText size={36} style={{ color: C.primary }} strokeWidth={1.5} />
        ) : (
          <Upload size={36} style={{ color: C.primaryLt }} strokeWidth={1.5} />
        )}

        {file ? (
          <div className="text-center">
            <p className="font-semibold text-sm" style={{ color: C.text }}>{file.name}</p>
            <p className="text-xs mt-1" style={{ color: C.muted }}>
              {(file.size / 1024).toFixed(1)} KB · Archivo listo para análisis
            </p>
          </div>
        ) : (
          <div className="text-center">
            <p className="font-medium text-sm" style={{ color: C.medium }}>
              Sube o arrastra tu archivo de chat aquí{" "}
              <span style={{ color: C.primary }}>(.txt)</span>
            </p>
            <p className="text-xs mt-1" style={{ color: C.primaryLt }}>
              Haz clic para explorar archivos
            </p>
          </div>
        )}
      </label>

      {error && (
        <div className="flex items-start gap-2 rounded-xl px-4 py-3 text-sm mb-4" style={{ background: "rgba(224,126,126,0.1)", color: "#C05050" }}>
          <AlertCircle size={16} className="flex-shrink-0 mt-0.5" strokeWidth={2} />
          {error}
        </div>
      )}

      <button
        disabled={!file}
        onClick={() => file && onFileReady(file)}
        className="w-full py-4 rounded-2xl font-semibold text-white transition-all duration-200"
        style={{
          background: file ? C.btnGrad : C.surfB,
          opacity: file ? 1 : 0.5,
          cursor: file ? "pointer" : "not-allowed",
          boxShadow: file ? C.btnShadow : "none",
          color: file ? "#ffffff" : C.muted,
        }}
        onMouseEnter={(e) => { if (file) (e.currentTarget as HTMLButtonElement).style.background = C.btnHoverGrad; }}
        onMouseLeave={(e) => { if (file) (e.currentTarget as HTMLButtonElement).style.background = C.btnGrad; }}
      >
        Analizar
      </button>
    </div>
  );
}

// ─── Loading State ────────────────────────────────────────────────────────────

function LoadingState() {
  return (
    <div className="flex flex-col items-center justify-center py-20 gap-6">
      <div className="relative w-16 h-16">
        <div
          className="absolute inset-0 rounded-full border-4 border-transparent"
          style={{
            borderTopColor: C.primary,
            borderRightColor: C.surfB,
            borderBottomColor: C.surfA,
            animation: "spin 1.2s linear infinite",
          }}
        />
        <div className="absolute inset-3 rounded-full" style={{ background: C.surfA }} />
        <Moon size={18} className="absolute inset-0 m-auto" style={{ color: C.primary }} />
      </div>

      <div className="text-center">
        <p className="font-medium" style={{ color: C.medium }}>
          Analizando la conversación de manera completamente segura y confidencial...
        </p>
        <p className="text-sm mt-2" style={{ color: C.primaryLt }}>
          Este proceso se realiza únicamente en tu dispositivo
        </p>
      </div>

      <div className="w-full max-w-xl space-y-3 mt-4">
        {[100, 80, 90, 70].map((w, i) => (
          <div key={i} className="h-4 rounded-full animate-pulse" style={{ width: `${w}%`, background: C.surfB, animationDelay: `${i * 150}ms` }} />
        ))}
      </div>
    </div>
  );
}

// ─── Results State ────────────────────────────────────────────────────────────

function ResultsState({ onSupportClick, onPlansClick }: { onSupportClick: () => void; onPlansClick: () => void }) {
  const risk: RiskLevel = "important";
  const config = RISK_CONFIGS[risk];
  const [visible, setVisible] = useState(false);

  useEffect(() => { setTimeout(() => setVisible(true), 50); }, []);

  return (
    <div className="max-w-xl mx-auto transition-all duration-500" style={{ opacity: visible ? 1 : 0, transform: visible ? "translateY(0)" : "translateY(16px)" }}>
      {/* Risk badge */}
      <div className="flex items-center gap-3 rounded-2xl px-5 py-4 mb-6" style={{ background: config.bg }}>
        <div className="w-3 h-3 rounded-full flex-shrink-0" style={{ background: config.dot }} />
        <span className="font-semibold text-sm" style={{ color: config.text }}>{config.label}</span>
      </div>

      <p className="text-sm mb-5" style={{ color: C.muted }}>
        Estos son algunos mensajes detectados que consideramos que podrían ser relevantes:
      </p>

      <div className="space-y-4 mb-8">
        {MOCK_MESSAGES.map((msg, i) => (
          <div key={i} className="space-y-2">
            <div className="inline-block rounded-2xl rounded-bl-sm px-4 py-3 text-sm max-w-full" style={{ background: C.bubble, color: C.text, boxShadow: "0 1px 4px rgba(94,84,115,0.08)" }}>
              {msg.text}
            </div>
            <div className="flex items-start gap-2 px-1">
              <Info size={14} className="flex-shrink-0 mt-0.5" style={{ color: C.primaryLt }} />
              <p className="text-xs leading-relaxed" style={{ color: C.muted }}>{msg.explanation}</p>
            </div>
          </div>
        ))}
      </div>

      <button
        onClick={onSupportClick}
        className="w-full flex items-center justify-center gap-2 py-4 rounded-2xl font-semibold text-white transition-all duration-200 hover:shadow-lg active:scale-95 mb-3"
        style={{ background: C.btnGrad, boxShadow: C.btnShadow }}
        onMouseEnter={(e) => { (e.currentTarget as HTMLButtonElement).style.background = C.btnHoverGrad; }}
        onMouseLeave={(e) => { (e.currentTarget as HTMLButtonElement).style.background = C.btnGrad; }}
      >
        <Heart size={16} strokeWidth={2.5} />
        Consultar Red de Apoyo
      </button>

      <button
        onClick={onPlansClick}
        className="w-full flex items-center justify-center gap-2 py-4 rounded-2xl font-semibold text-sm transition-all duration-200 active:scale-95 mb-10"
        style={{
          background: C.surfA,
          color: C.primary,
          border: `1.5px solid ${C.border}`,
        }}
        onMouseEnter={(e) => { (e.currentTarget as HTMLButtonElement).style.background = C.surfB; }}
        onMouseLeave={(e) => { (e.currentTarget as HTMLButtonElement).style.background = C.surfA; }}
      >
        <Sparkles size={15} strokeWidth={2.5} />
        Apoya Nuestra Misión y Conoce los Modelos de Sostenibilidad
      </button>

      {/* Footer / Legal */}
      <div className="space-y-4 pt-6 border-t" style={{ borderColor: C.border }}>
        <div className="flex items-start gap-2">
          <Lock size={11} className="flex-shrink-0 mt-0.5" style={{ color: C.primaryLt }} />
          <p className="text-xs leading-relaxed" style={{ color: C.footerText, fontSize: "10px" }}>
            <strong style={{ color: C.footerStrong }}>Compromiso de Privacidad Absoluta:</strong> Su archivo se procesa de manera estrictamente local, automatizada y confidencial. Lunara no almacena, registra, comparte ni utiliza sus conversaciones bajo ninguna circunstancia. Toda la información es eliminada permanentemente de la memoria del navegador en el instante en que usted cierra o abandona esta página web.
          </p>
        </div>
        <div className="flex items-start gap-2">
          <AlertTriangle size={11} className="flex-shrink-0 mt-0.5" style={{ color: "#C0A060" }} />
          <p className="text-xs leading-relaxed" style={{ color: C.footerText, fontSize: "10px" }}>
            <strong style={{ color: C.footerStrong }}>Nota de Orientación Informativa:</strong> Lunara es un recurso tecnológico automatizado de carácter estrictamente preventivo e informativo. Esta herramienta no es un ser humano, no constituye un diagnóstico psicológico ni legal, ni reemplaza el criterio de un especialista. Le recomendamos encarecidamente tomar estos resultados únicamente como una sugerencia inicial y acudir a nuestra Red de Apoyo para recibir acompañamiento y guía profesional.
          </p>
        </div>
      </div>
    </div>
  );
}

// ─── Plans Page ──────────────────────────────────────────────────────────────

const PLANS = [
  {
    id: "individual",
    icon: <FileText size={22} strokeWidth={1.8} />,
    title: "Informe de Evidencia Digital Profunda",
    badge: null,
    audience: "Uso Individual",
    concept: "La usuaria no paga por saber si hay violencia, paga por un documento tangible listo para su defensa.",
    features: [
      "Extracción literal de citas exactas con fecha, hora y contexto completo",
      "Etiquetado técnico psicológico/legal: Gaslighting, Love Bombing, Manipulación Coercitiva, Amenazas Veladas y más",
      "Justificación analítica del por qué de cada etiqueta asignada",
      "Mapeo visual de escalada y severidad a lo largo del historial",
    ],
    uses: "Terapéutico · Legal (principio de prueba) · Validación personal",
    price: "$12.000 CLP",
    cycle: "Pago único por informe",
    cta: "Generar mi Informe",
    featured: false,
    accentColor: C.primary,
  },
  {
    id: "saas",
    icon: <Users size={22} strokeWidth={1.8} />,
    title: "Planes para Profesionales y Clínicas",
    badge: "Recomendado",
    audience: "B2B · SaaS",
    concept: "Tecnología de análisis masivo y rápido como herramienta de productividad para abogados y psicólogos.",
    features: [
      "Abogados de familia y fiscales: evidencia rápida (e-discovery) para casos de divorcio, custodia y protección",
      "Psicólogos y centros terapéuticos: comprensión de dinámicas de abuso desde la primera sesión",
      "Volumen alto de análisis mensuales con almacenamiento seguro en la nube",
      "Exportación de PDFs en marca blanca con logo de la firma o clínica",
    ],
    uses: "Abogados · Psicólogos · Centros terapéuticos",
    price: "$80.000 CLP",
    cycle: "Suscripción mensual",
    cta: "Solicitar Demo",
    featured: true,
    accentColor: C.primary,
  },
  {
    id: "corporate",
    icon: <Building2 size={22} strokeWidth={1.8} />,
    title: "Patrocinios de Impacto Corporativo",
    badge: "RSC · ESG",
    audience: "B2B2C · Corporativo",
    concept: "Financiar la gratuidad universal del nivel básico a través de presupuestos corporativos de Responsabilidad Social.",
    features: [
      "Presencia visible: \"Lunara, acceso gratuito impulsado por [Marca]\"",
      "Reportes de impacto trimestrales anonimizados para métricas ESG",
      "Acceso SaaS interno para RRHH y línea de denuncias éticas corporativas",
      "Contrato flexible con ROI documentado y medible",
    ],
    uses: "Marcas · Fundaciones · Empresas con agenda ESG",
    price: "Desde $3.500.000 CLP",
    cycle: "Suscripción anual · Contrato flexible",
    cta: "Solicitar Propuesta",
    featured: false,
    accentColor: "#C0A060",
  },
] as const;

function PlansPage({ onBack }: { onBack: () => void }) {
  const [visible, setVisible] = useState(false);
  useEffect(() => { setTimeout(() => setVisible(true), 40); }, []);

  return (
    <main
      className="min-h-screen pt-28 pb-20 px-6 md:px-10"
      style={{ background: C.bg, opacity: visible ? 1 : 0, transition: "opacity 0.3s" }}
    >
      {/* Back */}
      <div className="max-w-6xl mx-auto mb-8">
        <button
          onClick={onBack}
          className="flex items-center gap-1.5 text-sm font-medium group transition-all duration-150"
          style={{ color: C.primary }}
        >
          <ArrowLeft size={16} strokeWidth={2.5} className="transition-transform duration-150 group-hover:-translate-x-0.5" />
          Volver
        </button>
      </div>

      {/* Header */}
      <div className="max-w-3xl mx-auto text-center mb-14">
        <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full text-xs font-semibold mb-5" style={{ background: C.surfB, color: C.primary }}>
          <Sparkles size={12} strokeWidth={2.5} />
          Sostenibilidad y Misión
        </div>
        <h1 className="text-3xl md:text-4xl font-bold mb-4 tracking-tight" style={{ color: C.text, fontFamily: "'Plus Jakarta Sans', sans-serif", letterSpacing: "-0.03em" }}>
          Planes de Apoyo y Sostenibilidad
        </h1>
        <p className="text-base leading-relaxed" style={{ color: C.muted }}>
          El acceso básico a la detección siempre es gratuito. Estos modelos financian la misión y amplían el alcance de Lunara para quienes más la necesitan.
        </p>
      </div>

      {/* Cards */}
      <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-6 items-start">
        {PLANS.map((plan, i) => (
          <div
            key={plan.id}
            className="rounded-3xl p-7 flex flex-col transition-all duration-700 relative"
            style={{
              background: plan.featured ? `linear-gradient(160deg, ${C.surfB}, ${C.surfA})` : C.card,
              border: plan.featured ? `2px solid ${C.primary}` : `1px solid ${C.border}`,
              boxShadow: plan.featured ? `0 8px 40px rgba(157,141,241,0.18)` : "0 2px 16px rgba(94,84,115,0.06)",
              opacity: visible ? 1 : 0,
              transform: visible ? "translateY(0)" : "translateY(20px)",
              transitionDelay: `${i * 80 + 100}ms`,
            }}
          >
            {/* Badge */}
            {plan.badge && (
              <div
                className="absolute -top-3.5 left-1/2 -translate-x-1/2 px-3 py-1 rounded-full text-xs font-bold flex items-center gap-1 whitespace-nowrap"
                style={{
                  background: plan.featured ? C.primary : "#C0A060",
                  color: "#ffffff",
                }}
              >
                {plan.featured && <Star size={10} fill="white" strokeWidth={0} />}
                {plan.badge}
              </div>
            )}

            {/* Icon + audience */}
            <div className="flex items-center gap-3 mb-5">
              <div className="w-10 h-10 rounded-2xl flex items-center justify-center flex-shrink-0" style={{ background: C.surfB, color: plan.accentColor }}>
                {plan.icon}
              </div>
              <span className="text-xs font-semibold px-2 py-0.5 rounded-full" style={{ background: C.surfA, color: C.muted }}>
                {plan.audience}
              </span>
            </div>

            {/* Title */}
            <h2 className="font-bold mb-3 leading-snug" style={{ color: C.text, fontFamily: "'Plus Jakarta Sans', sans-serif", fontSize: "1rem" }}>
              {plan.title}
            </h2>

            {/* Concept */}
            <p className="text-xs leading-relaxed mb-5 italic" style={{ color: C.muted }}>
              "{plan.concept}"
            </p>

            {/* Features */}
            <ul className="space-y-2.5 mb-6 flex-1">
              {plan.features.map((f, fi) => (
                <li key={fi} className="flex items-start gap-2">
                  <Check size={14} className="flex-shrink-0 mt-0.5" style={{ color: plan.accentColor }} strokeWidth={2.5} />
                  <span className="text-xs leading-snug" style={{ color: C.muted }}>{f}</span>
                </li>
              ))}
            </ul>

            {/* Uses */}
            <p className="text-xs mb-5 font-medium" style={{ color: C.subtle }}>
              {plan.uses}
            </p>

            {/* Price */}
            <div className="rounded-2xl px-4 py-4 mb-5 text-center" style={{ background: C.surfA, border: `1px solid ${C.border}` }}>
              <div className="font-bold text-xl tracking-tight mb-0.5" style={{ color: plan.accentColor, fontFamily: "'Plus Jakarta Sans', sans-serif" }}>
                {plan.price}
              </div>
              <div className="text-xs" style={{ color: C.muted }}>{plan.cycle}</div>
            </div>

            {/* CTA */}
            <button
              className="w-full py-3.5 rounded-2xl font-semibold text-sm transition-all duration-200 active:scale-95"
              style={{
                background: plan.featured ? C.btnGrad : C.surfB,
                color: plan.featured ? "#ffffff" : C.primary,
                boxShadow: plan.featured ? C.btnShadow : "none",
                border: plan.featured ? "none" : `1px solid ${C.border}`,
              }}
              onMouseEnter={(e) => { (e.currentTarget as HTMLButtonElement).style.background = plan.featured ? C.btnHoverGrad : C.surfC; }}
              onMouseLeave={(e) => { (e.currentTarget as HTMLButtonElement).style.background = plan.featured ? C.btnGrad : C.surfB; }}
            >
              {plan.cta}
            </button>
          </div>
        ))}
      </div>

      {/* Footer note */}
      <p className="text-center text-xs mt-12" style={{ color: C.subtle }}>
        La detección básica de señales es y siempre será completamente gratuita y anónima.
      </p>
    </main>
  );
}

// ─── Confirm Back Modal ───────────────────────────────────────────────────────

function ConfirmBackModal({ open, onConfirm, onCancel }: { open: boolean; onConfirm: () => void; onCancel: () => void }) {
  useEffect(() => {
    if (!open) return;
    const handler = (e: KeyboardEvent) => { if (e.key === "Escape") onCancel(); };
    window.addEventListener("keydown", handler);
    return () => window.removeEventListener("keydown", handler);
  }, [open, onCancel]);

  return (
    <>
      <div
        onClick={onCancel}
        className="fixed inset-0 z-50 transition-opacity duration-200"
        style={{ background: "rgba(47,41,58,0.38)", backdropFilter: "blur(4px)", opacity: open ? 1 : 0, pointerEvents: open ? "auto" : "none" }}
      />
      <div className="fixed inset-0 z-50 flex items-center justify-center px-6 pointer-events-none">
        <div
          className="w-full max-w-sm rounded-3xl p-7 shadow-xl"
          style={{
            background: C.card,
            border: `1px solid ${C.border}`,
            opacity: open ? 1 : 0,
            transform: open ? "scale(1) translateY(0)" : "scale(0.95) translateY(8px)",
            transition: "opacity 0.2s, transform 0.2s",
            pointerEvents: open ? "auto" : "none",
          }}
        >
          <div className="w-12 h-12 rounded-2xl flex items-center justify-center mb-5" style={{ background: C.surfB }}>
            <ArrowLeft size={20} style={{ color: C.primary }} strokeWidth={2.5} />
          </div>
          <h3 className="text-lg font-bold mb-2" style={{ color: C.text, fontFamily: "'Plus Jakarta Sans', sans-serif", letterSpacing: "-0.02em" }}>
            ¿Segura que quieres salir?
          </h3>
          <p className="text-sm leading-relaxed mb-7" style={{ color: C.muted }}>
            Si vuelves al inicio, este análisis y su contenido serán eliminados de forma permanente. No se guarda ninguna información.
          </p>
          <div className="flex gap-3">
            <button
              onClick={onCancel}
              className="flex-1 py-3 rounded-2xl text-sm font-semibold transition-all duration-150 active:scale-95"
              style={{ background: C.surfA, color: C.medium, border: `1px solid ${C.border}` }}
            >
              Cancelar
            </button>
            <button
              onClick={onConfirm}
              className="flex-1 py-3 rounded-2xl text-sm font-semibold text-white transition-all duration-150 active:scale-95"
              style={{ background: C.btnGrad, boxShadow: C.btnShadow }}
              onMouseEnter={(e) => { (e.currentTarget as HTMLButtonElement).style.background = C.btnHoverGrad; }}
              onMouseLeave={(e) => { (e.currentTarget as HTMLButtonElement).style.background = C.btnGrad; }}
            >
              Aceptar
            </button>
          </div>
        </div>
      </div>
    </>
  );
}

// ─── Analysis Page ────────────────────────────────────────────────────────────

function AnalysisPage({ onSupportClick, onBack, onPlansClick }: { onSupportClick: () => void; onBack: () => void; onPlansClick: () => void }) {
  const [state, setState] = useState<AnalysisState>("upload");
  const [confirmOpen, setConfirmOpen] = useState(false);

  const handleFileReady = () => {
    setState("loading");
    setTimeout(() => setState("results"), 5000);
  };

  return (
    <main className="min-h-screen pt-28 pb-20 px-6 md:px-12" style={{ background: C.bg }}>
      <ConfirmBackModal
        open={confirmOpen}
        onConfirm={() => { setConfirmOpen(false); onBack(); }}
        onCancel={() => setConfirmOpen(false)}
      />

      <div className="max-w-xl mx-auto mb-6">
        <button
          onClick={() => setConfirmOpen(true)}
          className="flex items-center gap-1.5 text-sm font-medium group transition-all duration-150"
          style={{ color: C.primary }}
        >
          <ArrowLeft size={16} strokeWidth={2.5} className="transition-transform duration-150 group-hover:-translate-x-0.5" />
          Volver al inicio
        </button>
      </div>

      <div className="max-w-xl mx-auto">
        {state !== "results" && (
          <div className="text-center mb-10">
            <h2 className="text-2xl font-bold mb-2" style={{ color: C.text, fontFamily: "'Plus Jakarta Sans', sans-serif", letterSpacing: "-0.03em" }}>
              {state === "upload" ? "Analizar conversación" : "Procesando..."}
            </h2>
            <p className="text-sm" style={{ color: C.muted }}>
              {state === "upload" ? "Tu privacidad está completamente protegida durante todo el proceso." : "Por favor, no cierres esta ventana."}
            </p>
          </div>
        )}
        {state === "upload"   && <UploadZone onFileReady={handleFileReady} />}
        {state === "loading"  && <LoadingState />}
        {state === "results"  && <ResultsState onSupportClick={onSupportClick} onPlansClick={onPlansClick} />}
      </div>
    </main>
  );
}

// ─── Support Panel ────────────────────────────────────────────────────────────

function SupportPanel({ open, onClose }: { open: boolean; onClose: () => void }) {
  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    return () => { document.body.style.overflow = ""; };
  }, [open]);

  const contacts = [
    { icon: <Phone size={16} strokeWidth={2} />, label: "Fono 149",        sub: "Prevención y apoyo en Violencia Intrafamiliar (Carabineros de Chile)" },
    { icon: <Phone size={16} strokeWidth={2} />, label: "Fono 1455",       sub: "Fono de orientación y guía en violencias de género (Sernameg)" },
    { icon: <MessageCircle size={16} strokeWidth={2} />, label: "+56 9 9700 7000", sub: "Canal de WhatsApp Silencioso — Asistencia discreta y segura" },
    { icon: <Scale size={16} strokeWidth={2} />, label: "Fiscalía",        sub: "Denuncias y orientación legal — 600 333 0000" },
  ];
  const portals = [
    { label: "minmujeryeg.gob.cl",           sub: "Ministerio de la Mujer y la Equidad de Género",        url: "https://minmujeryeg.gob.cl" },
    { label: "nomasviolenciacontramujeres.cl", sub: "Red Chilena contra la Violencia hacia las Mujeres",   url: "http://nomasviolenciacontramujeres.cl" },
  ];

  return (
    <>
      <div
        onClick={onClose}
        className="fixed inset-0 z-40 transition-opacity duration-300"
        style={{ background: "rgba(47,41,58,0.4)", backdropFilter: "blur(2px)", opacity: open ? 1 : 0, pointerEvents: open ? "auto" : "none" }}
      />
      <div
        className="fixed top-0 right-0 h-full z-50 overflow-y-auto"
        style={{
          width: "min(420px,100vw)", background: C.support,
          boxShadow: "-8px 0 40px rgba(94,84,115,0.15)",
          transform: open ? "translateX(0)" : "translateX(100%)",
          transition: "transform 0.35s cubic-bezier(0.32,0,0.16,1)",
        }}
      >
        {/* Header */}
        <div
          className="sticky top-0 flex items-center justify-between px-6 py-5"
          style={{ background: C.support, backdropFilter: "blur(12px)", borderBottom: `1px solid ${C.border}` }}
        >
          <div className="flex items-center gap-2">
            <Shield size={18} style={{ color: C.primary }} strokeWidth={2} />
            <h2 className="font-bold text-base" style={{ color: C.text }}>Red de Apoyo</h2>
          </div>
          <button
            onClick={onClose}
            className="w-8 h-8 rounded-full flex items-center justify-center"
            style={{ background: C.surfB }}
          >
            <X size={16} style={{ color: C.medium }} />
          </button>
        </div>

        <div className="px-6 py-6 space-y-6">
          <p className="text-sm leading-relaxed" style={{ color: C.muted }}>
            Si necesitas apoyo, estas organizaciones pueden ayudarte de manera confidencial y gratuita. No estás sola.
          </p>

          <div className="space-y-3">
            {contacts.map((c, i) => (
              <div key={i} className="rounded-xl p-4 flex items-start gap-3" style={{ background: C.surfA, border: `1px solid ${C.border}` }}>
                <div className="w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5" style={{ background: C.surfB, color: C.primary }}>
                  {c.icon}
                </div>
                <div>
                  <p className="font-bold text-sm" style={{ color: C.text }}>{c.label}</p>
                  <p className="text-xs mt-0.5 leading-snug" style={{ color: C.muted }}>{c.sub}</p>
                </div>
              </div>
            ))}
          </div>

          <div>
            <div className="flex items-center gap-2 mb-3">
              <Globe size={14} style={{ color: C.primaryLt }} />
              <span className="text-xs font-semibold uppercase tracking-wide" style={{ color: C.primaryLt }}>Portales Institucionales</span>
            </div>
            <div className="space-y-2">
              {portals.map((p, i) => (
                <a key={i} href={p.url} target="_blank" rel="noopener noreferrer" className="block rounded-xl p-4" style={{ background: C.surfA, border: `1px solid ${C.border}` }}>
                  <p className="font-semibold text-xs" style={{ color: C.primary }}>{p.label}</p>
                  <p className="text-xs mt-0.5" style={{ color: C.muted }}>{p.sub}</p>
                </a>
              ))}
            </div>
          </div>

          <div className="rounded-xl p-4 text-xs leading-relaxed" style={{ background: C.surfA, color: C.muted }}>
            <Lock size={11} className="inline mr-1.5 align-middle" style={{ color: C.primaryLt }} />
            Todos los servicios listados son gratuitos, confidenciales y operados por instituciones oficiales o reconocidas.
          </div>
        </div>
      </div>
    </>
  );
}

// ─── App ──────────────────────────────────────────────────────────────────────

export default function App() {
  const [page, setPage] = useState<Page>("landing");
  const [prevPage, setPrevPage] = useState<Page>("landing");
  const [supportOpen, setSupportOpen] = useState(false);
  const [theme, setTheme] = useState<Theme>("light");

  useEffect(() => { applyTheme("light"); }, []);

  const handleThemeChange = (t: Theme) => { setTheme(t); applyTheme(t); };

  const goToPlans = () => { setPrevPage(page); setPage("plans"); };
  const goBack = () => setPage(prevPage);

  return (
    <div style={{ fontFamily: "'Plus Jakarta Sans', system-ui, sans-serif", background: C.bg, minHeight: "100vh" }}>
      <Navbar onSupportClick={() => setSupportOpen(true)} theme={theme} onThemeChange={handleThemeChange} />

      {page === "landing" && (
        <LandingPage onCTAClick={() => setPage("analysis")} onPlansClick={goToPlans} />
      )}
      {page === "analysis" && (
        <AnalysisPage onSupportClick={() => setSupportOpen(true)} onBack={() => setPage("landing")} onPlansClick={goToPlans} />
      )}
      {page === "plans" && (
        <PlansPage onBack={goBack} />
      )}

      <SupportPanel open={supportOpen} onClose={() => setSupportOpen(false)} />
    </div>
  );
}
