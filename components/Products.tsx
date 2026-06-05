"use client";

import { useEffect, useRef, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronLeft, ChevronRight, ArrowRight } from "lucide-react";

const PRODUCTS = [
  {
    id: "iphone-16",
    name: "iPhone 16",
    description: "Camera Control. Chip A18. Novo design.",
    price: "A partir de R$ 5.999",
    tag: "Novo",
    bg: "from-sky-900/60 via-slate-900/80 to-black",
    accent: "#64d2ff",
    img: "/iphones/iphone-16.png",
  },
  {
    id: "iphone-15",
    name: "iPhone 15",
    description: "Dynamic Island. USB-C. Câmera 48MP.",
    price: "A partir de R$ 4.999",
    tag: "",
    bg: "from-blue-900/60 via-slate-900/80 to-black",
    accent: "#0a84ff",
    img: "/iphones/iphone-15.png",
  },
  {
    id: "iphone-17-pro-max",
    name: "iPhone 17 Pro Max",
    description: "O iPhone mais avançado de todos os tempos.",
    price: "A partir de R$ 11.999",
    tag: "Lançamento",
    bg: "from-rose-900/50 via-slate-900/80 to-black",
    accent: "#ff375f",
    img: "/iphones/iphone-17-pro-max.png",
  },
  {
    id: "iphone-15-pro",
    name: "iPhone 15 Pro",
    description: "Titânio. Chip A17 Pro. Botão de Ação.",
    price: "A partir de R$ 7.299",
    tag: "",
    bg: "from-stone-700/60 via-zinc-900/80 to-black",
    accent: "#98989d",
    img: "/iphones/iphone-15-pro.png",
  },
  {
    id: "iphone-15-pro-max",
    name: "iPhone 15 Pro Max",
    description: "Zoom óptico 5x. Tela 6.7\". A17 Pro.",
    price: "A partir de R$ 8.499",
    tag: "",
    bg: "from-yellow-900/40 via-zinc-900/80 to-black",
    accent: "#ffd60a",
    img: "/iphones/iphone-15-pro-max.png",
  },
  {
    id: "iphone-16-pro",
    name: "iPhone 16 Pro",
    description: "Chip A18 Pro. Câmera 48MP ultra. Titânio.",
    price: "A partir de R$ 7.999",
    tag: "Novo",
    bg: "from-slate-700/60 via-zinc-900/80 to-black",
    accent: "#636366",
    img: "https://images.unsplash.com/photo-1556656793-08538906a9f8?w=800&q=90&fit=crop&crop=center",
  },
  {
    id: "iphone-16-pro-max",
    name: "iPhone 16 Pro Max",
    description: "Tela 6.9\". Bateria recorde. A18 Pro.",
    price: "A partir de R$ 9.299",
    tag: "Mais vendido",
    bg: "from-blue-950/70 via-slate-900/80 to-black",
    accent: "#0a84ff",
    img: "https://images.unsplash.com/photo-1601584942957-fd5886a2131a?w=800&q=90&fit=crop&crop=center",
  },
  {
    id: "iphone-17",
    name: "iPhone 17",
    description: "Design ultrafino. Câmera 48MP aprimorada.",
    price: "A partir de R$ 6.999",
    tag: "Lançamento",
    bg: "from-emerald-900/50 via-slate-900/80 to-black",
    accent: "#30d158",
    img: "https://images.unsplash.com/photo-1512941937938-a272e1b9f7f7?w=600&q=80&fit=crop&crop=center",
  },
  {
    id: "iphone-17-pro",
    name: "iPhone 17 Pro",
    description: "Chip A19 Pro. O Pro mais fino da história.",
    price: "A partir de R$ 9.499",
    tag: "Lançamento",
    bg: "from-violet-900/50 via-slate-900/80 to-black",
    accent: "#bf5af2",
    img: "https://images.unsplash.com/photo-1574944985070-8f3ebc6b79d2?w=600&q=80&fit=crop",
  },
  {
    id: "iphone-17-pro-max",
    name: "iPhone 17 Pro Max",
    description: "O iPhone mais avançado de todos os tempos.",
    price: "A partir de R$ 11.999",
    tag: "Lançamento",
    bg: "from-rose-900/50 via-slate-900/80 to-black",
    accent: "#ff375f",
    img: "https://images.unsplash.com/photo-1617997455403-41f333d44d5b?w=600&q=80&fit=crop&crop=center",
  },
  {
    id: "macbook-air",
    name: "MacBook Air",
    description: "Chip M3. Fino, leve, extraordinariamente rápido.",
    price: "A partir de R$ 11.499",
    tag: "",
    bg: "from-amber-900/40 via-stone-900/80 to-black",
    accent: "#ff9f0a",
    img: "https://images.unsplash.com/photo-1517336714731-489689fd1ca8?w=600&q=80&fit=crop",
  },
  {
    id: "macbook-pro",
    name: "MacBook Pro",
    description: "Chip M4 Pro. Tela Liquid Retina XDR.",
    price: "A partir de R$ 16.999",
    tag: "Premium",
    bg: "from-zinc-800/60 via-neutral-900/80 to-black",
    accent: "#98989d",
    img: "https://images.unsplash.com/photo-1541807084-5c52b6b3adef?w=600&q=80&fit=crop",
  },
  {
    id: "ipad",
    name: "iPad",
    description: "Chip M4. Liquid Retina XDR. O tablet definitivo.",
    price: "A partir de R$ 3.299",
    tag: "",
    bg: "from-purple-900/50 via-slate-900/80 to-black",
    accent: "#bf5af2",
    img: "https://images.unsplash.com/photo-1544244015-0df4b3ffc6b0?w=600&q=80&fit=crop",
  },
  {
    id: "apple-watch",
    name: "Apple Watch",
    description: "Series 10 e Ultra 2. Saúde e aventura.",
    price: "A partir de R$ 2.499",
    tag: "",
    bg: "from-orange-900/50 via-zinc-900/80 to-black",
    accent: "#ff9f0a",
    img: "https://images.unsplash.com/photo-1546868871-7041f2a55e12?w=600&q=80&fit=crop",
  },
  {
    id: "airpods",
    name: "AirPods",
    description: "AirPods Pro 2. Cancelamento adaptativo.",
    price: "A partir de R$ 1.199",
    tag: "",
    bg: "from-sky-900/40 via-slate-900/80 to-black",
    accent: "#64d2ff",
    img: "https://images.unsplash.com/photo-1600294037681-c80b4cb5b434?w=600&q=80&fit=crop",
  },
];

