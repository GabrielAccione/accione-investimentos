# Accione Investimentos — Site

## Build & Dev

- `npm run dev` — servidor local (só front; `/api/*` não responde)
- `npm run dev:full` (`vercel dev`) — front + API Routes, precisa do Vercel CLI
- `npm run build` — SEMPRE rodar antes de push (TypeScript strict) — equivale a `npx tsc -b && npx vite build`
- `git add <arquivo específico>` — commits separados por feature

## Git — branches, commits e merges

- **Nunca commitar direto na `main`.** Sempre: branch nova a partir da `main` atualizada → commit(s) → push → PR via `gh pr create` → merge via `gh pr merge`.
- **Nome da branch**: prefixo pelo tipo + descrição curta em kebab-case — `fix/…`, `feat/…`, `chore/…`, `security/…`, `ci/…`. Ex.: `fix/dependabot-auto-merge-approve-bug`, `security/dependabot-fixes-2026-08`, `ci/build-check-all-prs`.
- **Mensagem de commit**: [Conventional Commits](https://www.conventionalcommits.org/) — `tipo(escopo): resumo` em português, corpo em bullets explicando o quê e o porquê (não só o quê). Tipos usados no projeto: `fix`, `feat`, `chore(deps)`, `ci`. Quando fizer sentido, fechar o corpo com uma linha "Validado:" listando o que foi testado (`tsc -b`, `vite build`, `npm audit`, smoke test).
- **Antes de qualquer commit**: `npm run build` tem que passar limpo. Se falhar, não commitar — investigar e corrigir primeiro.
- **PR**: corpo estruturado com "## Resumo" (o que mudou e por quê) e "## Test plan" (checklist do que foi validado). Preferir `gh pr create --base main --head <branch>`.
- **Merge**: squash (`gh pr merge --squash`) é o padrão pra manter a `main` linear — é o que a automação (`dependabot-auto-merge.yml`) também usa. Merge commit (`--merge`) só quando os commits individuais da PR têm valor de histórico por si (ex.: PR grande com várias mudanças logicamente separadas).
- **Mudança que afeta produção de verdade** (dependência de runtime, não só dev/build; ou qualquer coisa que vá pro `main`/deploy) — validar com build limpo *e* smoke test (rotas principais, sem erro no console) antes de mergear. Se envolver risco real (ex. bump de dependência usada no app, não só tooling), preferir abrir o PR e esperar confirmação antes de mergear em vez de mergear sozinho — mesmo com CI verde.
- Não há branch protection nem required checks configurados na `main` hoje (nada te impede de mergear com o build quebrado — por isso o hábito de rodar `npm run build` local antes de tudo é o que garante que isso não aconteça).

## Stack

- React 18 + Vite + TypeScript + Tailwind CSS
- Framer Motion (scroll reveal já em todos componentes)
- Recharts (simuladores)
- Vercel API Routes (indicadores econômicos — sem CORS)

## IMPORTANT — Regras que não podem quebrar

- NUNCA usar `any` no TypeScript sem justificativa explícita
- TODOS os CTAs de contato → WhatsApp `5555996431020`
- Mensagens WhatsApp devem ser contextuais por página/produto
- Indicadores econômicos → fetch via `/api/indicators` (nunca direto do browser)
- Commits separados por funcionalidade

## Paleta (CSS vars já configuradas)

- `--bg-primary: #041A2A`
- `--accent: #A26547`
- WhatsApp: `#25D366`
- Muted: `#69727D`

## Fontes

- Principal: Outfit
- Destaque numérico: Oswald
- Fallback: Arial, sans-serif

## Rotas existentes

/ → Home
/investimentos → listagem produtos
/investimentos/cpr-f → página CPR-F
/investimentos/credito-privado → página Crédito Privado
/empreendimentos → listagem
/empreendimentos/:slug → detalhe (avenue-residence | sync-conde | sync-floriano)
/simuladores/aposentadoria
/indicadores
/sobre
/contato
/blog → listagem
/blog/:slug → post individual

(fonte da verdade: `src/App.tsx` — checar ali se este README ficar desatualizado de novo)

## Componentes críticos

- `WhatsAppButton` → `src/components/ui/WhatsAppButton.tsx`
- `ScrollReveal` → `src/components/ui/ScrollReveal.tsx`
- `EconomicIndicatorsContext` → fetch via `/api/indicators`

## Assets

- Logo escura (fundo escuro): `src/assets/logo-accione.png`
- Logo clara (fundo claro): `src/assets/logo-accione-dark.jpg`
- Empreendimentos: `src/assets/empreendimentos/avenue-residence/` | `syncConde/` | `syncFloriano/`
- Imagens de fachada → hero e card principal (detectar por `fachada` no nome)

## Status dos empreendimentos

- Avenue Residence → `Captação Encerrada` (grupo 100% fechado)
- Sync Conde → `Aberto para Captação`
- Sync Floriano → `Aberto para Captação`

## Quando compactar

/compact preservar: lista de arquivos modificados, rotas existentes, status dos empreendimentos
