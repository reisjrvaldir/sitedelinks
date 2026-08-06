import Link from "next/link";
import { ArrowLeft, CreditCard, ShieldCheck } from "lucide-react";
import { getProdutos } from "@/lib/sheets";

export const revalidate = 60;

export const metadata = {
  title: "Tabela de Valores — Nova iPhone",
  description: "Preços atualizados de iPhones lacrados com garantia Apple.",
};

const WHATSAPP_URL = "https://wa.me/+5581995849937";

export default async function Precos() {
  const produtos = await getProdutos();

  return (
    <main className="bg-dark text-white min-h-screen">
      {/* Glow de fundo */}
      <div className="fixed inset-0 pointer-events-none">
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[500px] h-[500px] rounded-full blur-3xl opacity-20 bg-neon/20" />
      </div>

      <div className="container-x relative z-10 py-8">
        <Link
          href="/"
          className="inline-flex items-center gap-2 text-sm text-gray-400 hover:text-neon transition-colors mb-6"
        >
          <ArrowLeft className="h-4 w-4" />
          Voltar
        </Link>

        {/* Cabeçalho */}
        <header className="text-center mb-8">
          <h1 className="text-4xl md:text-6xl font-bold leading-[0.95]">
            iPhones
            <br />
            <span className="text-neon text-glow">Lacrados</span>
          </h1>
          <p className="text-gray-300 mt-3 text-sm md:text-base">
            Produtos novos · Garantia Apple
          </p>

          <div className="inline-flex items-center gap-2 mt-5 px-5 py-2.5 rounded-full glass-neon">
            <CreditCard className="h-4 w-4 text-neon" strokeWidth={1.8} />
            <span className="text-sm">
              Em até <strong className="text-neon">18x</strong> no cartão
            </span>
          </div>
        </header>

        {/* Grade de produtos */}
        {produtos.length === 0 ? (
          <p className="text-center text-gray-500 py-16 text-sm">
            Nenhum produto disponível no momento.
          </p>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 max-w-4xl mx-auto">
            {produtos.map((p, i) => (
              <a
                key={`${p.nome}-${p.armazenamento}-${i}`}
                href={WHATSAPP_URL}
                target="_blank"
                rel="noreferrer"
                className="group flex items-center gap-4 p-3 rounded-2xl glass-neon transition-all duration-300 hover:bg-neon/10 hover:border-neon/50 hover:shadow-neon-glow"
              >
                {/* Imagem */}
                <div className="relative flex-shrink-0 h-20 w-16 rounded-xl bg-black/40 overflow-hidden">
                  {p.imagem && (
                    /* eslint-disable-next-line @next/next/no-img-element */
                    <img
                      src={p.imagem}
                      alt={p.nome}
                      className="h-full w-full object-contain"
                      referrerPolicy="no-referrer"
                    />
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
                  <p className="text-gray-400 text-[13px] mt-0.5">
                    {p.armazenamento}
                  </p>
                  <p className="text-neon text-2xl font-bold mt-1.5 leading-none">
                    <span className="text-sm font-medium mr-0.5">R$</span>
                    {p.preco}
                  </p>
                </div>
              </a>
            ))}
          </div>
        )}

        {/* Rodapé */}
        <div className="max-w-4xl mx-auto mt-8 flex items-start gap-2 text-[11px] text-gray-500 leading-relaxed">
          <ShieldCheck className="h-4 w-4 flex-shrink-0 text-neon/60 mt-0.5" strokeWidth={1.8} />
          <p>
            Preços sujeitos à alteração conforme disponibilidade, cor,
            armazenamento, fornecedor e cotação do momento.
          </p>
        </div>
      </div>
    </main>
  );
}
