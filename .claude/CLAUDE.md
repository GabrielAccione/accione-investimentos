# Accione Investimentos — Site

## Build & Dev

- `npm run dev` — servidor local
- `npm run build` — SEMPRE rodar antes de push (TypeScript strict)
- `git add <arquivo específico>` — commits separados por feature

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
/empreendimentos/:id → detalhe (avenue-residence | sync-conde | sync-floriano)
/simuladores/aposentadoria
/simuladores/sync-floriano
/indicadores
/sobre
/contato

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
