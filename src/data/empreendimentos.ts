export interface FichaTecnica {
  construtora: string
  gestora: string
  modelo: string
  localizacao: string
  tipologias: string
  extras?: { label: string; value: string }[]
}

export interface EmpreendimentoData {
  slug: string
  name: string
  status: 'em-captacao' | 'em-breve'
  statusLabel: string
  location: string
  shortDescription: string
  fullDescription: string
  parceria: string
  coverImage: string
  gallery: string[]
  fichaTecnica: FichaTecnica
  pontosDeInteresse: string[]
}

export const EMPREENDIMENTOS: EmpreendimentoData[] = [
  {
    slug: 'avenue-residence',
    name: 'Avenue Residence',
    status: 'em-captacao',
    statusLabel: 'Em captação',
    location: 'Rua Demétrio Ribeiro, 404 — Santa Maria/RS',
    shortDescription:
      'Apartamentos de 2 e 3 dormitórios com suíte, sacada, espaço gourmet e rooftop. Modelo SPE a preço de custo.',
    fullDescription:
      'O Avenue Residence é um empreendimento exclusivo que une sofisticação e praticidade no coração de Santa Maria. Com unidades de 2 e 3 dormitórios — sendo as de 3 com suíte — o projeto entrega acabamento de alto padrão, sacada privativa, espaço gourmet e um rooftop com vista privilegiada. Desenvolvido no modelo SPE (Sociedade de Propósito Específico), o Avenue Residence oferece ao investidor a oportunidade de adquirir frações de um ativo imobiliário real, com gestão profissional e rentabilidade acima da média do mercado tradicional.',
    parceria: 'Accione Investimentos + Zacon Zanini Construções',
    coverImage: 'https://placehold.co/1200x600/041A2A/A26547?text=Avenue+Residence',
    gallery: [
      'https://placehold.co/600x400/041A2A/A26547?text=Avenue+Fachada',
      'https://placehold.co/600x400/0C2030/A26547?text=Avenue+Hall',
      'https://placehold.co/600x400/041A2A/A26547?text=Avenue+Apartamento',
      'https://placehold.co/600x400/0C2030/A26547?text=Avenue+Rooftop',
      'https://placehold.co/600x400/041A2A/A26547?text=Avenue+Gourmet',
      'https://placehold.co/600x400/0C2030/A26547?text=Avenue+Suite',
    ],
    fichaTecnica: {
      construtora: 'Zacon Zanini Construções — CNPJ 93.295.335/0001-65',
      gestora: 'Accione Investimentos — CNPJ 53.404.254/0001-31',
      modelo: 'SPE — Sociedade de Propósito Específico',
      localizacao: 'R. Demétrio Ribeiro, 404, Santa Maria/RS',
      tipologias: '2 dormitórios (50,82 m²) e 3 dormitórios com suíte',
    },
    pontosDeInteresse: [
      'Calçadão do Centro — 5 min a pé',
      'UFSM — 10 min de carro',
      'Shopping Praça Nova — 8 min de carro',
      'Hospital Universitário — 12 min de carro',
      'Parque Itaimbé — 6 min de carro',
    ],
  },
  {
    slug: 'sync-conde',
    name: 'Sync Viva On (Conde)',
    status: 'em-captacao',
    statusLabel: 'Em captação',
    location: 'Rua Conde de Porto Alegre, 646 — Centro, Santa Maria/RS',
    shortDescription:
      '21 pavimentos, 187 apartamentos (estúdios, 1 e 2 dorms). Rooftop com piscina, academia, coworking e bar. Retrofit programado a cada 10 anos.',
    fullDescription:
      'O Sync Viva On é um empreendimento de alto impacto urbanístico no Centro de Santa Maria. Com 21 pavimentos e 187 apartamentos distribuídos em estúdios, 1 e 2 dormitórios, o projeto foi concebido para o investidor moderno que busca rentabilidade com liquidez. O rooftop oferece piscina, academia completa, espaço de coworking e bar panorâmico. Um diferencial exclusivo é o retrofit programado a cada 10 anos, garantindo que o ativo se mantenha sempre valorizado e atualizado. Modelo SPE, gestão profissional Accione.',
    parceria: 'Accione Investimentos + Zacon Zanini Construções',
    coverImage: 'https://placehold.co/1200x600/041A2A/A26547?text=Sync+Viva+On',
    gallery: [
      'https://placehold.co/600x400/041A2A/A26547?text=Sync+Fachada',
      'https://placehold.co/600x400/0C2030/A26547?text=Sync+Rooftop',
      'https://placehold.co/600x400/041A2A/A26547?text=Sync+Piscina',
      'https://placehold.co/600x400/0C2030/A26547?text=Sync+Coworking',
      'https://placehold.co/600x400/041A2A/A26547?text=Sync+Academia',
      'https://placehold.co/600x400/0C2030/A26547?text=Sync+Bar',
    ],
    fichaTecnica: {
      construtora: 'Zacon Zanini Construções',
      gestora: 'Accione Investimentos',
      modelo: 'SPE — Sociedade de Propósito Específico',
      localizacao: 'R. Conde de Porto Alegre, 646, Centro, Santa Maria/RS',
      tipologias: 'Estúdio (23–33 m²), 1 dorm (27–36 m²), 2 dorms (45–50 m²)',
      extras: [
        { label: 'Total de unidades', value: '187 apartamentos' },
        { label: 'Pavimentos', value: '21' },
      ],
    },
    pontosDeInteresse: [
      'Calçadão do Centro — 3 min a pé',
      'Catedral de Santa Maria — 5 min a pé',
      'Terminal Urbano — 4 min a pé',
      'UFSM — 12 min de carro',
      'Shopping Praça Nova — 10 min de carro',
    ],
  },
  {
    slug: 'sync-floriano',
    name: 'Sync Floriano',
    status: 'em-breve',
    statusLabel: 'Em breve',
    location: 'Santa Maria/RS',
    shortDescription:
      'Novo empreendimento da linha Sync. Detalhes em breve.',
    fullDescription:
      'O Sync Floriano é o mais novo empreendimento da linha Sync by Accione. Em fase de estruturação, o projeto promete manter o padrão de excelência da marca com inovações arquitetônicas e diferenciais de mercado. Cadastre seu interesse e seja um dos primeiros a receber todas as informações quando o projeto for lançado.',
    parceria: 'Accione Investimentos + Zacon Zanini Construções',
    coverImage: 'https://placehold.co/1200x600/041A2A/69727D?text=Sync+Floriano+Em+Breve',
    gallery: [
      'https://placehold.co/600x400/041A2A/69727D?text=Em+Breve',
      'https://placehold.co/600x400/0C2030/69727D?text=Em+Breve',
      'https://placehold.co/600x400/041A2A/69727D?text=Em+Breve',
      'https://placehold.co/600x400/0C2030/69727D?text=Em+Breve',
      'https://placehold.co/600x400/041A2A/69727D?text=Em+Breve',
      'https://placehold.co/600x400/0C2030/69727D?text=Em+Breve',
    ],
    fichaTecnica: {
      construtora: 'Zacon Zanini Construções',
      gestora: 'Accione Investimentos',
      modelo: 'SPE — Sociedade de Propósito Específico',
      localizacao: 'Santa Maria/RS — endereço a divulgar',
      tipologias: 'A definir',
    },
    pontosDeInteresse: [
      'Detalhes serão divulgados em breve',
    ],
  },
]
