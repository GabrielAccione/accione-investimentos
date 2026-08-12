# Accione Investimentos — Site

Site institucional da Accione Investimentos (Santa Maria/RS): páginas de produtos de investimento, empreendimentos imobiliários, simuladores financeiros e indicadores econômicos em tempo real.

Este README é o ponto de partida pra quem for mexer no projeto pela primeira vez. Para o estado atual do projeto (o que já foi feito, o que está em andamento, backlog), veja [PROJETO.md](PROJETO.md). Para as convenções que o Claude Code segue neste repo (e que valem como referência pra qualquer dev humano também), veja [.claude/CLAUDE.md](.claude/CLAUDE.md).

## Stack

- React 18 + TypeScript (strict) + Vite 6
- Tailwind CSS 3, Framer Motion (scroll reveal), Recharts (gráficos dos simuladores), React Router 7
- Vercel API Routes (serverless functions em `api/`) — usado só pra `/api/indicators`, evita CORS nas chamadas ao BCB/CoinGecko/brapi.dev
- Deploy: Vercel (build estático + as API Routes)

## Como rodar localmente

Requer Node 24+.

```bash
npm install
npm run dev
```

Isso sobe só o front (`vite`), sem as API Routes — `/api/indicators` não vai responder. Se precisar da API funcionando localmente (pra mexer em indicadores, por exemplo), use o Vercel CLI:

```bash
npm install -g vercel   # se ainda não tiver
vercel dev
```

### Variáveis de ambiente

- `BRAPI_TOKEN` — token da [brapi.dev](https://brapi.dev), usado só pelo indicador do Ibovespa (`api/indicators.ts`). Hoje está configurado no Vercel para **Production** e **Preview**, mas **não** para **Development** — rodando `vercel dev` localmente, o card do Ibovespa vai aparecer como "Indisponível" (o resto dos indicadores funciona normal, nenhum outro precisa de token). Pra corrigir isso localmente: `vercel env add BRAPI_TOKEN development` (pega o valor com quem tem acesso ao painel do brapi.dev — não é possível puxar esse valor de volta via CLI, é um secret "sensitive", write-only por design do Vercel).
- `vercel env pull` puxa as demais env vars pra `.env.local` (já no `.gitignore`).

## Scripts

| Comando | O que faz |
|---|---|
| `npm run dev` | Servidor de dev (só front, sem API Routes) |
| `npm run dev:full` | `vercel dev` — front + API Routes |
| `npm run build` | `tsc -b && vite build` — **sempre rodar antes de abrir PR** |
| `npm run preview` | Serve o build de produção localmente (`dist/`) |
| `npm run lint` | ⚠️ Hoje está quebrado — `eslint` não está instalado como dependência. Não é usado em nenhum CI. Fica registrado aqui como pendência, não como algo que funciona. |

## Estrutura

```
api/indicators.ts          # única API Route — agrega Selic/CDI/IPCA/IGP-M/IGP-DI/INCC-M/Bitcoin/Ibovespa
src/
  pages/                   # uma página por rota, lazy-loaded em App.tsx
  components/
    sections/               # blocos de página (Hero, Navbar, Footer, etc.)
    ui/                     # componentes reutilizáveis (cards, botões, ScrollReveal)
    indicators/             # card de indicador econômico
    global/                 # WhatsappFloat, ScrollToTop
  context/                  # EconomicIndicatorsContext, ThemeContext
  data/                     # conteúdo estático data-driven (produtos, empreendimentos, blog, depoimentos)
  lib/                      # formatters, cálculos financeiros
  hooks/                    # useSeo, useCountUp, useInView, useScrolled
  types/                    # tipos compartilhados
.github/
  dependabot.yml            # agenda semanal de version updates (npm + github-actions)
  workflows/
    ci.yml                    # build gate genérico (tsc -b + vite build + npm audit) em todo PR
    dependabot-auto-merge.yml # builda todo PR do Dependabot; mergeia sozinho só dev-dependency patch/minor
    dependency-weekly-review.yml # mantém a issue fixa "📦 Revisão semanal de dependências" atualizada
```

## Conceitos-chave

### Indicadores econômicos

`api/indicators.ts` busca em paralelo (`Promise.allSettled`) as séries do BCB SGS (Selic, CDI, IPCA, IPCA-15, IGP-M, IGP-DI, INCC-M), CoinGecko (Bitcoin) e brapi.dev (Ibovespa), e devolve tudo num único payload consumido por `EconomicIndicatorsContext`.

Dois detalhes que já causaram bug e valem a pena entender antes de mexer:

- **Selic × CDI**: são séries diferentes do BCB SGS (432 = meta Selic, prospectiva; 4389 = CDI diário, realizado com ~1 dia de defasagem). Comparar o último ponto de cada uma isoladamente pode pegar dias diferentes e fazer o CDI aparecer acima da Selic sem ser o caso de verdade. Por isso `api/indicators.ts` busca por **intervalo de datas** (não `ultimos/N`, que vem pré-preenchido com datas futuras pra Selic) e `EconomicIndicatorsContext.tsx` (`buildSelicCdiIndicators`) alinha os dois na mesma data de referência — o CDI define a data, a Selic usa a meta vigente naquele dia.
- **INCC**: é especificamente o **INCC-M** (série 7456 do BCB SGS), não o INCC genérico/INCC-DI (série 192, que é outro índice — atenção redobrada aqui, os dois têm nomes parecidos mas valores diferentes).

Indicadores que falham na busca não somem silenciosamente do grid — aparecem com valor "Indisponível" (mesmo padrão usado por Bitcoin/Ibovespa desde sempre).

### CTAs de contato

Todo CTA de contato vai para WhatsApp (`5555996431020`), com mensagem contextual por página — nunca formulário genérico. Ver `WhatsAppButton` em `src/components/ui/WhatsAppButton.tsx`.

### Tema claro/escuro e conteúdo data-driven

`ThemeContext` com `localStorage`, `darkMode: 'class'` no Tailwind. Produtos e empreendimentos são data-driven (`src/data/products.ts`, `src/data/empreendimentos.ts`) — adicionar um novo, na maioria dos casos, é só um objeto novo no array, sem mexer em componente.

## Deploy

Vercel, deploy automático a cada push:
- `main` → produção (`accioneinvestimentos.com.br`)
- qualquer PR → preview deploy automático (comentado no próprio PR)

O projeto está linkado a dois times diferentes no Vercel (`leonardo-zorzis-projects` e `ACCIONE` — historicamente o projeto foi movido de um pra outro; se `vercel` CLI reclamar de não achar o deployment, tente `--scope accione`).

## Segurança de dependências

`npm audit` está zerado. Ver `.github/dependabot.yml` e os workflows citados na estrutura acima — PRs do Dependabot de dev-dependency com bump patch/minor mergeiam sozinhos se o build passar; qualquer coisa de runtime ou bump major fica sinalizada pra revisão manual. Detalhes de decisão (por que vite ficou em 6.x e não foi direto pro 8.x, por exemplo) estão no histórico de PRs e na issue fixa de revisão semanal do repo.

## Fluxo de trabalho (branch, commit, PR)

Ver a seção "Git — branches, commits e merges" em [.claude/CLAUDE.md](.claude/CLAUDE.md) para o padrão detalhado.
