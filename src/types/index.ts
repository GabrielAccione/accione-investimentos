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
  summary: string
  description: string
  features: string[]
  icon: LucideIcon
  tag?: string
  stats?: { label: string; value: string }[]
  /** Substitui o label padrão "Falar com um consultor" no botão CTA */
  ctaLabel?: string
  /** Quando presente, o CTA aponta para esta URL externa em vez de /contato */
  ctaHref?: string
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
}

export interface EconomicIndicator {
  id: 'selic' | 'cdi' | 'ipca' | 'igpm' | 'bitcoin' | 'ibovespa' | 'cub'
  label: string
  description: string
  value: number | null
  valueLabel: string
  variation: number | null
  variationLabel: string
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
  content: BlogSection[]
}
