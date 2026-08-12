# Accione Investimentos — Site

## Stack
- React 18 + TypeScript
- Vite 6
- Tailwind CSS 3
- Framer Motion (animações)
- React Router 7
- Recharts (gráficos nos simuladores)
- Lucide React (ícones)

## Paleta de Cores
| Variável        | Valor     |
|-----------------|-----------|
| `--bg-primary`  | `#041A2A` |
| `--bg-header`   | `#000000` |
| `--bg-footer`   | `#1D1D1D` |
| `--accent`      | `#A26547` |
| `--text-white`  | `#FFFFFF` |
| `--text-muted`  | `#69727D` |
| `--text-body`   | `#484949` |

## Tipografia
- **Títulos:** Cormorant Garamond
- **Corpo:** DM Sans

## Rotas
| Rota                          | Página                        |
|-------------------------------|-------------------------------|
| `/`                           | Home (landing page)           |
| `/investimentos`              | Produtos de investimento (abas) |
| `/investimentos/cpr-f`        | CPR-F                          |
| `/investimentos/credito-privado` | Crédito Privado             |
| `/empreendimentos`            | Lista de empreendimentos      |
| `/empreendimentos/:slug`      | Detalhe do empreendimento     |
| `/indicadores`                | Indicadores econômicos        |
| `/simuladores/aposentadoria`  | Simulador de Aposentadoria    |
| `/sobre`                      | Sobre Nós                     |
| `/contato`                    | Contato                       |
| `/blog`                       | Blog (listagem)               |
| `/blog/:slug`                 | Post individual               |

> `/simuladores/tir` listado em versões antigas deste doc não existe mais no código — removido daqui em 2026-08-12 pra bater com `src/App.tsx`.

## Módulos

### ✅ Concluídos
- [x] Landing page (Home) — Hero, Benefits, Products preview, HowItWorks, Testimonials, Footer
- [x] Hero — faixa de métricas (R$ 50M+, 200+ investidores, 3 empreendimentos, 5 anos) com dados provisórios
- [x] Página `/investimentos` com 3 abas: Ativos Judiciais, CPR-F, Crédito Privado
- [x] CPR-F — "Cédula de Produto Rural Financeira" com subtítulo no painel, features limpas, CTA WhatsApp
- [x] Página `/empreendimentos` com 3 cards
  - Avenue Residence (Accione + Zacon, Santa Maria/RS)
  - Sync Viva On Conde (21 pav, 187 aptos, centro Santa Maria)
  - Sync Floriano (em breve)
- [x] Páginas internas de empreendimentos (`/empreendimentos/:slug`) com galeria em placeholder
- [x] Indicadores econômicos em tempo real — Selic, CDI, IPCA, IGPM, Bitcoin, Ibovespa, CUB
- [x] Proxy server-side `/api/indicators.ts` para CORS (Vercel API Route)
- [x] Simulador de Aposentadoria (`/simuladores/aposentadoria`) com gráfico Recharts + disclaimer + validação
- [x] Simulador de TIR (`/simuladores/tir`) com comparativo CDI/Selic + disclaimer + validação
- [x] Tipografia nos simuladores — Cormorant Garamond nos valores, DM Sans nos labels
- [x] WhatsApp flutuante com mensagem pré-preenchida e número real (55) 99643-1020
- [x] `InquiryForm` com validação completa — nome, e-mail, telefone (máscara), assunto, mensagem; loading state no botão; feedback de sucesso
- [x] ScrollToTop global
- [x] Lazy loading de todas as páginas (Suspense + fallback)

### 🔄 Em andamento
- [ ] Número real do WhatsApp no CTA da CPR-F (ainda usa placeholder `5555000000000`)
- [ ] Substituição dos placeholders de imagens por fotos reais (aguarda Drive do Gabriel)
- [ ] Confirmar métricas reais do Hero com Gabriel (hoje provisórias)

### 📋 Backlog
- [ ] Sobre Nós — conteúdo real da página `/sobre`
- [ ] Contato — integração real do formulário (Formspree, EmailJS ou backend próprio)
- [ ] Blog — conteúdo editorial real (estrutura de rotas já existe)
- [ ] Responsividade mobile — revisão geral
- [ ] SEO — meta tags, Open Graph, sitemap
- [ ] Favicon e manifest definitivos

## Decisões técnicas
- Produtos (abas em `/investimentos`) são data-driven via `src/data/products.ts` — adicionar novo ativo = novo objeto no array, sem mexer no componente
- `Product.subtitle` (opcional) exibe nome completo abaixo do título no painel de conteúdo; o botão da aba continua mostrando `title` (curto)
- `Product.ctaHref` direciona para WhatsApp ou URL externa; sem `ctaHref`, o CTA vai para `/contato`
- Empreendimentos são data-driven via `src/data/empreendimentos.ts`
- Indicadores econômicos via `EconomicIndicatorsContext` com polling/cache
- Routing com React Router v7, lazy loading em todas as páginas

## Segurança & infraestrutura (agosto/2026)

- Corrigido: INCC do card de indicadores era o INCC genérico/INCC-DI (série BCB SGS 192) — trocado para o INCC-M correto (série 7456), como pedido pelo Gabriel.
- Corrigido: card de indicador que falha na busca não some mais silenciosamente — mostra "Indisponível".
- Corrigido: Selic e CDI apareciam de dias diferentes na comparação (Selic vem de série prospectiva, CDI de série realizada com defasagem) — `api/indicators.ts` e `EconomicIndicatorsContext.tsx` agora alinham os dois na mesma data de referência.
- `npm audit`: 17 vulnerabilidades → 0. Detalhe de cada uma e por que os bumps foram os mínimos necessários (não os majors que o Dependabot propunha por padrão) está no histórico de PRs do repo.
- Automação nova: `.github/dependabot.yml` (agenda semanal), `dependabot-auto-merge.yml` (builda + mergeia sozinho só dev-dependency patch/minor), `dependency-weekly-review.yml` (mantém issue fixa com `npm audit` + `npm outdated`), `ci.yml` (build gate genérico em todo PR, não só do Dependabot).
- Ver [README.md](README.md) e [.claude/CLAUDE.md](.claude/CLAUDE.md) pra mais contexto de arquitetura e do fluxo de git do projeto.

## Observações do cliente
- Aguardar material visual do Gabriel (Drive) para substituir placeholders nos empreendimentos
- Número WhatsApp real ainda não confirmado — manter placeholder até receber
