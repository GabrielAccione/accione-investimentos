export const SITE_CONFIG = {
  companyName: "Accione Investimentos",
  whatsappDisplay: "(55) 99643-1020",
  whatsappHref: `https://wa.me/5555996431020?text=${encodeURIComponent("Olá! Vim pelo site da Accione Investimentos e gostaria de saber mais sobre as oportunidades disponíveis.")}`,
  email: "contato@accioneinvestimentos.com.br",
  phone: "(55) 99643-1020",
  address: "Atendimento consultivo em Santa Maria/RS",
  mapQuery: "Santa Maria RS",
  founder: {
    name: "Gabriel",
    role: "Fundador e estrategista de investimentos",
    bio: "Especialista em estruturação de investimentos alternativos, com foco em operações reais, diligência profunda e relacionamento de longo prazo com investidores.",
  },
  partner: {
    name: "Zacon Zanini",
    description:
      "Parceiro estratégico da Accione nos empreendimentos imobiliários estruturados em modelo SPE.",
  },
  socialLinks: {
    instagram: "https://www.instagram.com/accioneinvestimentos/",
    linkedin: "https://www.linkedin.com/company/accioneinvestimentos/",
  },
  manualIndicators: {
    cubR16n: {
      value: null as number | null,
      valueLabel: "Atualizar manualmente",
      variation: null as number | null,
      updatedAt: "Pendente de definição",
    },
  },
} as const;
