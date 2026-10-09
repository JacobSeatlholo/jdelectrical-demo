"use client";

import { useState } from "react";
import Image from "next/image";
import { motion } from "framer-motion";
import {
  Home,
  Building2,
  Factory,
  ChevronDown,
  Zap,
  BatteryCharging,
  Sun,
  Gauge,
  Siren,
  Phone,
  ShieldCheck,
  MapPin,
  FileCheck2,
  Award,
  Landmark,
  HeartPulse,
  BadgeCheck,
  MessageCircle,
  Mail,
  ArrowUpRight,
  Fuel,
  Waves,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { JD, SERVICE_LISTS } from "./constants";

const reveal = {
  hidden: { opacity: 0, y: 30 },
  show: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.7, ease: [0.22, 1, 0.36, 1] as const },
  },
};

/* ================= CREDENTIAL TICKER ================= */

const TICKER_ITEMS = [
  { icon: BadgeCheck, text: "Master Electricians Accredited" },
  { icon: Landmark, text: "Company Reg IT9819/07" },
  { icon: FileCheck2, text: "Dept of Labour GS01479" },
  { icon: ShieldCheck, text: "BEE Level 4 — 100% Procurement" },
  { icon: Gauge, text: "VAT 4110244623" },
  { icon: HeartPulse, text: "Compensation Fund 990000399543" },
  { icon: Award, text: `Public Liability — Momentum ${JD.liability.split(" ")[1]}` },
  { icon: Siren, text: "Emergency Services — All Electrical Equipment" },
];

export function CredentialTicker() {
  const items = [...TICKER_ITEMS, ...TICKER_ITEMS];
  return (
    <section
      aria-label="Company credentials"
      className="relative border-y border-white/10 bg-[#081220] py-4 overflow-hidden"
    >
      <div className="jd-marquee flex w-max items-center gap-10 px-6">
        {items.map((item, i) => (
          <span
            key={i}
            className="flex items-center gap-2.5 whitespace-nowrap text-sm font-semibold text-slate-300"
          >
            <item.icon className="h-4.5 w-4.5 text-jd-yellow" aria-hidden />
            {item.text}
            <span className="ml-6 h-1.5 w-1.5 rounded-full bg-jd-blue" aria-hidden />
          </span>
        ))}
      </div>
    </section>
  );
}

/* ================= SERVICES ================= */

const SERVICE_CARDS = [
  {
    key: "Domestic",
    icon: Home,
    image: "/jd/domestic-work.png",
    alt: "JD Electrical domestic work — electrician installing a ceiling light",
    blurb:
      "From house wiring and intercoms to gate automation, pool and borehole pumps — your home, fully powered and compliant.",
  },
  {
    key: "Commercial",
    icon: Building2,
    image: "/jd/commercial-work.png",
    alt: "JD Electrical commercial work — modern office interior installation",
    blurb:
      "Design, installations, maintenance and upgrades for offices, retail and factories — reliable power solutions that keep business running.",
  },
  {
    key: "Industrial & Mining",
    icon: Factory,
    image: "/jd/industrial-work.png",
    alt: "JD Electrical industrial work — emergency stops and cable trays",
    blurb:
      "Heavy-duty power for plants, filling stations, commercial pumps & tanks and mining operations — built to SANS standards, maintained 24/7.",
  },
];

