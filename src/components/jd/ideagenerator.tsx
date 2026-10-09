"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Lightbulb,
  Loader2,
  ArrowRight,
  Gauge,
  Wrench,
  TrendingUp,
  CalendarCheck,
  Building,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useToast } from "@/hooks/use-toast";
import { JD } from "./constants";

interface Idea {
  title: string;
  pain: string;
  how: string;
  impact: string;
  effort: "Low" | "Medium" | "High";
  quarterReady: string;
}

const EFFORT_CLS: Record<string, string> = {
  Low: "border-emerald-400/40 bg-emerald-400/10 text-emerald-300",
  Medium: "border-amber-400/40 bg-amber-400/10 text-amber-300",
  High: "border-red-400/40 bg-red-400/10 text-red-300",
};

const EXAMPLES = [
  "I run a 6-crew industrial electrical firm in Alberton doing mining contracts",
  "I'm a master electrician doing house wiring, solar and CoCs on the East Rand",
  "We maintain pumps and generators for filling stations across Gauteng",
];

export function IdeaGenerator() {
  const { toast } = useToast();
  const [business, setBusiness] = useState("");
  const [loading, setLoading] = useState(false);
  const [ideas, setIdeas] = useState<Idea[] | null>(null);

  async function generate(value?: string) {
    const q = (value ?? business).trim();
    if (q.length < 8) {
      toast({
        title: "One sentence is all we need",
        description: "Tell us a little more about the business first.",
        variant: "destructive",
      });
      return;
    }
    setBusiness(q);
    setLoading(true);
    setIdeas(null);
    try {
      const res = await fetch("/api/ideas", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ business: q }),
      });
      const data = await res.json();
      if (!res.ok || data.error) throw new Error(data.error || "Generation failed");
      if (!data.ideas?.length) throw new Error("No ideas came back — try again.");
      setIdeas(data.ideas);
    } catch (e) {
      toast({
        title: "Generator busy",
        description:
          e instanceof Error ? e.message : "Please try again in a moment.",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  }

  return (
    <section id="ai-ideas" className="relative py-20 sm:py-24 scroll-mt-20 overflow-hidden">
      <div
        className="absolute inset-0 bg-gradient-to-b from-transparent via-jd-blue/[0.06] to-transparent"
        aria-hidden
      />
      <div className="relative mx-auto max-w-5xl px-4 sm:px-6">
        <div className="text-center">
          <span className="inline-flex items-center gap-2 rounded-full border border-jd-blue/50 bg-jd-blue/15 px-4 py-1.5 text-xs font-bold uppercase tracking-[0.16em] text-sky-300">
            <Building className="h-3.5 w-3.5" aria-hidden />
            The Business Hustle pitch — try it live
          </span>
          <h2 className="mt-4 text-3xl font-extrabold tracking-tight sm:text-4xl">
            The free{" "}
            <span className="text-jd-yellow">AI Tool Idea Generator</span>
          </h2>
          <p className="mx-auto mt-4 max-w-2xl text-base leading-relaxed text-slate-300">
            This is the tool Liam promised in his email — working right now, on
            Jan&apos;s own demo site. One sentence about your trade business, and
            it finds <strong className="text-white">three practical automations</strong>{" "}
            you could deploy this quarter. Built open-source by Business Hustle for
            South African trade firms.
          </p>
        </div>

        <div className="mt-10 rounded-2xl border border-white/12 bg-[#0a1626] p-6 shadow-2xl shadow-black/50 sm:p-8">
          <div>
            <Label htmlFor="idea-input" className="text-sm font-semibold text-slate-300">
              Describe your business in one sentence
            </Label>
            <div className="mt-2 flex flex-col gap-3 sm:flex-row">
              <Input
                id="idea-input"
                value={business}
                onChange={(e) => setBusiness(e.target.value)}
                onKeyDown={(e) => e.key === "Enter" && generate()}
                placeholder="e.g. I run an industrial electrical firm doing mining contracts in Gauteng…"
                className="h-12 flex-1 border-white/15 bg-white/[0.04] text-white placeholder:text-slate-500"
                maxLength={400}
              />
              <Button
                onClick={() => generate()}
                disabled={loading}
                className="h-12 rounded-full bg-jd-yellow px-6 font-bold text-[#0a1626] hover:bg-[#ffd83d] glow-yellow"
              >
                {loading ? (
                  <>
                    <Loader2 className="h-5 w-5 animate-spin" aria-hidden />
                    Thinking…
                  </>
                ) : (
                  <>
                    <Lightbulb className="h-5 w-5" aria-hidden />
                    Find my 3 ideas
                  </>
                )}
              </Button>
            </div>
            <div className="mt-3 flex flex-wrap items-center gap-2">
              <span className="text-xs text-slate-500">Try:</span>
              {EXAMPLES.map((ex) => (
                <button
                  key={ex}
                  onClick={() => generate(ex)}
                  disabled={loading}
                  className="rounded-full border border-white/10 bg-white/[0.04] px-3 py-1 text-xs text-slate-400 hover:border-jd-yellow/40 hover:text-jd-yellow transition-colors disabled:opacity-50"
                >
                  “{ex.length > 52 ? ex.slice(0, 52) + "…" : ex}”
                </button>
              ))}
            </div>
          </div>

          <AnimatePresence mode="wait">
            {loading && (
              <motion.div
                key="loading"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="mt-8 grid gap-4 md:grid-cols-3"
                aria-live="polite"
              >
                {[1, 2, 3].map((i) => (
                  <div
                    key={i}
                    className="h-56 animate-pulse rounded-xl bg-white/[0.05]"
                    aria-hidden
                  />
                ))}
              </motion.div>
            )}

            {ideas && !loading && (
              <motion.div
                key="ideas"
                initial={{ opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0 }}
                className="mt-8 grid gap-4 md:grid-cols-3"
              >
                {ideas.map((idea, i) => (
                  <motion.article
                    key={i}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: i * 0.12, duration: 0.5 }}
                    className="jd-card flex flex-col rounded-xl border border-white/12 bg-white/[0.03] p-5"
                  >
                    <div className="flex items-center justify-between gap-2">
                      <span className="flex h-8 w-8 items-center justify-center rounded-lg bg-jd-yellow/15 font-extrabold text-jd-yellow">
                        {i + 1}
                      </span>
                      <span
                        className={`rounded-full border px-2.5 py-0.5 text-[10px] font-bold uppercase tracking-wide ${EFFORT_CLS[idea.effort] ?? EFFORT_CLS.Medium}`}
                      >
                        {idea.effort} effort
                      </span>
                    </div>
                    <h3 className="mt-3 font-bold leading-snug text-white">
                      {idea.title}
                    </h3>
                    <p className="mt-2 text-xs leading-relaxed text-slate-400">
                      <strong className="text-slate-300">The pain:</strong> {idea.pain}
                    </p>
                    <p className="mt-2 flex-1 text-xs leading-relaxed text-slate-400">
                      <strong className="text-slate-300">How it works:</strong> {idea.how}
                    </p>
                    <div className="mt-3 space-y-2 border-t border-white/8 pt-3">
                      <p className="flex items-start gap-1.5 text-xs text-emerald-300">
                        <TrendingUp className="mt-0.5 h-3.5 w-3.5 shrink-0" aria-hidden />
                        {idea.impact}
                      </p>
                      <p className="flex items-start gap-1.5 text-xs text-jd-yellow">
                        <CalendarCheck className="mt-0.5 h-3.5 w-3.5 shrink-0" aria-hidden />
                        {idea.quarterReady}
                      </p>
                    </div>
                  </motion.article>
                ))}
              </motion.div>
            )}
          </AnimatePresence>

          <div className="mt-8 flex flex-col items-center justify-between gap-4 rounded-xl border border-jd-blue/30 bg-jd-blue/10 p-5 sm:flex-row">
            <div className="flex items-start gap-3">
              <Gauge className="mt-0.5 h-5 w-5 shrink-0 text-jd-yellow" aria-hidden />
              <p className="text-sm leading-relaxed text-slate-300">
                <strong className="text-white">Like what you see, Jan?</strong>{" "}
                Business Hustle builds exactly these automations for South African
                trade firms — local directories that bring in nearby jobs, plus the
                open-source AI tooling to run them.
              </p>
            </div>
            <Button
              asChild
              className="h-11 shrink-0 rounded-full bg-white px-5 font-bold text-[#0a1626] hover:bg-slate-200"
            >
              <a
                href={`mailto:l@trysimplevibe.com?subject=${encodeURIComponent("Interested in Business Hustle automation")}&body=${encodeURIComponent("Hi Liam,\n\nThe demo site looks great. I'd like to talk about the AI automations for JD Electrical.\n\nJan Cilliers\nJD Electrical\n" + JD.phoneDisplay)}`}
              >
                Reply to Liam <ArrowRight className="h-4 w-4" aria-hidden />
              </a>
            </Button>
          </div>

          <p className="mt-4 flex items-center justify-center gap-1.5 text-[11px] text-slate-500">
            <Wrench className="h-3 w-3" aria-hidden />
            Open-source · WhatsApp-first · owned by the trade firm, not the platform
          </p>
        </div>
      </div>
    </section>
  );
}
