"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import {
  Mail,
  MapPin,
  Phone,
  Loader2,
  CheckCircle2,
  MessageCircle,
  Plug,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useToast } from "@/hooks/use-toast";
import { JD } from "./constants";

const PROVINCES = [
  "Gauteng",
  "Mpumalanga",
  "Limpopo",
  "North West",
  "KwaZulu-Natal",
  "Free State",
  "Western Cape",
  "Eastern Cape",
  "Northern Cape",
];

export function Contact() {
  const { toast } = useToast();
  const [first, setFirst] = useState("");
  const [last, setLast] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [province, setProvince] = useState("");
  const [message, setMessage] = useState("");
  const [sending, setSending] = useState(false);
  const [sent, setSent] = useState(false);

  async function submit(e: React.FormEvent) {
    e.preventDefault();
    if (!first.trim() || !last.trim() || !email.trim() || !phone.trim() || !province) {
      toast({
        title: "Missing details",
        description: "Please fill in all required fields.",
        variant: "destructive",
      });
      return;
    }
    setSending(true);
    try {
      const res = await fetch("/api/leads", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: `${first} ${last}`.trim(),
          phone,
          email,
          province,
          message,
          service: "Contact form",
          source: "contact",
        }),
      });
      const data = await res.json();
      if (!res.ok || data.error) throw new Error(data.error);
      setSent(true);
    } catch {
      toast({
        title: "Could not send",
        description: `No stress — WhatsApp or call ${JD.phoneDisplay} and we will sort you out.`,
        variant: "destructive",
      });
    } finally {
      setSending(false);
    }
  }

  const inputCls =
    "border-white/15 bg-white/[0.04] text-white placeholder:text-slate-500";

  return (
    <section id="contact" className="relative py-20 sm:py-24 scroll-mt-20">
      <div className="mx-auto max-w-7xl px-4 sm:px-6">
        <div className="grid gap-12 lg:grid-cols-[1fr_1.1fr]">
          {/* Left: info */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
          >
            <span className="text-xs font-bold uppercase tracking-[0.2em] text-jd-yellow">
              Get in touch
            </span>
            <h2 className="mt-3 text-3xl font-extrabold tracking-tight sm:text-4xl">
              We look forward to{" "}
              <span className="text-jd-yellow">“connecting”</span> with you
            </h2>
            <p className="mt-4 text-base leading-relaxed text-slate-300">
              “Plug” in your details and we will be in touch. Prefer talking? Jan
              answers his phone personally — no call centres, no queues.
            </p>

            <ul className="mt-8 space-y-5">
              <li className="flex items-center gap-4">
                <span className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-jd-blue/35 text-jd-yellow">
                  <Phone className="h-5.5 w-5.5" aria-hidden />
                </span>
                <div>
                  <p className="text-xs font-semibold uppercase tracking-wider text-slate-400">
                    Call or WhatsApp
                  </p>
                  <a
                    href={JD.phoneHref}
                    className="text-lg font-bold text-white hover:text-jd-yellow transition-colors"
                  >
                    {JD.phoneDisplay}
                  </a>
                </div>
              </li>
              <li className="flex items-center gap-4">
                <span className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-jd-blue/35 text-jd-yellow">
                  <Mail className="h-5.5 w-5.5" aria-hidden />
                </span>
                <div>
                  <p className="text-xs font-semibold uppercase tracking-wider text-slate-400">
                    E-mail us
                  </p>
                  <a
                    href={JD.emailHref}
                    className="text-lg font-bold text-white hover:text-jd-yellow transition-colors"
                  >
                    {JD.email}
                  </a>
                </div>
              </li>
              <li className="flex items-center gap-4">
                <span className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-jd-blue/35 text-jd-yellow">
                  <MapPin className="h-5.5 w-5.5" aria-hidden />
                </span>
                <div>
                  <p className="text-xs font-semibold uppercase tracking-wider text-slate-400">
                    Our offices
                  </p>
                  <p className="text-lg font-bold text-white">{JD.address}</p>
                </div>
              </li>
            </ul>
          </motion.div>

          {/* Right: form */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ duration: 0.7, delay: 0.1, ease: [0.22, 1, 0.36, 1] }}
            className="rounded-2xl border border-white/12 bg-[#0a1626] p-6 shadow-2xl shadow-black/50 sm:p-8"
          >
            {!sent ? (
              <form onSubmit={submit} className="grid gap-4">
                <div className="flex items-center gap-2.5">
                  <Plug className="h-5 w-5 text-jd-yellow" aria-hidden />
                  <p className="text-sm font-bold text-white">
                    Plug in your details
                  </p>
                </div>

                <div className="grid gap-4 sm:grid-cols-2">
                  <div>
                    <Label htmlFor="c-first" className="text-sm text-slate-300">
                      Name <span className="text-jd-yellow">*</span>
                    </Label>
                    <Input
                      id="c-first"
                      value={first}
                      onChange={(e) => setFirst(e.target.value)}
                      placeholder="First"
                      className={`mt-1.5 ${inputCls}`}
                      autoComplete="given-name"
                    />
                  </div>
                  <div>
                    <Label htmlFor="c-last" className="text-sm text-slate-300">
                      Surname <span className="text-jd-yellow">*</span>
                    </Label>
                    <Input
                      id="c-last"
                      value={last}
                      onChange={(e) => setLast(e.target.value)}
                      placeholder="Last"
                      className={`mt-1.5 ${inputCls}`}
                      autoComplete="family-name"
                    />
                  </div>
                </div>

                <div className="grid gap-4 sm:grid-cols-2">
                  <div>
                    <Label htmlFor="c-email" className="text-sm text-slate-300">
                      Email <span className="text-jd-yellow">*</span>
                    </Label>
                    <Input
                      id="c-email"
                      type="email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      placeholder="you@company.co.za"
                      className={`mt-1.5 ${inputCls}`}
                      autoComplete="email"
                    />
                  </div>
                  <div>
                    <Label htmlFor="c-phone" className="text-sm text-slate-300">
                      Phone Number <span className="text-jd-yellow">*</span>
                    </Label>
                    <Input
                      id="c-phone"
                      type="tel"
                      value={phone}
                      onChange={(e) => setPhone(e.target.value)}
                      placeholder="083 000 0000"
                      className={`mt-1.5 ${inputCls}`}
                      autoComplete="tel"
                    />
                  </div>
                </div>

                <div>
                  <Label className="text-sm text-slate-300">
                    Province <span className="text-jd-yellow">*</span>
                  </Label>
                  <Select value={province} onValueChange={setProvince}>
                    <SelectTrigger className="mt-1.5 border-white/15 bg-white/[0.04] text-white">
                      <SelectValue placeholder="Select your province" />
                    </SelectTrigger>
                    <SelectContent className="bg-[#0c1930] border-white/15 text-white">
                      {PROVINCES.map((p) => (
                        <SelectItem key={p} value={p}>
                          {p}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

                <div>
                  <Label htmlFor="c-msg" className="text-sm text-slate-300">
                    Comment or Message
                  </Label>
                  <Textarea
                    id="c-msg"
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                    placeholder="Tell us about your project, plant, or emergency…"
                    className={`mt-1.5 min-h-24 ${inputCls}`}
                    maxLength={2000}
                  />
                </div>

                <Button
                  type="submit"
                  disabled={sending}
                  className="h-12 rounded-full bg-jd-yellow font-bold text-[#0a1626] hover:bg-[#ffd83d] glow-yellow"
                >
                  {sending ? (
                    <>
                      <Loader2 className="h-5 w-5 animate-spin" aria-hidden />
                      Sending…
                    </>
                  ) : (
                    "Submit — goes straight to JD's board"
                  )}
                </Button>
                <p className="text-center text-[11px] text-slate-500">
                  Your details land on the same live leads board demonstrated above —
                  nothing gets lost in a stale inbox.
                </p>
              </form>
            ) : (
              <div className="flex h-full min-h-96 flex-col items-center justify-center py-8 text-center">
                <motion.div
                  initial={{ scale: 0.6, opacity: 0 }}
                  animate={{ scale: 1, opacity: 1 }}
                  transition={{ type: "spring", stiffness: 260, damping: 16 }}
                >
                  <CheckCircle2 className="h-16 w-16 text-emerald-400" aria-hidden />
                </motion.div>
                <h3 className="mt-4 text-xl font-extrabold">Message received!</h3>
                <p className="mx-auto mt-2 max-w-sm text-sm leading-relaxed text-slate-300">
                  Thanks {first || "friend"} — your details are on JD&apos;s live
                  leads board. Jan or a team member will contact you shortly. Need
                  it faster?
                </p>
                <div className="mt-6 flex flex-col gap-3 sm:flex-row">
                  <Button
                    asChild
                    className="h-11 rounded-full bg-[#25D366] font-bold text-[#06130a] hover:bg-[#2fe46f]"
                  >
                    <a
                      href={JD.whatsappHref}
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      <MessageCircle className="h-5 w-5" aria-hidden />
                      WhatsApp us now
                    </a>
                  </Button>
                  <Button
                    asChild
                    variant="outline"
                    className="h-11 rounded-full border-white/20 bg-white/5 font-semibold text-white hover:bg-white/10"
                  >
                    <a href={JD.phoneHref}>
                      <Phone className="h-4 w-4" aria-hidden />
                      {JD.phoneDisplay}
                    </a>
                  </Button>
                </div>
              </div>
            )}
          </motion.div>
        </div>
      </div>
    </section>
  );
}