export function Services() {
  const [openKey, setOpenKey] = useState<string | null>(null);

  return (
    <section id="services" className="relative py-20 sm:py-24 scroll-mt-20">
      <div className="mx-auto max-w-7xl px-4 sm:px-6">
        <motion.div
          variants={reveal}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, margin: "-80px" }}
          className="max-w-2xl"
        >
          <span className="text-xs font-bold uppercase tracking-[0.2em] text-jd-yellow">
            Services &amp; overview
          </span>
          <h2 className="mt-3 text-3xl font-extrabold tracking-tight sm:text-4xl">
            We have you covered —{" "}
            <span className="text-jd-yellow">everywhere power matters</span>
          </h2>
          <p className="mt-4 text-base leading-relaxed text-slate-300 sm:text-lg">
            One accountable, DoL-registered team for every sector. Every job is
            signed off with a Certificate of Compliance, and emergency services are
            available for all electrical equipment.
          </p>
        </motion.div>

        <div className="mt-12 grid gap-6 md:grid-cols-3">
          {SERVICE_CARDS.map((card, i) => {
            const open = openKey === card.key;
            return (
              <motion.article
                key={card.key}
                variants={reveal}
                initial="hidden"
                whileInView="show"
                viewport={{ once: true, margin: "-60px" }}
                transition={{ delay: i * 0.1 }}
                className="jd-card flex flex-col overflow-hidden rounded-2xl border border-white/12 bg-[#0a1626]"
              >
                <div className="relative h-44 overflow-hidden">
                  <Image
                    src={card.image}
                    alt={card.alt}
                    fill
                    sizes="(max-width: 768px) 100vw, 33vw"
                    className="object-cover transition-transform duration-500 hover:scale-105"
                  />
                  <div
                    className="absolute inset-0 bg-gradient-to-t from-[#0a1626] via-[#0a1626]/25 to-transparent"
                    aria-hidden
                  />
                  <div className="absolute bottom-3 left-4 flex items-center gap-2.5">
                    <span className="flex h-9 w-9 items-center justify-center rounded-lg bg-jd-yellow text-[#0a1626] shadow-lg">
                      <card.icon className="h-5 w-5" aria-hidden />
                    </span>
                    <h3 className="text-lg font-bold text-white">{card.key}</h3>
                  </div>
                </div>

                <div className="flex flex-1 flex-col p-5">
                  <p className="text-sm leading-relaxed text-slate-300">{card.blurb}</p>

                  <button
                    onClick={() => setOpenKey(open ? null : card.key)}
                    aria-expanded={open}
                    className="mt-4 flex w-full items-center justify-between rounded-lg border border-white/10 bg-white/[0.04] px-4 py-2.5 text-sm font-semibold text-slate-200 hover:border-jd-yellow/40 hover:text-jd-yellow transition-colors"
                  >
                    Full service list
                    <ChevronDown
                      className={`h-4 w-4 transition-transform duration-300 ${open ? "rotate-180 text-jd-yellow" : ""}`}
                      aria-hidden
                    />
                  </button>

                  {open && (
                    <ul className="mt-3 grid grid-cols-1 gap-1.5 sm:grid-cols-2">
                      {SERVICE_LISTS[card.key].map((s) => (
                        <li
                          key={s}
                          className="flex items-start gap-2 text-[13px] text-slate-300"
                        >
                          <Zap className="mt-0.5 h-3.5 w-3.5 shrink-0 text-jd-yellow" aria-hidden />
                          {s}
                        </li>
                      ))}
                    </ul>
                  )}

                  <div className="mt-auto pt-4">
                    <a
                      href="#estimate"
                      className="inline-flex items-center gap-1.5 text-sm font-bold text-jd-yellow hover:gap-3 transition-all"
                    >
                      Estimate this job <ArrowUpRight className="h-4 w-4" aria-hidden />
                    </a>
                  </div>
                </div>
              </motion.article>
            );
          })}
        </div>
      </div>
    </section>
  );
}

/* ================= BACKUP POWER / LOADSHEDDING ================= */

const BACKUP_ITEMS = [
  {
    icon: BatteryCharging,
    title: "Generator installations",
    text: "Sized, installed and commissioned for homes, factories and filling stations — auto-changeover so the lights stay on.",
  },
  {
    icon: Sun,
    title: "Solar solutions",
    text: "Grid-tied and hybrid solar with compliant protection, installed and certified by a master electrician.",
  },
  {
    icon: Waves,
    title: "Pump & tank systems",
    text: "Pool, borehole and commercial pumps with backup integration — water keeps flowing when the grid does not.",
  },
];

