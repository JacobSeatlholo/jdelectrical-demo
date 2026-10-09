"use client";

import Image from "next/image";
import {
  ShieldCheck,
  BadgeCheck,
  Users,
  FileCheck2,
  ArrowRight,
  CheckCircle2,
  Phone,
  Siren,
  MapPin,
  Zap,
  Fuel,
  Droplets,
  BatteryCharging,
  Sun,
  Factory,
  Mail,
  Facebook,
  Clock3,
} from "lucide-react";
import { JD, SERVICE_LISTS } from "./constants";

/* ------------------------------------------------------------------ */
/* Yellow trust strip — mirrors the real site's badges                */
/* ------------------------------------------------------------------ */

const STRIP = [
  { icon: ShieldCheck, title: "BEE Compliant", sub: "Level 4 · 100% procurement" },
  { icon: BadgeCheck, title: "Master Electrician", sub: "DoL registered" },
  { icon: Users, title: "Reliable Team", sub: "Skilled & trustworthy" },
  { icon: FileCheck2, title: "CoCs Issued", sub: "For all applications" },
];

export function TrustStrip() {
  return (
    <section className="bg-jd-yellow" aria-label="Accreditations">
      <div className="mx-auto grid max-w-7xl grid-cols-2 gap-y-6 px-4 py-6 sm:px-6 lg:grid-cols-4">
        {STRIP.map((s) => (
          <div key={s.title} className="flex items-center gap-3 px-2">
            <s.icon className="h-8 w-8 shrink-0 text-jd-navy" strokeWidth={1.8} aria-hidden />
            <div>
              <p className="text-sm font-bold uppercase tracking-wide text-jd-navy">
                {s.title}
              </p>
              <p className="text-xs font-medium text-jd-navy/70">{s.sub}</p>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}

/* ------------------------------------------------------------------ */
/* Services — real photo cards, real service lists                    */
/* ------------------------------------------------------------------ */

const SERVICE_CARDS = [
  {
    key: "Domestic",
    photo: "/jd/domestic-work.png",
    alt: "JD Electrical domestic work — electrician fitting a ceiling light",
    blurb:
      "From house wiring and intercoms to gate automation, pool and borehole pumps — everything your home needs, done properly and signed off with a CoC.",
    icon: FileCheck2,
  },
  {
    key: "Commercial",
    photo: "/jd/commercial-work.png",
    alt: "JD Electrical commercial installation — modern office interior",
    blurb:
      "Design, installation, maintenance and upgrades for offices, retail and factories — plus generator installations and reliable power solutions that keep you trading.",
    icon: Factory,
  },
  {
    key: "Industrial & Mining",
    photo: "/jd/industrial-work.png",
    alt: "JD Electrical industrial installation — emergency stop buttons and cable trays",
    blurb:
      "Heavy-duty electrical work for plants, mines and filling stations — including commercial pumps & tanks, factory installations and full compliance documentation.",
    icon: Fuel,
    featured: true,
  },
];

export function Services() {
  return (
    <section id="services" className="scroll-mt-24 bg-white py-16 sm:py-24">
      <div className="mx-auto max-w-7xl px-4 sm:px-6">
        <div className="flex flex-col gap-6 md:flex-row md:items-end md:justify-between">
          <div className="max-w-2xl">
            <p className="jd-eyebrow">Our Services</p>
            <h2 className="mt-3 text-3xl font-bold text-jd-navy sm:text-4xl">
              We have you covered — wherever the power flows
            </h2>
          </div>
          <p className="max-w-md text-sm leading-relaxed text-slate-600">
            Three specialised divisions, one standard: safe, compliant, built to
            last. Every job is signed off with a Certificate of Compliance.
          </p>
        </div>

        <div className="mt-12 grid gap-6 lg:grid-cols-3">
          {SERVICE_CARDS.map((c) => (
            <article
              key={c.key}
              className={`jd-card flex flex-col overflow-hidden rounded-xl border bg-white shadow-sm ${
                c.featured ? "border-jd-blue/40 ring-1 ring-jd-blue/20" : "border-slate-200"
              }`}
            >
              <div className="relative">
                <Image
                  src={c.photo}
                  alt={c.alt}
                  width={800}
                  height={560}
                  className="h-48 w-full object-cover"
                />
                <span className="absolute left-4 top-4 rounded bg-jd-navy/90 px-2.5 py-1 text-[11px] font-bold uppercase tracking-wider text-jd-yellow">
                  {c.key}
                </span>
                {c.featured && (
                  <span className="absolute right-4 top-4 rounded bg-jd-yellow px-2.5 py-1 text-[11px] font-bold uppercase tracking-wider text-jd-navy">
                    Our speciality
                  </span>
                )}
              </div>

              <div className="flex flex-1 flex-col p-6">
                <h3 className="text-lg font-bold text-jd-navy">{c.key}</h3>
                <p className="mt-2 text-sm leading-relaxed text-slate-600">{c.blurb}</p>

                <ul className="mt-5 grid flex-1 grid-cols-1 gap-x-4 gap-y-2 sm:grid-cols-2">
                  {SERVICE_LISTS[c.key].map((item) => (
                    <li key={item} className="flex items-start gap-1.5 text-[13px] text-slate-700">
                      <CheckCircle2 className="mt-0.5 h-3.5 w-3.5 shrink-0 text-jd-blue" aria-hidden />
                      {item}
                    </li>
                  ))}
                </ul>

                <a
                  href="#estimate"
                  className="mt-6 inline-flex items-center gap-1.5 border-t border-slate-100 pt-4 text-sm font-bold text-jd-blue transition-colors hover:text-jd-yellow"
                >
                  Get a quote for this <ArrowRight className="h-4 w-4" aria-hidden />
                </a>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ------------------------------------------------------------------ */
/* Why JD Electrical — real about copy + real mission                 */
/* ------------------------------------------------------------------ */

const STATS = [
  { value: "24/7", label: "Emergency response" },
  { value: "100%", label: "Jobs signed off with CoC" },
  { value: "4", label: "Sectors served" },
  { value: "1", label: "Master Electrician leading every job" },
];

export function WhyJD() {
  return (
    <section id="about" className="scroll-mt-24 bg-jd-cloud py-16 sm:py-24">
      <div className="mx-auto max-w-7xl px-4 sm:px-6">
        <div className="grid items-center gap-12 lg:grid-cols-2">
          <div>
            <p className="jd-eyebrow">Why JD Electrical</p>
            <h2 className="mt-3 text-3xl font-bold text-jd-navy sm:text-4xl">
              We offer peace of mind, confidence, and reliability
            </h2>
            <p className="mt-6 text-base leading-relaxed text-slate-700">
              Welcome to JD Electrical, your go-to source for comprehensive and
              reliable electrical services in South Africa. Led by master
              electrician <strong className="font-semibold text-jd-navy">Jan</strong>, our dynamic
              and trustworthy team specialises in industrial, mining, commercial
              and domestic electrical solutions — from pump station installations
              and maintenance to residential wiring and automation.
            </p>
            <p className="mt-4 text-base leading-relaxed text-slate-700">
              Our commitment to safety, quality and environmental responsibility
              sets us apart. We combine the best of both worlds: traditional
              quality, morals and work ethic, with cutting-edge technology and
              innovation. Every installation meets the highest standards — and we
              back it with a Certificate of Compliance for all applications.
            </p>

            <dl className="mt-9 grid grid-cols-2 gap-4 sm:grid-cols-4">
              {STATS.map((s) => (
                <div
                  key={s.label}
                  className="rounded-lg border border-slate-200 bg-white px-4 py-3.5 text-center shadow-sm"
                >
                  <dt className="order-2 mt-1 block text-[11px] font-medium leading-snug text-slate-500">
                    {s.label}
                  </dt>
                  <dd className="text-2xl font-bold text-jd-blue">{s.value}</dd>
                </div>
              ))}
            </dl>
          </div>

          <div className="relative">
            <figure className="overflow-hidden rounded-xl shadow-lg ring-1 ring-slate-200">
              <Image
                src="/jd/industrial-work.png"
                alt="JD Electrical team at work on an industrial installation"
                width={1000}
                height={720}
                className="h-72 w-full object-cover sm:h-96"
              />
            </figure>
            <div className="absolute -bottom-6 left-6 right-6 flex items-center gap-4 rounded-lg border border-slate-200 bg-white p-5 shadow-lg sm:left-10 sm:right-10">
              <Image
                src="/jd/found-master-badge.jpg"
                alt="Master Electricians South Africa badge"
                width={64}
                height={54}
                className="h-14 w-auto rounded border border-slate-200 object-contain"
              />
              <div>
                <p className="text-sm font-bold text-jd-navy">
                  Led by a Department of Labour registered Master Electrician
                </p>
                <p className="mt-0.5 text-xs text-slate-500">
                  DoL registration <span className="font-semibold text-jd-blue">{JD.dolNumber}</span>
                  {"  ·  "}CoIDA/Compensation Fund{" "}
                  <span className="font-semibold text-jd-blue">{JD.cfNumber}</span>
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

/* ------------------------------------------------------------------ */
/* Backup power — the SA load-shedding reality                        */
/* ------------------------------------------------------------------ */

const POWER_ITEMS = [
  {
    icon: Sun,
    title: "Solar installations",
    text: "Grid-tied and hybrid solar systems sized for your home or facility — properly engineered, not thrown on a roof.",
  },
  {
    icon: BatteryCharging,
    title: "Inverters & batteries",
    text: "Automatic changeover so the lights stay on the moment Eskom doesn't. Lithium and AGM options to fit your budget.",
  },
  {
    icon: Zap,
    title: "Generators",
    text: "Supply, installation and maintenance of standby generators for homes, factories, farms and filling stations.",
  },
  {
    icon: Droplets,
    title: "Pumps & boreholes",
    text: "Pool, borehole and commercial pump installations wired for backup power so water keeps flowing too.",
  },
];

export function BackupPower() {
  return (
    <section id="backup-power" className="relative scroll-mt-24 overflow-hidden bg-jd-navy py-16 sm:py-24">
      <div
        className="absolute inset-0 opacity-[0.06]"
        style={{
          backgroundImage:
            "repeating-linear-gradient(135deg, #ffffff 0 1px, transparent 1px 22px)",
        }}
        aria-hidden
      />
      <div className="relative mx-auto max-w-7xl px-4 sm:px-6">
        <div className="max-w-2xl">
          <p className="jd-eyebrow text-jd-yellow">Backup Power &amp; Solar</p>
          <h2 className="mt-3 text-3xl font-bold text-white sm:text-4xl">
            Load-shedding shouldn&apos;t stop your home or your business
          </h2>
          <p className="mt-4 text-base leading-relaxed text-blue-100/85">
            Stage 6 shouldn&apos;t be your problem. We design and install backup
            power that switches over automatically — and we issue a CoC for every
            installation, so your insurance stays valid.
          </p>
        </div>

        <div className="mt-12 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {POWER_ITEMS.map((p) => (
            <div
              key={p.title}
              className="rounded-xl border border-white/10 bg-white/[0.06] p-6 backdrop-blur-sm transition-colors hover:border-jd-yellow/40"
            >
              <span className="inline-flex h-11 w-11 items-center justify-center rounded-lg bg-jd-yellow/15">
                <p.icon className="h-5.5 w-5.5 text-jd-yellow" aria-hidden />
              </span>
              <h3 className="mt-4 text-base font-bold text-white">{p.title}</h3>
              <p className="mt-2 text-sm leading-relaxed text-blue-100/75">{p.text}</p>
            </div>
          ))}
        </div>

        <div className="mt-10 flex flex-col items-start gap-4 rounded-xl border border-jd-yellow/30 bg-jd-yellow/10 p-6 sm:flex-row sm:items-center sm:justify-between">
          <p className="text-base font-semibold text-white">
            Not sure what size system you need?{" "}
            <span className="text-jd-yellow">Get an instant ballpark estimate below.</span>
          </p>
          <a
            href="#estimate"
            className="inline-flex shrink-0 items-center gap-2 rounded-md bg-jd-yellow px-5 py-3 text-sm font-bold text-jd-navy transition-colors hover:bg-[#ffd61f]"
          >
            Size my system <ArrowRight className="h-4 w-4" aria-hidden />
          </a>
        </div>
      </div>
    </section>
  );
}

/* ------------------------------------------------------------------ */
/* Emergency band                                                     */
/* ------------------------------------------------------------------ */

export function EmergencyBand() {
  return (
    <section className="bg-white py-14" aria-label="Emergency services">
      <div className="mx-auto max-w-7xl px-4 sm:px-6">
        <div className="overflow-hidden rounded-xl border-l-8 border-red-600 bg-jd-cloud shadow-sm">
          <div className="flex flex-col items-start gap-6 p-8 sm:flex-row sm:items-center sm:justify-between sm:p-10">
            <div className="flex items-start gap-5">
              <span className="inline-flex h-14 w-14 shrink-0 items-center justify-center rounded-lg bg-red-600">
                <Siren className="h-7 w-7 text-white" aria-hidden />
              </span>
              <div>
                <h2 className="text-2xl font-bold text-jd-navy">
                  Electrical emergency? We&apos;re available 24/7.
                </h2>
                <p className="mt-1.5 max-w-xl text-sm leading-relaxed text-slate-600">
                  Emergency services for all electrical equipment — tripping
                  boards, burning smells, storm damage, failed geysers or pumps.
                  One call and a qualified electrician is on the way.
                </p>
              </div>
            </div>
            <a
              href={JD.phoneHref}
              className="inline-flex shrink-0 items-center gap-3 rounded-md bg-red-600 px-7 py-4 text-lg font-bold text-white shadow-md transition-colors hover:bg-red-700"
              aria-label={`Call JD Electrical now on ${JD.phoneDisplay}`}
            >
              <Phone className="h-5 w-5" aria-hidden />
              {JD.phoneDisplay}
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}

/* ------------------------------------------------------------------ */
/* Coverage                                                           */
/* ------------------------------------------------------------------ */

const AREAS = [
  "Alberton", "Brackendowns", "Alberante", "Lakeside", "Mayberry Park",
  "Florentia", "Randhart", "Raceview", "New Redruth", "Verwoerdpark",
  "Germiston", "Boksburg", "Benoni", "Kempton Park", "Johannesburg South",
  "Mulbarton", "Kibler Park", "Mondeor", "Glenvista", "Roodepoort",
  "Sandton", "Midrand", "Pretoria East", "Centurion", "Vereeniging",
  "Vanderbijlpark", "Sasolburg", "Heidelberg", "Springs", "Nigel",
];

export function Coverage() {
  return (
    <section className="bg-jd-cloud py-16 sm:py-20" aria-label="Areas we serve">
      <div className="mx-auto max-w-7xl px-4 sm:px-6">
        <div className="flex flex-col gap-8 lg:flex-row lg:items-start lg:justify-between">
          <div className="max-w-md">
            <p className="jd-eyebrow">Areas We Serve</p>
            <h2 className="mt-3 text-2xl font-bold text-jd-navy sm:text-3xl">
              Based in Alberton. Working across Gauteng &amp; beyond.
            </h2>
            <p className="mt-4 text-sm leading-relaxed text-slate-600">
              Our depot is at 12 Orange Street, Brackendowns — and our bakkies
              cover the whole province for industrial, mining and commercial
              contracts. Projects further afield are quoted per site visit.
            </p>
            <div className="mt-6 flex items-center gap-2 rounded-lg border border-slate-200 bg-white px-4 py-3 text-sm text-slate-600 shadow-sm">
              <MapPin className="h-4 w-4 shrink-0 text-jd-blue" aria-hidden />
              {JD.address}
            </div>
          </div>
          <ul className="flex max-w-3xl flex-wrap gap-2">
            {AREAS.map((a) => (
              <li
                key={a}
                className="rounded-full border border-slate-200 bg-white px-4 py-2 text-[13px] font-medium text-slate-700 shadow-sm transition-colors hover:border-jd-blue hover:text-jd-blue"
              >
                {a}
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
}

/* ------------------------------------------------------------------ */
/* Credentials — every real number, verifiable                        */
/* ------------------------------------------------------------------ */

const CREDS = [
  { label: "Department of Labour (Electrical)", value: JD.dolNumber },
  { label: "Company Registration", value: JD.regNumber },
  { label: "VAT Registration", value: JD.vatNumber },
  { label: "Compensation Fund (COIDA)", value: JD.cfNumber },
  { label: "Public Liability (Momentum)", value: JD.liability },
  { label: "B-BBEE Status", value: "Level 4 · 100% procurement" },
];

export function Credentials() {
  return (
    <section id="credentials" className="scroll-mt-24 bg-white py-16 sm:py-24">
      <div className="mx-auto max-w-7xl px-4 sm:px-6">
        <div className="grid gap-10 lg:grid-cols-[0.9fr_1.1fr] lg:items-start">
          <div>
            <p className="jd-eyebrow">Compliance &amp; Credentials</p>
            <h2 className="mt-3 text-3xl font-bold text-jd-navy sm:text-4xl">
              Company Certificates &amp; Documentation
            </h2>
            <p className="mt-4 text-sm leading-relaxed text-slate-600">
              Anyone can claim they&apos;re qualified — we publish the paperwork.
              Every number below is real and verifiable, so your procurement
              team, insurer and auditor can tick every box before we even quote.
            </p>
            <div className="mt-6 flex items-center gap-4 rounded-lg border border-slate-200 bg-jd-cloud p-4">
              <Image
                src="/jd/found-master-badge.jpg"
                alt="Master Electricians South Africa accredited"
                width={72}
                height={60}
                className="h-16 w-auto rounded border border-slate-200 bg-white object-contain p-1"
              />
              <p className="text-sm leading-relaxed text-slate-700">
                Accredited member of{" "}
                <strong className="font-semibold text-jd-navy">Master Electricians SA</strong> —
                electrical contractors vetted against the Department of Labour&apos;s
                highest registration tier.
              </p>
            </div>
          </div>

          <dl className="grid gap-3 sm:grid-cols-2">
            {CREDS.map((c) => (
              <div
                key={c.label}
                className="rounded-lg border border-slate-200 bg-white p-5 shadow-sm"
              >
                <dt className="text-[11px] font-bold uppercase tracking-wider text-slate-500">
                  {c.label}
                </dt>
                <dd className="mt-1.5 text-lg font-bold text-jd-blue">{c.value}</dd>
              </div>
            ))}
          </dl>
        </div>
      </div>
    </section>
  );
}

/* ------------------------------------------------------------------ */
/* Footer                                                             */
/* ------------------------------------------------------------------ */

const FOOTER_SERVICE_LINKS = [
  "Domestic electrical",
  "Commercial installations",
  "Industrial & mining",
  "Generators & solar",
  "Gate & garage automation",
  "Certificates of Compliance",
];

export function Footer() {
  return (
    <footer className="bg-jd-navy text-blue-100">
      <div className="mx-auto max-w-7xl px-4 py-14 sm:px-6">
        <div className="grid gap-10 md:grid-cols-2 lg:grid-cols-4">
          {/* Brand */}
          <div>
            <div className="flex items-center gap-3">
              <span className="flex h-12 w-12 items-center justify-center rounded-lg bg-white">
                <Image
                  src="/jd/logo-gstatic.png"
                  alt="JD Electrical logo"
                  width={40}
                  height={40}
                  className="h-10 w-10 object-contain"
                />
              </span>
              <div>
                <p className="text-lg font-bold text-white">
                  JD <span className="text-jd-yellow">Electrical</span>
                </p>
                <p className="text-[10px] font-semibold uppercase tracking-[0.2em] text-blue-200/70">
                  Master Electrician
                </p>
              </div>
            </div>
            <p className="mt-5 text-sm leading-relaxed text-blue-100/75">
              Your trusted electrical services partner in South Africa —
              industrial, mining, commercial and domestic.
            </p>
            <a
              href={JD.facebook}
              target="_blank"
              rel="noopener noreferrer"
              className="mt-5 inline-flex items-center gap-2 rounded-md border border-white/20 px-4 py-2.5 text-sm font-semibold text-white transition-colors hover:border-jd-yellow hover:text-jd-yellow"
            >
              <Facebook className="h-4 w-4" aria-hidden />
              Visit our Facebook
            </a>
          </div>

          {/* Services */}
          <nav aria-label="Services">
            <h3 className="text-sm font-bold uppercase tracking-wider text-jd-yellow">
              Services
            </h3>
            <ul className="mt-4 space-y-2.5 text-sm">
              {FOOTER_SERVICE_LINKS.map((s) => (
                <li key={s}>
                  <a href="#services" className="transition-colors hover:text-jd-yellow">
                    {s}
                  </a>
                </li>
              ))}
            </ul>
          </nav>

          {/* Quick links */}
          <nav aria-label="Quick links">
            <h3 className="text-sm font-bold uppercase tracking-wider text-jd-yellow">
              Quick Links
            </h3>
            <ul className="mt-4 space-y-2.5 text-sm">
              <li><a href="#about" className="transition-colors hover:text-jd-yellow">About Us</a></li>
              <li><a href="#estimate" className="transition-colors hover:text-jd-yellow">Instant Estimate</a></li>
              <li><a href="#backup-power" className="transition-colors hover:text-jd-yellow">Backup Power &amp; Solar</a></li>
              <li><a href="#credentials" className="transition-colors hover:text-jd-yellow">Compliance &amp; Credentials</a></li>
              <li><a href="#contact" className="transition-colors hover:text-jd-yellow">Contact</a></li>
            </ul>
          </nav>

          {/* Contact */}
          <div>
            <h3 className="text-sm font-bold uppercase tracking-wider text-jd-yellow">
              Get In Touch
            </h3>
            <ul className="mt-4 space-y-3.5 text-sm">
              <li className="flex items-start gap-2.5">
                <MapPin className="mt-0.5 h-4 w-4 shrink-0 text-jd-yellow" aria-hidden />
                {JD.address}
              </li>
              <li className="flex items-start gap-2.5">
                <Phone className="mt-0.5 h-4 w-4 shrink-0 text-jd-yellow" aria-hidden />
                <a href={JD.phoneHref} className="font-semibold text-white transition-colors hover:text-jd-yellow">
                  {JD.phoneDisplay}
                </a>
              </li>
              <li className="flex items-start gap-2.5">
                <Mail className="mt-0.5 h-4 w-4 shrink-0 text-jd-yellow" aria-hidden />
                <a href={JD.emailHref} className="transition-colors hover:text-jd-yellow">
                  {JD.email}
                </a>
              </li>
              <li className="flex items-start gap-2.5">
                <Clock3 className="mt-0.5 h-4 w-4 shrink-0 text-jd-yellow" aria-hidden />
                Mon–Fri 07:30–17:00 · Emergencies 24/7
              </li>
            </ul>
          </div>
        </div>

        <div className="mt-12 border-t border-white/10 pt-6">
          <p className="text-xs leading-relaxed text-blue-200/60">
            Reg {JD.regNumber} · VAT {JD.vatNumber} · DoL {JD.dolNumber} · CF{" "}
            {JD.cfNumber} · Liability {JD.liability} · Level 4 B-BBEE contributor
            (100% procurement recognition)
          </p>
          <div className="mt-4 flex flex-col gap-2 text-xs text-blue-200/60 sm:flex-row sm:items-center sm:justify-between">
            <p>© 2024 JD Electrical. All rights reserved.</p>
            <p>
              Demo rebuild with AI automation by{" "}
              <span className="font-semibold text-jd-yellow">Business Hustle</span>
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
}
