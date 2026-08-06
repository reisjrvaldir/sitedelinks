export const CATEGORIAS = [
  "iPhone",
  "iPad",
  "Mac",
  "Watch",
  "AirPods",
  "Acessórios",
] as const;

export type Categoria = (typeof CATEGORIAS)[number];

export type Produto = {
  nome: string;
  categoria: Categoria;
  armazenamento: string;
  /** Preço já formatado (ex. "6.829,99") ou "CONSULTAR". */
  preco: string;
  /** true quando não há valor numérico e o preço é sob consulta. */
  sobConsulta: boolean;
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

/**
 * Deduz a categoria pelo nome do produto. A ordem importa: acessórios que
 * citam outro produto ("Teclado MacBook") precisam ser testados antes dele.
 */
function categorizar(nome: string): Categoria {
  const regras: [RegExp, Categoria][] = [
    [/teclado|pencil|magic mouse|airtag|carregador|cabo|capa/i, "Acessórios"],
    [/airpods/i, "AirPods"],
    [/watch|ultra \d|s[ée]ries? \d|\bSE \d\b/i, "Watch"],
    [/ipad/i, "iPad"],
    [/mac/i, "Mac"],
    [/iphone/i, "iPhone"],
  ];

  return regras.find(([padrao]) => padrao.test(nome))?.[1] ?? "Acessórios";
}

/**
 * Converte o preço da planilha (formato brasileiro: "6.829,99") para número.
 * Retorna null quando a célula não é um valor — "CONSULTAR", vazia, etc.
 */
function lerPreco(valor: string): number | null {
  const limpo = valor.replace(/[^\d,.]/g, "");
  if (!limpo) return null;

  // O último separador é o decimal; os anteriores são de milhar.
  const ultimoSeparador = Math.max(limpo.lastIndexOf(","), limpo.lastIndexOf("."));
  const numero =
    ultimoSeparador === -1
      ? Number(limpo)
      : Number(
          limpo.slice(0, ultimoSeparador).replace(/[.,]/g, "") +
            "." +
            limpo.slice(ultimoSeparador + 1)
        );

  return Number.isFinite(numero) && numero > 0 ? numero : null;
}

function formatarPreco(valor: string): Pick<Produto, "preco" | "sobConsulta"> {
  const numero = lerPreco(valor);
  if (numero === null) return { preco: "CONSULTAR", sobConsulta: true };

  return {
    preco: numero.toLocaleString("pt-BR", {
      minimumFractionDigits: 2,
      maximumFractionDigits: 2,
    }),
    sobConsulta: false,
  };
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
      categoria: categorizar(c[0] ?? ""),
      // "Não aplicável" é ruído para acessórios sem variação de armazenamento.
      armazenamento: /não aplic/i.test(c[1] ?? "") ? "" : c[1] ?? "",
      ...formatarPreco(c[2] ?? ""),
      imagem: c[3] ?? "",
      tag: c[4] ?? "",
    }));
}