export function BackupPower() {
  return (
    <section id="backup-power" className="relative py-20 sm:py-24 scroll-mt-20 overflow-hidden">
      <div
        className="absolute inset-0 bg-gradient-to-b from-transparent via-jd-blue/[0.07] to-transparent"
        aria-hidden
      />
      <div className="relative mx-auto max-w-7xl px-4 sm:px-6">
        <div className="grid items-center gap-12 lg:grid-cols-2">
          <motion.div
            variants={reveal}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, margin: "-80px" }}
          >
            <span className="text-xs font-bold uppercase tracking-[0.2em] text-jd-yellow">
              Loadshedding? Not your problem.
            </span>
            <h2 className="mt-3 text-3xl font-extrabold tracking-tight sm:text-4xl">
              Backup power that keeps{" "}
              <span className="text-jd-yellow">South Africa working</span>
            </h2>
            <p className="mt-4 text-base leading-relaxed text-slate-300 sm:text-lg">
              Stage 6 should not stop your household, your workshop or your plant.
              JD Electrical designs and installs generators, solar and pump backup
              systems that switch over automatically — and every installation is
              certified with a CoC for insurance and safety compliance.
            </p>

            <ul className="mt-8 grid gap-4">
              {BACKUP_ITEMS.map((b, i) => (
                <motion.li
                  key={b.title}
                  variants={reveal}
                  initial="hidden"
                  whileInView="show"
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.08 }}
                  className="jd-card flex gap-4 rounded-xl border border-white/10 bg-white/[0.04] p-4"
                >
                  <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-lg bg-jd-blue/40 text-jd-yellow">
                    <b.icon className="h-5.5 w-5.5" aria-hidden />
                  </span>
                  <div>
                    <h3 className="font-bold text-white">{b.title}</h3>
                    <p className="mt-1 text-sm leading-relaxed text-slate-300">{b.text}</p>
                  </div>
                </motion.li>
              ))}
            </ul>

            <Button
              asChild
              className="mt-8 h-12 rounded-full bg-jd-yellow px-6 text-base font-bold text-[#0a1626] hover:bg-[#ffd83d] glow-yellow"
            >
              <a href="#estimate">Size my backup system</a>
            </Button>
          </motion.div>

          <motion.div
            variants={reveal}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, margin: "-80px" }}
            className="relative"
          >
            <div className="overflow-hidden rounded-2xl border border-white/12 shadow-2xl shadow-black/50">
              <Image
                src="/jd/industrial-work.png"
                alt="JD Electrical industrial power installation with emergency stops and cable management"
                width={1000}
                height={750}
                className="h-72 w-full object-cover sm:h-96"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#060d1a]/70 via-transparent to-transparent" aria-hidden />
            </div>
            <div className="absolute -bottom-5 -left-2 sm:left-6 rounded-xl border border-jd-yellow/30 bg-[#0a1626]/95 px-5 py-4 shadow-xl backdrop-blur glow-yellow">
              <p className="text-2xl font-extrabold text-jd-yellow tnum">Stage 6</p>
              <p className="text-xs font-semibold text-slate-300">
                …and your operation still runs
              </p>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}

/* ================= EMERGENCY BAND ================= */

