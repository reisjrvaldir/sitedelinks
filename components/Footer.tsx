"use client";

import { MessageCircle, Instagram, Mail, Globe } from "lucide-react";


const LINKS = [
  { icon: MessageCircle, href: "https://wa.me/81995849937", label: "WhatsApp" },
  { icon: Instagram, href: "https://www.instagram.com/s/aGlnaGxpZ2h0OjE3ODU5MzI3NjkzNjM3MjMz?igsh=MWhnMmZpNDNsOWNxbw==", label: "Instagram" },
  { icon: Globe, href: "#", label: "Site" },
  { icon: Mail, href: "mailto:contato@novaiphone.com", label: "Email" },
];

export default function Footer() {
  return (
    <footer className="relative border-t border-neon/20 py-8">
      <div className="container-x flex flex-col items-center gap-6">
        {/* Icons only — centered */}
        <div className="flex items-center justify-center gap-4">
          {LINKS.map(({ icon: Icon, href, label }) => (
            <a
              key={label}
              href={href}
              target={href.startsWith("http") ? "_blank" : undefined}
              rel={href.startsWith("http") ? "noreferrer" : undefined}
              aria-label={label}
              className="group inline-flex h-11 w-11 items-center justify-center rounded-full glass-neon transition-all duration-300 hover:bg-neon/20 hover:border-neon/60 hover:shadow-neon-glow hover:scale-110 active:scale-95"
            >
              <Icon className="h-5 w-5 text-neon" strokeWidth={1.8} />
            </a>
          ))}
        </div>

        {/* Copyright only */}
        <p className="text-[11px] text-gray-600 text-center">
          © {new Date().getFullYear()} Nova iPhone · Apple é marca registrada da Apple Inc.
        </p>
      </div>
    </footer>
  );
}
