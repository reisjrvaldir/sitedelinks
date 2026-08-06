import Link from "next/link";
import { ArrowLeft, CreditCard, ShieldCheck } from "lucide-react";
import { getProdutos } from "@/lib/sheets";
import PrecosLista from "@/components/PrecosLista";

export const revalidate = 60;

export const metadata = {
  title: "Tabela de Valores — Nova iPhone",
  description: "Preços atualizados de produtos Apple lacrados com garantia.",
};

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
            Produtos
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

        <PrecosLista produtos={produtos} />

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
