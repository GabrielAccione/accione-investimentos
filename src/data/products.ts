import { CreditCard, Scale, Wheat } from 'lucide-react'
import type { Product } from '@/types'

export const PRODUCTS: Product[] = [
  {
    id: 0,
    slug: 'ativos-judiciais',
    title: 'Ativos Judiciais',
    summary: 'Créditos com previsibilidade de fluxo, proteção jurídica e retorno pactuado.',
    description:
      'Operações estruturadas em precatórios e créditos judiciais com análise documental, deságio de entrada e horizonte de liquidação definido. Uma alternativa para investidores que buscam previsibilidade, lastro e exposição descorrelacionada do varejo tradicional.',
    features: [
      'Rentabilidade acima do CDI',
      'Garantia do poder público',
      'Prazo e retorno previsíveis',
      'Estrutura documental analisada caso a caso',
    ],
    icon: Scale,
    tag: 'Destaque',
    stats: [
      { label: 'Perfil', value: 'Conservador a moderado' },
      { label: 'Prazo', value: 'Médio a longo' },
      { label: 'Base', value: 'Direitos creditórios' },
    ],
  },
  {
    id: 1,
    slug: 'cpr-f',
    title: 'CPR-F',
    subtitle: 'Cédula de Produto Rural Financeira',
    summary: 'Lastro em produção agrícola com isenção de IR e rentabilidade acima do CDI.',
    description:
      'Título de crédito emitido por produtores rurais e cooperativas, lastreado na produção agrícola brasileira. Oferece rentabilidade acima do CDI com proteção real contra inflação.',
    features: [
      'Lastro real — Garantido pela produção agrícola, um dos setores mais sólidos da economia brasileira',
      'Rentabilidade superior — Historicamente acima do CDI, com isenção de IR para pessoa física',
      'Estrutura segura — Registrado em câmara de liquidação e custódia, amparo legal da Lei 8.929/94',
    ],
    icon: Wheat,
    stats: [
      { label: 'Prazo típico', value: '12 a 36 meses' },
      { label: 'Isenção de IR', value: 'Sim (PF)' },
    ],
    ctaLabel: 'Quero investir em CPR-F',
    ctaHref:
      'https://wa.me/5555000000000?text=Ol%C3%A1%2C%20quero%20saber%20mais%20sobre%20o%20CPR-F.',
  },
  {
    id: 2,
    slug: 'credito-privado',
    title: 'Crédito Privado',
    summary: 'Estruturas com garantia e remuneração acima do crédito bancário tradicional.',
    description:
      'Crédito estruturado para empresas sólidas e projetos com garantias compatíveis ao risco assumido. A tese combina diligência, colaterais bem definidos e acompanhamento de performance para capturar taxas superiores às linhas bancárias convencionais.',
    features: [
      'Taxas acima do CDI',
      'Garantias reais e fidejussórias',
      'Due diligence rigorosa',
      'Fluxo de amortização previamente modelado',
    ],
    icon: CreditCard,
    stats: [
      { label: 'Perfil', value: 'Moderado a sofisticado' },
      { label: 'Prazo', value: 'Curto a médio' },
      { label: 'Base', value: 'Empresas e projetos reais' },
    ],
  },
]
