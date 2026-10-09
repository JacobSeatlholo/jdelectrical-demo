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
  { key: "Emergency — ASAP", tone: "border-red-300 bg-red-50 text-red-700" },
  { key: "This week", tone: "border-jd-blue bg-jd-blue text-white" },
  { key: "Planning ahead", tone: "border-slate-300 bg-jd-cloud text-jd-navy" },
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

const STEP_TITLES = ["Job type", "Details", "Estimate", "Get quote"];

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

  const inputCls = "mt-1.5 border-slate-300 bg-white text-jd-ink placeholder:text-slate-400 focus-visible:ring-jd-blue";

  return (
    <section id="estimate" className="scroll-mt-24 bg-jd-cloud py-16 sm:py-24">
      <div className="mx-auto max-w-4xl px-4 sm:px-6">
        <div className="text-center">
          <p className="jd-eyebrow justify-center">Instant Estimate</p>
          <h2 className="mt-3 text-3xl font-bold text-jd-navy sm:text-4xl">
            Describe the job — get an instant estimate
          </h2>
          <p className="mx-auto mt-4 max-w-2xl text-base leading-relaxed text-slate-600">
            No waiting hours for a call back. Answer three quick questions and our
            smart estimating assistant — trained on JD Electrical&apos;s real
            service catalogue — gives you an indicative price range, the scope of
            work and the compliance requirements. It lands straight on Jan&apos;s
            job board.
          </p>
        </div>

        <div className="mt-10 overflow-hidden rounded-xl border border-slate-200 bg-white shadow-lg shadow-slate-200/60">
          {/* Progress rail */}
          <div className="border-b border-slate-200 bg-jd-cloud/60 px-6 py-4 sm:px-8">
            <ol className="flex items-center gap-2">
              {[1, 2, 3, 4].map((s, i) => (
                <li key={s} className="flex flex-1 items-center gap-2">
                  <span
                    className={`flex h-7 w-7 shrink-0 items-center justify-center rounded-full text-xs font-bold transition-colors ${
                      step >= s
                        ? "bg-jd-blue text-white"
                        : "border border-slate-300 bg-white text-slate-400"
                    }`}
                    aria-current={step === s ? "step" : undefined}
                  >
                    {s}
                  </span>
                  <span
                    className={`hidden text-xs font-semibold sm:block ${
                      step >= s ? "text-jd-blue" : "text-slate-400"
                    }`}
                  >
                    {STEP_TITLES[i]}
                  </span>
                  {i < 3 && (
                    <div
                      className={`h-0.5 flex-1 rounded ${step > s ? "bg-jd-blue" : "bg-slate-200"}`}
                      aria-hidden
                    />
                  )}
                </li>
              ))}
            </ol>
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
                  transition={{ duration: 0.25 }}
                >
                  <h3 className="text-lg font-bold text-jd-navy">What kind of job is it?</h3>
                  <div className="mt-5 grid gap-3 sm:grid-cols-2">
                    {SECTORS.map((s) => (
                      <button
                        key={s.key}
                        onClick={() => {
                          setSector(s.key);
                          setJobType("");
                          setStep(2);
                        }}
                        className={`group flex items-start gap-4 rounded-lg border p-4 text-left transition-all ${
                          sector === s.key
                            ? "border-jd-blue bg-jd-blue/[0.06] ring-1 ring-jd-blue"
                            : "border-slate-200 bg-white hover:border-jd-blue/50 hover:shadow-md"
                        }`}
                      >
                        <span
                          className={`flex h-11 w-11 shrink-0 items-center justify-center rounded-lg transition-colors ${
                            sector === s.key
                              ? "bg-jd-blue text-white"
                              : "bg-jd-cloud text-jd-blue group-hover:bg-jd-blue group-hover:text-white"
                          }`}
                        >
                          <s.icon className="h-5 w-5" aria-hidden />
                        </span>
                        <span>
                          <span className="block font-bold text-jd-navy">{s.key}</span>
                          <span className="mt-0.5 block text-xs text-slate-500">
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
                  transition={{ duration: 0.25 }}
                >
                  <h3 className="text-lg font-bold text-jd-navy">Tell us more</h3>

                  <div className="mt-5 grid gap-5">
                    <div>
                      <Label className="text-sm font-semibold text-jd-ink">
                        Job type
                      </Label>
                      <div className="mt-2 flex flex-wrap gap-2">
                        {(JOB_TYPES[sector ?? "Domestic"] || []).map((t) => (
                          <button
                            key={t}
                            onClick={() => setJobType(t)}
                            className={`rounded-md border px-3.5 py-1.5 text-sm font-medium transition-colors ${
                              jobType === t
                                ? "border-jd-blue bg-jd-blue font-bold text-white"
                                : "border-slate-300 bg-white text-slate-600 hover:border-jd-blue hover:text-jd-blue"
                            }`}
                          >
                            {t}
                          </button>
                        ))}
                      </div>
                    </div>

                    <div>
                      <Label className="text-sm font-semibold text-jd-ink">
                        How urgent is it?
                      </Label>
                      <div className="mt-2 flex flex-wrap gap-2">
                        {URGENCIES.map((u) => (
                          <button
                            key={u.key}
                            onClick={() => setUrgency(u.key)}
                            className={`rounded-md border px-3.5 py-1.5 text-sm font-medium transition-colors ${
                              urgency === u.key
                                ? u.tone + " font-bold"
                                : "border-slate-300 bg-white text-slate-600 hover:border-jd-blue hover:text-jd-blue"
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
                        className="text-sm font-semibold text-jd-ink"
                      >
                        Describe the job in your own words
                      </Label>
                      <Textarea
                        id="job-desc"
                        value={description}
                        onChange={(e) => setDescription(e.target.value)}
                        placeholder="e.g. 3-phase DB upgrade for a small workshop in Alrode, needs two new circuits and a CoC…"
                        className={`${inputCls} min-h-24`}
                        maxLength={1200}
                      />
                      <p className="mt-1.5 text-right text-xs text-slate-400">
                        {description.length}/1200
                      </p>
                    </div>
                  </div>

                  <div className="mt-6 flex items-center justify-between">
                    <Button
                      variant="ghost"
                      onClick={() => setStep(1)}
                      className="text-slate-500 hover:text-jd-blue"
                    >
                      <ArrowLeft className="h-4 w-4" aria-hidden /> Back
                    </Button>
                    <Button
                      onClick={generate}
                      disabled={!canGenerate || loading}
                      className="h-12 rounded-md bg-jd-yellow px-6 font-bold text-jd-navy shadow-sm transition-colors hover:bg-[#ffd61f] disabled:opacity-40"
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
                  transition={{ duration: 0.25 }}
                >
                  <div className="flex flex-wrap items-center justify-between gap-3">
                    <h3 className="text-lg font-bold text-jd-navy">Your indicative estimate</h3>
                    <span className="rounded-md border border-slate-200 bg-jd-cloud px-3 py-1 text-xs font-semibold text-slate-600">
                      {sector} · {jobType || "General"} · {urgency}
                    </span>
                  </div>

                  <div className="mt-5 rounded-lg border border-jd-blue/20 bg-jd-blue/[0.04] p-5">
                    <p className="text-sm text-slate-600">{estimate.jobSummary}</p>
                    <div className="mt-3 flex flex-wrap items-end gap-3">
                      <p className="tnum text-3xl font-bold text-jd-blue sm:text-4xl">
                        {formatZAR(low)} – {formatZAR(high)}
                      </p>
                      <p className="pb-1 text-xs font-semibold uppercase tracking-wider text-slate-500">
                        incl. labour &amp; standard materials
                      </p>
                    </div>
                    <p className="mt-2 flex items-center gap-1.5 text-xs text-slate-500">
                      <Clock3 className="h-3.5 w-3.5" aria-hidden />
                      {estimate.urgencyNote}
                    </p>
                  </div>

                  <div className="mt-5 grid gap-5 md:grid-cols-2">
                    <div className="rounded-lg border border-slate-200 bg-white p-5">
                      <p className="flex items-center gap-2 text-sm font-bold text-jd-navy">
                        <ListChecks className="h-4 w-4 text-jd-blue" aria-hidden />
                        Scope of work
                      </p>
                      <ul className="mt-3 space-y-2">
                        {estimate.scope.map((s, i) => (
                          <li key={i} className="flex items-start gap-2 text-sm text-slate-600">
                            <CheckCircle2 className="mt-0.5 h-4 w-4 shrink-0 text-jd-blue" aria-hidden />
                            {s}
                          </li>
                        ))}
                      </ul>
                    </div>

                    <div className="space-y-4">
                      {estimate.safetyFlags.length > 0 && (
                        <div className="rounded-lg border border-slate-200 bg-white p-5">
                          <p className="flex items-center gap-2 text-sm font-bold text-jd-navy">
                            <ShieldCheck className="h-4 w-4 text-jd-blue" aria-hidden />
                            Compliance &amp; safety
                          </p>
                          <ul className="mt-3 space-y-2">
                            {estimate.safetyFlags.map((s, i) => (
                              <li key={i} className="flex items-start gap-2 text-sm text-slate-600">
                                <ShieldCheck className="mt-0.5 h-4 w-4 shrink-0 text-emerald-600" aria-hidden />
                                {s}
                              </li>
                            ))}
                          </ul>
                        </div>
                      )}
                      <div className="rounded-lg border border-slate-200 bg-white p-5">
                        <p className="text-sm font-bold text-jd-navy">Assumptions</p>
                        <ul className="mt-3 space-y-2">
                          {estimate.assumptions.map((s, i) => (
                            <li key={i} className="text-sm leading-relaxed text-slate-500">
                              • {s}
                            </li>
                          ))}
                        </ul>
                      </div>
                    </div>
                  </div>

                  <p className="mt-4 text-xs leading-relaxed text-slate-500">
                    This is an indicative estimate to help you budget — not a formal
                    quotation. JD Electrical confirms final pricing after assessing
                    the job. {estimate.nextStep}
                  </p>

                  <div className="mt-6 flex flex-wrap items-center justify-between gap-3">
                    <Button
                      variant="ghost"
                      onClick={() => setStep(2)}
                      className="text-slate-500 hover:text-jd-blue"
                    >
                      <ArrowLeft className="h-4 w-4" aria-hidden /> Adjust job
                    </Button>
                    <Button
                      onClick={() => setStep(4)}
                      className="h-12 rounded-md bg-jd-yellow px-6 font-bold text-jd-navy shadow-sm transition-colors hover:bg-[#ffd61f]"
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
                  transition={{ duration: 0.25 }}
                >
                  {!saved ? (
                    <>
                      <h3 className="text-lg font-bold text-jd-navy">
                        Where should Jan send the formal quote?
                      </h3>
                      <p className="mt-1 text-sm text-slate-500">
                        Your estimate is attached automatically and lands on the job
                        board the moment you submit.
                      </p>
                      <div className="mt-5 grid gap-4 sm:grid-cols-2">
                        <div>
                          <Label htmlFor="est-name" className="text-sm text-jd-ink">
                            Your name *
                          </Label>
                          <Input
                            id="est-name"
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                            placeholder="Thabo Mokoena"
                            className={inputCls}
                          />
                        </div>
                        <div>
                          <Label htmlFor="est-phone" className="text-sm text-jd-ink">
                            Phone / WhatsApp *
                          </Label>
                          <Input
                            id="est-phone"
                            value={phone}
                            onChange={(e) => setPhone(e.target.value)}
                            type="tel"
                            placeholder="083 000 0000"
                            className={inputCls}
                          />
                        </div>
                      </div>
                      <div className="mt-6 flex items-center justify-between">
                        <Button
                          variant="ghost"
                          onClick={() => setStep(3)}
                          className="text-slate-500 hover:text-jd-blue"
                        >
                          <ArrowLeft className="h-4 w-4" aria-hidden /> Back
                        </Button>
                        <Button
                          onClick={saveLead}
                          disabled={saving}
                          className="h-12 rounded-md bg-jd-blue px-6 font-bold text-white shadow-sm transition-colors hover:bg-jd-blue-deep"
                        >
                          {saving ? (
                            <>
                              <Loader2 className="h-5 w-5 animate-spin" aria-hidden />
                              Sending…
                            </>
                          ) : (
                            <>
                              <Zap className="h-5 w-5" aria-hidden />
                              Send my request to Jan
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
                        <CheckCircle2 className="mx-auto h-16 w-16 text-emerald-600" aria-hidden />
                      </motion.div>
                      <h3 className="mt-4 text-xl font-bold text-jd-navy">
                        Done! Your request is with Jan.
                      </h3>
                      <p className="mx-auto mt-2 max-w-md text-sm leading-relaxed text-slate-600">
                        Your estimate has landed on JD Electrical&apos;s live job
                        board — the team can see it instantly. Want it faster? Ping
                        us on WhatsApp and we&apos;ll pick it up right away.
                      </p>
                      <div className="mt-6 flex flex-col items-center justify-center gap-3 sm:flex-row">
                        <Button
                          asChild
                          className="h-12 rounded-md bg-[#25D366] px-6 font-bold text-white shadow-sm transition-colors hover:bg-[#1fb857]"
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
                          className="h-12 rounded-md border-slate-300 bg-white px-6 font-semibold text-jd-navy hover:border-jd-blue hover:text-jd-blue"
                        >
                          <a href="#live-leads">
                            View the live board <ArrowRight className="h-4 w-4" aria-hidden />
                          </a>
                        </Button>
                      </div>
                      <button
                        onClick={reset}
                        className="mt-5 text-sm font-semibold text-slate-500 underline-offset-4 hover:text-jd-blue hover:underline"
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
