"use client";

import { useEffect, useRef, useState, useCallback } from "react";
import Image from "next/image";

/* ─────────────────────── INTERSECTION OBSERVER HOOK ─────────────────────── */
function useInView(threshold = 0.15) {
  const ref = useRef<HTMLDivElement>(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const obs = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setVisible(true);
          obs.disconnect();
        }
      },
      { threshold }
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, [threshold]);

  return { ref, visible };
}

/* ─────────────────────── ANIMATED COUNTER HOOK ─────────────────────── */
function useCounter(target: number, visible: boolean, duration = 2000) {
  const [count, setCount] = useState(0);

  useEffect(() => {
    if (!visible) return;
    let start = 0;
    const increment = target / (duration / 16);
    const timer = setInterval(() => {
      start += increment;
      if (start >= target) {
        setCount(target);
        clearInterval(timer);
      } else {
        setCount(Math.floor(start));
      }
    }, 16);
    return () => clearInterval(timer);
  }, [visible, target, duration]);

  return count;
}

/* ─────────────────────── SVG ICONS ─────────────────────── */
const PhoneIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
    <path strokeLinecap="round" strokeLinejoin="round" d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
  </svg>
);

const MenuIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
    <path strokeLinecap="round" strokeLinejoin="round" d="M4 6h16M4 12h16M4 18h16" />
  </svg>
);

const CloseIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
    <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
  </svg>
);

const StarIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" className="w-5 h-5 text-accent" fill="currentColor" viewBox="0 0 24 24">
    <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
  </svg>
);

const ChevronDown = () => (
  <svg xmlns="http://www.w3.org/2000/svg" className="w-5 h-5 animate-bounce" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
    <path strokeLinecap="round" strokeLinejoin="round" d="M19 14l-7 7m0 0l-7-7m7 7V3" />
  </svg>
);

/* Service Icons */
const PanelIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" className="w-10 h-10" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
    <path strokeLinecap="round" strokeLinejoin="round" d="M5 3h14a2 2 0 012 2v14a2 2 0 01-2 2H5a2 2 0 01-2-2V5a2 2 0 012-2zm3 4h2v4H8V7zm6 0h2v4h-2V7zm-6 6h2v4H8v-4zm6 0h2v4h-2v-4z" />
  </svg>
);

const WiringIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" className="w-10 h-10" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
    <path strokeLinecap="round" strokeLinejoin="round" d="M13 10V3L4 14h7v7l9-11h-7z" />
  </svg>
);

const LightIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" className="w-10 h-10" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
    <path strokeLinecap="round" strokeLinejoin="round" d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
  </svg>
);

const GeneratorIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" className="w-10 h-10" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
    <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 13.5l10.5-11.25L12 10.5h8.25L9.75 21.75 12 13.5H3.75z" />
  </svg>
);

const EVIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" className="w-10 h-10" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
    <path strokeLinecap="round" strokeLinejoin="round" d="M8.25 18.75a1.5 1.5 0 01-3 0m3 0a1.5 1.5 0 00-3 0m3 0h6m-9 0H3.375a1.125 1.125 0 01-1.125-1.125V14.25m17.25 4.5a1.5 1.5 0 01-3 0m3 0a1.5 1.5 0 00-3 0m3 0h1.125c.621 0 1.129-.504 1.09-1.124a17.902 17.902 0 00-3.213-9.193 2.056 2.056 0 00-1.58-.86H14.25M16.5 18.75h-2.25m0-11.177v-.958c0-.568-.422-1.048-.987-1.106a48.554 48.554 0 00-10.026 0 1.106 1.106 0 00-.987 1.106v7.635m12-6.677v6.677m0 4.5v-4.5m0 0h-12" />
  </svg>
);

const TroubleshootIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" className="w-10 h-10" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
    <path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-5.197-5.197m0 0A7.5 7.5 0 105.196 5.196a7.5 7.5 0 0010.607 10.607z" />
  </svg>
);

const ConstructionIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" className="w-10 h-10" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
    <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 21h19.5m-18-18v18m10.5-18v18m6-13.5V21M6.75 6.75h.75m-.75 3h.75m-.75 3h.75m3-6h.75m-.75 3h.75m-.75 3h.75M6.75 21v-3.375c0-.621.504-1.125 1.125-1.125h2.25c.621 0 1.125.504 1.125 1.125V21M3 3h12m-.75 4.5H21m-3.75 0h.008v.008h-.008V7.5z" />
  </svg>
);

const InspectionIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" className="w-10 h-10" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
    <path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75L11.25 15 15 9.75m-3-7.036A11.959 11.959 0 013.598 6 11.99 11.99 0 003 9.749c0 5.592 3.824 10.29 9 11.623 5.176-1.332 9-6.03 9-11.622 0-1.31-.21-2.571-.598-3.751h-.152c-3.196 0-6.1-1.248-8.25-3.285z" />
  </svg>
);

/* Process Step Icons */
const PhoneCallIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" className="w-8 h-8" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
    <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 6.75c0 8.284 6.716 15 15 15h2.25a2.25 2.25 0 002.25-2.25v-1.372c0-.516-.351-.966-.852-1.091l-4.423-1.106c-.44-.11-.902.055-1.173.417l-.97 1.293c-.282.376-.769.542-1.21.38a12.035 12.035 0 01-7.143-7.143c-.162-.441.004-.928.38-1.21l1.293-.97c.363-.271.527-.734.417-1.173L6.963 3.102a1.125 1.125 0 00-1.091-.852H4.5A2.25 2.25 0 002.25 4.5v2.25z" />
  </svg>
);

const ClipboardIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" className="w-8 h-8" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
    <path strokeLinecap="round" strokeLinejoin="round" d="M9 12h3.75M9 15h3.75M9 18h3.75m3 .75H18a2.25 2.25 0 002.25-2.25V6.108c0-1.135-.845-2.098-1.976-2.192a48.424 48.424 0 00-1.123-.08m-5.801 0c-.065.21-.1.433-.1.664 0 .414.336.75.75.75h4.5a.75.75 0 00.75-.75 2.25 2.25 0 00-.1-.664m-5.8 0A2.251 2.251 0 0113.5 2.25H15c1.012 0 1.867.668 2.15 1.586m-5.8 0c-.376.023-.75.05-1.124.08C9.095 4.01 8.25 4.973 8.25 6.108V8.25m0 0H4.875c-.621 0-1.125.504-1.125 1.125v11.25c0 .621.504 1.125 1.125 1.125h9.75c.621 0 1.125-.504 1.125-1.125V9.375c0-.621-.504-1.125-1.125-1.125H8.25z" />
  </svg>
);

const WrenchIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" className="w-8 h-8" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
    <path strokeLinecap="round" strokeLinejoin="round" d="M21.75 6.75a4.5 4.5 0 01-4.884 4.484c-1.076-.091-2.264.071-2.95.904l-7.152 8.684a2.548 2.548 0 11-3.586-3.586l8.684-7.152c.833-.686.995-1.874.904-2.95a4.5 4.5 0 016.336-4.486l-3.276 3.276a3.004 3.004 0 002.25 2.25l3.276-3.276c.256.565.398 1.192.398 1.852z" />
  </svg>
);

const CheckCircleIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" className="w-8 h-8" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
    <path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75L11.25 15 15 9.75M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
  </svg>
);

/* ─────────────────────── DATA ─────────────────────── */
const NAV_LINKS = [
  { href: "#services", label: "Services" },
  { href: "#process", label: "How It Works" },
  { href: "#about", label: "About" },
  { href: "#testimonials", label: "Reviews" },
  { href: "#contact", label: "Contact" },
];

