"use client";

import { useMemo, useState } from "react";
import { Smartphone } from "lucide-react";
import { CATEGORIAS, type Categoria, type Produto } from "@/lib/sheets";

const WHATSAPP_URL = "https://wa.me/+5581995849937";

export default function PrecosLista({ produtos }: { produtos: Produto[] }) {
  // Só mostra abas de categorias que existem na planilha.
  const abas = useMemo<Categoria[]>(() => {
    const presentes = new Set(produtos.map((p) => p.categoria));
    return CATEGORIAS.filter((c) => presentes.has(c));
  }, [produtos]);

  const [filtro, setFiltro] = useState<Categoria>("iPhone");

  const visiveis = produtos.filter((p) => p.categoria === filtro);

  return (
    <>
      {/* Filtros */}
      <div className="flex flex-wrap justify-center gap-2 mb-6">
        {abas.map((aba) => {
          const ativo = aba === filtro;
          return (
            <button
              key={aba}
              onClick={() => setFiltro(aba)}
              className={`px-4 py-2 rounded-full text-[13px] font-medium transition-all duration-300 active:scale-95 ${
                ativo
                  ? "bg-neon text-dark shadow-neon-glow"
                  : "glass-neon text-gray-300 hover:text-neon hover:border-neon/50"
              }`}
            >
              {aba}
            </button>
          );
        })}
      </div>

      {/* Grade de produtos */}
      {visiveis.length === 0 ? (
        <p className="text-center text-gray-500 py-16 text-sm">
          Nenhum produto disponível no momento.
        </p>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 max-w-4xl mx-auto">
          {visiveis.map((p, i) => (
            <a
              key={`${p.nome}-${p.armazenamento}-${i}`}
              href={WHATSAPP_URL}
              target="_blank"
              rel="noreferrer"
              className="group flex items-center gap-4 p-3 rounded-2xl glass-neon transition-all duration-300 hover:bg-neon/10 hover:border-neon/50 hover:shadow-neon-glow"
            >
              {/* Imagem */}
              <div className="relative flex-shrink-0 h-20 w-16 rounded-xl bg-black/40 overflow-hidden">
                {p.imagem ? (
                  /* eslint-disable-next-line @next/next/no-img-element */
                  <img
                    src={p.imagem}
                    alt={p.nome}
                    className="h-full w-full object-contain"
                    referrerPolicy="no-referrer"
                  />
                ) : (
                  <div className="h-full w-full flex items-center justify-center">
                    <Smartphone className="h-6 w-6 text-neon/25" strokeWidth={1.5} />
                  </div>
                )}
                {p.tag && (
                  <span className="absolute top-1 left-1 px-1.5 py-0.5 rounded-md bg-neon text-dark text-[9px] font-bold leading-none">
                    {p.tag}
                  </span>
                )}
              </div>

              {/* Nome, armazenamento e preço */}
              <div className="flex-1 min-w-0">
                <h2 className="text-[15px] font-semibold leading-tight truncate">
                  {p.nome}
                </h2>
                {p.armazenamento && (
                  <p className="text-gray-400 text-[13px] mt-0.5">{p.armazenamento}</p>
                )}
                {p.sobConsulta ? (
                  <p className="text-neon/70 text-base font-semibold mt-1.5 leading-none tracking-wide">
                    CONSULTAR
                  </p>
                ) : (
                  <p className="text-neon text-2xl font-bold mt-1.5 leading-none">
                    <span className="text-sm font-medium mr-0.5">R$</span>
                    {p.preco}
                  </p>
                )}
              </div>
            </a>
          ))}
        </div>
      )}
    </>
  );
}
