"use client";

import Image from "next/image";
import {
  Phone,
  ArrowRight,
  BadgeCheck,
  ShieldCheck,
  FileCheck2,
  Factory,
  Building2,
  Home,
  MessageCircle,
} from "lucide-react";
import { JD } from "./constants";

const TRUST_CHIPS = [
  { icon: BadgeCheck, label: "Master Electrician" },
  { icon: ShieldCheck, label: "BEE Compliant · Level 4" },
  { icon: FileCheck2, label: "CoCs for all applications" },
];

export function Hero() {
  return (
    <section id="top" className="relative bg-jd-blue">
      {/* Brand gradient + subtle trade pattern */}
      <div className="absolute inset-0 bg-gradient-to-br from-jd-blue via-[#04497f] to-jd-navy" aria-hidden />
      <div
        className="absolute inset-x-0 bottom-0 h-24 bg-gradient-to-t from-black/15 to-transparent"
        aria-hidden
      />

      <div className="relative mx-auto grid max-w-7xl items-center gap-12 px-4 pb-16 pt-14 sm:px-6 sm:pt-16 lg:grid-cols-[1.02fr_0.98fr] lg:pb-24 lg:pt-20">
        {/* Copy */}
        <div>
          <p className="text-xs font-bold uppercase tracking-[0.24em] text-jd-yellow">
            Expert Electricians · Alberton, Gauteng
          </p>

          <h1 className="mt-4 text-4xl font-bold leading-[1.08] text-white sm:text-5xl xl:text-[3.4rem]">
            Trusted Electrical Services for{" "}
            <span className="text-jd-yellow">Industry</span>, Mining, Commerce
            &amp; Your Home
          </h1>

          <p className="mt-6 max-w-xl text-base leading-relaxed text-blue-50/90 sm:text-lg">
            JD Electrical is a team of skilled and trustworthy electricians led
            by master electrician <strong className="font-semibold text-white">Jan Cilliers</strong>.
            From pump stations and factory installations to home wiring, solar
            and automation — we handle it all with expertise and precision, and
            we issue <strong className="font-semibold text-white">Certificates of Compliance</strong>{" "}
            for every application.
          </p>

          <div className="mt-8 flex flex-col gap-3 sm:flex-row sm:items-center">
            <a
              href="#estimate"
              className="inline-flex items-center justify-center gap-2 rounded-md bg-jd-yellow px-7 py-4 text-base font-bold text-jd-navy shadow-lg shadow-black/20 transition-colors hover:bg-[#ffd61f]"
            >
              Get Your Free Quote
              <ArrowRight className="h-5 w-5" aria-hidden />
            </a>
            <a
              href={JD.phoneHref}
              className="inline-flex items-center justify-center gap-2 rounded-md border-2 border-white/40 px-7 py-[0.9rem] text-base font-bold text-white transition-colors hover:border-jd-yellow hover:text-jd-yellow"
              aria-label={`Call JD Electrical on ${JD.phoneDisplay}`}
            >
              <Phone className="h-5 w-5" aria-hidden />
              {JD.phoneDisplay}
            </a>
          </div>

          <a
            href={JD.whatsappHref}
            target="_blank"
            rel="noopener noreferrer"
            className="mt-5 inline-flex items-center gap-2 text-sm font-semibold text-blue-100 underline decoration-jd-yellow/70 decoration-2 underline-offset-4 transition-colors hover:text-jd-yellow"
          >
            <MessageCircle className="h-4 w-4" aria-hidden />
            Prefer WhatsApp? Message Jan directly
          </a>

          <ul className="mt-9 grid max-w-xl grid-cols-1 gap-2.5 sm:grid-cols-3">
            {TRUST_CHIPS.map((c) => (
              <li
                key={c.label}
                className="flex items-center gap-2 rounded-md bg-white/10 px-3.5 py-2.5 text-[13px] font-semibold text-white ring-1 ring-white/15"
              >
                <c.icon className="h-4 w-4 shrink-0 text-jd-yellow" aria-hidden />
                {c.label}
              </li>
            ))}
          </ul>
        </div>

        {/* Photo collage — real work, real accreditation */}
        <div className="relative mx-auto w-full max-w-lg lg:max-w-none">
          <div className="grid grid-cols-2 gap-4">
            <figure className="relative col-span-2 overflow-hidden rounded-lg ring-4 ring-white/15">
              <Image
                src="/jd/industrial-work.png"
                alt="JD Electrical industrial installation — emergency stop buttons and cable trays"
                width={1200}
                height={800}
                className="h-56 w-full object-cover sm:h-72"
                priority
              />
              <figcaption className="absolute bottom-3 left-3 flex items-center gap-2 rounded bg-jd-navy/85 px-3 py-1.5 text-xs font-semibold text-white">
                <Factory className="h-3.5 w-3.5 text-jd-yellow" aria-hidden />
                Industrial &amp; Mining
              </figcaption>
            </figure>

            <figure className="relative overflow-hidden rounded-lg ring-4 ring-white/15">
              <Image
                src="/jd/commercial-work.png"
                alt="JD Electrical commercial installation — modern office interior"
                width={800}
                height={600}
                className="h-36 w-full object-cover sm:h-44"
              />
              <figcaption className="absolute bottom-2.5 left-2.5 flex items-center gap-1.5 rounded bg-jd-navy/85 px-2.5 py-1 text-[11px] font-semibold text-white">
                <Building2 className="h-3 w-3 text-jd-yellow" aria-hidden />
                Commercial
              </figcaption>
            </figure>

            <figure className="relative overflow-hidden rounded-lg ring-4 ring-white/15">
              <Image
                src="/jd/domestic-work.png"
                alt="JD Electrical domestic installation — electrician fitting a ceiling light"
                width={800}
                height={600}
                className="h-36 w-full object-cover sm:h-44"
              />
              <figcaption className="absolute bottom-2.5 left-2.5 flex items-center gap-1.5 rounded bg-jd-navy/85 px-2.5 py-1 text-[11px] font-semibold text-white">
                <Home className="h-3 w-3 text-jd-yellow" aria-hidden />
                Domestic
              </figcaption>
            </figure>

            <div className="col-span-2 flex items-center justify-between gap-4 rounded-lg bg-white p-4 shadow-xl shadow-black/25">
              <div className="flex items-center gap-3.5">
                <Image
                  src="/jd/found-master-badge.jpg"
                  alt="Master Electricians South Africa accredited badge"
                  width={72}
                  height={60}
                  className="h-14 w-auto rounded border border-slate-200 object-contain"
                />
                <div>
                  <p className="text-sm font-bold text-jd-navy">
                    Master Electricians accredited
                  </p>
                  <p className="text-xs text-slate-500">
                    Dept. of Labour reg.{" "}
                    <span className="font-semibold text-jd-blue">{JD.dolNumber}</span>
                    {"  ·  "}
                    Company reg.{" "}
                    <span className="font-semibold text-jd-blue">{JD.regNumber}</span>
                  </p>
                </div>
              </div>
              <a
                href="#credentials"
                className="hidden items-center gap-1 text-sm font-bold text-jd-blue transition-colors hover:text-jd-yellow sm:flex"
              >
                Verify us <ArrowRight className="h-4 w-4" aria-hidden />
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
