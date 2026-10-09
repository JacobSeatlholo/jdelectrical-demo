"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import { Phone, Mail, MapPin, Menu, X, Facebook, ArrowRight } from "lucide-react";
import { JD, NAV_LINKS } from "./constants";

export function Nav() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header className="sticky top-0 z-50">
      {/* Utility bar */}
      <div className="hidden bg-jd-navy text-white md:block">
        <div className="mx-auto flex max-w-7xl items-center justify-between gap-6 px-4 py-2 text-[13px] sm:px-6">
          <div className="flex items-center gap-6 text-blue-100">
            <span className="inline-flex items-center gap-1.5">
              <MapPin className="h-3.5 w-3.5 text-jd-yellow" aria-hidden />
              {JD.address}
            </span>
            <a
              href={JD.emailHref}
              className="inline-flex items-center gap-1.5 transition-colors hover:text-jd-yellow"
            >
              <Mail className="h-3.5 w-3.5 text-jd-yellow" aria-hidden />
              {JD.email}
            </a>
          </div>
          <div className="flex items-center gap-5">
            <a
              href={JD.facebook}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1.5 text-blue-100 transition-colors hover:text-jd-yellow"
              aria-label="JD Electrical on Facebook"
            >
              <Facebook className="h-3.5 w-3.5" aria-hidden />
              Visit our Facebook
            </a>
            <a
              href={JD.phoneHref}
              className="inline-flex items-center gap-1.5 font-semibold text-white transition-colors hover:text-jd-yellow"
              aria-label={`Call JD Electrical on ${JD.phoneDisplay}`}
            >
              <Phone className="h-3.5 w-3.5 text-jd-yellow" aria-hidden />
              {JD.phoneDisplay}
            </a>
          </div>
        </div>
      </div>

      {/* Main nav */}
      <div
        className={`border-b bg-white/95 backdrop-blur transition-shadow ${
          scrolled ? "border-slate-200 shadow-[0_8px_30px_-18px_rgba(6,41,74,0.35)]" : "border-transparent"
        }`}
      >
        <nav
          aria-label="Main navigation"
          className="mx-auto flex max-w-7xl items-center justify-between gap-4 px-4 py-3 sm:px-6"
        >
          <a href="#top" className="flex items-center gap-3" aria-label="JD Electrical home">
            <span className="flex h-11 w-11 items-center justify-center rounded-lg border border-slate-200 bg-white shadow-sm">
              <Image
                src="/jd/logo-gstatic.png"
                alt="JD Electrical logo"
                width={40}
                height={40}
                className="h-9 w-9 object-contain"
                priority
              />
            </span>
            <span className="leading-tight">
              <span className="block text-lg font-bold tracking-tight text-jd-navy">
                JD <span className="text-jd-blue">Electrical</span>
              </span>
              <span className="block text-[10px] font-semibold uppercase tracking-[0.2em] text-slate-500">
                Master Electrician · Alberton
              </span>
            </span>
          </a>

          <div className="hidden items-center gap-0.5 lg:flex">
            {NAV_LINKS.map((l) => (
              <a
                key={l.href}
                href={l.href}
                className="rounded-md px-3 py-2 text-sm font-medium text-slate-600 transition-colors hover:bg-jd-cloud hover:text-jd-blue"
              >
                {l.label}
              </a>
            ))}
          </div>

          <div className="flex items-center gap-3">
            <a
              href={JD.phoneHref}
              className="hidden items-center gap-2 rounded-md border border-slate-200 px-4 py-2.5 text-sm font-bold text-jd-navy transition-colors hover:border-jd-blue hover:text-jd-blue md:flex"
              aria-label={`Call JD Electrical on ${JD.phoneDisplay}`}
            >
              <Phone className="h-4 w-4 text-jd-blue" aria-hidden />
              {JD.phoneDisplay}
            </a>
            <a
              href="#contact"
              className="hidden items-center gap-2 rounded-md bg-jd-yellow px-5 py-2.5 text-sm font-bold text-jd-navy shadow-sm transition-colors hover:bg-[#ffd61f] sm:inline-flex"
            >
              Get a Quote
              <ArrowRight className="h-4 w-4" aria-hidden />
            </a>
            <button
              onClick={() => setOpen(!open)}
              className="inline-flex h-11 w-11 items-center justify-center rounded-md border border-slate-200 text-jd-navy lg:hidden"
              aria-label={open ? "Close menu" : "Open menu"}
              aria-expanded={open}
            >
              {open ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
            </button>
          </div>
        </nav>

        {open && (
          <div className="border-t border-slate-200 bg-white lg:hidden">
            <div className="grid gap-1 px-4 py-3 sm:px-6">
              {NAV_LINKS.map((l) => (
                <a
                  key={l.href}
                  href={l.href}
                  onClick={() => setOpen(false)}
                  className="rounded-md px-4 py-3 text-base font-medium text-slate-700 transition-colors hover:bg-jd-cloud hover:text-jd-blue"
                >
                  {l.label}
                </a>
              ))}
              <div className="mt-2 grid grid-cols-2 gap-2">
                <a
                  href={JD.phoneHref}
                  className="flex items-center justify-center gap-2 rounded-md border border-jd-blue px-4 py-3 text-sm font-bold text-jd-blue"
                >
                  <Phone className="h-4 w-4" aria-hidden />
                  Call Jan
                </a>
                <a
                  href="#contact"
                  onClick={() => setOpen(false)}
                  className="flex items-center justify-center gap-2 rounded-md bg-jd-yellow px-4 py-3 text-sm font-bold text-jd-navy"
                >
                  Get a Quote
                  <ArrowRight className="h-4 w-4" aria-hidden />
                </a>
              </div>
            </div>
          </div>
        )}
      </div>
    </header>
  );
}
