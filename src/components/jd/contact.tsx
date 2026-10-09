"use client";

import { useState } from "react";
import {
  Mail,
  MapPin,
  Phone,
  Loader2,
  CheckCircle2,
  MessageCircle,
  Plug,
  Clock3,
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
    "mt-1.5 border-slate-300 bg-white text-jd-ink placeholder:text-slate-400 focus-visible:ring-jd-blue";

  return (
    <section id="contact" className="scroll-mt-24 bg-white py-16 sm:py-24">
      <div className="mx-auto max-w-7xl px-4 sm:px-6">
        <div className="grid gap-12 lg:grid-cols-[1fr_1.1fr]">
          {/* Left: info */}
          <div>
            <p className="jd-eyebrow">Get In Touch</p>
            <h2 className="mt-3 text-3xl font-bold text-jd-navy sm:text-4xl">
              We&apos;d love to work with you
            </h2>
            <p className="mt-4 text-base leading-relaxed text-slate-600">
              “Plug” in your details and we will be in touch. Prefer talking? Jan
              answers his phone personally — no call centres, no queues.
            </p>

            <ul className="mt-8 space-y-5">
              <li className="flex items-center gap-4">
                <span className="flex h-12 w-12 shrink-0 items-center justify-center rounded-lg bg-jd-blue text-white">
                  <Phone className="h-5 w-5" aria-hidden />
                </span>
                <div>
                  <p className="text-xs font-semibold uppercase tracking-wider text-slate-500">
                    Call or WhatsApp
                  </p>
                  <a
                    href={JD.phoneHref}
                    className="text-lg font-bold text-jd-navy transition-colors hover:text-jd-blue"
                  >
                    {JD.phoneDisplay}
                  </a>
                </div>
              </li>
              <li className="flex items-center gap-4">
                <span className="flex h-12 w-12 shrink-0 items-center justify-center rounded-lg bg-jd-blue text-white">
                  <Mail className="h-5 w-5" aria-hidden />
                </span>
                <div>
                  <p className="text-xs font-semibold uppercase tracking-wider text-slate-500">
                    E-mail us
                  </p>
                  <a
                    href={JD.emailHref}
                    className="text-lg font-bold text-jd-navy transition-colors hover:text-jd-blue"
                  >
                    {JD.email}
                  </a>
                </div>
              </li>
              <li className="flex items-center gap-4">
                <span className="flex h-12 w-12 shrink-0 items-center justify-center rounded-lg bg-jd-blue text-white">
                  <MapPin className="h-5 w-5" aria-hidden />
                </span>
                <div>
                  <p className="text-xs font-semibold uppercase tracking-wider text-slate-500">
                    Our offices
                  </p>
                  <p className="text-lg font-bold text-jd-navy">{JD.address}</p>
                </div>
              </li>
              <li className="flex items-center gap-4">
                <span className="flex h-12 w-12 shrink-0 items-center justify-center rounded-lg bg-jd-blue text-white">
                  <Clock3 className="h-5 w-5" aria-hidden />
                </span>
                <div>
                  <p className="text-xs font-semibold uppercase tracking-wider text-slate-500">
                    Hours
                  </p>
                  <p className="text-lg font-bold text-jd-navy">
                    Mon–Fri 07:30–17:00 · Emergencies 24/7
                  </p>
                </div>
              </li>
            </ul>

            <div className="mt-8 flex flex-col gap-3 sm:flex-row">
              <a
                href={JD.whatsappHref}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center gap-2 rounded-md bg-[#25D366] px-5 py-3 text-sm font-bold text-white shadow-sm transition-colors hover:bg-[#1fb857]"
              >
                <MessageCircle className="h-4 w-4" aria-hidden />
                WhatsApp Jan directly
              </a>
              <a
                href={JD.phoneHref}
                className="inline-flex items-center justify-center gap-2 rounded-md border border-slate-300 bg-white px-5 py-3 text-sm font-bold text-jd-navy transition-colors hover:border-jd-blue hover:text-jd-blue"
              >
                <Phone className="h-4 w-4" aria-hidden />
                {JD.phoneDisplay}
              </a>
            </div>
          </div>

          {/* Right: form */}
          <div className="rounded-xl border border-slate-200 bg-white p-6 shadow-lg shadow-slate-200/60 sm:p-8">
            {!sent ? (
              <form onSubmit={submit} className="grid gap-4">
                <div className="flex items-center gap-2.5">
                  <Plug className="h-5 w-5 text-jd-blue" aria-hidden />
                  <p className="text-sm font-bold text-jd-navy">
                    Plug in your details
                  </p>
                </div>

                <div className="grid gap-4 sm:grid-cols-2">
                  <div>
                    <Label htmlFor="c-first" className="text-sm text-jd-ink">
                      Name <span className="text-red-600">*</span>
                    </Label>
                    <Input
                      id="c-first"
                      value={first}
                      onChange={(e) => setFirst(e.target.value)}
                      placeholder="First"
                      className={inputCls}
                      autoComplete="given-name"
                    />
                  </div>
                  <div>
                    <Label htmlFor="c-last" className="text-sm text-jd-ink">
                      Surname <span className="text-red-600">*</span>
                    </Label>
                    <Input
                      id="c-last"
                      value={last}
                      onChange={(e) => setLast(e.target.value)}
                      placeholder="Last"
                      className={inputCls}
                      autoComplete="family-name"
                    />
                  </div>
                </div>

                <div className="grid gap-4 sm:grid-cols-2">
                  <div>
                    <Label htmlFor="c-email" className="text-sm text-jd-ink">
                      Email <span className="text-red-600">*</span>
                    </Label>
                    <Input
                      id="c-email"
                      type="email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      placeholder="you@company.co.za"
                      className={inputCls}
                      autoComplete="email"
                    />
                  </div>
                  <div>
                    <Label htmlFor="c-phone" className="text-sm text-jd-ink">
                      Phone Number <span className="text-red-600">*</span>
                    </Label>
                    <Input
                      id="c-phone"
                      type="tel"
                      value={phone}
                      onChange={(e) => setPhone(e.target.value)}
                      placeholder="083 000 0000"
                      className={inputCls}
                      autoComplete="tel"
                    />
                  </div>
                </div>

                <div>
                  <Label className="text-sm text-jd-ink">
                    Province <span className="text-red-600">*</span>
                  </Label>
                  <Select value={province} onValueChange={setProvince}>
                    <SelectTrigger className="mt-1.5 border-slate-300 bg-white text-jd-ink">
                      <SelectValue placeholder="Select your province" />
                    </SelectTrigger>
                    <SelectContent className="border-slate-200 bg-white text-jd-ink">
                      {PROVINCES.map((p) => (
                        <SelectItem key={p} value={p}>
                          {p}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

                <div>
                  <Label htmlFor="c-msg" className="text-sm text-jd-ink">
                    Comment or Message
                  </Label>
                  <Textarea
                    id="c-msg"
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                    placeholder="Tell us about your project, plant, or emergency…"
                    className={`${inputCls} min-h-24`}
                    maxLength={2000}
                  />
                </div>

                <Button
                  type="submit"
                  disabled={sending}
                  className="h-12 rounded-md bg-jd-yellow font-bold text-jd-navy shadow-sm transition-colors hover:bg-[#ffd61f]"
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
                <p className="text-center text-[11px] text-slate-400">
                  Your details land on the same live job board demonstrated above —
                  nothing gets lost in a stale inbox.
                </p>
              </form>
            ) : (
              <div className="flex h-full min-h-96 flex-col items-center justify-center py-8 text-center">
                <div className="motion-safe:animate-in motion-safe:zoom-in-50 motion-safe:duration-300">
                  <CheckCircle2 className="h-16 w-16 text-emerald-600" aria-hidden />
                </div>
                <h3 className="mt-4 text-xl font-bold text-jd-navy">Message received!</h3>
                <p className="mx-auto mt-2 max-w-sm text-sm leading-relaxed text-slate-600">
                  Thanks {first || "friend"} — your details are on JD&apos;s live
                  job board. Jan or a team member will contact you shortly. Need it
                  faster?
                </p>
                <div className="mt-6 flex flex-col gap-3 sm:flex-row">
                  <Button
                    asChild
                    className="h-11 rounded-md bg-[#25D366] font-bold text-white shadow-sm hover:bg-[#1fb857]"
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
                    className="h-11 rounded-md border-slate-300 bg-white font-semibold text-jd-navy hover:border-jd-blue hover:text-jd-blue"
                  >
                    <a href={JD.phoneHref}>
                      <Phone className="h-4 w-4" aria-hidden />
                      {JD.phoneDisplay}
                    </a>
                  </Button>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