const SERVICES = [
  { title: "Electrical Panel Upgrades", desc: "Upgrade your outdated panel to meet modern electrical demands. We handle 100A to 400A upgrades with full permits and inspections.", icon: <PanelIcon /> },
  { title: "Residential Wiring", desc: "Complete home wiring and rewiring for new construction, renovations, and older homes that need modern electrical systems.", icon: <WiringIcon /> },
  { title: "Lighting Installation", desc: "From recessed lighting to chandeliers, landscape lighting to smart controls. We design and install lighting that transforms spaces.", icon: <LightIcon /> },
  { title: "Generator Installation", desc: "Authorized Generac and Briggs & Stratton dealer. Whole-home standby generators sized, installed, and maintained by experts.", icon: <GeneratorIcon /> },
  { title: "EV Charger Installation", desc: "Level 2 charging stations for Tesla, Ford, Chevy, and all electric vehicles. Fast, code-compliant installation in your garage or driveway.", icon: <EVIcon /> },
  { title: "Electrical Troubleshooting", desc: "Flickering lights? Tripping breakers? Our diagnostic experts find and fix electrical issues quickly and safely.", icon: <TroubleshootIcon /> },
  { title: "New Construction Wiring", desc: "Full electrical systems for new builds — from rough-in to final trim. We work with builders and homeowners to deliver code-perfect results.", icon: <ConstructionIcon /> },
  { title: "Safety Inspections", desc: "Comprehensive electrical safety inspections for homes and businesses. Identify hazards before they become emergencies.", icon: <InspectionIcon /> },
];

const PROCESS_STEPS = [
  { num: 1, title: "Call Us", desc: "Reach out by phone or form. We respond within hours, not days.", icon: <PhoneCallIcon /> },
  { num: 2, title: "Free Estimate", desc: "We visit your property, assess the work, and provide an honest, transparent quote — no hidden fees.", icon: <ClipboardIcon /> },
  { num: 3, title: "Expert Installation", desc: "Our licensed electricians complete the work efficiently, cleanly, and up to NJ code standards.", icon: <WrenchIcon /> },
  { num: 4, title: "Final Inspection", desc: "Every job is inspected and tested. We don't leave until you're 100% satisfied and everything passes code.", icon: <CheckCircleIcon /> },
];

const TESTIMONIALS = [
  {
    name: "David R.",
    location: "Lakewood, NJ",
    text: "TruPower upgraded our entire panel and rewired our kitchen. The crew was professional, clean, and finished ahead of schedule. Truly top-notch work — I recommend them to everyone.",
    rating: 5,
  },
  {
    name: "Sarah M.",
    location: "Toms River, NJ",
    text: "We needed a Generac generator installed before storm season. TruPower handled everything from permits to final inspection. Fair price, honest people, zero stress.",
    rating: 5,
  },
  {
    name: "Michael K.",
    location: "Jackson, NJ",
    text: "Had a mysterious electrical issue that two other electricians couldn't figure out. TruPower diagnosed it in 30 minutes and fixed it on the spot. These guys know their craft.",
    rating: 5,
  },
  {
    name: "Rachel L.",
    location: "Lakewood, NJ",
    text: "Installed an EV charger in our garage. They were on time, explained everything clearly, and the price was exactly what they quoted. No surprises. Will definitely use again.",
    rating: 5,
  },
];

/* ─────────────────────── STAT BAR ITEM ─────────────────────── */
function StatItem({
  target,
  suffix,
  label,
  visible,
}: {
  target: number;
  suffix: string;
  label: string;
  visible: boolean;
}) {
  const count = useCounter(target, visible);
  return (
    <div className="text-center px-4 py-3">
      <div className="text-3xl md:text-4xl font-extrabold text-accent">
        {count.toLocaleString()}
        {suffix}
      </div>
      <div className="text-sm md:text-base text-white/80 mt-1 font-medium">{label}</div>
    </div>
  );
}