export function EmergencyBand() {
  return (
    <section aria-label="Emergency services" className="relative py-10">
      <div className="mx-auto max-w-7xl px-4 sm:px-6">
        <div className="relative overflow-hidden rounded-2xl border border-red-500/25 bg-gradient-to-r from-red-950/60 via-[#0a1626] to-[#0a1626] p-6 sm:p-8">
          <div
            className="absolute -right-20 -top-20 h-60 w-60 rounded-full bg-red-500/10 blur-3xl"
            aria-hidden
          />
          <div className="relative flex flex-col items-start gap-6 sm:flex-row sm:items-center sm:justify-between">
            <div className="flex items-start gap-4">
              <span className="relative flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-red-500/15 text-red-400">
                <Siren className="h-6 w-6" aria-hidden />
                <span className="jd-ping absolute inset-0 rounded-xl text-red-400/40" aria-hidden />
              </span>
              <div>
                <h2 className="text-xl font-extrabold text-white sm:text-2xl">
                  Electrical emergency?
                </h2>
                <p className="mt-1 text-sm text-slate-300 sm:text-base">
                  Emergency services for all electrical equipment. Trips, burning
                  smells, storm damage, failed pumps — call now, we come to you.
                </p>
              </div>
            </div>
            <div className="flex w-full flex-col gap-3 sm:w-auto sm:flex-row">
              <Button
                asChild
                size="lg"
                className="h-12 rounded-full bg-red-500 px-6 text-base font-bold text-white hover:bg-red-400"
              >
                <a href={JD.phoneHref}>
                  <Phone className="h-5 w-5" aria-hidden />
                  {JD.phoneDisplay}
                </a>
              </Button>
              <Button
                asChild
                size="lg"
                variant="outline"
                className="h-12 rounded-full border-white/20 bg-white/5 px-6 text-base font-semibold text-white hover:bg-white/10"
              >
                <a href={JD.whatsappHref} target="_blank" rel="noopener noreferrer">
                  <MessageCircle className="h-5 w-5 text-[#25D366]" aria-hidden />
                  WhatsApp
                </a>
              </Button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

/* ================= COVERAGE ================= */

const AREAS = [
  "Alberton",
  "Brackendowns",
  "Brackenhurst",
  "Alrode",
  "Germiston",
  "Boksburg",
  "Benoni",
  "Kempton Park",
  "Johannesburg South",
  "Midrand",
  "Pretoria East",
  "Vereeniging / Vaal",
];

export function Coverage() {
  return (
    <section aria-label="Service area" className="py-16 sm:py-20">
      <div className="mx-auto max-w-7xl px-4 sm:px-6">
        <div className="grid items-center gap-10 lg:grid-cols-[0.9fr_1.1fr]">
          <motion.div
            variants={reveal}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, margin: "-60px" }}
          >
            <span className="text-xs font-bold uppercase tracking-[0.2em] text-jd-yellow">
              Where we work
            </span>
            <h2 className="mt-3 text-3xl font-extrabold tracking-tight sm:text-4xl">
              Based in Alberton.{" "}
              <span className="text-jd-yellow">Working across Gauteng.</span>
            </h2>
            <p className="mt-4 text-base leading-relaxed text-slate-300">
              Our offices are at 12 Orange Str., Brackendowns, Alberton — with
              crews servicing industrial, mining and commercial clients across the
              East Rand, Johannesburg and wider Gauteng. Local response, master
              electrician oversight on every job.
            </p>
            <div className="mt-6 flex items-center gap-2.5 text-sm font-semibold text-slate-200">
              <MapPin className="h-4.5 w-4.5 text-jd-yellow" aria-hidden />
              {JD.address}
            </div>
          </motion.div>

          <motion.div
            variants={reveal}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, margin: "-60px" }}
            className="flex flex-wrap gap-2.5"
            aria-label="Areas covered"
          >
            {AREAS.map((a) => (
              <span
                key={a}
                className="rounded-full border border-white/12 bg-white/[0.05] px-4 py-2 text-sm font-medium text-slate-200 hover:border-jd-yellow/50 hover:text-jd-yellow transition-colors cursor-default"
              >
                {a}
              </span>
            ))}
            <span className="rounded-full border border-jd-yellow/40 bg-jd-yellow/10 px-4 py-2 text-sm font-bold text-jd-yellow">
              + wider Gauteng on request
            </span>
          </motion.div>
        </div>
      </div>
    </section>
  );
}

/* ================= CREDENTIALS ================= */

const CREDS = [
  { label: "BEE Verification", value: "Level 4 contributor — 100% procurement", icon: ShieldCheck },
  { label: "VAT Registration", value: "4110244623", icon: Gauge },
  { label: "Company Registration", value: "IT9819/07", icon: Landmark },
  { label: "Compensation Fund", value: "990000399543", icon: HeartPulse },
  { label: "Dept of Labour", value: "GS01479", icon: FileCheck2 },
  { label: "Liability Policy (Momentum)", value: JD.liability, icon: Award },
];

