import { useState } from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { CheckCircle2 } from "lucide-react";
import SectionHeading from "@/components/ui/SectionHeading";
import WhatsAppButton from "@/components/ui/WhatsAppButton";
import { PRODUCTS } from "@/data/products";

interface ProductsProps {
  variant?: "home" | "page";
}

export default function Products({ variant = "home" }: ProductsProps) {
  const [activeTab, setActiveTab] = useState(0);
  const product = PRODUCTS[activeTab];
  const Icon = product.icon;

  return (
    <section
      id={variant === "home" ? "produtos" : undefined}
      className="py-20 sm:py-24"
    >
      <div className="section-container">
        <SectionHeading
          eyebrow="Investimentos Financeiros"
          title={
            variant === "home"
              ? "Teses selecionadas para diversificar com  eficácia."
              : "Ativos judiciais e crédito privado em leitura estruturada."
          }
          description={
            variant === "home"
              ? "Dois blocos centrais da atuação da Accione, com racional claro de retorno, risco e acompanhamento."
              : "A Accione estrutura oportunidades com originação, diligência e comunicação objetiva para investidores que buscam alternativas fora da prateleira tradicional."
          }
          align="left"
        />

        {variant === "home" ? (
          <div className="mt-10 grid gap-6 lg:grid-cols-2">
            {PRODUCTS.map((item, index) => {
              const ProductIcon = item.icon;

              return (
                <motion.article
                  key={item.slug}
                  initial={{ opacity: 0, y: 24 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, amount: 0.2 }}
                  transition={{ duration: 0.45, delay: index * 0.08 }}
                  className="surface-card flex flex-col p-6 sm:p-8"
                >
                  <div className="flex flex-wrap items-center gap-3">
                    <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl bg-[var(--accent)]/12 text-[var(--accent)] dark:bg-white/5">
                      <ProductIcon size={22} />
                    </div>
                    {item.tag ? (
                      <span className="section-tag">{item.tag}</span>
                    ) : null}
                    {item.stats?.map((stat) => (
                      <span
                        key={stat.label}
                        className="rounded-full border border-[#E5E5E5] px-3 py-1 text-xs uppercase tracking-[0.16em] text-[var(--text-muted)] dark:border-white/10"
                      >
                        {stat.label}: {stat.value}
                      </span>
                    ))}
                  </div>

                  <h3 className="mt-5 text-3xl font-semibold text-[var(--text-primary)]">
                    {item.title}
                    {item.subtitle ? (
                      <span className="mt-1 block text-base font-normal text-[var(--text-muted)]">
                        {item.subtitle}
                      </span>
                    ) : null}
                  </h3>
                  <p className="mt-4 text-base leading-relaxed text-[var(--text-secondary)]">
                    {item.description}
                  </p>

                  <ul className="mt-6 grid gap-3">
                    {item.features.map((feature) => (
                      <li
                        key={feature}
                        className="flex items-start gap-3 text-sm text-[var(--text-secondary)]"
                      >
                        <CheckCircle2
                          size={18}
                          className="mt-0.5 shrink-0 text-[var(--accent)]"
                        />
                        <span>{feature}</span>
                      </li>
                    ))}
                  </ul>

                  <div className="mt-auto flex flex-wrap gap-4 pt-8">
                    <WhatsAppButton
                      mensagem={`Olá! Tenho interesse em saber mais sobre ${item.title}.`}
                      label="Saber mais pelo WhatsApp"
                    />
                    <Link to={`/investimentos/${item.slug}`} className="btn-ghost">
                      Ver detalhes
                    </Link>
                  </div>
                </motion.article>
              );
            })}
          </div>
        ) : (
          <div className="mt-10 grid gap-4 lg:grid-cols-[320px_minmax(0,1fr)]">
            <div className="space-y-4">
              {PRODUCTS.map((item, index) => {
                const ProductIcon = item.icon;
                const isActive = activeTab === index;

                return (
                  <button
                    key={item.slug}
                    type="button"
                    onClick={() => setActiveTab(index)}
                    className={`w-full rounded-[24px] border p-5 text-left transition-colors duration-300 ${
                      isActive
                        ? "border-[var(--accent)]/45 bg-[var(--accent)]/12"
                        : "border-[#E5E5E5] bg-white hover:border-[var(--accent)]/25 dark:border-white/10 dark:bg-white/[0.03] dark:hover:border-white/20"
                    }`}
                  >
                    <div className="flex items-start gap-4">
                      <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl bg-[var(--accent)]/12 text-[var(--accent)] dark:bg-white/5">
                        <ProductIcon size={22} />
                      </div>
                      <div>
                        <p className="text-2xl font-semibold text-[var(--text-primary)]">
                          {item.title}
                        </p>
                        <p className="mt-2 text-sm leading-relaxed text-[var(--text-secondary)]">
                          {item.summary}
                        </p>
                      </div>
                    </div>
                  </button>
                );
              })}
            </div>

            <motion.article
              key={product.slug}
              initial={{ opacity: 0, y: 24 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.35 }}
              className="surface-card overflow-hidden p-6 sm:p-8"
            >
              <div className="grid gap-10 lg:grid-cols-[minmax(0,1fr)_220px]">
                <div>
                  <div className="flex flex-wrap items-center gap-3">
                    {product.tag ? (
                      <span className="section-tag">{product.tag}</span>
                    ) : null}
                    {product.stats?.map((stat) => (
                      <span
                        key={stat.label}
                        className="rounded-full border border-[#E5E5E5] px-3 py-1 text-xs uppercase tracking-[0.16em] text-[var(--text-muted)] dark:border-white/10"
                      >
                        {stat.label}: {stat.value}
                      </span>
                    ))}
                  </div>

                  <h3 className="mt-5 text-4xl font-semibold text-[var(--text-primary)]">
                    {product.title}
                    {product.subtitle ? (
                      <span className="block text-lg font-normal text-[var(--text-muted)] mt-1">
                        {product.subtitle}
                      </span>
                    ) : null}
                  </h3>
                  <p className="mt-4 max-w-3xl text-base leading-relaxed text-[var(--text-secondary)]">
                    {product.description}
                  </p>

                  <ul className="mt-6 grid gap-3 sm:grid-cols-2">
                    {product.features.map((feature) => (
                      <li
                        key={feature}
                        className="flex items-start gap-3 text-sm text-[var(--text-secondary)]"
                      >
                        <CheckCircle2
                          size={18}
                          className="mt-0.5 shrink-0 text-[var(--accent)]"
                        />
                        <span>{feature}</span>
                      </li>
                    ))}
                  </ul>

                  <div className="mt-8 flex flex-wrap gap-4">
                    <WhatsAppButton
                      mensagem={`Olá! Tenho interesse em saber mais sobre ${product.title}.`}
                      label="Saber mais pelo WhatsApp"
                    />
                  </div>
                </div>

                <div className="hidden lg:flex lg:items-center lg:justify-center">
                  <div className="flex h-56 w-56 items-center justify-center rounded-[32px] border border-[var(--accent)]/20 bg-gradient-to-br from-[var(--accent)]/20 to-transparent text-[var(--accent)]">
                    <Icon size={110} strokeWidth={1.2} />
                  </div>
                </div>
              </div>
            </motion.article>
          </div>
        )}
      </div>
    </section>
  );
}
