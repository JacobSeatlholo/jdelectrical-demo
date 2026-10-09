"use client";

import { motion } from "framer-motion";
import { MessageCircle } from "lucide-react";
import { JD } from "./constants";

export function WhatsAppFloat() {
  return (
    <motion.a
      href={JD.whatsappHref}
      target="_blank"
      rel="noopener noreferrer"
      aria-label={`WhatsApp JD Electrical on ${JD.phoneDisplay}`}
      initial={{ opacity: 0, scale: 0.5, y: 20 }}
      animate={{ opacity: 1, scale: 1, y: 0 }}
      transition={{ delay: 1.4, type: "spring", stiffness: 260, damping: 18 }}
      whileHover={{ scale: 1.08 }}
      whileTap={{ scale: 0.95 }}
      className="fixed bottom-5 right-5 z-50 flex h-14 w-14 items-center justify-center rounded-full bg-[#25D366] text-white shadow-2xl shadow-[#25D366]/30 hover:bg-[#2fe46f]"
    >
      <span
        className="jd-ping absolute inset-0 rounded-full text-[#25D366]/50"
        aria-hidden
      />
      <MessageCircle className="relative h-7 w-7" aria-hidden />
      <span className="sr-only">Chat with JD Electrical on WhatsApp</span>
    </motion.a>
  );
}
