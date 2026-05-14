// Avenue
import avenueFachadaImg from "@/assets/avenue/avenue-fachada.png";
import avenueSalaImg from "@/assets/avenue/avenue-sala.png";
import avenueSala2Img from "@/assets/avenue/avenue-sala2.png";
import avenueSalaTvImg from "@/assets/avenue/avenue-sala-tv.png";
import avenueSala3Img from "@/assets/avenue/avenue-sala3.png";
import avenueCozinhaImg from "@/assets/avenue/avenue-cozinha.png";
import avenueCozinha2Img from "@/assets/avenue/avenue-cozinha2.png";
import avenueDormitorioImg from "@/assets/avenue/avenue-dormitorio.png";
import avenueGourmetImg from "@/assets/avenue/avenue-gourmet.png";
import avenueRooftopImg from "@/assets/avenue/avenue-rooftop.png";

// Sync Conde
import syncResidenceImg from "@/assets/syncConde/sync-residence.jpg";
import syncFachadaImg from "@/assets/syncConde/sync-fachada.jpg";
import syncPiscinaImg from "@/assets/syncConde/sync-piscina.jpg";
import syncRooftopImg from "@/assets/syncConde/sync-rooftop.jpg";
import syncCoworkingImg from "@/assets/syncConde/sync-coworking.jpg";
import syncAcademiaImg from "@/assets/syncConde/sync-academia.jpg";
import syncAreaVerdeImg from "@/assets/syncConde/sync-area-verde.jpg";
import syncElevadorImg from "@/assets/syncConde/sync-elevador.jpg";
import syncHallImg from "@/assets/syncConde/sync-hall.jpg";
import syncSalaJogosImg from "@/assets/syncConde/sync-sala-jogos.jpg";

// Sync Floriano
import florianoFachadaImg from "@/assets/syncFloriano/sync-floriano-fachada.jpg";
import florianoPubImg from "@/assets/syncFloriano/sync-floriano-pub.jpg";
import florianoAptoImg from "@/assets/syncFloriano/sync-floriano-apto.jpg";
import florianoQuartoImg from "@/assets/syncFloriano/sync-floriano-quarto.jpg";
import florianoQuarto2Img from "@/assets/syncFloriano/sync-floriano-quarto2.jpg";
import florianoGourmetImg from "@/assets/syncFloriano/sync-floriano-gourmet.jpg";
import florianoCoberturaImg from "@/assets/syncFloriano/sync-floriano-cobertura.jpg";
import florianoCoworkingImg from "@/assets/syncFloriano/sync-floriano-coworking.jpg";
import florianoAcademiaImg from "@/assets/syncFloriano/sync-floriano-academia.jpg";
import florianoMinimarketImg from "@/assets/syncFloriano/sync-floriano-minimarket.jpg";

export interface FichaTecnica {
  construtora: string;
  gestora: string;
  modelo: string;
  localizacao: string;
  tipologias: string;
  extras?: { label: string; value: string }[];
}

export interface GalleryItem {
  src: string;
  alt: string;
}

export interface Destaque {
  valor: string;
  label: string;
}

export interface EmpreendimentoData {
  slug: string;
  name: string;
  status: "em-captacao" | "em-breve";
  statusLabel: string;
  location: string;
  shortDescription: string;
  fullDescription: string;
  parceria: string;
  coverImage: string;
  fachadaImage?: GalleryItem;
  gallery: GalleryItem[];
  destaques: Destaque[];
  fichaTecnica: FichaTecnica;
  pontosDeInteresse: string[];
}

