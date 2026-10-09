"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import {
  Zap,
  ShieldCheck,
  BadgeCheck,
  Siren,
  ArrowRight,
  MessageCircle,
  FileCheck2,
  Factory,
  Building2,
  Home,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { JD } from "./constants";

const fadeUp = {
  hidden: { opacity: 0, y: 26 },
  show: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: { delay: 0.08 * i, duration: 0.65, ease: [0.22, 1, 0.36, 1] as const },
  }),
};

const CHIPS = [
  { icon: BadgeCheck, label: "Master Electrician" },
  { icon: ShieldCheck, label: "BEE Level 4 • 100% Procurement" },
  { icon: Siren, label: "Emergency Callouts" },
  { icon: FileCheck2, label: "CoCs for All Applications" },
];

export function Hero() {
  return (
    <section id="top" className="relative overflow-hidden pt-28 sm:pt-32 pb-14 sm:pb-20">
      {/* Backdrop */}
      <div className="absolute inset-0 grid-bg" aria-hidden />
      <div
        className="absolute -top-40 left-1/2 h-130 w-130 -translate-x-1/2 rounded-full bg-jd-blue/25 blur-[130px]"
        aria-hidden
      />
      <div
        className="absolute top-40 -right-32 h-80 w-80 rounded-full bg-jd-yellow/10 blur-[110px]"
        aria-hidden
      />

      <div className="relative mx-auto grid max-w-7xl items-center gap-12 px-4 sm:px-6 lg:grid-cols-[1.05fr_0.95fr]">
        {/* Copy */}
        <div>
          <motion.div variants={fadeUp} initial="hidden" animate="show" custom={0}>
            <span className="inline-flex items-center gap-2 rounded-full border border-jd-yellow/40 bg-jd-yellow/10 px-4 py-1.5 text-xs font-semibold uppercase tracking-[0.16em] text-jd-yellow">
              <Zap className="jd-flicker h-3.5 w-3.5" aria-hidden />
              Expert electricians · Alberton, Gauteng
            </span>
          </motion.div>

          <motion.h1
            variants={fadeUp}
            initial="hidden"
            animate="show"
            custom={1}
            className="mt-5 text-4xl font-extrabold leading-[1.06] tracking-tight sm:text-5xl xl:text-6xl"
          >
            Trusted electrical services for{" "}
            <span className="relative whitespace-nowrap text-jd-yellow">
              industry
              <svg
                className="absolute -bottom-2 left-0 w-full"
                viewBox="0 0 200 12"
                fill="none"
                aria-hidden
              >
                <path
                  d="M2 9C60 3 140 3 198 9"
                  stroke="#fecc00"
                  strokeWidth="4"
                  strokeLinecap="round"
                  opacity="0.5"
                />
              </svg>
            </span>
            , mining &amp; homes
          </motion.h1>

          <motion.p
            variants={fadeUp}
            initial="hidden"
            animate="show"
            custom={2}
            className="mt-6 max-w-xl text-base leading-relaxed text-slate-300 sm:text-lg"
          >
            JD Electrical is a team of skilled and trustworthy electricians led by
            master electrician <strong className="text-white">Jan Cilliers</strong>.
            From pump stations and factory installations to home wiring, solar and
            automation — we handle it all with expertise and precision, and we issue{" "}
            <strong className="text-white">Certificates of Compliance</strong> for
            every application.
          </motion.p>

          <motion.div
            variants={fadeUp}
            initial="hidden"
            animate="show"
            custom={3}
            className="mt-8 flex flex-col gap-3 sm:flex-row sm:items-center"
          >
            <Button
              asChild
              size="lg"
              className="h-13 rounded-full bg-jd-yellow px-7 text-base font-bold text-[#0a1626] hover:bg-[#ffd83d] glow-yellow"
            >
              <a href="#estimate">
                <Zap className="h-5 w-5" aria-hidden />
                Get an instant AI estimate
              </a>
            </Button>
            <Button
              asChild
              size="lg"
              variant="outline"
              className="h-13 rounded-full border-white/20 bg-white/5 px-7 text-base font-semibold text-white hover:bg-white/10 hover:border-jd-yellow/50"
            >
              <a href={JD.whatsappHref} target="_blank" rel="noopener noreferrer">
                <MessageCircle className="h-5 w-5 text-[#25D366]" aria-hidden />
                WhatsApp Jan directly
              </a>
            </Button>
          </motion.div>

          <motion.ul
            variants={fadeUp}
            initial="hidden"
            animate="show"
            custom={4}
            className="mt-9 grid grid-cols-1 gap-2.5 sm:grid-cols-2"
          >
            {CHIPS.map((c) => (
              <li
                key={c.label}
                className="flex items-center gap-2.5 rounded-xl border border-white/10 bg-white/[0.04] px-3.5 py-2.5 text-sm font-medium text-slate-200"
              >
                <c.icon className="h-4.5 w-4.5 shrink-0 text-jd-yellow" aria-hidden />
                {c.label}
              </li>
            ))}
          </motion.ul>
        </div>

        {/* Visual collage */}
        <motion.div
          initial={{ opacity: 0, scale: 0.96 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8, delay: 0.25, ease: [0.22, 1, 0.36, 1] }}
          className="relative mx-auto w-full max-w-lg lg:max-w-none"
        >
          <div className="relative grid grid-cols-2 gap-4">
            {/* Industrial photo */}
            <div className="relative col-span-2 overflow-hidden rounded-2xl border border-white/12 shadow-2xl shadow-black/50">
              <Image
                src="/jd/industrial-work.png"
                alt="JD Electrical industrial installation — emergency stop buttons and cable trays"
                width={1200}
                height={800}
                className="h-52 w-full object-cover sm:h-64"
                priority
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#060d1a]/85 via-transparent to-transparent" aria-hidden />
              <div className="absolute bottom-3 left-3 flex items-center gap-2 rounded-full bg-black/55 px-3.5 py-1.5 text-xs font-semibold text-white backdrop-blur">
                <Factory className="h-3.5 w-3.5 text-jd-yellow" aria-hidden />
                Industrial &amp; Mining
              </div>
            </div>

            {/* Commercial photo */}
            <div className="relative overflow-hidden rounded-2xl border border-white/12 shadow-xl shadow-black/40">
              <Image
                src="/jd/commercial-work.png"
                alt="JD Electrical commercial installation — modern office interior"
                width={800}
                height={600}
                className="h-36 w-full object-cover sm:h-44"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#060d1a]/80 via-transparent to-transparent" aria-hidden />
              <div className="absolute bottom-2.5 left-2.5 flex items-center gap-1.5 rounded-full bg-black/55 px-3 py-1 text-[11px] font-semibold text-white backdrop-blur">
                <Building2 className="h-3 w-3 text-jd-yellow" aria-hidden />
                Commercial
              </div>
            </div>

            {/* Domestic photo */}
            <div className="relative overflow-hidden rounded-2xl border border-white/12 shadow-xl shadow-black/40">
              <Image
                src="/jd/domestic-work.png"
                alt="JD Electrical domestic installation — electrician fitting a ceiling light"
                width={800}
                height={600}
                className="h-36 w-full object-cover sm:h-44"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#060d1a]/80 via-transparent to-transparent" aria-hidden />
              <div className="absolute bottom-2.5 left-2.5 flex items-center gap-1.5 rounded-full bg-black/55 px-3 py-1 text-[11px] font-semibold text-white backdrop-blur">
                <Home className="h-3 w-3 text-jd-yellow" aria-hidden />
                Domestic
              </div>
            </div>

            {/* Floating badge card */}
            <div className="col-span-2 mt-1 flex items-center justify-between gap-4 rounded-2xl border border-white/12 bg-[#0a1626]/90 p-4 shadow-xl shadow-black/40 backdrop-blur">
              <div className="flex items-center gap-3.5">
                <div className="overflow-hidden rounded-lg bg-white p-1.5 shadow">
                  <Image
                    src="/jd/found-master-badge.jpg"
                    alt="Master Electricians accredited badge"
                    width={64}
                    height={54}
                    className="h-13 w-16 object-contain"
                  />
                </div>
                <div>
                  <p className="text-sm font-bold text-white">Master Electricians accredited</p>
                  <p className="text-xs text-slate-400">
                    DoL registered <span className="text-jd-yellow">{JD.dolNumber}</span> · Reg{" "}
                    <span className="text-jd-yellow">{JD.regNumber}</span>
                  </p>
                </div>
              </div>
              <a
                href="#credentials"
                className="hidden items-center gap-1 text-sm font-semibold text-jd-yellow hover:gap-2 transition-all sm:flex"
              >
                Verify <ArrowRight className="h-4 w-4" aria-hidden />
              </a>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
