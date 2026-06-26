"use client";

import { motion } from "framer-motion";
import { MessageCircle, TrendingUp, HelpCircle, Star, ArrowRight } from "lucide-react";

const BUTTONS = [
  {
    id: "whatsapp",
    label: "WhatsApp",
    description: "Fale conosco agora",
    icon: MessageCircle,
    href: "https://wa.me/+5581995849937",
    primary: true,
  },
  {
    id: "tabela",
    label: "Tabela de Valores",
    description: "Confira os preços atualizados",
    icon: TrendingUp,
    href: "https://canva.link/catalogo-nova",
  },
  {
    id: "como",
    label: "Como Funciona",
    description: "Veja o processo completo",
    icon: HelpCircle,
    href: "#como",
  },
  {
    id: "feedback",
    label: "Feedback",
    description: "Avaliações reais dos clientes",
    icon: Star,
    href: "https://www.instagram.com/s/aGlnaGxpZ2h0OjE3ODU5MzI3NjkzNjM3MjMz?igsh=MWhnMmZpNDNsOWNxbw==",
  },
];

const ease = [0.16, 1, 0.3, 1] as const;

export default function MainCTA() {
  return (
    <section className="relative py-5 md:py-10 overflow-hidden">
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-0 right-0 w-96 h-96 rounded-full blur-3xl opacity-20 bg-neon/10" />
      </div>

      <div className="container-x relative z-10">
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.8, ease }}
          className="text-3xl md:text-5xl font-bold text-center mb-8"
        >
          Escolha sua jornada
        </motion.h2>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-3 max-w-4xl mx-auto">
          {BUTTONS.map((btn, idx) => {
            const Icon = btn.icon;
            return (
              <motion.a
                key={btn.id}
                href={btn.href}
                target={btn.id === "whatsapp" ? "_blank" : undefined}
                rel={btn.id === "whatsapp" ? "noreferrer" : undefined}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-100px" }}
                transition={{ duration: 0.8, ease, delay: idx * 0.1 }}
                whileHover={btn.primary ? { scale: 1.03, y: -2 } : { scale: 1.02, y: -2 }}
                whileTap={{ scale: 0.97 }}
                className={`relative group p-5 rounded-2xl transition-all duration-300 cursor-pointer ${
                  btn.primary
                    ? "bg-neon md:col-span-2 py-7 shadow-neon-glow-lg hover:shadow-[0_0_60px_rgba(184,255,0,0.7),0_0_120px_rgba(184,255,0,0.5)]"
                    : "glass-neon hover:bg-neon/10 hover:border-neon/50 hover:shadow-neon-glow"
                }`}
              >
                {/* Shine effect on hover for secondary buttons */}
                {!btn.primary && (
                  <span className="absolute inset-0 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500 bg-gradient-to-r from-transparent via-neon/5 to-transparent pointer-events-none" />
                )}

                <div className="flex items-center gap-4">
                  <div
                    className={`flex-shrink-0 p-2.5 rounded-xl transition-all duration-300 ${
                      btn.primary
                        ? "text-dark bg-black/15"
                        : "text-neon bg-neon/10 group-hover:bg-neon/20"
                    }`}
                  >
                    <Icon className="h-6 w-6" strokeWidth={1.8} />
                  </div>
                  <div className="text-left flex-1">
                    <p className={`text-[15px] font-semibold tracking-tight ${btn.primary ? "text-dark" : "text-white group-hover:text-neon transition-colors duration-300"}`}>
                      {btn.label}
                    </p>
                    <p className={`text-sm ${btn.primary ? "text-dark/60" : "text-gray-400"}`}>
                      {btn.description}
                    </p>
                  </div>
                  <ArrowRight
                    className={`h-4 w-4 flex-shrink-0 transition-all duration-300 group-hover:translate-x-1 ${
                      btn.primary ? "text-dark" : "text-neon opacity-0 group-hover:opacity-100"
                    }`}
                    strokeWidth={2}
                  />
                </div>
              </motion.a>
            );
          })}
        </div>
      </div>
    </section>
  );
}
