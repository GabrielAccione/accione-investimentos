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
    description:
      "Título de crédito emitido por produtores rurais e cooperativas, lastreado na produção agrícola brasileira. Oferece rentabilidade acima do CDI com proteção real contra inflação.",
    image: cprfImage,
    imagePosition: "center 30%",
    features: [
      "Lastro real — Garantido pela produção agrícola, um dos setores mais sólidos da economia brasileira",
      "Rentabilidade superior — Historicamente acima do CDI, com isenção de IR para pessoa física",
      "Contrato robusto e registrado na B3.",
      "Prazo típico: 12 a 36 meses",
      "Perfil: Moderado a Sofisticado",
    ],
    icon: Wheat,
  },
  {
    id: 1,
    slug: "credito-privado",
    title: "Crédito Privado",
    subtitle: "Renda Fixa Corporativa",
    description:
      "Crédito estruturado para empresas sólidas e projetos com garantias compatíveis ao risco assumido. A tese combina diligência, colaterais bem definidos e acompanhamento de performance para capturar taxas superiores às linhas bancárias convencionais.",
    image: creditoPrivadoImage,
    imagePosition: "center 45%",
    features: [
      "Taxas acima do CDI",
      "Garantias reais",
      "Due diligence rigorosa",
      "Fluxo de amortização previamente modelado",
      "Prazo típico: 12 a 48 meses",
      "Perfil: Moderado a Sofisticado",
    ],
    icon: CreditCard,
  },
];
