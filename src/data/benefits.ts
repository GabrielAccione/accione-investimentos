import { Banknote, Globe, Lock, ShieldCheck, TrendingUp, Users } from 'lucide-react'
import type { Benefit } from '@/types'

export const BENEFITS: Benefit[] = [
  {
    icon: Globe,
    title: 'Diversificação real',
    description: 'Acesso a teses pouco disponíveis no varejo e menos expostas ao comportamento das carteiras padrão.',
  },
  {
    icon: TrendingUp,
    title: 'Retorno orientado a tese',
    description: 'Estruturas pensadas para gerar prêmio acima de benchmarks tradicionais, sempre com análise de risco.',
  },
  {
    icon: Users,
    title: 'Consultoria próxima',
    description: 'Atendimento direto, leitura de perfil e recomendação mais aderente ao momento patrimonial do investidor.',
  },
  {
    icon: ShieldCheck,
    title: 'Proteção patrimonial',
    description: 'Estratégias pensadas para preservar capital, equilibrar liquidez e expandir patrimônio com disciplina.',
  },
  {
    icon: Banknote,
    title: 'Oportunidades exclusivas',
    description: 'Operações fora da prateleira padrão, selecionadas a partir de relacionamento, originação e diligência.',
  },
  {
    icon: Lock,
    title: 'Segurança jurídica',
    description: 'Estruturas avaliadas com suporte jurídico e documentação adequada à natureza de cada investimento.',
  },
]
