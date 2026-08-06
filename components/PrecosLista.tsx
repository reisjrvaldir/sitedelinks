"use client";

import { useMemo, useState } from "react";
import { Smartphone } from "lucide-react";
import { CATEGORIAS, type Categoria, type Produto } from "@/lib/sheets";

const WHATSAPP = "https://wa.me/+5581995849937";

/** Monta o link do WhatsApp já com a mensagem sobre o produto escolhido. */
function linkWhatsApp(p: Produto): string {
  const aparelho = [p.nome, p.armazenamento].filter(Boolean).join(" ");
  const valor = p.sobConsulta ? "" : ` no valor de R$ ${p.preco}`;
  const texto = `Olá! Gostaria de saber mais sobre esse aparelho ${aparelho}${valor}, consegue me ajudar?`;

  return `${WHATSAPP}?text=${encodeURIComponent(texto)}`;
}

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
      {/* Navegação de categorias — barra fixa, como nas páginas de compra da Apple */}
      <nav className="sticky top-0 z-20 -mx-6 md:-mx-10 mb-12 border-b border-apple-hairline bg-white/80 backdrop-blur-xl backdrop-saturate-150">
        <div className="flex gap-2 overflow-x-auto hide-scrollbar px-6 md:px-10 py-3.5">
          {abas.map((aba) => {
            const ativo = aba === filtro;
            return (
              <button
                key={aba}
                onClick={() => setFiltro(aba)}
                aria-pressed={ativo}
                className={`whitespace-nowrap rounded-full px-4 py-1.5 text-[14px] leading-[1.4] transition-colors duration-200 ${
                  ativo
                    ? "bg-apple-ink font-medium text-white"
                    : "text-apple-muted hover:text-apple-ink"
                }`}
              >
                {aba}
              </button>
            );
          })}
        </div>
      </nav>

      {visiveis.length === 0 ? (
        <p className="py-24 text-center text-[17px] text-apple-muted">
          Nenhum produto disponível no momento.
        </p>
      ) : (
        <div className="grid grid-cols-2 gap-x-5 gap-y-12 lg:grid-cols-3 lg:gap-x-8 lg:gap-y-16">
          {visiveis.map((p, i) => (
            <article
              key={`${p.nome}-${p.armazenamento}-${i}`}
              className="flex flex-col items-center text-center"
            >
              {/* Imagem */}
              <div className="mb-6 flex h-44 w-full items-center justify-center overflow-hidden rounded-[18px] bg-apple-surface md:h-56">
                {p.imagem ? (
                  /* eslint-disable-next-line @next/next/no-img-element */
                  <img
                    src={p.imagem}
                    alt={p.nome}
                    className="h-full w-full object-contain p-5"
                    referrerPolicy="no-referrer"
                  />
                ) : (
                  <Smartphone
                    className="h-10 w-10 text-apple-hairline"
                    strokeWidth={1.2}
                  />
                )}
              </div>

              {p.tag && (
                <p className="mb-1.5 text-[12px] font-semibold uppercase tracking-[0.04em] text-apple-highlight">
                  {p.tag}
                </p>
              )}

              <h2 className="text-[19px] font-semibold leading-[1.2] tracking-[-0.02em] text-apple-ink md:text-[24px]">
                {p.nome}
              </h2>

              {p.armazenamento && (
                <p className="mt-1 text-[14px] leading-[1.4] text-apple-muted md:text-[17px]">
                  {p.armazenamento}
                </p>
              )}

              <p className="mt-4 text-[14px] leading-[1.4] text-apple-ink md:text-[17px]">
                {p.sobConsulta ? (
                  <span className="text-apple-muted">Preço sob consulta</span>
                ) : (
                  <>
                    A partir de{" "}
                    <span className="font-semibold">R$ {p.preco}</span>
                  </>
                )}
              </p>

              <a
                href={linkWhatsApp(p)}
                target="_blank"
                rel="noreferrer"
                className="mt-5 inline-flex items-center justify-center rounded-full bg-apple-blue px-5 py-2 text-[14px] font-normal leading-[1.4] text-white transition-colors duration-200 hover:bg-apple-blue-hover md:text-[17px]"
              >
                Comprar
              </a>
            </article>
          ))}
        </div>
      )}
    </>
  );
}