export function Credentials() {
  return (
    <section id="credentials" className="py-16 sm:py-20 scroll-mt-20">
      <div className="mx-auto max-w-7xl px-4 sm:px-6">
        <motion.div
          variants={reveal}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, margin: "-60px" }}
          className="mx-auto max-w-2xl text-center"
        >
          <span className="text-xs font-bold uppercase tracking-[0.2em] text-jd-yellow">
            Paperwork in order
          </span>
          <h2 className="mt-3 text-3xl font-extrabold tracking-tight sm:text-4xl">
            Fully registered.{" "}
            <span className="text-jd-yellow">Fully compliant.</span> Easily verified.
          </h2>
          <p className="mt-4 text-base leading-relaxed text-slate-300">
            Buyers and SHEQ officers: everything you need for vendor onboarding is
            right here. We offer peace of mind, confidence, and reliability — before
            we even pick up a tool.
          </p>
        </motion.div>

        <div className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {CREDS.map((c, i) => (
            <motion.div
              key={c.label}
              variants={reveal}
              initial="hidden"
              whileInView="show"
              viewport={{ once: true }}
              transition={{ delay: i * 0.06 }}
              className="jd-card flex items-center gap-4 rounded-xl border border-white/10 bg-[#0a1626] p-5"
            >
              <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-lg bg-jd-blue/35 text-jd-yellow">
                <c.icon className="h-5.5 w-5.5" aria-hidden />
              </span>
              <div>
                <p className="text-xs font-semibold uppercase tracking-wider text-slate-400">
                  {c.label}
                </p>
                <p className="mt-0.5 font-bold text-white">{c.value}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ================= FOOTER ================= */

export function Footer() {
  return (
    <footer className="mt-auto border-t border-white/10 bg-[#050b15]">
      <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6">
        <div className="grid gap-10 md:grid-cols-4">
          <div className="md:col-span-2">
            <p className="text-lg font-bold">
              JD <span className="text-jd-yellow">Electrical</span>
            </p>
            <p className="mt-3 max-w-md text-sm leading-relaxed text-slate-400">
              {JD.tagline}. Led by master electrician {JD.owner}, our dynamic and
              trustworthy team specializes in industrial, mining, commercial and
              domestic electrical solutions — upholding traditional quality, morals
              and work ethic while embracing cutting-edge technology.
            </p>
            <a
              href={JD.facebook}
              target="_blank"
              rel="noopener noreferrer"
              className="mt-4 inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/5 px-4 py-2 text-sm font-semibold text-slate-200 hover:border-jd-yellow/50 hover:text-jd-yellow transition-colors"
            >
              Visit our Facebook <ArrowUpRight className="h-4 w-4" aria-hidden />
            </a>
          </div>

          <nav aria-label="Footer navigation">
            <p className="text-sm font-bold uppercase tracking-wider text-slate-300">
              Explore
            </p>
            <ul className="mt-4 space-y-2.5 text-sm text-slate-400">
              {[
                ["#services", "Our Services"],
                ["#backup-power", "Backup Power"],
                ["#estimate", "Instant Estimate"],
                ["#live-leads", "Live Leads Board"],
                ["#ai-ideas", "AI Tool Idea Generator"],
                ["#contact", "Contact Us"],
              ].map(([href, label]) => (
                <li key={href}>
                  <a href={href} className="hover:text-jd-yellow transition-colors">
                    {label}
                  </a>
                </li>
              ))}
            </ul>
          </nav>

          <div>
            <p className="text-sm font-bold uppercase tracking-wider text-slate-300">
              Get in touch
            </p>
            <ul className="mt-4 space-y-3 text-sm text-slate-400">
              <li>
                <a href={JD.phoneHref} className="flex items-center gap-2 hover:text-jd-yellow transition-colors">
                  <Phone className="h-4 w-4 text-jd-yellow" aria-hidden />
                  {JD.phoneDisplay}
                </a>
              </li>
              <li>
                <a href={JD.emailHref} className="flex items-center gap-2 hover:text-jd-yellow transition-colors">
                  <Mail className="h-4 w-4 text-jd-yellow" aria-hidden />
                  {JD.email}
                </a>
              </li>
              <li className="flex items-start gap-2">
                <MapPin className="mt-0.5 h-4 w-4 shrink-0 text-jd-yellow" aria-hidden />
                {JD.address}
              </li>
              <li>
                <a
                  href={JD.whatsappHref}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-2 hover:text-jd-yellow transition-colors"
                >
                  <MessageCircle className="h-4 w-4 text-[#25D366]" aria-hidden />
                  WhatsApp us
                </a>
              </li>
            </ul>
          </div>
        </div>

        <div className="mt-10 flex flex-col items-center justify-between gap-3 border-t border-white/8 pt-6 text-xs text-slate-500 sm:flex-row">
          <p>© 2024 JD Electrical. All rights reserved.</p>
          <p>
            Demo experience crafted by{" "}
            <span className="font-semibold text-slate-300">Business Hustle</span> —
            original design credit: Pink Chicken Graphics
          </p>
        </div>
      </div>
    </footer>
  );
}
