"use client";

import { useCallback, useEffect, useState } from "react";
import { motion } from "framer-motion";
import {
  Radio,
  RefreshCw,
  Inbox,
  Zap,
  MessageCircle,
  FileText,
  Phone,
  Wrench,
  Eye,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { JD, formatZAR, timeAgo } from "./constants";

interface Lead {
  id: string;
  name: string;
  phone: string;
  service: string | null;
  source: string;
  status: string;
  estimate: string | null;
  createdAt: string;
}

const SOURCE_META: Record<string, { icon: typeof Zap; label: string; cls: string }> = {
  "ai-estimate": {
    icon: Zap,
    label: "AI Estimate",
    cls: "border-jd-yellow/40 bg-jd-yellow/10 text-jd-yellow",
  },
  whatsapp: {
    icon: MessageCircle,
    label: "WhatsApp",
    cls: "border-[#25D366]/40 bg-[#25D366]/10 text-[#4ade80]",
  },
  contact: {
    icon: FileText,
    label: "Contact Form",
    cls: "border-jd-blue/50 bg-jd-blue/20 text-sky-300",
  },
  demo: {
    icon: Eye,
    label: "Sample",
    cls: "border-white/15 bg-white/5 text-slate-400",
  },
};

const STATUS_CLS: Record<string, string> = {
  new: "bg-emerald-400/15 text-emerald-300 border-emerald-400/30",
  contacted: "bg-sky-400/15 text-sky-300 border-sky-400/30",
  quoted: "bg-amber-400/15 text-amber-300 border-amber-400/30",
  won: "bg-jd-yellow/15 text-jd-yellow border-jd-yellow/40",
};

function parseEstimate(raw: string | null): { low: number; high: number } | null {
  if (!raw) return null;
  try {
    const e = JSON.parse(raw);
    if (typeof e?.priceLow === "number" && typeof e?.priceHigh === "number") {
      return { low: e.priceLow, high: e.priceHigh };
    }
  } catch {
    /* ignore */
  }
  return null;
}

export function LeadsBoard() {
  const [leads, setLeads] = useState<Lead[]>([]);
  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);

  const load = useCallback(async (showSpinner = false) => {
    if (showSpinner) setRefreshing(true);
    try {
      const res = await fetch("/api/leads", { cache: "no-store" });
      const data = await res.json();
      setLeads(Array.isArray(data.leads) ? data.leads : []);
    } catch {
      /* board stays as-is */
    } finally {
      setLoading(false);
      if (showSpinner) setRefreshing(false);
    }
  }, []);

  useEffect(() => {
    load();
    const t = setInterval(() => load(), 30000);
    return () => clearInterval(t);
  }, [load]);

  const newCount = leads.filter((l) => l.status === "new").length;
  const pipelineValue = leads.reduce((sum, l) => {
    const est = parseEstimate(l.estimate);
    return est ? sum + (est.low + est.high) / 2 : sum;
  }, 0);

  return (
    <section id="live-leads" className="relative py-20 sm:py-24 scroll-mt-20">
      <div className="mx-auto max-w-7xl px-4 sm:px-6">
        <div className="grid gap-10 lg:grid-cols-[0.85fr_1.15fr] lg:items-start">
          {/* Pitch copy */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
          >
            <span className="text-xs font-bold uppercase tracking-[0.2em] text-jd-yellow">
              Built by Business Hustle · open-source AI automation
            </span>
            <h2 className="mt-3 text-3xl font-extrabold tracking-tight sm:text-4xl">
              This is the board Jan{" "}
              <span className="text-jd-yellow">sees in real time</span>
            </h2>
            <p className="mt-4 text-base leading-relaxed text-slate-300">
              Every estimate run, contact form and WhatsApp click on this page
              becomes a structured lead on this board — with the job scope and
              indicative value already filled in. No more losing referrals between
              projects: requests reach JD directly, ready to quote.
            </p>

            <div className="mt-7 grid grid-cols-2 gap-4">
              <div className="rounded-xl border border-white/10 bg-[#0a1626] p-4">
                <p className="text-3xl font-extrabold text-jd-yellow tnum">
                  {newCount}
                </p>
                <p className="mt-1 text-xs font-semibold uppercase tracking-wider text-slate-400">
                  New requests
                </p>
              </div>
              <div className="rounded-xl border border-white/10 bg-[#0a1626] p-4">
                <p className="text-3xl font-extrabold text-white tnum">
                  {formatZAR(pipelineValue)}
                </p>
                <p className="mt-1 text-xs font-semibold uppercase tracking-wider text-slate-400">
                  Indicative pipeline
                </p>
              </div>
            </div>

            <ul className="mt-6 space-y-2.5 text-sm text-slate-300">
              {[
                "Leads stored securely with job details & AI scope notes",
                "One-tap call or WhatsApp straight from the board",
                "Statuses: New → Contacted → Quoted → Won",
                "Runs on open-source tooling — no lock-in, Jan owns it",
              ].map((t) => (
                <li key={t} className="flex items-start gap-2.5">
                  <Wrench className="mt-0.5 h-4 w-4 shrink-0 text-jd-yellow" aria-hidden />
                  {t}
                </li>
              ))}
            </ul>
          </motion.div>

          {/* Board */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ duration: 0.7, delay: 0.12, ease: [0.22, 1, 0.36, 1] }}
            className="overflow-hidden rounded-2xl border border-white/12 bg-[#0a1626] shadow-2xl shadow-black/50"
          >
            <div className="flex items-center justify-between border-b border-white/10 px-5 py-4">
              <div className="flex items-center gap-3">
                <span className="relative flex h-3 w-3 text-emerald-400">
                  <span className="jd-ping absolute inset-0 rounded-full text-emerald-400" aria-hidden />
                  <span className="relative h-3 w-3 rounded-full bg-emerald-400" aria-hidden />
                </span>
                <h3 className="font-bold text-white">JD Live Leads Board</h3>
                <Radio className="h-4 w-4 text-slate-500" aria-hidden />
              </div>
              <Button
                size="sm"
                variant="outline"
                onClick={() => load(true)}
                disabled={refreshing}
                className="h-8 gap-1.5 rounded-full border-white/15 bg-white/5 text-xs text-slate-300 hover:bg-white/10"
              >
                <RefreshCw
                  className={`h-3.5 w-3.5 ${refreshing ? "animate-spin" : ""}`}
                  aria-hidden
                />
                Refresh
              </Button>
            </div>

            <div className="jd-scroll max-h-105 overflow-y-auto">
              {loading ? (
                <div className="space-y-3 p-5">
                  {[1, 2, 3].map((i) => (
                    <div
                      key={i}
                      className="h-20 animate-pulse rounded-xl bg-white/[0.05]"
                      aria-hidden
                    />
                  ))}
                </div>
              ) : leads.length === 0 ? (
                <div className="p-10 text-center">
                  <Inbox className="mx-auto h-10 w-10 text-slate-600" aria-hidden />
                  <p className="mt-3 font-semibold text-slate-300">
                    The board is waiting for its first lead
                  </p>
                  <p className="mt-1 text-sm text-slate-500">
                    Run the Instant Estimate above and watch it appear here live.
                  </p>
                </div>
              ) : (
                <ul className="divide-y divide-white/6">
                  {leads.map((lead) => {
                    const meta = SOURCE_META[lead.source] ?? SOURCE_META.demo;
                    const est = parseEstimate(lead.estimate);
                    return (
                      <li
                        key={lead.id}
                        className="flex flex-col gap-3 px-5 py-4 transition-colors hover:bg-white/[0.03] sm:flex-row sm:items-center sm:justify-between"
                      >
                        <div className="min-w-0">
                          <div className="flex flex-wrap items-center gap-2">
                            <p className="font-bold text-white">{lead.name}</p>
                            <span
                              className={`rounded-full border px-2 py-0.5 text-[10px] font-bold uppercase tracking-wide ${STATUS_CLS[lead.status] ?? STATUS_CLS.new}`}
                            >
                              {lead.status}
                            </span>
                            <span
                              className={`flex items-center gap-1 rounded-full border px-2 py-0.5 text-[10px] font-bold uppercase tracking-wide ${meta.cls}`}
                            >
                              <meta.icon className="h-3 w-3" aria-hidden />
                              {meta.label}
                            </span>
                          </div>
                          <p className="mt-1 truncate text-sm text-slate-300">
                            {lead.service || "General enquiry"}
                          </p>
                          <p className="mt-0.5 text-xs text-slate-500">
                            {timeAgo(lead.createdAt)}
                            {est && (
                              <span className="ml-2 font-bold text-jd-yellow">
                                ~{formatZAR(est.low)} – {formatZAR(est.high)}
                              </span>
                            )}
                          </p>
                        </div>
                        <div className="flex shrink-0 items-center gap-2">
                          <Button
                            asChild
                            size="sm"
                            variant="outline"
                            className="h-9 gap-1.5 rounded-full border-white/15 bg-white/5 text-xs text-slate-200 hover:bg-white/10"
                          >
                            <a href={`tel:${lead.phone.replace(/\s/g, "")}`}>
                              <Phone className="h-3.5 w-3.5" aria-hidden />
                              Call
                            </a>
                          </Button>
                          <Button
                            asChild
                            size="sm"
                            className="h-9 gap-1.5 rounded-full bg-[#25D366] text-xs font-bold text-[#06130a] hover:bg-[#2fe46f]"
                          >
                            <a
                              href={`https://wa.me/${lead.phone.replace(/[^0-9]/g, "").replace(/^0/, "27")}`}
                              target="_blank"
                              rel="noopener noreferrer"
                            >
                              <MessageCircle className="h-3.5 w-3.5" aria-hidden />
                              WhatsApp
                            </a>
                          </Button>
                        </div>
                      </li>
                    );
                  })}
                </ul>
              )}
            </div>

            <div className="border-t border-white/10 bg-white/[0.02] px-5 py-3">
              <p className="text-[11px] leading-relaxed text-slate-500">
                Demo note: “Sample” rows illustrate how submissions appear. Submit
                the Instant Estimate or Contact form on this page to add a real
                entry. Every lead also emails through to {JD.email} when deployed
                for production.
              </p>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
