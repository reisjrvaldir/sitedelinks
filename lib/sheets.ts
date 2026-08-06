export type Produto = {
  nome: string;
  armazenamento: string;
  preco: string;
  imagem: string;
  tag: string;
};

const SHEET_ID =
  process.env.NEXT_PUBLIC_SHEET_ID ??
  "1vgygjIFFv0AQCHGRLDkSf7dB-wBkvp9w7J_TmG_Fzrs";

const csvUrl = () =>
  `https://docs.google.com/spreadsheets/d/${SHEET_ID}/gviz/tq?tqx=out:csv`;

/** Divide uma linha de CSV respeitando aspas e vírgulas dentro dos campos. */
function parseLinha(linha: string): string[] {
  const campos: string[] = [];
  let atual = "";
  let dentroDeAspas = false;

  for (let i = 0; i < linha.length; i++) {
    const c = linha[i];
    if (c === '"') {
      if (dentroDeAspas && linha[i + 1] === '"') {
        atual += '"';
        i++;
      } else {
        dentroDeAspas = !dentroDeAspas;
      }
    } else if (c === "," && !dentroDeAspas) {
      campos.push(atual.trim());
      atual = "";
    } else {
      atual += c;
    }
  }
  campos.push(atual.trim());
  return campos;
}

function formatarPreco(valor: string): string {
  const numero = Number(valor.replace(/[^\d,.-]/g, "").replace(",", "."));
  if (!Number.isFinite(numero) || numero === 0) return valor;
  return numero.toLocaleString("pt-BR", {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  });
}

export async function getProdutos(): Promise<Produto[]> {
  if (!SHEET_ID) return [];

  const res = await fetch(csvUrl(), { next: { revalidate: 60 } });
  if (!res.ok) return [];

  const csv = await res.text();
  const linhas = csv.split("\n").filter((l) => l.trim().length > 0);

  // Colunas da planilha: Nome | Armazenamento | Preço | Imagem | Tag
  return linhas
    .slice(1) // pula o cabeçalho
    .map(parseLinha)
    .filter((c) => c[0]) // precisa ter nome
    .map((c) => ({
      nome: c[0] ?? "",
      armazenamento: c[1] ?? "",
      preco: formatarPreco(c[2] ?? ""),
      imagem: c[3] ?? "",
      tag: c[4] ?? "",
    }));
}
