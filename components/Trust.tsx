"use client";

import { motion } from "framer-motion";
import { Shield, Package, Globe, Headphones } from "lucide-react";

const ITEMS = [
  {
    icon: Shield,
    title: "Compra Segura",
    description: "Todos os pagamentos protegidos com as melhores tecnologias",
  },
  {
    icon: Package,
    title: "Produtos Originais",
    description: "100% autenticados e verificados",
  },
  {
    icon: Globe,
    title: "Entrega para Todo Brasil",
    description: "Rápido, seguro e rastreável",
  },
  {
    icon: Headphones,
    title: "Atendimento Personalizado",
    description: "Suporte 24/7 via WhatsApp",
  },
];

const ease = [0.16, 1, 0.3, 1] as const;

export default function Trust() {
  return (
    <section className="relative py-5 md:py-10 overflow-hidden">
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-96 h-96 rounded-full blur-3xl opacity-15 bg-neon/20" />
      </div>

      <div className="container-x relative z-10">
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.8, ease }}
          className="text-2xl md:text-4xl font-bold text-center mb-5"
        >
          Por que confiar em nós
        </motion.h2>

        {/* 2×2 grid sempre */}
        <div className="grid grid-cols-2 gap-3 max-w-2xl mx-auto">
          {ITEMS.map((item, idx) => {
            const Icon = item.icon;
            return (
              <motion.div
                key={item.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-80px" }}
                transition={{ duration: 0.7, ease, delay: idx * 0.08 }}
                whileHover={{ y: -4, scale: 1.02 }}
                className="group glass-neon p-5 rounded-2xl cursor-default transition-all duration-300 hover:bg-neon/10 hover:border-neon/40 hover:shadow-neon-glow"
              >
                <div className="mb-3 inline-flex p-2.5 rounded-xl bg-neon/10 group-hover:bg-neon/20 transition-all duration-300">
                  <Icon className="h-5 w-5 text-neon" strokeWidth={2} />
                </div>
                <h3 className="text-[14px] font-semibold mb-1 leading-tight group-hover:text-neon transition-colors duration-300">
                  {item.title}
                </h3>
                <p className="text-gray-400 text-[12px] leading-snug">{item.description}</p>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
