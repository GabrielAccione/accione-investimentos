import { BarChart3, FileSignature, Presentation, UserCheck } from 'lucide-react'
import type { Step } from '@/types'

export const STEPS: Step[] = [
  {
    number: '01',
    title: 'Cadastro e perfil',
    description: 'Você nos conta objetivos, liquidez esperada e momento patrimonial para calibrarmos a leitura inicial.',
    icon: UserCheck,
  },
  {
    number: '02',
    title: 'Seleção de teses',
    description: 'Apresentamos as oportunidades mais aderentes ao seu perfil, com riscos, garantias e dinâmica de retorno.',
    icon: Presentation,
  },
  {
    number: '03',
    title: 'Estruturação e adesão',
    description: 'Após validação, seguimos para documentação, entendimento da operação e formalização do aporte.',
    icon: FileSignature,
  },
  {
    number: '04',
    title: 'Acompanhamento',
    description: 'Você acompanha a evolução da operação com comunicação recorrente e acesso próximo à equipe.',
    icon: BarChart3,
  },
]
