"use client";

import { MessageCircle } from "lucide-react";
import { JD } from "./constants";

export function WhatsAppFloat() {
  return (
    <a
      href={JD.whatsappHref}
      target="_blank"
      rel="noopener noreferrer"
      aria-label={`WhatsApp JD Electrical on ${JD.phoneDisplay}`}
      className="fixed bottom-5 right-5 z-50 flex h-14 w-14 items-center justify-center rounded-full bg-[#25D366] text-white shadow-lg transition-transform hover:scale-105"
    >
      <MessageCircle className="h-7 w-7" aria-hidden />
      <span className="sr-only">Chat with JD Electrical on WhatsApp</span>
    </a>
  );
}
