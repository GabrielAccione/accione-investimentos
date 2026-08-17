import { useState, useEffect, useCallback } from "react";
import { useParams, Link } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import {
  MapPin,
  Wallet,
  Shield,
  TrendingUp,
  Zap,
  ChevronLeft,
  ChevronRight,
  X,
  HelpCircle,
  CheckCircle,
} from "lucide-react";
import WhatsAppButton from "@/components/ui/WhatsAppButton";
import CoverImage from "@/components/ui/CoverImage";
import { SITE_URL, useSeo } from "@/hooks/useSeo";
import {
  EMPREENDIMENTOS,
  type EmpreendimentoData,
  type GalleryItem,
  type Destaque,
} from "@/data/empreendimentos";

/** Meta description tem limite prático de ~160 caracteres nos buscadores. */
function truncate(text: string, max = 155) {
  return text.length > max ? `${text.slice(0, max).trimEnd()}…` : text;
}

/* ─── Sub-components ─────────────────────────────────────────── */

function StatusBadge({
  status,
  label,
}: {
  status: EmpreendimentoData["status"];
  label: string;
}) {
  const color = status === "em-captacao" ? "bg-[#25D366]" : "bg-[#69727D]";
  return (
    <span
      className={`${color} text-white text-xs font-semibold px-4 py-1.5 rounded-full`}
    >
      {label}
    </span>
  );
}

const HIGHLIGHTS = [
  {
    icon: Wallet,
    title: "Acessível",
    description:
      "Invista com menor capital do que a compra direta de um imóvel, tornando-se sócio da SPE.",
  },
  {
    icon: Shield,
    title: "Seguro",
    description:
      "Patrimônio segregado em SPE própria, com gestão auditada, totalmente transparente.",
  },
  {
    icon: TrendingUp,
    title: "Rentável",
    description:
      "Retorno acima do convencional. Grupo de investidores participa do negócio na origem.",
  },
  {
    icon: Zap,
    title: "Ágil",
    description:
      "Processo digital simplificado: contratos, relatórios e comunicação por WhatsApp, e-mail e sistemas apropriados.",
  },
];

const SPE_CARDS = [
  {
    icon: HelpCircle,
    title: "O que é SPE",
    description:
      "Sociedade de Propósito Específico é uma empresa criada para um único propósito, que é a construção do empreendimento. Cada investidor se torna sócio do negócio, com cotas ou ações proporcionais aos seus aportes de recursos financeiros, com direitos reconhecidos em instrumentos legais e transparentes.",
  },
  {
    icon: Shield,
    title: "Por que é seguro",
    description:
      "O patrimônio da SPE é separado do patrimônio da construtora e da gestora, que são contratadas para administrar a construção do empreendimento. Em caso de problemas em outras operações, os recursos dos investidores/sócios permanecem protegidos e vinculados apenas a este projeto.",
  },
  {
    icon: CheckCircle,
    title: "Como participar",
    description:
      "Entre em contato com a gestora ou construtora, conheça os detalhes do negócio e entre para o grupo de investidores. O acompanhamento da obra e dos resultados é feito rotineiramente por relatórios, comunicados e outros instrumentos apropriados a cada atividade, tudo à luz da legislação e com boas práticas de mercado.",
  },
];

/* ─── Lightbox ───────────────────────────────────────────────── */

