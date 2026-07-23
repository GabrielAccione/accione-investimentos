import type { LucideIcon } from 'lucide-react'

export interface Benefit {
  icon: LucideIcon
  title: string
  description: string
}

export interface Product {
  id: number
  slug: string
  title: string
  /** Quando presente, exibido como subtítulo no painel de conteúdo (ex: nome completo do ativo) */
  subtitle?: string
  description: string
  features: string[]
  icon: LucideIcon
  /** Imagem de capa do card (formato do card de empreendimento) */
  image: string
  /** Posição do object-position para a imagem de capa */
  imagePosition?: string
  stats?: { label: string; value: string }[]
}

export interface Step {
  number: string
  title: string
  description: string
  icon: LucideIcon
}

export interface Testimonial {
  id: number
  name: string
  role: string
  text: string
  rating: number
  image: string
}

export interface EconomicIndicator {
  id: 'selic' | 'cdi' | 'ipca' | 'ipca15' | 'igpm' | 'igpdi' | 'incc' | 'bitcoin' | 'ibovespa'
  label: string
  description: string
  value: number | null
  valueLabel: string
  /** Legenda do período do valor exibido, ex: "no último mês · mai/2026" */
  periodLabel?: string
  variation: number | null
  variationLabel: string
  /** Quando true, a variação é neutra (não usa verde/vermelho) — ex: acumulado de inflação */
  neutralVariation?: boolean
  icon: LucideIcon
  source: string
  sourceDate?: string
  isManual?: boolean
}

export type BlogCategory =
  | 'Investimentos Alternativos'
  | 'Agronegócio'
  | 'Mercado Financeiro'
  | 'Imóveis'

export interface BlogSection {
  heading?: string
  paragraphs: string[]
}

export interface BlogPost {
  slug: string
  title: string
  category: BlogCategory
  date: string
  excerpt: string
  coverImage: string
  readTime: string
  heroTagline: string
  /** Aplica um leve zoom (108%, ancorado à esquerda) na capa — ex: esconder marca d'água */
  coverZoom?: boolean
  author?: { name: string; role: string; image?: string }
  /** Rascunho: fica fora do blog e da URL direta até ter capa própria. */
  draft?: boolean
  content: BlogSection[]
}
