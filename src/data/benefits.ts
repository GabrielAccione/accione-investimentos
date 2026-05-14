import { Clock, Eye, ShieldCheck, Target, TrendingUp } from 'lucide-react'
import type { Benefit } from '@/types'

export const BENEFITS: Benefit[] = [
  {
    icon: TrendingUp,
    title: 'Rentabilidade acima da média de mercado',
    description: 'Identificamos oportunidades com retornos mais competitivos do que os investimentos convencionais, adequadas ao seu perfil.',
  },
  {
    icon: Clock,
    title: 'Dedique mais tempo para o que você gosta',
    description: 'Seu consultor cuida do acompanhamento dos seus investimentos enquanto você foca no que realmente importa.',
  },
  {
    icon: Target,
    title: 'Planejamento financeiro com informações precisas',
    description: 'Construímos junto com você um plano claro e estruturado, com dados reais e projeções alinhadas aos seus objetivos.',
  },
  {
    icon: Eye,
    title: 'Relação de transparência com seu consultor',
    description: 'Comunicação direta e honesta em cada etapa — sem letras miúdas, sem ruído, só o que você precisa saber.',
  },
  {
    icon: ShieldCheck,
    title: 'Estratégia segura sem mudar a carteira com frequência',
    description: 'Investimentos pensados para o longo prazo, com consistência e sem movimentos desnecessários que comprometem o resultado.',
  },
]
