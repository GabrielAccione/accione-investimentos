# Accione Investimentos — Site

## Stack
- React 18 + TypeScript
- Vite 5
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
| `/empreendimentos`            | Lista de empreendimentos      |
| `/empreendimentos/:slug`      | Detalhe do empreendimento     |
| `/indicadores`                | Indicadores econômicos        |
| `/simuladores/aposentadoria`  | Simulador de Aposentadoria    |
| `/simuladores/tir`            | Simulador de TIR              |
| `/sobre`                      | Sobre Nós                     |
| `/contato`                    | Contato                       |
| `/blog`                       | Blog (listagem)               |
| `/blog/:slug`                 | Post individual               |

## Módulos

### ✅ Concluídos
- [x] Landing page (Home) — Hero, Benefits, Products preview, HowItWorks, Testimonials, Footer
- [x] Página `/investimentos` com 3 abas: Ativos Judiciais, CPR-F, Crédito Privado
- [x] CPR-F — "Cédula de Produto Rural Financeira" com subtítulo no painel, features limpas, CTA WhatsApp
- [x] Página `/empreendimentos` com 3 cards
  - Avenue Residence (Accione + Zacon, Santa Maria/RS)
  - Sync Viva On Conde (21 pav, 187 aptos, centro Santa Maria)
  - Sync Floriano (em breve)
- [x] Páginas internas de empreendimentos (`/empreendimentos/:slug`) com galeria em placeholder
- [x] Indicadores econômicos em tempo real — Selic, CDI, IPCA, IGPM, Bitcoin, Ibovespa, CUB
- [x] Simulador de Aposentadoria (`/simuladores/aposentadoria`) com gráfico Recharts
- [x] Simulador de TIR (`/simuladores/tir`) com comparativo CDI/Selic
- [x] Tipografia nos simuladores — Cormorant Garamond nos valores, DM Sans nos labels
- [x] Componente WhatsApp flutuante (`WhatsappFloat`)
- [x] ScrollToTop global
- [x] Lazy loading de todas as páginas (Suspense + fallback)

### 🔄 Em andamento
- [ ] Número real do WhatsApp no CTA da CPR-F (placeholder `5555000000000`)
- [ ] Substituição dos placeholders de imagens por fotos reais (aguarda Drive do Gabriel)

### 📋 Backlog
- [ ] Sobre Nós — conteúdo real da página `/sobre`
- [ ] Contato — formulário funcional da página `/contato`
- [ ] Blog — conteúdo editorial real (estrutura de rotas já existe)
- [ ] Responsividade mobile — revisão geral
- [ ] Refinamentos do Simulador de TIR
- [ ] SEO — meta tags, Open Graph, sitemap
- [ ] Favicon e manifest definitivos

## Decisões técnicas
- Produtos (abas em `/investimentos`) são data-driven via `src/data/products.ts` — adicionar novo ativo = novo objeto no array, sem mexer no componente
- `Product.subtitle` (opcional) exibe nome completo abaixo do título no painel de conteúdo; o botão da aba continua mostrando `title` (curto)
- `Product.ctaHref` direciona para WhatsApp ou URL externa; sem `ctaHref`, o CTA vai para `/contato`
- Empreendimentos são data-driven via `src/data/empreendimentos.ts`
- Indicadores econômicos via `EconomicIndicatorsContext` com polling/cache
- Routing com React Router v7, lazy loading em todas as páginas

## Observações do cliente
- Aguardar material visual do Gabriel (Drive) para substituir placeholders nos empreendimentos
- Número WhatsApp real ainda não confirmado — manter placeholder até receber
