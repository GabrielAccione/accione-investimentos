import {
  Eye,
  ShieldCheck,
  Target,
  TrendingUp,
  MessageCircle,
  LineChart,
} from "lucide-react";
import type { Benefit } from "@/types";

export const BENEFITS: Benefit[] = [
  {
    icon: TrendingUp,
    title: "Rentabilidade acima da média de mercado",
    description:
      "Entregamos oportunidades com retornos mais competitivos do que os investimentos convencionais, potencializando os resultados.",
  },
  {
    icon: Target,
    title: "Decisões de investimento com informações claras",
    description:
      "Construímos junto com você um horizonte claro e estruturado, com dados reais e projeções coerentes.",
  },
  {
    icon: Eye,
    title: "Relação de transparência do início ao fim",
    description:
      "Comunicação direta e honesta em cada etapa — sem letras miúdas, sem ruído, com o que você precisa saber.",
  },
  {
    icon: ShieldCheck,
    title: "Estratégia segura sem mudanças frequentes",
    description:
      "Investimentos pensados para curto, médio ou longo prazo, com consistência e sem movimentos desnecessários que comprometem o resultado.",
  },
  {
    icon: MessageCircle,
    title: "Fale direto conosco",
    description:
      "Estamos à sua disposição para facilitar o processo, com acompanhamento personalizado, sempre dispostos a ajudar.",
  },
  {
    icon: LineChart,
    title: "Planejamento financeiro estratégico",
    description:
      "Montamos junto com você o plano de investimento, com foco em resultados acima da média.",
  },
];