export const EMPREENDIMENTOS: EmpreendimentoData[] = [
  {
    slug: "avenue-residence",
    name: "Avenue Residence",
    status: "em-captacao",
    statusLabel: "Em captação",
    location: "Rua Demétrio Ribeiro, 404 — Santa Maria/RS",
    shortDescription:
      "Apartamentos de 2 e 3 dormitórios com suíte, sacada, espaço gourmet e rooftop. Modelo SPE a preço de custo.",
    fullDescription:
      "O Avenue Residence é um empreendimento exclusivo que une sofisticação e praticidade no coração de Santa Maria. Com unidades de 2 e 3 dormitórios — sendo as de 3 com suíte — o projeto entrega acabamento de alto padrão, sacada privativa, espaço gourmet e um rooftop com vista privilegiada. Desenvolvido no modelo SPE (Sociedade de Propósito Específico), o Avenue Residence oferece ao investidor a oportunidade de adquirir frações de um ativo imobiliário real, com gestão profissional e rentabilidade acima da média do mercado tradicional.",
    parceria: "Accione Investimentos + Zacon Zanini Construções",
    coverImage: avenueFachadaImg,
    fachadaImage: { src: avenueFachadaImg, alt: "Fachada Avenue Residence" },
    gallery: [
      { src: avenueSalaImg,       alt: "Sala de estar" },
      { src: avenueSala2Img,      alt: "Sala integrada" },
      { src: avenueSalaTvImg,     alt: "Sala TV" },
      { src: avenueSala3Img,      alt: "Sala" },
      { src: avenueCozinhaImg,    alt: "Cozinha" },
      { src: avenueCozinha2Img,   alt: "Cozinha gourmet" },
      { src: avenueDormitorioImg, alt: "Dormitório" },
      { src: avenueGourmetImg,    alt: "Espaço Gourmet" },
      { src: avenueRooftopImg,    alt: "Rooftop" },
    ],
    destaques: [
      { valor: "2 e 3",          label: "Dormitórios" },
      { valor: "SPE",            label: "Modelo de investimento" },
      { valor: "Rooftop",        label: "Espaço gourmet" },
      { valor: "Preço de custo", label: "Aquisição" },
    ],
    fichaTecnica: {
      construtora: "Zacon Zanini Construções — CNPJ 93.295.335/0001-65",
      gestora: "Accione Investimentos — CNPJ 53.404.254/0001-31",
      modelo: "SPE — Sociedade de Propósito Específico",
      localizacao: "R. Demétrio Ribeiro, 404, Santa Maria/RS",
      tipologias: "2 dormitórios (50,82 m²) e 3 dormitórios com suíte",
    },
    pontosDeInteresse: [
      "Calçadão do Centro — 5 min a pé",
      "UFSM — 10 min de carro",
      "Shopping Praça Nova — 8 min de carro",
      "Hospital Universitário — 12 min de carro",
      "Parque Itaimbé — 6 min de carro",
    ],
  },
  {
    slug: "sync-conde",
    name: "Sync Viva On (Conde)",
    status: "em-captacao",
    statusLabel: "Em captação",
    location: "Rua Conde de Porto Alegre, 646 — Centro, Santa Maria/RS",
    shortDescription:
      "21 pavimentos, 187 apartamentos (estúdios, 1 e 2 dorms). Rooftop com piscina, academia, coworking e bar. Retrofit programado a cada 10 anos.",
    fullDescription:
      "O Sync Viva On é um empreendimento de alto impacto urbanístico no Centro de Santa Maria. Com 21 pavimentos e 187 apartamentos distribuídos em estúdios, 1 e 2 dormitórios, o projeto foi concebido para o investidor moderno que busca rentabilidade com liquidez. O rooftop oferece piscina, academia completa, espaço de coworking e bar panorâmico. Um diferencial exclusivo é o retrofit programado a cada 10 anos, garantindo que o ativo se mantenha sempre valorizado e atualizado. Modelo SPE, gestão profissional Accione.",
    parceria: "Accione Investimentos + Zacon Zanini Construções",
    coverImage: syncFachadaImg,
    fachadaImage: { src: syncFachadaImg, alt: "Fachada Sync Viva On" },
    gallery: [
      { src: syncPiscinaImg,   alt: "Piscina" },
      { src: syncRooftopImg,   alt: "Rooftop" },
      { src: syncCoworkingImg, alt: "Coworking" },
      { src: syncAcademiaImg,  alt: "Academia" },
      { src: syncAreaVerdeImg, alt: "Área verde" },
      { src: syncElevadorImg,  alt: "Elevador" },
      { src: syncHallImg,      alt: "Hall de entrada" },
      { src: syncSalaJogosImg, alt: "Sala de jogos" },
      { src: syncResidenceImg, alt: "Vista geral" },
    ],
    destaques: [
      { valor: "187",     label: "Apartamentos" },
      { valor: "21",      label: "Pavimentos" },
      { valor: "Rooftop", label: "Com piscina e bar" },
      { valor: "10 anos", label: "Retrofit programado" },
    ],
    fichaTecnica: {
      construtora: "Zacon Zanini Construções",
      gestora: "Accione Investimentos",
      modelo: "SPE — Sociedade de Propósito Específico",
      localizacao: "R. Conde de Porto Alegre, 646, Centro, Santa Maria/RS",
      tipologias: "Estúdio (23–33 m²), 1 dorm (27–36 m²), 2 dorms (45–50 m²)",
      extras: [
        { label: "Total de unidades", value: "187 apartamentos" },
        { label: "Pavimentos", value: "21" },
      ],
    },
    pontosDeInteresse: [
      "Calçadão do Centro — 3 min a pé",
      "Catedral de Santa Maria — 5 min a pé",
      "Terminal Urbano — 4 min a pé",
      "UFSM — 12 min de carro",
      "Shopping Praça Nova — 10 min de carro",
    ],
  },
  {
    slug: "sync-floriano",
    name: "Sync Floriano",
    status: "em-breve",
    statusLabel: "Em breve",
    location: "Santa Maria/RS",
    shortDescription: "Novo empreendimento da linha Sync. Detalhes em breve.",
    fullDescription:
      "O Sync Floriano é o mais novo empreendimento da linha Sync by Accione. Em fase de estruturação, o projeto promete manter o padrão de excelência da marca com inovações arquitetônicas e diferenciais de mercado. Cadastre seu interesse e seja um dos primeiros a receber todas as informações quando o projeto for lançado.",
    parceria: "Accione Investimentos + Zacon Zanini Construções",
    coverImage: florianoFachadaImg,
    fachadaImage: { src: florianoFachadaImg, alt: "Fachada Sync Floriano" },
    gallery: [
      { src: florianoPubImg,        alt: "Pub / Bar" },
      { src: florianoAptoImg,       alt: "Apartamento" },
      { src: florianoQuartoImg,     alt: "Quarto" },
      { src: florianoQuarto2Img,    alt: "Suíte" },
      { src: florianoGourmetImg,    alt: "Espaço Gourmet" },
      { src: florianoCoberturaImg,  alt: "Cobertura" },
      { src: florianoCoworkingImg,  alt: "Coworking" },
      { src: florianoAcademiaImg,   alt: "Academia" },
      { src: florianoMinimarketImg, alt: "Minimarket" },
    ],
    destaques: [
      { valor: "SPE",      label: "Modelo de investimento" },
      { valor: "Em breve", label: "Lançamento" },
      { valor: "Centro",   label: "Localização" },
      { valor: "Accione",  label: "Gestão" },
    ],
    fichaTecnica: {
      construtora: "Zacon Zanini Construções",
      gestora: "Accione Investimentos",
      modelo: "SPE — Sociedade de Propósito Específico",
      localizacao: "Santa Maria/RS — endereço a divulgar",
      tipologias: "A definir",
    },
    pontosDeInteresse: ["Detalhes serão divulgados em breve"],
  },
];
