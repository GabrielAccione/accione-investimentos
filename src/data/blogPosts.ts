import type { BlogPost } from "@/types";
import imoveisCover from "@/assets/blog-images/centro_voltou_protagonista.png";
import imovelFuturoCover from "@/assets/blog-images/imovel_do_futuro.png";
import gabrielImg from "@/assets/gabriel-2.jpg";

const AUTOR_GABRIEL = {
  name: "Gabriel Rodrigues",
  role: "Economista",
  image: gabrielImg,
};

/**
 * Todos os artigos escritos. Os marcados com `draft: true` estão fora do ar
 * por ainda usarem capa provisória — para publicar, troque `coverImage` por
 * uma imagem real (src/assets/blog-images/) e remova a marcação de rascunho.
 */
const TODOS_OS_POSTS: BlogPost[] = [
  {
    slug: "imovel-do-futuro-mais-inteligente",
    title: "O imóvel do futuro não será maior. Será mais inteligente.",
    category: "Imóveis",
    date: "2026-08-13",
    excerpt:
      "As transformações da sociedade estão redefinindo o mercado imobiliário — e quem compreender esse movimento hoje poderá tomar melhores decisões de investimento amanhã.",
    coverImage: imovelFuturoCover,
    readTime: "8 min de leitura",
    heroTagline:
      "As transformações da sociedade estão redefinindo o mercado imobiliário — e quem compreender esse movimento hoje poderá tomar melhores decisões de investimento amanhã.",
    author: AUTOR_GABRIEL,
    content: [
      {
        paragraphs: [
          "Durante décadas, o mercado imobiliário brasileiro esteve alicerçado sobre uma premissa aparentemente incontestável: quanto maior o imóvel, maior seria seu valor, seu conforto e seu potencial de valorização. Durante muito tempo essa lógica fez sentido. Famílias numerosas, crescimento populacional acelerado e uma sociedade cujo patrimônio era frequentemente medido pela metragem construída sustentaram esse modelo por décadas.",
          "Entretanto, os mercados evoluem porque as pessoas evoluem. E poucas transformações foram tão profundas quanto aquelas vividas pela sociedade nas últimas duas décadas. A forma de trabalhar mudou. A tecnologia alterou hábitos de consumo. As famílias ficaram menores. As cidades tornaram-se mais densas. O tempo passou a ser um recurso ainda mais valioso. Como consequência, o próprio conceito de morar começou a ser redesenhado.",
          "Essa mudança não representa uma simples tendência arquitetônica. Trata-se de uma transformação econômica, social e demográfica que já produz impactos mensuráveis sobre o comportamento do consumidor e, naturalmente, sobre a valorização dos ativos imobiliários.",
        ],
      },
      {
        heading: "Uma mudança estrutural, não um modismo",
        paragraphs: [
          "Como economista, costumo dizer que bons investimentos dificilmente nascem de modismos. Eles normalmente surgem quando conseguimos identificar mudanças estruturais antes que elas sejam plenamente precificadas pelo mercado. E talvez poucas mudanças sejam tão relevantes hoje quanto a transformação do modo como as pessoas desejam viver.",
          "Os números confirmam essa percepção. O Censo Demográfico 2022, divulgado pelo IBGE, mostrou que o Brasil possui aproximadamente 11,8 milhões de domicílios ocupados por apenas uma pessoa, representando 15,9% de todas as residências brasileiras. Há poucas décadas, essa configuração era uma exceção. Hoje tornou-se parte significativa da sociedade brasileira.",
          "Mais do que isso, observa-se crescimento constante dos casais sem filhos, do adiamento da maternidade, do envelhecimento populacional e do aumento da expectativa de vida. São fenômenos distintos, mas que convergem para um mesmo resultado: a redução do tamanho médio das famílias e, consequentemente, uma nova forma de consumir habitação.",
          "Segundo a Câmara Brasileira da Indústria da Construção (CBIC), essa transformação demográfica já influencia diretamente o desenvolvimento dos novos empreendimentos imobiliários em todo o país. Incorporadoras passaram a projetar apartamentos mais eficientes, melhor localizados e capazes de atender diferentes perfis de moradores justamente porque o mercado consumidor mudou. Não se trata de uma escolha das construtoras. Trata-se de uma resposta objetiva àquilo que a sociedade passou a demandar.",
        ],
      },
      {
        heading: "O mercado segue, não lidera",
        paragraphs: [
          "Essa talvez seja uma das primeiras grandes lições para investidores. O mercado imobiliário normalmente não cria tendências. Ele responde às tendências. O mercado comprador costuma ter mais força que quem constrói ou vende.",
          "Quando a sociedade muda, os produtos mudam. Quando os hábitos mudam, o mercado adapta sua oferta. Investidores atentos procuram compreender primeiro essas transformações para somente depois escolher os ativos capazes de capturar esse novo comportamento.",
          "A redução da metragem dos imóveis, portanto, não representa perda de qualidade. Em muitos casos, significa exatamente o contrário: significa maior eficiência. Nos últimos anos, pesquisadores da McKinsey & Company e da PwC, ao analisarem as transformações urbanas nas principais cidades do mundo, identificaram um comportamento bastante consistente entre as novas gerações: as pessoas passaram a valorizar muito mais conveniência, mobilidade, conectividade e acesso a serviços do que simplesmente espaço físico.",
          "Essa mudança ajuda a explicar por que apartamentos compactos, quando bem localizados e inseridos em empreendimentos completos, vêm apresentando níveis elevados de demanda em diversos mercados internacionais.",
        ],
      },
      {
        heading: "O novo significado de conforto",
        paragraphs: [
          'Em outras palavras, o consumidor contemporâneo passou a perguntar menos "quantos metros quadrados este imóvel possui?" e muito mais "como este imóvel melhora minha qualidade de vida?". Essa diferença parece pequena. Na prática, ela muda completamente o mercado.',
          "Durante décadas, conforto significava possuir salas amplas, grandes áreas de circulação e terrenos extensos. Hoje, conforto pode significar reduzir uma hora diária de deslocamento entre casa e trabalho. Pode representar morar próximo às universidades, aos hospitais, aos restaurantes, aos parques e aos centros comerciais. Pode significar trabalhar alguns dias por semana em um coworking localizado dentro do próprio condomínio. Pode significar receber compras por delivery sem preocupações, utilizar lavanderias compartilhadas, contar com academia no edifício e resolver boa parte da rotina sem precisar utilizar o automóvel.",
          "Perceba que o conceito de conforto deixou de estar exclusivamente dentro do apartamento. Ele passou a abranger toda a experiência de viver.",
        ],
      },
      {
        heading: "De unidade habitacional a ecossistema",
        paragraphs: [
          "Essa talvez seja a maior transformação do mercado imobiliário moderno. O imóvel deixou de ser apenas uma unidade habitacional. Ele passou a integrar um ecossistema.",
          "Esse novo conceito encontra respaldo também em estudos conduzidos pela ONU-Habitat, que identifica um movimento global em direção a cidades mais compactas, sustentáveis e conectadas. O crescimento urbano, segundo o organismo das Nações Unidas, exige empreendimentos capazes de otimizar infraestrutura existente, reduzir deslocamentos e aproximar moradia, trabalho, lazer e serviços.",
          "Na mesma direção, o World Economic Forum aponta que as cidades mais competitivas do futuro serão aquelas capazes de integrar mobilidade, tecnologia, sustentabilidade e qualidade de vida. Não por acaso, o mercado imobiliário tornou-se um dos principais agentes dessa transformação.",
          "É interessante observar que esses estudos não falam apenas sobre urbanismo. Eles falam sobre valor. Porque, em última análise, um imóvel vale aquilo que as pessoas estão dispostas a pagar por ele. E aquilo que as pessoas estão dispostas a pagar depende diretamente da forma como vivem. Quando a sociedade muda, muda também o conceito econômico de valor imobiliário.",
        ],
      },
      {
        heading: "Entender pessoas antes de entender plantas",
        paragraphs: [
          "É exatamente por isso que investidores experientes dedicam tanto tempo para compreender comportamento humano. Antes de analisar plantas, acabamentos ou memorial descritivo, procuram entender para onde caminha a sociedade. Afinal, edifícios permanecem por décadas. Já os hábitos das pessoas podem mudar em poucos anos.",
          "A história mostra que os empreendimentos que melhor atravessam o tempo são justamente aqueles concebidos para responder às necessidades do futuro, e não apenas às demandas do presente.",
        ],
      },
      {
        heading: "Referências",
        isReferences: true,
        paragraphs: [
          "Instituto Brasileiro de Geografia e Estatística (IBGE). Censo Demográfico 2022 – Características dos Domicílios e População.",
          "Instituto Brasileiro de Geografia e Estatística (IBGE). Características Urbanísticas do Entorno dos Domicílios.",
          "Câmara Brasileira da Indústria da Construção (CBIC). Mercado Imobiliário Brasileiro – Relatórios e Indicadores.",
          "Associação Brasileira de Incorporadoras Imobiliárias (ABRAINC). Indicadores do Mercado Imobiliário.",
          "Fundação Getulio Vargas (FGV IBRE). Sondagens da Construção Civil e Indicadores Econômicos.",
          "Instituto de Pesquisa Econômica Aplicada (IPEA). Estudos sobre Urbanização e Desenvolvimento Regional.",
          "ONU-Habitat. World Cities Report.",
          "World Economic Forum. Future of Cities e Smart Cities Framework.",
          "PwC & Urban Land Institute. Emerging Trends in Real Estate.",
          "McKinsey & Company. The Future of Cities e estudos sobre comportamento do consumidor e desenvolvimento urbano.",
        ],
      },
    ],
  },
  {
    slug: "retomada-do-centro-imoveis-compactos",
    title:
      "O Centro voltou a ser protagonista — e os investidores já perceberam",
    category: "Imóveis",
    date: "2026-07-20",
    excerpt:
      "A revitalização das regiões centrais e a procura por imóveis compactos bem localizados são uma tendência estrutural — e o Sync Floriano se encaixa exatamente nesse cenário.",
    coverImage: imoveisCover,
    coverZoom: true,
    readTime: "7 min de leitura",
    heroTagline:
      "A retomada das regiões centrais como tendência estrutural do mercado imobiliário.",
    author: AUTOR_GABRIEL,
    content: [
      {
        paragraphs: [
          "Durante muitos anos, o mercado imobiliário brasileiro concentrou seus lançamentos na expansão horizontal das cidades. Novos bairros surgiam enquanto os centros urbanos, apesar de concentrarem infraestrutura, comércio, universidades e serviços, perdiam espaço na preferência dos incorporadores. Hoje, esse movimento começa a se inverter. As grandes cidades já demonstram que a revitalização das regiões centrais é uma tendência consistente, impulsionada por mudanças demográficas, novas formas de viver e pela busca cada vez maior por mobilidade e praticidade.",
        ],
      },
      {
        heading: "Um movimento estrutural, não uma moda",
        paragraphs: [
          "Essa transformação não acontece por acaso. Segundo dados do IBGE, os domicílios brasileiros estão ficando menores, enquanto cresce continuamente o número de pessoas morando sozinhas, casais sem filhos e famílias reduzidas. Ao mesmo tempo, cresce a procura por imóveis compactos bem localizados, capazes de atender tanto quem deseja morar quanto quem busca renda através de locação tradicional ou por temporada. Em termos econômicos, trata-se de um movimento estrutural, e não apenas de uma moda passageira.",
        ],
      },
      {
        heading: "Santa Maria no centro da tendência",
        paragraphs: [
          "Santa Maria vive exatamente esse momento. Com uma das maiores populações universitárias do sul do Brasil, forte presença militar, intensa atividade na área da saúde e um comércio consolidado, a cidade mantém um fluxo permanente de pessoas chegando para estudar, trabalhar e empreender. Esse comportamento cria uma demanda contínua por imóveis compactos próximos aos principais polos urbanos, especialmente no Centro, onde praticamente toda a infraestrutura da cidade está concentrada.",
        ],
      },
      {
        heading: "Por que o Sync Floriano entra no radar",
        paragraphs: [
          "É justamente nesse contexto que projetos como o Sync Floriano chamam atenção do investidor. Não se trata apenas de um edifício residencial. O empreendimento nasce em um dos endereços mais tradicionais da cidade, na Rua Floriano Peixoto, reunindo proximidade com universidades, hospitais, comércio, transporte público e serviços essenciais, fatores que historicamente sustentam a valorização imobiliária ao longo do tempo.",
          "Outro aspecto que considero relevante é o conceito adotado pelo empreendimento. O mercado não procura mais apenas metragem; procura eficiência. Apartamentos compactos, aliados a uma infraestrutura completa com coworking, academia, lavanderia compartilhada, market, espaços gourmet e áreas de convivência, aumentam significativamente a atratividade do imóvel para moradores e locatários. Essa combinação amplia o público potencial e reduz períodos de vacância, dois fatores fundamentais para quem investe pensando em geração de renda.",
        ],
      },
      {
        heading: "A leitura financeira: liquidez, valorização e renda",
        paragraphs: [
          "Sob a ótica financeira, gosto de analisar investimentos imobiliários observando três pilares: liquidez, potencial de valorização e capacidade de geração de renda. Empreendimentos localizados em regiões consolidadas normalmente apresentam desempenho superior nesses três indicadores quando comparados a projetos desenvolvidos em áreas de expansão ainda dependentes da formação de infraestrutura. O valor do imóvel deixa de depender apenas do empreendimento e passa a ser sustentado também pela própria localização.",
        ],
      },
      {
        heading: "Credibilidade dos desenvolvedores",
        paragraphs: [
          "Outro fator que merece destaque é a credibilidade dos desenvolvedores. No mercado imobiliário, confiança representa um ativo extremamente valioso. O Sync Floriano reúne a experiência construtiva da Zacon Zanini, empresa com mais de 35 anos de atuação em Santa Maria, associada à modelagem financeira e à gestão de investimentos conduzida pela Accione. Para o investidor, essa combinação reduz assimetrias de informação e aumenta a previsibilidade do projeto.",
        ],
      },
      {
        heading: "Um conceito já validado pelo mercado",
        paragraphs: [
          "Também considero relevante observar o comportamento do mercado diante da marca. O primeiro empreendimento Sync apresentou forte velocidade de comercialização, demonstrando que existe demanda para esse tipo de produto. Quando um conceito é validado pelo próprio mercado, diminui-se parte do risco comercial normalmente associado a novos lançamentos. Evidentemente, resultados passados não garantem resultados futuros, mas representam um importante sinal sobre a aceitação do produto.",
        ],
      },
      {
        heading: "Capturar a tendência antes do preço",
        paragraphs: [
          "Na economia, costumamos dizer que bons investimentos são aqueles capazes de capturar tendências antes que elas sejam percebidas pela maioria. A retomada dos centros urbanos, a valorização dos imóveis compactos de alto padrão e a crescente procura por empreendimentos multifuncionais parecem caminhar exatamente nessa direção. Quem entende esses movimentos costuma tomar decisões antes que o mercado incorpore totalmente esse novo cenário aos preços.",
          "Por isso, quando analiso o Sync Floriano sob uma perspectiva exclusivamente de investimento, vejo um empreendimento alinhado a diversas tendências estruturais do mercado imobiliário brasileiro. Localização consolidada, produto aderente às novas demandas habitacionais, infraestrutura completa, parceiros experientes e um conceito que dialoga com o futuro das cidades. Para investidores que procuram ativos reais capazes de combinar potencial de valorização patrimonial com geração de renda, certamente é um projeto que merece estar no radar antes da conclusão das obras.",
        ],
      },
    ],
  },
  {
    slug: "como-analisar-investimentos-alternativos",
    title:
      "Como analisar investimentos alternativos sem cair na armadilha do discurso fácil",
    category: "Investimentos Alternativos",
    date: "2026-04-18",
    excerpt:
      "Uma boa tese alternativa não começa no retorno prometido. Começa em estrutura, garantia, prazo e aderência ao seu patrimônio.",
    coverImage:
      "https://placehold.co/1200x700/041A2A/A26547?text=Investimentos+Alternativos",
    readTime: "5 min de leitura",
    heroTagline: "Leitura crítica para separar narrativa de estrutura.",
    author: AUTOR_GABRIEL,
    draft: true,
    content: [
      {
        paragraphs: [
          "Investimentos alternativos costumam chamar atenção pelo potencial de retorno, mas essa não deveria ser a primeira pergunta do investidor. Antes de olhar para o upside, é preciso entender a estrutura do ativo, a qualidade do lastro e o que sustenta aquele fluxo de caixa ao longo do tempo.",
          "Em operações bem montadas, o prêmio existe porque há complexidade, iliquidez ou necessidade de análise mais profunda. Em operações mal explicadas, o prêmio aparente esconde risco mal precificado. A diferença entre uma coisa e outra está menos no marketing e mais na diligência.",
        ],
      },
      {
        heading: "Quatro filtros simples",
        paragraphs: [
          "Comece por quatro perguntas: qual é a origem do retorno, qual é a garantia, qual é o prazo esperado e o que pode fazer a tese frustrar. Se a operação não responde objetivamente a esses pontos, ela não está pronta para entrar em carteira.",
          "Também vale observar a governança. Quem estrutura, quem acompanha, qual documentação existe e como o investidor recebe informação ao longo do ciclo são elementos centrais para transformar uma oportunidade em uma alocação defensável.",
        ],
      },
    ],
  },
  {
    slug: "credito-privado-com-garantia",
    title:
      "Crédito privado com garantia: o que realmente importa na análise de risco",
    category: "Mercado Financeiro",
    date: "2026-04-10",
    excerpt:
      "Taxa alta não basta. Em crédito privado, o investidor precisa entender a força da garantia, a origem do fluxo e a disciplina do monitoramento.",
    coverImage:
      "https://placehold.co/1200x700/0C2030/A26547?text=Cr%C3%A9dito+Privado",
    readTime: "6 min de leitura",
    heroTagline: "Prêmio só faz sentido quando o risco é legível.",
    author: AUTOR_GABRIEL,
    draft: true,
    content: [
      {
        paragraphs: [
          "Garantia é um termo usado com frequência no mercado, mas nem toda garantia entrega a mesma proteção. Uma boa análise de crédito passa por entender a liquidez do colateral, a execução possível em caso de estresse e a compatibilidade entre valor de cobertura e valor da operação.",
          "Além disso, é preciso avaliar o emissor, o setor e o momento do negócio. Em muitos casos, o que define a qualidade do crédito não é apenas o patrimônio dado em garantia, mas a capacidade recorrente de geração de caixa e o alinhamento entre fluxo do projeto e cronograma de amortização.",
        ],
      },
      {
        heading: "O papel do acompanhamento",
        paragraphs: [
          "Crédito privado não termina no investimento inicial. Monitoramento de covenants, evolução operacional e comunicação ativa com o investidor ajudam a reduzir assimetria e permitem reação mais rápida quando o cenário muda.",
        ],
      },
    ],
  },
  {
    slug: "imoveis-spe-preco-de-custo",
    title:
      "Imóveis via SPE a preço de custo: onde está o ganho e quais são os cuidados",
    category: "Imóveis",
    date: "2026-03-28",
    excerpt:
      "O modelo SPE a preço de custo pode ampliar acesso a empreendimentos bem localizados, desde que a estrutura jurídica e a gestão do projeto sejam transparentes.",
    coverImage:
      "https://placehold.co/1200x700/041A2A/69727D?text=Im%C3%B3veis+SPE",
    readTime: "5 min de leitura",
    heroTagline:
      "Estrutura societária importa tanto quanto localização e produto.",
    author: AUTOR_GABRIEL,
    draft: true,
    content: [
      {
        paragraphs: [
          "O investimento imobiliário via SPE a preço de custo chama atenção por permitir entrada em projetos reais com tickets mais acessíveis. O racional econômico está no compartilhamento de custos e na captura de valor ao longo do desenvolvimento e da entrega do empreendimento.",
          "Mas o modelo só faz sentido quando o investidor entende quem constrói, quem gere, como funciona a governança e de que forma o patrimônio da SPE permanece segregado. Sem essa clareza, o benefício de entrada pode ser comprometido por risco operacional mal tratado.",
        ],
      },
      {
        heading: "Os cuidados centrais",
        paragraphs: [
          "Olhe para cronograma, orçamento, reputação dos parceiros, documentação societária e transparência da comunicação. Em imóveis estruturados, confiança não deve depender de promessa. Deve depender de contrato, processo e acompanhamento.",
        ],
      },
    ],
  },
  {
    slug: "agronegocio-e-diversificacao-patrimonial",
    title:
      "Agronegócio e diversificação patrimonial: quando faz sentido olhar para a tese",
    category: "Agronegócio",
    date: "2026-03-15",
    excerpt:
      "A tese do agro pode trazer proteção e prêmio interessante, mas exige leitura sobre garantia, ciclo produtivo e exposição climática.",
    coverImage:
      "https://placehold.co/1200x700/0C2030/8A9F72?text=Agroneg%C3%B3cio",
    readTime: "4 min de leitura",
    heroTagline: "Uma tese real precisa ser entendida além do headline.",
    author: AUTOR_GABRIEL,
    draft: true,
    content: [
      {
        paragraphs: [
          "Operações ligadas ao agronegócio podem complementar carteiras com uma dinâmica econômica própria e bastante relevante no país. O apelo é real, mas a análise precisa considerar ciclo produtivo, qualidade da contraparte, seguro, garantias e sensibilidade a eventos climáticos.",
          "Ao investir no setor, o ideal é buscar estruturas em que o fluxo e os gatilhos de risco estejam bem definidos. O investidor não precisa dominar a cadeia do agro em profundidade, mas precisa entender exatamente o que financia, quem executa e como o capital retorna.",
        ],
      },
    ],
  },
];

/** Artigos publicados — usados no blog, nas URLs diretas e no sitemap. */
export const BLOG_POSTS: BlogPost[] = TODOS_OS_POSTS.filter(
  (post) => !post.draft,
);
