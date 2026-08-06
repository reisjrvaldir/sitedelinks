import Link from "next/link";
import { ChevronLeft } from "lucide-react";
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
    <main className="apple-theme min-h-screen bg-apple-bg text-apple-ink antialiased">
      <div className="mx-auto w-full max-w-[1024px] px-6 pb-24 md:px-10">
        <Link
          href="/"
          className="inline-flex items-center gap-0.5 pt-6 text-[14px] text-apple-blue transition-opacity hover:opacity-70"
        >
          <ChevronLeft className="h-4 w-4" strokeWidth={2} />
          Voltar
        </Link>

        <header className="pb-12 pt-10 md:pb-16 md:pt-14">
          <p className="mb-2 text-[19px] leading-[1.2] tracking-[-0.02em] text-apple-highlight md:text-[24px]">
            Produtos lacrados
          </p>
          <h1 className="max-w-3xl text-[40px] font-semibold leading-[1.05] tracking-[-0.015em] md:text-[56px]">
            Escolha o seu.
            <br />
            <span className="text-apple-muted">Novo, com garantia Apple.</span>
          </h1>
          <p className="mt-5 max-w-xl text-[17px] leading-[1.47] text-apple-muted md:text-[19px]">
            Parcelamento em até 18x no cartão. Fale com a gente pelo WhatsApp e
            receba o atendimento na hora.
          </p>
        </header>

        <PrecosLista produtos={produtos} />

        <footer className="mt-20 border-t border-apple-hairline pt-6">
          <p className="text-[12px] leading-[1.5] text-apple-muted">
            Preços sujeitos à alteração conforme disponibilidade, cor,
            armazenamento, fornecedor e cotação do momento. Apple é marca
            registrada da Apple Inc. A Nova iPhone não possui vínculo com a
            Apple Inc.
          </p>
        </footer>
      </div>
    </main>
  );
}
