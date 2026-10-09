"use client";

import { useCallback, useEffect, useState } from "react";
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
    label: "Instant Estimate",
    cls: "border-jd-blue/30 bg-jd-blue/10 text-jd-blue",
  },
  whatsapp: {
    icon: MessageCircle,
    label: "WhatsApp",
    cls: "border-emerald-300 bg-emerald-50 text-emerald-700",
  },
  contact: {
    icon: FileText,
    label: "Contact Form",
    cls: "border-slate-300 bg-slate-100 text-slate-600",
  },
  demo: {
    icon: Eye,
    label: "Sample",
    cls: "border-slate-200 bg-white text-slate-400",
  },
};

const STATUS_CLS: Record<string, string> = {
  new: "bg-emerald-600 text-white",
  contacted: "bg-jd-blue text-white",
  quoted: "bg-amber-500 text-white",
  won: "bg-jd-yellow text-jd-navy",
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
    <section id="live-leads" className="scroll-mt-24 bg-white py-16 sm:py-24">
      <div className="mx-auto max-w-7xl px-4 sm:px-6">
        <div className="grid gap-10 lg:grid-cols-[0.85fr_1.15fr] lg:items-start">
          {/* Pitch copy — the Business Hustle story, told plainly */}
          <div>
            <p className="jd-eyebrow">Live Job Board</p>
            <h2 className="mt-3 text-3xl font-bold text-jd-navy sm:text-4xl">
              Every request lands on Jan&apos;s board —{" "}
              <span className="text-jd-blue">in real time</span>
            </h2>
            <p className="mt-4 text-base leading-relaxed text-slate-600">
              Every estimate run, contact form and WhatsApp click on this page
              becomes a structured job card on this board — with the scope and
              indicative value already filled in. No more leads lost between
              projects: requests reach JD directly, ready to quote.
            </p>

            <div className="mt-7 grid grid-cols-2 gap-4">
              <div className="rounded-lg border border-slate-200 bg-jd-cloud p-4">
                <p className="tnum text-3xl font-bold text-jd-blue">{newCount}</p>
                <p className="mt-1 text-xs font-semibold uppercase tracking-wider text-slate-500">
                  New requests
                </p>
              </div>
              <div className="rounded-lg border border-slate-200 bg-jd-cloud p-4">
                <p className="tnum text-3xl font-bold text-jd-navy">
                  {formatZAR(pipelineValue)}
                </p>
                <p className="mt-1 text-xs font-semibold uppercase tracking-wider text-slate-500">
                  Indicative pipeline
                </p>
              </div>
            </div>

            <ul className="mt-6 space-y-2.5 text-sm text-slate-600">
              {[
                "Leads stored securely with job details & scope notes",
                "One-tap call or WhatsApp straight from the board",
                "Statuses: New → Contacted → Quoted → Won",
                "Runs on open-source tooling — no lock-in, Jan owns it",
              ].map((t) => (
                <li key={t} className="flex items-start gap-2.5">
                  <Wrench className="mt-0.5 h-4 w-4 shrink-0 text-jd-blue" aria-hidden />
                  {t}
                </li>
              ))}
            </ul>
          </div>

          {/* Board */}
          <div className="overflow-hidden rounded-xl border border-slate-200 bg-white shadow-lg shadow-slate-200/60">
            <div className="flex items-center justify-between border-b border-slate-200 bg-jd-navy px-5 py-4">
              <div className="flex items-center gap-3">
                <span className="relative flex h-3 w-3 text-emerald-400">
                  <span className="jd-ping absolute inset-0 rounded-full text-emerald-400" aria-hidden />
                  <span className="relative h-3 w-3 rounded-full bg-emerald-400" aria-hidden />
                </span>
                <h3 className="font-bold text-white">JD Live Job Board</h3>
                <Radio className="h-4 w-4 text-blue-200/60" aria-hidden />
              </div>
              <Button
                size="sm"
                variant="outline"
                onClick={() => load(true)}
                disabled={refreshing}
                className="h-8 gap-1.5 rounded-md border-white/25 bg-transparent text-xs text-blue-100 hover:bg-white/10 hover:text-white"
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
                      className="h-20 animate-pulse rounded-lg bg-slate-100"
                      aria-hidden
                    />
                  ))}
                </div>
              ) : leads.length === 0 ? (
                <div className="p-10 text-center">
                  <Inbox className="mx-auto h-10 w-10 text-slate-300" aria-hidden />
                  <p className="mt-3 font-semibold text-slate-700">
                    The board is waiting for its first lead
                  </p>
                  <p className="mt-1 text-sm text-slate-500">
                    Run the Instant Estimate above and watch it appear here live.
                  </p>
                </div>
              ) : (
                <ul className="divide-y divide-slate-100">
                  {leads.map((lead) => {
                    const meta = SOURCE_META[lead.source] ?? SOURCE_META.demo;
                    const est = parseEstimate(lead.estimate);
                    return (
                      <li
                        key={lead.id}
                        className="flex flex-col gap-3 px-5 py-4 transition-colors hover:bg-jd-cloud/60 sm:flex-row sm:items-center sm:justify-between"
                      >
                        <div className="min-w-0">
                          <div className="flex flex-wrap items-center gap-2">
                            <p className="font-bold text-jd-navy">{lead.name}</p>
                            <span
                              className={`rounded px-2 py-0.5 text-[10px] font-bold uppercase tracking-wide ${STATUS_CLS[lead.status] ?? STATUS_CLS.new}`}
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
                          <p className="mt-1 truncate text-sm text-slate-600">
                            {lead.service || "General enquiry"}
                          </p>
                          <p className="mt-0.5 text-xs text-slate-400">
                            {timeAgo(lead.createdAt)}
                            {est && (
                              <span className="ml-2 font-bold text-jd-blue tnum">
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
                            className="h-9 gap-1.5 rounded-md border-slate-300 bg-white text-xs text-jd-navy hover:border-jd-blue hover:text-jd-blue"
                          >
                            <a href={`tel:${lead.phone.replace(/\s/g, "")}`}>
                              <Phone className="h-3.5 w-3.5" aria-hidden />
                              Call
                            </a>
                          </Button>
                          <Button
                            asChild
                            size="sm"
                            className="h-9 gap-1.5 rounded-md bg-[#25D366] text-xs font-bold text-white hover:bg-[#1fb857]"
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

            <div className="border-t border-slate-200 bg-jd-cloud/60 px-5 py-3">
              <p className="text-[11px] leading-relaxed text-slate-500">
                Demo note: “Sample” rows illustrate how submissions appear. Submit
                the Instant Estimate or Contact form on this page to add a real
                entry. Every lead also emails through to {JD.email} when deployed
                for production.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
