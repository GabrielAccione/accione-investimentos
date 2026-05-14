import { CalendarCheck, LineChart, MessageCircle, Target } from 'lucide-react'
import type { Step } from '@/types'

export const STEPS: Step[] = [
  {
    number: '01',
    title: 'Planejamento financeiro estratégico',
    description: 'Seu consultor monta junto com você um plano de investimentos, sempre com foco em resultados acima da média.',
    icon: Target,
  },
  {
    number: '02',
    title: 'Fale direto com o seu consultor',
    description: 'Seu consultor está à sua disposição para facilitar o processo, com acompanhamento personalizado.',
    icon: MessageCircle,
  },
  {
    number: '03',
    title: 'Acompanhamento ativo dos seus investimentos',
    description: 'Conte com a ajuda do seu consultor para acompanhar seus resultados, sugerir mudanças e adaptações na sua carteira.',
    icon: LineChart,
  },
  {
    number: '04',
    title: 'Reuniões periódicas com seu Consultor Exclusivo',
    description: 'Agende reuniões sempre que desejar para se manter informado sobre seus investimentos e resultados.',
    icon: CalendarCheck,
  },
]
