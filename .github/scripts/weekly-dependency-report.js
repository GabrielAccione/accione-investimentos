// Lê audit.json/outdated.json (gerados pelo workflow weekly-dependency-review.yml)
// e mantém uma única issue fixa com o status semanal de dependências —
// atualiza a issue existente em vez de abrir uma nova toda semana.
import { execFileSync } from "node:child_process";
import { readFileSync, existsSync } from "node:fs";

const ISSUE_TITLE = "📦 Revisão semanal de dependências";
const ISSUE_LABEL = "dependencies-report";

function readJson(path) {
  if (!existsSync(path)) return null;
  try {
    return JSON.parse(readFileSync(path, "utf8"));
  } catch {
    return null;
  }
}

function gh(args) {
  return execFileSync("gh", args, { encoding: "utf8" });
}

const audit = readJson("audit.json");
const outdated = readJson("outdated.json") ?? {};

const vulnCounts = audit?.metadata?.vulnerabilities ?? {
  info: 0,
  low: 0,
  moderate: 0,
  high: 0,
  critical: 0,
  total: 0,
};

const outdatedRows = Object.entries(outdated).map(([name, info]) => ({
  name,
  current: info.current ?? "?",
  wanted: info.wanted ?? "?",
  latest: info.latest ?? "?",
  type: info.type ?? "?",
}));

const today = new Date().toISOString().slice(0, 10);

const lines = [];
lines.push(`_Última atualização automática: ${today}_`, "");

lines.push("## npm audit");
if (vulnCounts.total === 0) {
  lines.push("✅ Nenhuma vulnerabilidade conhecida (`npm audit` limpo).");
} else {
  lines.push(
    `⚠️ **${vulnCounts.total} vulnerabilidade(s)** — critical: ${vulnCounts.critical}, high: ${vulnCounts.high}, moderate: ${vulnCounts.moderate}, low: ${vulnCounts.low}.`,
    "",
    "Ver detalhes na aba [Security > Dependabot](../../security/dependabot) do repositório.",
  );
}
lines.push("");

lines.push("## npm outdated");
if (outdatedRows.length === 0) {
  lines.push("✅ Todas as dependências estão na versão mais recente dentro do range declarado.");
} else {
  lines.push("| Pacote | Atual | Desejado (range) | Última | Tipo |");
  lines.push("|---|---|---|---|---|");
  for (const row of outdatedRows) {
    lines.push(`| ${row.name} | ${row.current} | ${row.wanted} | ${row.latest} | ${row.type} |`);
  }
  lines.push(
    "",
    "_\"Desejado\" é o que o `package.json` já permite (dá pra pegar com `npm update`). \"Última\" pode exigir mudar o range no `package.json` (possível breaking change — revisar antes)._",
  );
}
lines.push("");

lines.push("## PRs abertos do Dependabot");
lines.push(
  "Ver [pull requests com o label `dependencies`](../../pulls?q=is%3Apr+is%3Aopen+label%3Adependencies). PRs de dev-dependency com bump patch/minor são aprovados e mergeados sozinhos pelo workflow `dependabot-auto-merge.yml`; o resto fica sinalizado para revisão manual.",
);

const body = lines.join("\n");

const existing = JSON.parse(
  gh([
    "issue",
    "list",
    "--search",
    `"${ISSUE_TITLE}" in:title`,
    "--state",
    "open",
    "--json",
    "number,title",
  ]),
).find((issue) => issue.title === ISSUE_TITLE);

if (existing) {
  gh(["issue", "edit", String(existing.number), "--body", body]);
  console.log(`Issue #${existing.number} atualizada.`);
} else {
  gh([
    "issue",
    "create",
    "--title",
    ISSUE_TITLE,
    "--body",
    body,
    "--label",
    ISSUE_LABEL,
  ]);
  console.log("Issue criada.");
}
