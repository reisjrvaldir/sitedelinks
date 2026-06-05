"use client";

import { motion } from "framer-motion";
import { ChevronDown } from "lucide-react";

const ease = [0.16, 1, 0.3, 1] as const;

export default function Hero() {
  return (
    <section className="relative min-h-screen flex flex-col items-center justify-center overflow-hidden pb-2" style={{ paddingTop: "8px" }}>
      {/* Background glow */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-20 left-1/2 -translate-x-1/2 w-96 h-96 rounded-full blur-3xl opacity-25 bg-neon/20" />
        <div className="absolute bottom-20 right-10 w-72 h-72 rounded-full blur-3xl opacity-15 bg-neon/10" />
      </div>

      <div className="container-x relative z-10 flex flex-col items-center text-center">
        {/* Logo */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease }}
          className="mb-3"
        >
          <img
            src="/logo.png"
            alt="Nova iPhone"
            className="w-40 md:w-52 mx-auto object-contain"
            style={{ filter: "drop-shadow(0 0 18px rgba(184,255,0,0.45))" }}
          />
        </motion.div>

        {/* Video visual — acima do título */}
        <motion.div
          initial={{ opacity: 0, scale: 0.9, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          transition={{ duration: 1, ease, delay: 0.15 }}
          className="relative mx-auto w-[300px] md:w-[380px] mb-5"
        >
          {/* Glow behind video */}
          <div
            className="absolute inset-0 rounded-3xl blur-2xl opacity-60"
            style={{ background: "radial-gradient(circle, rgba(184,255,0,0.35) 0%, transparent 70%)" }}
          />
          <div className="relative glass-neon rounded-3xl p-3 flex items-center justify-center aspect-[9/16] overflow-hidden">
            <video
              src="/hero-video.mp4"
              autoPlay
              muted
              loop
              playsInline
              className="w-full h-full object-cover rounded-2xl"
            />
          </div>
        </motion.div>

        {/* Headline */}
        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease, delay: 0.3 }}
          className="text-5xl md:text-7xl font-bold leading-tight mb-2 max-w-4xl"
        >
          Tecnologia no seu{" "}
          <span className="text-neon" style={{ textShadow: "0 0 30px rgba(184,255,0,0.5)" }}>
            ritmo
          </span>
        </motion.h1>

        {/* Subheadline */}
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease, delay: 0.4 }}
          className="text-lg md:text-xl text-gray-300 max-w-xl mb-4"
        >
          Encomendas Apple com segurança, agilidade e garantia.
        </motion.p>

        {/* Scroll indicator */}
        <motion.a
          href="#como-funciona"
          animate={{ y: [0, 8, 0] }}
          transition={{ duration: 2, repeat: Infinity }}
          className="flex flex-col items-center text-neon mt-2 opacity-70 hover:opacity-100 transition-opacity"
        >
          <p className="text-xs mb-1 tracking-widest uppercase">Explore</p>
          <ChevronDown className="h-4 w-4" />
        </motion.a>
      </div>
    </section>
  );
}
