"use client";

import { useEffect, useRef, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Zap,
  Home,
  Building2,
  Factory,
  FileCheck2,
  ArrowRight,
  ArrowLeft,
  Loader2,
  CheckCircle2,
  ShieldCheck,
  ListChecks,
  MessageCircle,
  Phone,
  Sparkles,
  Clock3,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { useToast } from "@/hooks/use-toast";
import { JD, formatZAR } from "./constants";

const SECTORS = [
  { key: "Domestic", icon: Home, hint: "House wiring, gates, pumps, intercoms…" },
  { key: "Commercial", icon: Building2, hint: "Offices, retail, factories…" },
  { key: "Industrial & Mining", icon: Factory, hint: "Plants, filling stations, pumps & tanks…" },
  { key: "CoC & Compliance", icon: FileCheck2, hint: "Certificates of compliance, inspections…" },
];

const URGENCIES = [
  { key: "Emergency — ASAP", tone: "border-red-500/50 bg-red-500/10 text-red-300" },
  { key: "This week", tone: "border-jd-yellow/50 bg-jd-yellow/10 text-jd-yellow" },
  { key: "Planning ahead", tone: "border-white/20 bg-white/5 text-slate-300" },
];

const JOB_TYPES: Record<string, string[]> = {
  Domestic: ["Repair / fault finding", "New installation", "Automation (gate/garage)", "Generator / solar / inverter", "Pump work", "Other"],
  Commercial: ["New installation", "Maintenance contract", "Upgrades", "Generator installation", "Factory installation", "Other"],
  "Industrial & Mining": ["New installation", "Maintenance", "Filling station", "Pumps & tanks", "Generator installation", "Other"],
  "CoC & Compliance": ["New CoC", "CoC after repairs", "Insurance inspection", "Pre-purchase inspection", "Other"],
};

interface EstimateResult {
  jobSummary: string;
  scope: string[];
  priceLow: number;
  priceHigh: number;
  assumptions: string[];
  urgencyNote: string;
  safetyFlags: string[];
  nextStep: string;
}

type Step = 1 | 2 | 3 | 4;

function useCountUp(target: number, active: boolean) {
  const [val, setVal] = useState(0);
  const raf = useRef<number | null>(null);
  useEffect(() => {
    if (!active) return;
    const start = performance.now();
    const dur = 1100;
    const tick = (t: number) => {
      const p = Math.min((t - start) / dur, 1);
      const eased = 1 - Math.pow(1 - p, 3);
      setVal(Math.round(target * eased));
      if (p < 1) raf.current = requestAnimationFrame(tick);
    };
    raf.current = requestAnimationFrame(tick);
    return () => {
      if (raf.current) cancelAnimationFrame(raf.current);
    };
  }, [target, active]);
  return val;
}

export function Estimator() {
  const { toast } = useToast();
  const [step, setStep] = useState<Step>(1);
  const [sector, setSector] = useState<string | null>(null);
  const [jobType, setJobType] = useState<string>("");
  const [urgency, setUrgency] = useState<string>("This week");
  const [description, setDescription] = useState("");
  const [loading, setLoading] = useState(false);
  const [estimate, setEstimate] = useState<EstimateResult | null>(null);

  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [saving, setSaving] = useState(false);
  const [saved, setSaved] = useState(false);

  const low = useCountUp(estimate?.priceLow ?? 0, !!estimate);
  const high = useCountUp(estimate?.priceHigh ?? 0, !!estimate);

  const canGenerate =
    sector && description.trim().length >= 8 && description.trim().length <= 1200;

  async function generate() {
    if (!canGenerate || !sector) return;
    setLoading(true);
    try {
      const res = await fetch("/api/estimate", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ service: sector, jobType, urgency, description }),
      });
      const data = await res.json();
      if (!res.ok || data.error) {
        throw new Error(data.error || "Estimate failed");
      }
      setEstimate(data.estimate);
      setStep(3);
    } catch (e) {
      toast({
        title: "Estimate engine busy",
        description:
          e instanceof Error ? e.message : "Please try again or WhatsApp us directly.",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  }

  async function saveLead() {
    if (!name.trim() || !phone.trim()) {
      toast({
        title: "Almost there",
        description: "Please give us your name and phone number.",
        variant: "destructive",
      });
      return;
    }
    setSaving(true);
    try {
      const res = await fetch("/api/leads", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name,
          phone,
          service: sector ? `${sector} — ${jobType || "general"}` : jobType,
          message: description,
          source: "ai-estimate",
          estimate: estimate ?? undefined,
        }),
      });
      const data = await res.json();
      if (!res.ok || data.error) throw new Error(data.error || "Save failed");
      setSaved(true);
    } catch {
      toast({
        title: "Could not save",
        description: `No stress — WhatsApp us on ${JD.phoneDisplay} and we will pick it up.`,
        variant: "destructive",
      });
    } finally {
      setSaving(false);
    }
  }

  function reset() {
    setStep(1);
    setSector(null);
    setJobType("");
    setUrgency("This week");
    setDescription("");
    setEstimate(null);
    setName("");
    setPhone("");
    setSaved(false);
  }

  const waSummary = estimate
    ? encodeURIComponent(
        `Hi Jan, I just ran an instant estimate on your website:\n\n• Job: ${estimate.jobSummary}\n• Estimate: ${formatZAR(estimate.priceLow)} – ${formatZAR(estimate.priceHigh)}\n• Urgency: ${urgency}\n\nPlease contact me to confirm.`
      )
    : "";

  return (
    <section id="estimate" className="relative py-20 sm:py-24 scroll-mt-20">
      <div
        className="absolute inset-x-0 top-1/3 mx-auto h-72 max-w-3xl rounded-full bg-jd-blue/20 blur-[120px]"
        aria-hidden
      />
      <div className="relative mx-auto max-w-4xl px-4 sm:px-6">
        <div className="text-center">
          <span className="inline-flex items-center gap-2 rounded-full border border-jd-yellow/40 bg-jd-yellow/10 px-4 py-1.5 text-xs font-bold uppercase tracking-[0.16em] text-jd-yellow">
            <Sparkles className="h-3.5 w-3.5" aria-hidden />
            AI-powered · exclusive to this site
          </span>
          <h2 className="mt-4 text-3xl font-extrabold tracking-tight sm:text-4xl">
            Describe the job.{" "}
            <span className="text-jd-yellow">Get an instant estimate.</span>
          </h2>
          <p className="mx-auto mt-4 max-w-2xl text-base leading-relaxed text-slate-300">
            No waiting hours for a call back. Answer three quick questions and our
            AI assistant — trained on JD Electrical&apos;s real service catalogue —
            gives you an indicative price range, the scope of work and the compliance
            requirements. Then it lands directly on Jan&apos;s live leads board.
          </p>
        </div>

        <div className="mt-10 overflow-hidden rounded-2xl border border-white/12 bg-[#0a1626] shadow-2xl shadow-black/50">
          {/* Progress rail */}
          <div className="flex items-center gap-2 border-b border-white/10 px-6 py-4">
            {[1, 2, 3, 4].map((s, i) => (
              <div key={s} className="flex flex-1 items-center gap-2">
                <span
                  className={`flex h-7 w-7 shrink-0 items-center justify-center rounded-full text-xs font-bold transition-colors ${
                    step >= s
                      ? "bg-jd-yellow text-[#0a1626]"
                      : "border border-white/20 text-slate-500"
                  }`}
                  aria-current={step === s ? "step" : undefined}
                >
                  {s}
                </span>
                {i < 3 && (
                  <div
                    className={`h-0.5 flex-1 rounded ${step > s ? "bg-jd-yellow" : "bg-white/12"}`}
                    aria-hidden
                  />
                )}
              </div>
            ))}
          </div>

          <div className="p-6 sm:p-8">
            <AnimatePresence mode="wait">
              {/* STEP 1 — sector */}
              {step === 1 && (
                <motion.div
                  key="s1"
                  initial={{ opacity: 0, x: 24 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -24 }}
                  transition={{ duration: 0.3 }}
                >
                  <h3 className="text-lg font-bold">What kind of job is it?</h3>
                  <div className="mt-5 grid gap-3 sm:grid-cols-2">
                    {SECTORS.map((s) => (
                      <button
                        key={s.key}
                        onClick={() => {
                          setSector(s.key);
                          setJobType("");
                          setStep(2);
                        }}
                        className={`jd-card group flex items-start gap-4 rounded-xl border p-4 text-left transition-colors ${
                          sector === s.key
                            ? "border-jd-yellow bg-jd-yellow/10"
                            : "border-white/12 bg-white/[0.03] hover:border-jd-yellow/40"
                        }`}
                      >
                        <span
                          className={`flex h-11 w-11 shrink-0 items-center justify-center rounded-lg transition-colors ${
                            sector === s.key
                              ? "bg-jd-yellow text-[#0a1626]"
                              : "bg-jd-blue/35 text-jd-yellow"
                          }`}
                        >
                          <s.icon className="h-5.5 w-5.5" aria-hidden />
                        </span>
                        <span>
                          <span className="block font-bold text-white">{s.key}</span>
                          <span className="mt-0.5 block text-xs text-slate-400">
                            {s.hint}
                          </span>
                        </span>
                      </button>
                    ))}
                  </div>
                </motion.div>
              )}

              {/* STEP 2 — details */}
              {step === 2 && (
                <motion.div
                  key="s2"
                  initial={{ opacity: 0, x: 24 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -24 }}
                  transition={{ duration: 0.3 }}
                >
                  <h3 className="text-lg font-bold">Tell us more</h3>

                  <div className="mt-5 grid gap-5">
                    <div>
                      <Label className="text-sm font-semibold text-slate-300">
                        Job type
                      </Label>
                      <div className="mt-2 flex flex-wrap gap-2">
                        {(JOB_TYPES[sector ?? "Domestic"] || []).map((t) => (
                          <button
                            key={t}
                            onClick={() => setJobType(t)}
                            className={`rounded-full border px-3.5 py-1.5 text-sm font-medium transition-colors ${
                              jobType === t
                                ? "border-jd-yellow bg-jd-yellow text-[#0a1626] font-bold"
                                : "border-white/15 bg-white/[0.04] text-slate-300 hover:border-jd-yellow/40"
                            }`}
                          >
                            {t}
                          </button>
                        ))}
                      </div>
                    </div>

                    <div>
                      <Label className="text-sm font-semibold text-slate-300">
                        How urgent is it?
                      </Label>
                      <div className="mt-2 flex flex-wrap gap-2">
                        {URGENCIES.map((u) => (
                          <button
                            key={u.key}
                            onClick={() => setUrgency(u.key)}
                            className={`rounded-full border px-3.5 py-1.5 text-sm font-medium transition-colors ${
                              urgency === u.key
                                ? u.tone + " font-bold"
                                : "border-white/15 bg-white/[0.04] text-slate-300 hover:border-jd-yellow/40"
                            }`}
                          >
                            {u.key}
                          </button>
                        ))}
                      </div>
                    </div>

                    <div>
                      <Label
                        htmlFor="job-desc"
                        className="text-sm font-semibold text-slate-300"
                      >
                        Describe the job in your own words
                      </Label>
                      <Textarea
                        id="job-desc"
                        value={description}
                        onChange={(e) => setDescription(e.target.value)}
                        placeholder="e.g. 3-phase DB upgrade for a small workshop in Alrode, needs two new circuits and a CoC…"
                        className="mt-2 min-h-24 border-white/15 bg-white/[0.04] text-white placeholder:text-slate-500"
                        maxLength={1200}
                      />
                      <p className="mt-1.5 text-right text-xs text-slate-500">
                        {description.length}/1200
                      </p>
                    </div>
                  </div>

                  <div className="mt-6 flex items-center justify-between">
                    <Button
                      variant="ghost"
                      onClick={() => setStep(1)}
                      className="text-slate-400 hover:text-white"
                    >
                      <ArrowLeft className="h-4 w-4" aria-hidden /> Back
                    </Button>
                    <Button
                      onClick={generate}
                      disabled={!canGenerate || loading}
                      className="h-12 rounded-full bg-jd-yellow px-6 font-bold text-[#0a1626] hover:bg-[#ffd83d] glow-yellow disabled:opacity-40 disabled:shadow-none"
                    >
                      {loading ? (
                        <>
                          <Loader2 className="h-5 w-5 animate-spin" aria-hidden />
                          Crunching numbers…
                        </>
                      ) : (
                        <>
                          <Zap className="h-5 w-5" aria-hidden />
                          Generate my estimate
                        </>
                      )}
                    </Button>
                  </div>
                </motion.div>
              )}

              {/* STEP 3 — result */}
              {step === 3 && estimate && (
                <motion.div
                  key="s3"
                  initial={{ opacity: 0, x: 24 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -24 }}
                  transition={{ duration: 0.3 }}
                >
                  <div className="flex flex-wrap items-center justify-between gap-3">
                    <h3 className="text-lg font-bold">Your indicative estimate</h3>
                    <span className="rounded-full border border-white/15 bg-white/[0.05] px-3 py-1 text-xs font-semibold text-slate-300">
                      {sector} · {jobType || "General"} · {urgency}
                    </span>
                  </div>

                  <div className="mt-5 rounded-xl border border-jd-yellow/25 bg-gradient-to-br from-jd-yellow/10 to-transparent p-5">
                    <p className="text-sm text-slate-300">{estimate.jobSummary}</p>
                    <div className="mt-3 flex flex-wrap items-end gap-3">
                      <p className="text-3xl font-extrabold text-jd-yellow tnum sm:text-4xl">
                        {formatZAR(low)} – {formatZAR(high)}
                      </p>
                      <p className="pb-1 text-xs font-semibold uppercase tracking-wider text-slate-400">
                        incl. labour &amp; standard materials
                      </p>
                    </div>
                    <p className="mt-2 flex items-center gap-1.5 text-xs text-slate-400">
                      <Clock3 className="h-3.5 w-3.5" aria-hidden />
                      {estimate.urgencyNote}
                    </p>
                  </div>

                  <div className="mt-5 grid gap-5 md:grid-cols-2">
                    <div className="rounded-xl border border-white/10 bg-white/[0.03] p-5">
                      <p className="flex items-center gap-2 text-sm font-bold text-white">
                        <ListChecks className="h-4.5 w-4.5 text-jd-yellow" aria-hidden />
                        Scope of work
                      </p>
                      <ul className="mt-3 space-y-2">
                        {estimate.scope.map((s, i) => (
                          <li key={i} className="flex items-start gap-2 text-sm text-slate-300">
                            <CheckCircle2 className="mt-0.5 h-4 w-4 shrink-0 text-jd-yellow" aria-hidden />
                            {s}
                          </li>
                        ))}
                      </ul>
                    </div>

                    <div className="space-y-4">
                      {estimate.safetyFlags.length > 0 && (
                        <div className="rounded-xl border border-white/10 bg-white/[0.03] p-5">
                          <p className="flex items-center gap-2 text-sm font-bold text-white">
                            <ShieldCheck className="h-4.5 w-4.5 text-jd-yellow" aria-hidden />
                            Compliance &amp; safety
                          </p>
                          <ul className="mt-3 space-y-2">
                            {estimate.safetyFlags.map((s, i) => (
                              <li key={i} className="flex items-start gap-2 text-sm text-slate-300">
                                <ShieldCheck className="mt-0.5 h-4 w-4 shrink-0 text-emerald-400" aria-hidden />
                                {s}
                              </li>
                            ))}
                          </ul>
                        </div>
                      )}
                      <div className="rounded-xl border border-white/10 bg-white/[0.03] p-5">
                        <p className="text-sm font-bold text-white">Assumptions</p>
                        <ul className="mt-3 space-y-2">
                          {estimate.assumptions.map((s, i) => (
                            <li key={i} className="text-sm leading-relaxed text-slate-400">
                              • {s}
                            </li>
                          ))}
                        </ul>
                      </div>
                    </div>
                  </div>

                  <p className="mt-4 text-xs leading-relaxed text-slate-500">
                    This is an AI-generated indicative estimate to help you budget —
                    not a formal quotation. JD Electrical confirms final pricing
                    after assessing the job. {estimate.nextStep}
                  </p>

                  <div className="mt-6 flex flex-wrap items-center justify-between gap-3">
                    <Button
                      variant="ghost"
                      onClick={() => setStep(2)}
                      className="text-slate-400 hover:text-white"
                    >
                      <ArrowLeft className="h-4 w-4" aria-hidden /> Adjust job
                    </Button>
                    <Button
                      onClick={() => setStep(4)}
                      className="h-12 rounded-full bg-jd-yellow px-6 font-bold text-[#0a1626] hover:bg-[#ffd83d] glow-yellow"
                    >
                      Lock this in with Jan <ArrowRight className="h-4 w-4" aria-hidden />
                    </Button>
                  </div>
                </motion.div>
              )}

              {/* STEP 4 — contact capture */}
              {step === 4 && (
                <motion.div
                  key="s4"
                  initial={{ opacity: 0, x: 24 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -24 }}
                  transition={{ duration: 0.3 }}
                >
                  {!saved ? (
                    <>
                      <h3 className="text-lg font-bold">
                        Where should Jan send the formal quote?
                      </h3>
                      <p className="mt-1 text-sm text-slate-400">
                        Your estimate is attached automatically and lands on the
                        live leads board the moment you submit.
                      </p>
                      <div className="mt-5 grid gap-4 sm:grid-cols-2">
                        <div>
                          <Label htmlFor="est-name" className="text-sm text-slate-300">
                            Your name *
                          </Label>
                          <Input
                            id="est-name"
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                            placeholder="Thabo Mokoena"
                            className="mt-1.5 border-white/15 bg-white/[0.04] text-white placeholder:text-slate-500"
                          />
                        </div>
                        <div>
                          <Label htmlFor="est-phone" className="text-sm text-slate-300">
                            Phone / WhatsApp *
                          </Label>
                          <Input
                            id="est-phone"
                            value={phone}
                            onChange={(e) => setPhone(e.target.value)}
                            type="tel"
                            placeholder="083 000 0000"
                            className="mt-1.5 border-white/15 bg-white/[0.04] text-white placeholder:text-slate-500"
                          />
                        </div>
                      </div>
                      <div className="mt-6 flex items-center justify-between">
                        <Button
                          variant="ghost"
                          onClick={() => setStep(3)}
                          className="text-slate-400 hover:text-white"
                        >
                          <ArrowLeft className="h-4 w-4" aria-hidden /> Back
                        </Button>
                        <Button
                          onClick={saveLead}
                          disabled={saving}
                          className="h-12 rounded-full bg-jd-yellow px-6 font-bold text-[#0a1626] hover:bg-[#ffd83d] glow-yellow"
                        >
                          {saving ? (
                            <>
                              <Loader2 className="h-5 w-5 animate-spin" aria-hidden />
                              Sending…
                            </>
                          ) : (
                            <>
                              <Zap className="h-5 w-5" aria-hidden />
                              Send to JD&apos;s live board
                            </>
                          )}
                        </Button>
                      </div>
                    </>
                  ) : (
                    <div className="py-4 text-center">
                      <motion.div
                        initial={{ scale: 0.6, opacity: 0 }}
                        animate={{ scale: 1, opacity: 1 }}
                        transition={{ type: "spring", stiffness: 260, damping: 16 }}
                      >
                        <CheckCircle2 className="mx-auto h-16 w-16 text-emerald-400" aria-hidden />
                      </motion.div>
                      <h3 className="mt-4 text-xl font-extrabold">
                        Done! You&apos;re on the live board.
                      </h3>
                      <p className="mx-auto mt-2 max-w-md text-sm leading-relaxed text-slate-300">
                        Jan and the team can see your request instantly — watch the
                        Live Leads Board below light up with your job. Want it
                        faster? Ping us on WhatsApp with your estimate attached.
                      </p>
                      <div className="mt-6 flex flex-col items-center justify-center gap-3 sm:flex-row">
                        <Button
                          asChild
                          className="h-12 rounded-full bg-[#25D366] px-6 font-bold text-[#06130a] hover:bg-[#2fe46f]"
                        >
                          <a
                            href={`https://wa.me/27836023171?text=${waSummary}`}
                            target="_blank"
                            rel="noopener noreferrer"
                          >
                            <MessageCircle className="h-5 w-5" aria-hidden />
                            WhatsApp Jan my estimate
                          </a>
                        </Button>
                        <Button
                          asChild
                          variant="outline"
                          className="h-12 rounded-full border-white/20 bg-white/5 px-6 font-semibold text-white hover:bg-white/10"
                        >
                          <a href="#live-leads">
                            View the live board <ArrowRight className="h-4 w-4" aria-hidden />
                          </a>
                        </Button>
                      </div>
                      <button
                        onClick={reset}
                        className="mt-5 text-sm font-semibold text-slate-400 underline-offset-4 hover:text-jd-yellow hover:underline"
                      >
                        Run another estimate
                      </button>
                    </div>
                  )}
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </div>

        <p className="mt-4 flex items-center justify-center gap-2 text-center text-xs text-slate-500">
          <Phone className="h-3.5 w-3.5" aria-hidden />
          Prefer a human? Call {JD.phoneDisplay} — Jan answers personally.
        </p>
      </div>
    </section>
  );
}
