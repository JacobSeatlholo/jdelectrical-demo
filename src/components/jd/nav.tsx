"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import { Phone, Menu, X, Zap } from "lucide-react";
import { Button } from "@/components/ui/button";
import { JD, NAV_LINKS } from "./constants";

export function Nav() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header
      className={`fixed top-0 inset-x-0 z-50 transition-all duration-300 ${
        scrolled
          ? "bg-[#060d1a]/90 backdrop-blur-xl border-b border-white/10 shadow-lg shadow-black/30"
          : "bg-transparent border-b border-transparent"
      }`}
    >
      <nav
        aria-label="Main navigation"
        className="mx-auto flex max-w-7xl items-center justify-between gap-4 px-4 sm:px-6 h-16 sm:h-18"
      >
        <a href="#top" className="flex items-center gap-3 group" aria-label="JD Electrical home">
          <span className="relative flex h-10 w-10 items-center justify-center rounded-xl bg-white shadow-md group-hover:scale-105 transition-transform">
            <Image
              src="/jd/logo-gstatic.png"
              alt="JD Electrical logo"
              width={36}
              height={36}
              className="h-9 w-9 object-contain"
              priority
            />
          </span>
          <span className="leading-tight">
            <span className="block font-bold tracking-tight text-base sm:text-lg">
              JD <span className="text-jd-yellow">Electrical</span>
            </span>
            <span className="block text-[10px] sm:text-[11px] uppercase tracking-[0.18em] text-muted-foreground">
              Master Electrician
            </span>
          </span>
        </a>

        <div className="hidden lg:flex items-center gap-1">
          {NAV_LINKS.map((l) => (
            <a
              key={l.href}
              href={l.href}
              className="rounded-full px-3.5 py-2 text-sm font-medium text-slate-300 hover:text-white hover:bg-white/8 transition-colors"
            >
              {l.label}
            </a>
          ))}
        </div>

        <div className="flex items-center gap-2">
          <a
            href={JD.phoneHref}
            className="hidden md:flex items-center gap-2 text-sm font-semibold text-slate-200 hover:text-jd-yellow transition-colors"
            aria-label={`Call JD Electrical on ${JD.phoneDisplay}`}
          >
            <Phone className="h-4 w-4 text-jd-yellow" aria-hidden />
            {JD.phoneDisplay}
          </a>
          <Button
            asChild
            className="hidden sm:inline-flex bg-jd-yellow text-[#0a1626] hover:bg-[#ffd83d] font-bold glow-yellow rounded-full"
          >
            <a href="#estimate">
              <Zap className="h-4 w-4" aria-hidden />
              Get a Quote
            </a>
          </Button>
          <button
            onClick={() => setOpen(!open)}
            className="lg:hidden inline-flex h-11 w-11 items-center justify-center rounded-xl border border-white/15 bg-white/5 text-slate-200"
            aria-label={open ? "Close menu" : "Open menu"}
            aria-expanded={open}
          >
            {open ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </button>
        </div>
      </nav>

      {open && (
        <div className="lg:hidden border-t border-white/10 bg-[#060d1a]/95 backdrop-blur-xl">
          <div className="px-4 py-3 grid gap-1">
            {NAV_LINKS.map((l) => (
              <a
                key={l.href}
                href={l.href}
                onClick={() => setOpen(false)}
                className="rounded-lg px-4 py-3 text-base font-medium text-slate-200 hover:bg-white/8 hover:text-white transition-colors"
              >
                {l.label}
              </a>
            ))}
            <a
              href={JD.phoneHref}
              className="mt-2 flex items-center justify-center gap-2 rounded-xl bg-jd-yellow px-4 py-3.5 text-base font-bold text-[#0a1626]"
            >
              <Phone className="h-5 w-5" aria-hidden />
              Call {JD.phoneDisplay}
            </a>
          </div>
        </div>
      )}
    </header>
  );
}