function Lightbox({
  images,
  initial,
  onClose,
}: {
  images: GalleryItem[];
  initial: number;
  onClose: () => void;
}) {
  const [current, setCurrent] = useState(initial);

  const prev = useCallback(
    () => setCurrent((c) => (c - 1 + images.length) % images.length),
    [images.length],
  );
  const next = useCallback(
    () => setCurrent((c) => (c + 1) % images.length),
    [images.length],
  );

  useEffect(() => {
    function onKey(e: KeyboardEvent) {
      if (e.key === "Escape") onClose();
      if (e.key === "ArrowLeft") prev();
      if (e.key === "ArrowRight") next();
    }
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [onClose, prev, next]);

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 z-[100] bg-black/90 flex items-center justify-center p-4"
      onClick={onClose}
    >
      <motion.div
        initial={{ scale: 0.9, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        exit={{ scale: 0.9, opacity: 0 }}
        transition={{ duration: 0.2 }}
        className="relative max-w-4xl w-full"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="relative">
          <img
            src={images[current].src}
            alt={images[current].alt}
            className="w-full rounded-xl"
          />
          {images[current].alt && (
            <div className="absolute bottom-0 inset-x-0 rounded-b-xl bg-black/60 px-4 py-2.5">
              <p className="text-center text-sm text-white/90">
                {images[current].alt}
              </p>
            </div>
          )}
        </div>

        {/* Controls */}
        <button
          onClick={onClose}
          className="absolute -top-10 right-0 text-white/70 hover:text-white transition-colors"
          aria-label="Fechar"
        >
          <X size={28} />
        </button>
        <button
          onClick={prev}
          className="absolute left-3 top-1/2 -translate-y-1/2 bg-black/50 hover:bg-black/70 text-white rounded-full p-2 transition-colors"
          aria-label="Anterior"
        >
          <ChevronLeft size={24} />
        </button>
        <button
          onClick={next}
          className="absolute right-3 top-1/2 -translate-y-1/2 bg-black/50 hover:bg-black/70 text-white rounded-full p-2 transition-colors"
          aria-label="Próxima"
        >
          <ChevronRight size={24} />
        </button>

        <p className="text-center text-[var(--text-muted)] text-sm mt-3">
          {current + 1} / {images.length}
        </p>
      </motion.div>
    </motion.div>
  );
}

/* ─── Main Page ──────────────────────────────────────────────── */

export default function EmpreendimentoDetalhe() {
  const { slug } = useParams<{ slug: string }>();
  const empreendimento = EMPREENDIMENTOS.find((e) => e.slug === slug);
  const [lightboxIndex, setLightboxIndex] = useState<number | null>(null);

  useSeo({
    title: empreendimento
      ? `${empreendimento.name} — Santa Maria/RS`
      : "Empreendimento não encontrado",
    description: empreendimento
      ? truncate(empreendimento.shortDescription)
      : "O empreendimento que você procura não existe ou foi removido.",
    path: `/empreendimentos/${slug ?? ""}`,
    image: empreendimento
      ? `${SITE_URL}${empreendimento.coverImage}`
      : undefined,
    noIndex: !empreendimento,
  });

  if (!empreendimento) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center bg-[var(--bg-primary)] pt-16 text-center px-4">
        <h1 className="font-display text-4xl font-bold text-[#041A2A] dark:text-white mb-4">
          Empreendimento não encontrado
        </h1>
        <p className="text-[var(--text-secondary)] mb-8">
          O empreendimento que você procura não existe ou foi removido.
        </p>
        <Link to="/empreendimentos" className="btn-accent">
          Ver todos os empreendimentos
        </Link>
      </div>
    );
  }

  const {
    name,
    status,
    statusLabel,
    location,
    mapQuery,
    fullDescription,
    parceria,
    coverImage,
    coverPosition,
    fachadaImage,
    gallery,
    destaques,
    fichaTecnica,
    pontosDeInteresse,
  } = empreendimento;

  const mapSrc = `https://maps.google.com/maps?q=${encodeURIComponent(
    mapQuery ?? location,
  )}&z=16&output=embed`;

  return (
    <>
      {/* ── 1. Hero ───────────────────────────────────────────── */}
      <section className="relative h-[80vh] min-h-[480px] flex items-end overflow-hidden">
        <img
          src={coverImage}
          alt={name}
          className="absolute inset-0 w-full h-full object-cover"
          style={{ objectPosition: coverPosition }}
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-black/20" />

        <div className="section-container relative z-10 pb-14 pt-20">
          <motion.div
            initial={{ opacity: 0, y: 32 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7 }}
          >
            <div className="mb-4 flex flex-wrap items-center gap-3">
              <StatusBadge status={status} label={statusLabel} />
            </div>
            <h1 className="font-display text-3xl sm:text-4xl lg:text-5xl font-bold text-white leading-tight mb-6">
              {name}
            </h1>
            <div className="flex items-center gap-2 text-white/70 text-sm mb-8">
              <MapPin size={15} className="text-[var(--accent)]" />
              <span>{location}</span>
            </div>
            {status === "captacao-encerrada" ? (
              <WhatsAppButton
                mensagem={`Olá! Tenho interesse em entrar na lista de espera do ${name}.`}
                label="Lista de espera"
                size="lg"
              />
            ) : (
              <WhatsAppButton
                mensagem={`Olá! Tenho interesse no empreendimento ${name}. Pode me enviar o material completo?`}
                label="Quero investir"
                size="lg"
              />
            )}
          </motion.div>
        </div>
      </section>

      {/* ── 2. Fachada + Descrição ───────────────────────────── */}
      <section className="overflow-hidden py-20">
        <div className="section-container grid grid-cols-1 items-center gap-12 lg:grid-cols-2">
          {/* Coluna esquerda — descrição + destaques */}
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <span className="text-[var(--accent)] text-sm font-medium uppercase tracking-widest">
              O Projeto
            </span>
            <h2 className="font-display text-3xl md:text-4xl font-bold text-[#041A2A] dark:text-white mt-3 mb-5">
              {name}
            </h2>
            <p className="text-[var(--text-secondary)] leading-relaxed text-base">
              {fullDescription}
            </p>
            <p className="mt-4 text-xs text-white/60">
              Em parceria com{" "}
              <span className="text-[#041A2A] dark:text-white">
                {parceria}
              </span>
            </p>

            <div className="mt-8 grid grid-cols-2 gap-4">
              {destaques.map((d: Destaque) => (
                <div
                  key={d.label}
                  className="rounded-xl border border-[#E5E5E5] bg-[#0C2030] p-4 dark:border-white/10"
                >
                  <span className="text-[var(--accent)] font-bold text-lg leading-tight">
                    {d.label}
                  </span>
                  <p className="mt-1 text-lg font-semibold leading-tight text-[#041A2A] dark:text-white">
                    {d.valor}
                  </p>
                </div>
              ))}
            </div>
          </motion.div>

          {/* Coluna direita — imagem de fachada */}
          {fachadaImage && (
            <motion.div
              initial={{ opacity: 0, x: 32 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.65, delay: 0.1 }}
              className="relative"
            >
              <CoverImage
                src={fachadaImage.src}
                alt={fachadaImage.alt}
                aspect="3/4"
                objectPosition={fachadaImage.objectPosition}
                className="rounded-2xl shadow-2xl shadow-black/50"
              />
              <div className="absolute -bottom-3 -right-3 h-full w-full rounded-2xl border border-[var(--accent)]/30 -z-10" />
            </motion.div>
          )}
        </div>
      </section>

      <div className="section-divider" />

      {/* ── 3. Destaques ─────────────────────────────────────── */}
      <section className="py-20">
        <div className="section-container">
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-center mb-14"
          >
            <span className="text-[var(--accent)] text-sm font-medium uppercase tracking-widest">
              Por que investir
            </span>
            <h2 className="font-display text-3xl md:text-4xl font-bold text-[#041A2A] dark:text-white mt-3">
              Diferenciais do investimento
            </h2>
          </motion.div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {HIGHLIGHTS.map((h, i) => {
              const Icon = h.icon;
              return (
                <motion.div
                  key={h.title}
                  initial={{ opacity: 0, y: 28 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: i * 0.1 }}
                  className="rounded-xl border border-[#484949]/20 hover:border-[#A26547]/40 bg-[#0C2030] p-6 transition-colors duration-300 hover:shadow-[0_8px_32px_rgba(162,101,71,0.08)]"
                >
                  <div className="w-12 h-12 rounded-lg bg-[#A26547]/10 flex items-center justify-center mb-4">
                    <Icon size={22} className="text-[var(--accent)]" />
                  </div>
                  <h3 className="font-semibold text-[#041A2A] dark:text-white text-base mb-2">
                    {h.title}
                  </h3>
                  <p className="text-[var(--text-muted)] dark:text-white text-sm leading-relaxed">
                    {h.description}
                  </p>
                </motion.div>
              );
            })}
          </div>
        </div>
      </section>

      <div className="section-divider" />

      {/* ── 4. Galeria ───────────────────────────────────────── */}
      <section className="py-20">
        <div className="section-container">
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-center mb-12"
          >
            <span className="text-[var(--accent)] text-sm font-medium uppercase tracking-widest">
              Imagens
            </span>
            <h2 className="font-display text-3xl md:text-4xl font-bold text-[#041A2A] dark:text-white mt-3">
              Galeria
            </h2>
            <p className="text-[var(--text-muted)] dark:text-white text-sm mt-2">
              Clique em uma imagem para ampliar
            </p>
          </motion.div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {gallery.map((item, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, scale: 0.96 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: i * 0.07 }}
              >
                <button
                  type="button"
                  onClick={() => setLightboxIndex(i)}
                  className="w-full rounded-xl overflow-hidden focus:outline-none focus:ring-2 focus:ring-[var(--accent)] group"
                >
                  <img
                    src={item.src}
                    alt={item.alt}
                    className="w-full h-52 object-cover transition-transform duration-300 group-hover:scale-105"
                  />
                </button>
                {item.alt && (
                  <p className="mt-1.5 text-center text-xs text-[var(--text-muted)] dark:text-white">
                    {item.alt}
                  </p>
                )}
              </motion.div>
            ))}
          </div>

          {status === "em-breve" && (
            <p className="mt-6 text-center text-sm text-[var(--text-muted)] dark:text-white">
              Mais detalhes e imagens em breve. Cadastre seu interesse abaixo.
            </p>
          )}
        </div>
      </section>

      <AnimatePresence>
        {lightboxIndex !== null && (
          <Lightbox
            images={gallery}
            initial={lightboxIndex}
            onClose={() => setLightboxIndex(null)}
          />
        )}
      </AnimatePresence>

      <div className="section-divider" />

      {/* ── 5. Ficha Técnica ─────────────────────────────────── */}
      <section className="py-20">
        <div className="section-container max-w-3xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-center mb-12"
          >
            <span className="text-[var(--accent)] text-sm font-medium uppercase tracking-widest">
              Dados do projeto
            </span>
            <h2 className="font-display text-3xl md:text-4xl font-bold text-[#041A2A] dark:text-white mt-3">
              Ficha Técnica
            </h2>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="rounded-xl border border-[#A26547]/20 bg-[#0C2030] overflow-hidden"
          >
            {[
              { label: "Gestora", value: fichaTecnica.gestora },
              { label: "Construtora", value: fichaTecnica.construtora },
              { label: "Modelo de negócio", value: fichaTecnica.modelo },
              { label: "Localização", value: fichaTecnica.localizacao },
              {
                label: "Tipologias disponíveis",
                value: fichaTecnica.tipologias,
              },
              { label: "Pavimentos", value: fichaTecnica.pavimentos },
              { label: "Total de unidades", value: fichaTecnica.totalUnidades },
            ].map((row, i) => (
              <div
                key={row.label}
                className={`flex flex-col sm:flex-row sm:items-center gap-1 sm:gap-4 px-6 py-4 ${
                  i % 2 === 0 ? "bg-white/[0.03]" : "bg-transparent"
                } border-b border-[#484949]/20 last:border-b-0`}
              >
                <span className="text-white text-xs font-medium uppercase tracking-wider sm:w-48 shrink-0">
                  {row.label}
                </span>
                <span className="text-[#041A2A] dark:text-white text-sm">
                  {row.value}
                </span>
              </div>
            ))}
          </motion.div>
        </div>
      </section>

      <div className="section-divider" />

      {/* ── 6. Modelo SPE ────────────────────────────────────── */}
      <section className="py-20">
        <div className="section-container">
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-center mb-14"
          >
            <span className="text-[var(--accent)] text-sm font-medium uppercase tracking-widest">
              Como funciona
            </span>
            <h2 className="font-display text-3xl md:text-4xl font-bold text-[#041A2A] dark:text-white mt-3">
              Modelo de Investimento — SPE a preço de custo
            </h2>
            <p className="text-[var(--text-secondary)] mt-4 max-w-2xl mx-auto text-sm leading-relaxed">
              A Sociedade de Propósito Específico é o modelo mais seguro e
              transparente para investimentos imobiliários coletivos no Brasil.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
            {SPE_CARDS.map((card, i) => {
              const Icon = card.icon;
              return (
                <motion.div
                  key={card.title}
                  initial={{ opacity: 0, y: 28 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: i * 0.12 }}
                  className="rounded-xl border border-[#484949]/20 bg-[#0C2030] p-6"
                >
                  <div className="w-12 h-12 rounded-lg bg-[#A26547]/10 flex items-center justify-center mb-4">
                    <Icon size={22} className="text-[var(--accent)]" />
                  </div>
                  <h3 className="font-semibold text-[#041A2A] dark:text-white text-base mb-3">
                    {card.title}
                  </h3>
                  <p className="text-white/80 text-sm leading-relaxed">
                    {card.description}
                  </p>
                </motion.div>
              );
            })}
          </div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="text-center"
          >
            <div className="flex flex-wrap justify-center gap-4">
              {status === "captacao-encerrada" ? (
                <WhatsAppButton
                  mensagem={`Olá! Tenho interesse em entrar na lista de espera do ${name}.`}
                  label="Entrar na lista de espera"
                  size="lg"
                />
              ) : (
                <>
                  <WhatsAppButton
                    mensagem={`Olá! Tenho interesse no empreendimento ${name}. Pode me enviar o material completo?`}
                    label="Quero investir"
                    size="lg"
                  />
                  <WhatsAppButton
                    mensagem={`Olá! Gostaria de receber o material completo sobre o ${name}.`}
                    label="Receber material completo"
                    size="lg"
                    className="border border-[#25D366]/40 bg-transparent hover:bg-[#25D366] text-[#25D366] hover:text-white"
                  />
                </>
              )}
            </div>
          </motion.div>
        </div>
      </section>

      <div className="section-divider" />

      {/* ── 7. Localização ───────────────────────────────────── */}
      <section className="py-20">
        <div className="section-container">
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-center mb-12"
          >
            <span className="text-[var(--accent)] text-sm font-medium uppercase tracking-widest">
              Onde fica
            </span>
            <h2 className="font-display text-3xl md:text-4xl font-bold text-[#041A2A] dark:text-white mt-3">
              Localização
            </h2>
          </motion.div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-start">
            {/* Map placeholder */}
            <motion.div
              initial={{ opacity: 0, x: -24 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="lg:col-span-2 rounded-xl overflow-hidden border border-[#484949]/20 bg-[var(--bg-primary)] h-72"
            >
              <iframe
                title={`Mapa — ${name}`}
                src={mapSrc}
                className="w-full h-full"
                style={{ border: 0 }}
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                allowFullScreen
              />
            </motion.div>

            {/* Points of interest */}
            <motion.div
              initial={{ opacity: 0, x: 24 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.1 }}
              className="rounded-xl border border-[#484949]/20 bg-[#0C2030] p-6"
            >
              <h3 className="font-semibold text-[#041A2A] dark:text-white text-sm uppercase tracking-wider mb-5">
                Pontos de interesse
              </h3>
              <ul className="flex flex-col gap-3">
                {pontosDeInteresse.map((poi) => (
                  <li
                    key={poi}
                    className="flex items-start gap-2 text-sm text-white/85"
                  >
                    <MapPin
                      size={14}
                      className="mt-0.5 shrink-0 text-[var(--accent)]"
                    />
                    {poi}
                  </li>
                ))}
              </ul>
            </motion.div>
          </div>
        </div>
      </section>

      {/* ── 8. CTA final ─────────────────────────────────────── */}
      <section className="hero-gradient py-20 sm:py-24">
        <div className="section-container text-center">
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            {status === "captacao-encerrada" ? (
              <>
                <h2 className="font-display text-3xl font-bold text-[#041A2A] dark:text-white sm:text-4xl">
                  A captação do {name} está encerrada.
                </h2>
                <p className="mx-auto mt-4 max-w-2xl text-[var(--text-secondary)]">
                  Entre na lista de espera e seja avisado assim que abrirmos o
                  próximo empreendimento.
                </p>
                <div className="mt-8 flex justify-center">
                  <WhatsAppButton
                    mensagem={`Olá! Tenho interesse em entrar na lista de espera do ${name}.`}
                    label="Entrar na lista de espera"
                    size="lg"
                  />
                </div>
              </>
            ) : (
              <>
                <h2 className="font-display text-3xl font-bold text-[#041A2A] dark:text-white sm:text-4xl">
                  Quer participar do {name}?
                </h2>
                <p className="mx-auto mt-4 max-w-2xl text-[var(--text-secondary)]">
                  Fale com a Accione e receba o material completo: estrutura da
                  SPE, cronograma de aportes e condições de participação.
                </p>
                <div className="mt-8 flex flex-wrap justify-center gap-4">
                  <WhatsAppButton
                    mensagem={`Olá! Tenho interesse no empreendimento ${name}. Pode me enviar o material completo?`}
                    label="Quero investir"
                    size="lg"
                  />
                  <WhatsAppButton
                    mensagem={`Olá! Gostaria de receber o material completo sobre o ${name}.`}
                    label="Receber material completo"
                    size="lg"
                    className="border border-[#25D366]/40 bg-transparent hover:bg-[#25D366] text-[#25D366] hover:text-white"
                  />
                </div>
              </>
            )}
          </motion.div>
        </div>
      </section>
    </>
  );
}