/* ─────────────────────── MAIN PAGE ─────────────────────── */
export default function Home() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const statRef = useInView(0.3);

  /* ── Scroll handler for nav shadow ── */
  useEffect(() => {
    const handler = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", handler, { passive: true });
    return () => window.removeEventListener("scroll", handler);
  }, []);

  /* ── Add js-ready class + Fade-up observer ── */
  useEffect(() => {
    let observer: IntersectionObserver | null = null;

    // Add js-ready to enable CSS transitions, then observe
    document.documentElement.classList.add("js-ready");

    // Use rAF to let the browser paint the hidden state first
    const raf = requestAnimationFrame(() => {
      observer = new IntersectionObserver(
        (entries) => {
          entries.forEach((entry) => {
            if (entry.isIntersecting) {
              entry.target.classList.add("visible");
              observer?.unobserve(entry.target);
            }
          });
        },
        { threshold: 0.05, rootMargin: "0px 0px 50px 0px" }
      );
      document.querySelectorAll(".fade-up").forEach((el) => observer!.observe(el));
    });

    return () => {
      cancelAnimationFrame(raf);
      observer?.disconnect();
    };
  }, []);

  const scrollTo = useCallback((id: string) => {
    setMenuOpen(false);
    const el = document.getElementById(id);
    if (el) el.scrollIntoView({ behavior: "smooth" });
  }, []);

  return (
    <>
      {/* ═══════════════════ NAV (DARK-SOLID) ═══════════════════ */}
      <nav
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
          scrolled ? "bg-primary shadow-xl" : "bg-primary"
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-20">
            {/* Logo */}
            <a href="#" onClick={(e) => { e.preventDefault(); window.scrollTo({ top: 0, behavior: "smooth" }); }} className="flex-shrink-0">
              <Image
                src="/logo-white.png"
                alt="TruPower Electric"
                width={180}
                height={50}
                className="h-10 md:h-12 w-auto"
                priority
              />
            </a>

            {/* Desktop links */}
            <div className="hidden lg:flex items-center gap-8">
              {NAV_LINKS.map((link) => (
                <button
                  key={link.href}
                  onClick={() => scrollTo(link.href.slice(1))}
                  className="text-white/80 hover:text-accent transition-colors font-medium text-sm tracking-wide uppercase"
                >
                  {link.label}
                </button>
              ))}
              <a
                href="tel:7326065099"
                className="flex items-center gap-2 bg-accent hover:bg-accent-light text-primary font-bold px-5 py-2.5 rounded-lg transition-all hover:shadow-lg hover:shadow-accent/20"
              >
                <PhoneIcon />
                (732) 606-5099
              </a>
            </div>

            {/* Mobile hamburger */}
            <button
              onClick={() => setMenuOpen(!menuOpen)}
              className="lg:hidden text-white p-2"
              aria-label="Toggle menu"
            >
              {menuOpen ? <CloseIcon /> : <MenuIcon />}
            </button>
          </div>
        </div>

        {/* Mobile menu */}
        <div
          className={`lg:hidden overflow-hidden transition-all duration-300 ${
            menuOpen ? "max-h-96 opacity-100" : "max-h-0 opacity-0"
          }`}
        >
          <div className="px-4 pb-6 pt-2 space-y-3 bg-primary border-t border-white/10">
            {NAV_LINKS.map((link) => (
              <button
                key={link.href}
                onClick={() => scrollTo(link.href.slice(1))}
                className="block w-full text-left text-white/80 hover:text-accent py-2 font-medium uppercase text-sm tracking-wide"
              >
                {link.label}
              </button>
            ))}
            <a
              href="tel:7326065099"
              className="flex items-center justify-center gap-2 bg-accent hover:bg-accent-light text-primary font-bold px-5 py-3 rounded-lg mt-3 transition-all"
            >
              <PhoneIcon />
              (732) 606-5099
            </a>
          </div>
        </div>
      </nav>

      {/* ═══════════════════ HERO SPLIT ═══════════════════ */}
      <section className="relative pt-20 bg-gradient-to-br from-primary via-primary-light to-primary min-h-[90vh] flex items-center overflow-hidden">
        {/* Subtle pattern overlay */}
        <div className="absolute inset-0 opacity-5" style={{ backgroundImage: "url(\"data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23ffffff' fill-opacity='1'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E\")" }} />

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full py-16 md:py-24">
          <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">
            {/* Text left */}
            <div className="fade-up">
              <div className="inline-flex items-center gap-2 bg-accent/10 border border-accent/30 rounded-full px-4 py-1.5 mb-6">
                <span className="w-2 h-2 bg-accent rounded-full animate-pulse" />
                <span className="text-accent text-sm font-semibold tracking-wide">NJ Licensed #34EB01826800</span>
              </div>
              <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold text-white leading-tight mb-6">
                Licensed Electricians{" "}
                <span className="text-accent">You Can Trust</span>
              </h1>
              <p className="text-lg sm:text-xl text-white/70 mb-8 leading-relaxed max-w-xl">
                Serving Lakewood, NJ and surrounding areas with expert electrical services. From panel upgrades to generator installations — we do it right the first time.
              </p>
              <div className="flex flex-col sm:flex-row gap-4">
                <a
                  href="tel:7326065099"
                  className="inline-flex items-center justify-center gap-3 bg-accent hover:bg-accent-light text-primary font-bold text-lg px-8 py-4 rounded-xl transition-all hover:shadow-xl hover:shadow-accent/30 hover:-translate-y-0.5"
                >
                  <PhoneIcon />
                  Get a Free Estimate
                </a>
                <button
                  onClick={() => scrollTo("services")}
                  className="inline-flex items-center justify-center gap-2 border-2 border-white/30 hover:border-white/60 text-white font-semibold text-lg px-8 py-4 rounded-xl transition-all hover:bg-white/5"
                >
                  Our Services
                  <ChevronDown />
                </button>
              </div>
              {/* Trust badges */}
              <div className="flex flex-wrap items-center gap-6 mt-10 text-white/50 text-sm">
                <div className="flex items-center gap-2">
                  <svg xmlns="http://www.w3.org/2000/svg" className="w-5 h-5 text-accent" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75L11.25 15 15 9.75m-3-7.036A11.959 11.959 0 013.598 6 11.99 11.99 0 003 9.749c0 5.592 3.824 10.29 9 11.623 5.176-1.332 9-6.03 9-11.622 0-1.31-.21-2.571-.598-3.751h-.152c-3.196 0-6.1-1.248-8.25-3.285z" />
                  </svg>
                  Licensed & Insured
                </div>
                <div className="flex items-center gap-2">
                  <svg xmlns="http://www.w3.org/2000/svg" className="w-5 h-5 text-accent" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
                  </svg>
                  5.0 Google Rating
                </div>
                <div className="flex items-center gap-2">
                  <svg xmlns="http://www.w3.org/2000/svg" className="w-5 h-5 text-accent" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M12 6v6h4.5m4.5 0a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                  Same-Day Service
                </div>
              </div>
            </div>

            {/* Image right */}
            <div className="fade-up relative">
              <div className="relative rounded-2xl overflow-hidden shadow-2xl shadow-black/30">
                <Image
                  src="/hero.jpg"
                  alt="TruPower Electric - Licensed electrician working on residential electrical panel"
                  width={700}
                  height={800}
                  className="w-full h-[400px] md:h-[550px] object-cover"
                  priority
                />
                {/* Overlay gradient */}
                <div className="absolute inset-0 bg-gradient-to-t from-primary/40 via-transparent to-transparent" />
              </div>
              {/* Floating badge */}
              <div className="absolute -bottom-4 -left-4 md:-bottom-6 md:-left-6 bg-white rounded-xl shadow-xl p-4 md:p-5">
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 bg-accent/10 rounded-full flex items-center justify-center">
                    <svg xmlns="http://www.w3.org/2000/svg" className="w-6 h-6 text-accent" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                      <path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75L11.25 15 15 9.75M21 12c0 1.268-.63 2.39-1.593 3.068a3.745 3.745 0 01-1.043 3.296 3.745 3.745 0 01-3.296 1.043A3.745 3.745 0 0112 21c-1.268 0-2.39-.63-3.068-1.593a3.746 3.746 0 01-3.296-1.043 3.745 3.745 0 01-1.043-3.296A3.745 3.745 0 013 12c0-1.268.63-2.39 1.593-3.068a3.745 3.745 0 011.043-3.296 3.746 3.746 0 013.296-1.043A3.746 3.746 0 0112 3c1.268 0 2.39.63 3.068 1.593a3.746 3.746 0 013.296 1.043 3.746 3.746 0 011.043 3.296A3.745 3.745 0 0121 12z" />
                    </svg>
                  </div>
                  <div>
                    <div className="font-bold text-primary text-sm">Generac Authorized</div>
                    <div className="text-text-light text-xs">Dealer & Installer</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ═══════════════════ STAT BAR (ANIMATED — SIGNATURE) ═══════════════════ */}
      <section ref={statRef.ref} className="relative bg-primary py-8 md:py-10 border-y-4 border-accent">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-8">
            <StatItem target={15} suffix="+" label="Years Experience" visible={statRef.visible} />
            <StatItem target={2000} suffix="+" label="Jobs Completed" visible={statRef.visible} />
            <StatItem target={5} suffix=".0" label="Google Rating" visible={statRef.visible} />
            <div className="text-center px-4 py-3">
              <div className="text-3xl md:text-4xl font-extrabold text-accent">NJ</div>
              <div className="text-sm md:text-base text-white/80 mt-1 font-medium">Licensed #34EB01826800</div>
            </div>
          </div>
        </div>
      </section>

      {/* ═══════════════════ PROCESS TIMELINE ═══════════════════ */}
      <section id="process" className="py-20 md:py-28 bg-light">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16 fade-up">
            <span className="text-accent font-bold text-sm uppercase tracking-widest">How It Works</span>
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-primary mt-3">
              Simple. Transparent. Professional.
            </h2>
            <p className="text-text-light text-lg mt-4 max-w-2xl mx-auto">
              From your first call to final inspection, we make the process effortless.
            </p>
          </div>

          {/* Timeline */}
          <div className="relative">
            {/* Desktop connecting line */}
            <div className="hidden md:block absolute top-[60px] left-[12.5%] right-[12.5%] h-1 bg-accent/20 rounded-full" />

            <div className="grid md:grid-cols-4 gap-8 md:gap-6 stagger-children">
              {PROCESS_STEPS.map((step) => (
                <div key={step.num} className="fade-up relative text-center">
                  {/* Step number circle */}
                  <div className="relative z-10 mx-auto w-[72px] h-[72px] bg-primary rounded-full flex items-center justify-center mb-6 shadow-lg shadow-primary/20">
                    <div className="absolute -top-2 -right-2 w-7 h-7 bg-accent rounded-full flex items-center justify-center text-primary font-bold text-sm shadow-md">
                      {step.num}
                    </div>
                    <div className="text-accent">{step.icon}</div>
                  </div>
                  <h3 className="text-xl font-bold text-primary mb-2">{step.title}</h3>
                  <p className="text-text-light leading-relaxed">{step.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ═══════════════════ SERVICES GRID ═══════════════════ */}
      <section id="services" className="py-20 md:py-28 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16 fade-up">
            <span className="text-accent font-bold text-sm uppercase tracking-widest">What We Do</span>
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-primary mt-3">
              Our Electrical Services
            </h2>
            <p className="text-text-light text-lg mt-4 max-w-2xl mx-auto">
              From routine repairs to complex installations, our licensed team handles it all.
            </p>
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6 stagger-children">
            {SERVICES.map((service) => (
              <div
                key={service.title}
                className="fade-up group bg-white rounded-xl border border-gray-100 shadow-sm hover:shadow-xl transition-all duration-300 hover:-translate-y-1 overflow-hidden"
              >
                {/* Accent top bar */}
                <div className="h-1.5 bg-accent w-full" />
                <div className="p-6">
                  <div className="w-14 h-14 bg-accent/10 rounded-xl flex items-center justify-center mb-4 text-accent group-hover:bg-accent group-hover:text-white transition-all duration-300">
                    {service.icon}
                  </div>
                  <h3 className="text-lg font-bold text-primary mb-2">{service.title}</h3>
                  <p className="text-text-light text-sm leading-relaxed">{service.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ═══════════════════ ABOUT SECTION ═══════════════════ */}
      <section id="about" className="py-20 md:py-28 bg-light">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-12 lg:gap-20 items-center">
            {/* Image left */}
            <div className="fade-up relative">
              <div className="rounded-2xl overflow-hidden shadow-xl">
                <Image
                  src="/about.jpg"
                  alt="TruPower Electric team"
                  width={700}
                  height={500}
                  className="w-full h-[350px] md:h-[450px] object-cover"
                />
              </div>
              {/* Experience badge */}
              <div className="absolute -bottom-6 -right-4 md:-right-8 bg-accent text-primary rounded-xl shadow-xl p-5 md:p-6">
                <div className="text-3xl md:text-4xl font-extrabold">15+</div>
                <div className="text-sm font-bold uppercase tracking-wide">Years</div>
              </div>
            </div>

            {/* Text right */}
            <div className="fade-up">
              <span className="text-accent font-bold text-sm uppercase tracking-widest">About TruPower</span>
              <h2 className="text-3xl sm:text-4xl font-extrabold text-primary mt-3 mb-6">
                Powering Homes & Businesses{" "}
                <span className="text-accent">Since Day One</span>
              </h2>
              <p className="text-text-light text-lg leading-relaxed mb-6">
                TruPower Electric & Security LLC was built on a simple promise: do honest work at fair prices. Based in Lakewood, NJ, our team of licensed electricians brings decades of combined experience to every job — from a single outlet repair to full commercial build-outs.
              </p>
              <p className="text-text-light text-lg leading-relaxed mb-8">
                As an authorized Generac and Briggs & Stratton dealer, we specialize in standby generator systems that keep your family safe during outages. Every job is done to code, inspected, and backed by our satisfaction guarantee.
              </p>

              {/* Highlights */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {[
                  "NJ Licensed & Insured",
                  "Generac Authorized Dealer",
                  "Free Estimates",
                  "Same-Day Emergency Service",
                  "Clean & Professional",
                  "100% Satisfaction Guarantee",
                ].map((item) => (
                  <div key={item} className="flex items-center gap-2 text-text">
                    <svg xmlns="http://www.w3.org/2000/svg" className="w-5 h-5 text-accent flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                      <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 12.75l6 6 9-13.5" />
                    </svg>
                    <span className="text-sm font-medium">{item}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ═══════════════════ TESTIMONIALS ═══════════════════ */}
      <section id="testimonials" className="py-20 md:py-28 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16 fade-up">
            <span className="text-accent font-bold text-sm uppercase tracking-widest">Testimonials</span>
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-primary mt-3">
              What Our Customers Say
            </h2>
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6 stagger-children">
            {TESTIMONIALS.map((t) => (
              <div
                key={t.name}
                className="fade-up bg-white rounded-xl border border-gray-100 shadow-sm hover:shadow-lg transition-all duration-300 p-6"
              >
                {/* Stars */}
                <div className="flex gap-0.5 mb-4">
                  {Array.from({ length: t.rating }).map((_, i) => (
                    <StarIcon key={i} />
                  ))}
                </div>
                <p className="text-text-light leading-relaxed mb-5 text-sm">
                  &ldquo;{t.text}&rdquo;
                </p>
                <div className="border-t border-gray-100 pt-4">
                  <div className="font-bold text-primary">{t.name}</div>
                  <div className="text-text-light text-sm">{t.location}</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ═══════════════════ CTA SECTION ═══════════════════ */}
      <section id="contact" className="relative py-20 md:py-28 bg-primary overflow-hidden">
        {/* Background pattern */}
        <div className="absolute inset-0 opacity-5" style={{ backgroundImage: "url(\"data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23ffffff' fill-opacity='1'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E\")" }} />
        {/* Amber glow */}
        <div className="absolute top-0 right-0 w-96 h-96 bg-accent/10 rounded-full blur-3xl" />
        <div className="absolute bottom-0 left-0 w-64 h-64 bg-accent/5 rounded-full blur-3xl" />

        <div className="relative max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center fade-up">
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-white mb-6">
            Ready to Get Started?
          </h2>
          <p className="text-xl text-white/70 mb-10 max-w-2xl mx-auto">
            Whether it&apos;s an emergency repair or a planned upgrade, our team is ready to help. Call now for a free, no-obligation estimate.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a
              href="tel:7326065099"
              className="inline-flex items-center justify-center gap-3 bg-accent hover:bg-accent-light text-primary font-bold text-lg px-10 py-5 rounded-xl transition-all hover:shadow-xl hover:shadow-accent/30 hover:-translate-y-1"
            >
              <PhoneIcon />
              (732) 606-5099
            </a>
          </div>
          <div className="mt-8 flex flex-wrap items-center justify-center gap-6 text-white/50 text-sm">
            <span>Mon-Thu: 7am - 6pm</span>
            <span className="hidden sm:inline">|</span>
            <span>Fri: 7am - 1pm</span>
            <span className="hidden sm:inline">|</span>
            <span>Sun: By Appointment</span>
          </div>
        </div>
      </section>

      {/* ═══════════════════ FOOTER ═══════════════════ */}
      <footer className="bg-[#081B2E] py-12 md:py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-3 gap-10 md:gap-16">
            {/* Brand */}
            <div>
              <Image
                src="/logo-white.png"
                alt="TruPower Electric"
                width={160}
                height={45}
                className="h-10 w-auto mb-4"
              />
              <p className="text-white/50 leading-relaxed text-sm">
                Licensed electrical contractor serving Lakewood, NJ and all of Ocean County. Expert service, honest pricing, guaranteed satisfaction.
              </p>
            </div>

            {/* Services */}
            <div>
              <h4 className="text-white font-bold mb-4 uppercase text-sm tracking-wider">Services</h4>
              <ul className="space-y-2">
                {["Panel Upgrades", "Residential Wiring", "Generator Installation", "EV Chargers", "Lighting", "Safety Inspections"].map((s) => (
                  <li key={s}>
                    <span className="text-white/50 hover:text-accent transition-colors text-sm cursor-default">{s}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Contact */}
            <div>
              <h4 className="text-white font-bold mb-4 uppercase text-sm tracking-wider">Contact</h4>
              <ul className="space-y-3">
                <li>
                  <a href="tel:7326065099" className="flex items-center gap-2 text-white/50 hover:text-accent transition-colors text-sm">
                    <PhoneIcon />
                    (732) 606-5099
                  </a>
                </li>
                <li className="flex items-start gap-2 text-white/50 text-sm">
                  <svg xmlns="http://www.w3.org/2000/svg" className="w-5 h-5 flex-shrink-0 mt-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M15 10.5a3 3 0 11-6 0 3 3 0 016 0z" />
                    <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 10.5c0 7.142-7.5 11.25-7.5 11.25S4.5 17.642 4.5 10.5a7.5 7.5 0 0115 0z" />
                  </svg>
                  Lakewood, NJ 08701
                </li>
                <li className="flex items-start gap-2 text-white/50 text-sm">
                  <svg xmlns="http://www.w3.org/2000/svg" className="w-5 h-5 flex-shrink-0 mt-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M12 6v6h4.5m4.5 0a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                  <div>
                    <div>Mon-Thu: 7am - 6pm</div>
                    <div>Fri: 7am - 1pm</div>
                    <div>Sun: By Appointment</div>
                  </div>
                </li>
              </ul>
            </div>
          </div>

          <div className="border-t border-white/10 mt-10 pt-8 flex flex-col md:flex-row items-center justify-between gap-4">
            <p className="text-white/30 text-sm">
              &copy; {new Date().getFullYear()} TruPower Electric & Security LLC. All rights reserved.
            </p>
            <p className="text-white/30 text-sm">
              NJ Electrical License #34EB01826800
            </p>
          </div>
        </div>
      </footer>
    </>
  );
}
