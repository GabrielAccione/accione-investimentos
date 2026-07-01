import { Clock, Eye, ShieldCheck, Target, TrendingUp } from "lucide-react";
import type { Benefit } from "@/types";

export const BENEFITS: Benefit[] = [
  {
    icon: TrendingUp,
    title: "Rentabilidade acima da média de mercado",
    description:
      "Entregamos oportunidades com retornos mais competitivos do que os investimentos convencionais, adequadas ao seu perfil e interesses.",
  },
  {
    icon: Clock,
    title: "Dedique mais tempo para o que você gosta",
    description:
      "Com escolhas consistentes, você fica tranquilo e pode dedicar seu tempo a outras atividades.",
  },
  {
    icon: Target,
    title: "Planejamento financeiro com informações claras",
    description:
      "Construímos junto com você um horizonte claro e estruturado, com dados reais e projeções alinhadas aos seus objetivos.",
  },
  {
    icon: Eye,
    title: "Relação de transparência com seu consultor",
    description:
      "Comunicação direta e honesta em cada etapa — sem letras miúdas, sem ruído, com o que você precisa saber.",
  },
  {
    icon: ShieldCheck,
    title: "Estratégia segura sem mudanças frequentes",
    description:
      "Investimentos pensados para o longo prazo, com consistência e sem movimentos desnecessários que comprometem o resultado.",
  },
];
