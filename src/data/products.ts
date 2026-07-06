import { CreditCard, Wheat } from "lucide-react";
import type { Product } from "@/types";
import cprfImage from "@/assets/Investimentos/cpr-f.png";
import creditoPrivadoImage from "@/assets/Investimentos/credito-privado.png";

export const PRODUCTS: Product[] = [
  {
    id: 0,
    slug: "cpr-f",
    title: "CPR-F",
    subtitle: "Cédula de Produto Rural Financeira",
    summary:
      "Lastro em produção agrícola com isenção de IR e rentabilidade acima do CDI.",
    description:
      "Título de crédito emitido por produtores rurais e cooperativas, lastreado na produção agrícola brasileira. Oferece rentabilidade acima do CDI com proteção real contra inflação.",
    image: cprfImage,
    badge: "Isenção de IR · PF",
    features: [
      "Lastro real — Garantido pela produção agrícola, um dos setores mais sólidos da economia brasileira",
      "Rentabilidade superior — Historicamente acima do CDI, com isenção de IR para pessoa física",
      "Contrato robusto e registrado na B3.",
      "Prazo típico: 12 a 36 meses",
      "Perfil: Moderado a Sofisticado",
    ],
    icon: Wheat,
    ctaLabel: "Quero investir em CPR-F",
    ctaHref:
      "https://wa.me/5555000000000?text=Ol%C3%A1%2C%20quero%20saber%20mais%20sobre%20o%20CPR-F.",
  },
  {
    id: 1,
    slug: "credito-privado",
    title: "Crédito Privado",
    subtitle: "Renda fixa corporativa",
    summary:
      "Estruturas com garantia e remuneração acima do crédito bancário tradicional.",
    description:
      "Crédito estruturado para empresas sólidas e projetos com garantias compatíveis ao risco assumido. A tese combina diligência, colaterais bem definidos e acompanhamento de performance para capturar taxas superiores às linhas bancárias convencionais.",
    image: creditoPrivadoImage,
    badge: "Renda Fixa",
    features: [
      "Taxas acima do CDI",
      "Garantias reais",
      "Due diligence rigorosa",
      "Fluxo de amortização previamente modelado",
      "Prazo Típico: 12 a 48 meses",
      "Perfil: Moderado a Sofisticado",
    ],
    icon: CreditCard,
  },
];