const WHATSAPP_URL = "https://wa.me/81995849937";
const INTERVAL = 3500;

const ease = [0.16, 1, 0.3, 1] as const;

export default function Products() {
  const [current, setCurrent] = useState(0);
  const [direction, setDirection] = useState<1 | -1>(1);
  const timerRef = useRef<ReturnType<typeof setInterval> | null>(null);

  const go = (next: number, dir: 1 | -1) => {
    setDirection(dir);
    setCurrent((next + PRODUCTS.length) % PRODUCTS.length);
  };

  const startTimer = () => {
    if (timerRef.current) clearInterval(timerRef.current);
    timerRef.current = setInterval(() => {
      setDirection(1);
      setCurrent((prev) => (prev + 1) % PRODUCTS.length);
    }, INTERVAL);
  };

  useEffect(() => {
    startTimer();
    return () => { if (timerRef.current) clearInterval(timerRef.current); };
  }, []);

  const product = PRODUCTS[current];

  const variants = {
    enter: (dir: number) => ({
      x: dir > 0 ? "60%" : "-60%",
      opacity: 0,
      scale: 0.92,
    }),
    center: {
      x: 0,
      opacity: 1,
      scale: 1,
      transition: { duration: 0.55, ease },
    },
    exit: (dir: number) => ({
      x: dir > 0 ? "-60%" : "60%",
      opacity: 0,
      scale: 0.92,
      transition: { duration: 0.4, ease },
    }),
  };

  return (
    <section className="relative py-5 md:py-10 overflow-hidden">
      <div className="absolute inset-0 pointer-events-none">
        <div
          className="absolute inset-0 transition-all duration-700"
          style={{
            background: `radial-gradient(ellipse 70% 50% at 50% 60%, ${product.accent}22 0%, transparent 70%)`,
          }}
        />
      </div>

      <div className="container-x relative z-10">
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.8, ease }}
          className="text-3xl md:text-5xl font-bold text-center mb-8"
        >
          Produtos em destaque
        </motion.h2>

        {/* Carousel */}
        <div className="relative w-[260px] mx-auto select-none">
          <div className="relative overflow-hidden rounded-3xl aspect-[9/16]">
            <AnimatePresence initial={false} custom={direction} mode="popLayout">
              <motion.div
                key={product.id}
                custom={direction}
                variants={variants}
                initial="enter"
                animate="center"
                exit="exit"
                className={`absolute inset-0 bg-gradient-to-b ${product.bg} flex flex-col`}
              >
                {/* Product photo */}
                <div className="relative flex-1 overflow-hidden pt-2">
                  <img
                    src={product.img}
                    alt={product.name}
                    className="absolute inset-0 w-full h-full object-contain opacity-95"
                    draggable={false}
                    referrerPolicy="no-referrer"
                    onError={(e) => {
                      (e.target as HTMLImageElement).style.display = "none";
                    }}
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/95 via-black/40 to-transparent" />

                  {/* Tag badge */}
                  {product.tag && (
                    <span
                      className="absolute top-4 right-4 px-2.5 py-1 rounded-full text-[11px] font-bold text-dark"
                      style={{ background: product.accent }}
                    >
                      {product.tag}
                    </span>
                  )}
                </div>

                {/* Info block */}
                <div className="p-4 pt-3 flex flex-col gap-2">
                  <div>
                    <h3 className="text-lg font-bold text-white leading-tight">{product.name}</h3>
                    <p className="text-gray-400 text-[12px] mt-0.5">{product.description}</p>
                  </div>
                  <a
                    href={WHATSAPP_URL}
                    target="_blank"
                    rel="noreferrer"
                    className="group flex items-center justify-center gap-2 w-full py-2.5 rounded-xl font-semibold text-dark text-[13px] transition-all duration-300 hover:brightness-110 active:scale-95"
                    style={{ background: product.accent }}
                    onClick={(e) => e.stopPropagation()}
                  >
                    Consultar
                    <ArrowRight className="h-3.5 w-3.5 group-hover:translate-x-0.5 transition-transform" />
                  </a>
                </div>
              </motion.div>
            </AnimatePresence>
          </div>

          {/* Arrow buttons */}
          <button
            aria-label="Anterior"
            onClick={() => { go(current - 1, -1); startTimer(); }}
            className="absolute left-[-44px] top-1/2 -translate-y-1/2 z-20 h-9 w-9 rounded-full glass-neon flex items-center justify-center hover:bg-neon/20 transition-all duration-300 hover:scale-110 active:scale-95"
          >
            <ChevronLeft className="h-4 w-4 text-neon" strokeWidth={2} />
          </button>
          <button
            aria-label="Próximo"
            onClick={() => { go(current + 1, 1); startTimer(); }}
            className="absolute right-[-44px] top-1/2 -translate-y-1/2 z-20 h-9 w-9 rounded-full glass-neon flex items-center justify-center hover:bg-neon/20 transition-all duration-300 hover:scale-110 active:scale-95"
          >
            <ChevronRight className="h-4 w-4 text-neon" strokeWidth={2} />
          </button>

          {/* Dots */}
          <div className="flex items-center justify-center gap-1.5 mt-5">
            {PRODUCTS.map((_, i) => (
              <button
                key={i}
                aria-label={`Ir para produto ${i + 1}`}
                onClick={() => { go(i, i > current ? 1 : -1); startTimer(); }}
                className="rounded-full transition-all duration-300"
                style={{
                  width: i === current ? "20px" : "6px",
                  height: "6px",
                  background: i === current ? product.accent : "rgba(255,255,255,0.25)",
                }}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
