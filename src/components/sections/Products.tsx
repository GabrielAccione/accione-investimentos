import { useState } from 'react'
import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import { CheckCircle2 } from 'lucide-react'
import SectionHeading from '@/components/ui/SectionHeading'
import WhatsAppButton from '@/components/ui/WhatsAppButton'
import { PRODUCTS } from '@/data/products'

interface ProductsProps {
  variant?: 'home' | 'page'
}

export default function Products({ variant = 'home' }: ProductsProps) {
  const [activeTab, setActiveTab] = useState(0)
  const product = PRODUCTS[activeTab]
  const Icon = product.icon

  return (
    <section
      id={variant === 'home' ? 'produtos' : undefined}
      className="bg-[var(--bg-secondary)] py-20 sm:py-24"
    >
      <div className="section-container">
        <SectionHeading
          eyebrow="Investimentos"
          title={variant === 'home' ? 'Teses selecionadas para diversificar com intenção.' : 'Ativos judiciais e crédito privado em leitura estruturada.'}
          description={
            variant === 'home'
              ? 'Dois blocos centrais da atuação da Accione, com racional claro de retorno, risco e acompanhamento.'
              : 'A Accione estrutura oportunidades com originação, diligência e comunicação objetiva para investidores que buscam alternativas fora da prateleira tradicional.'
          }
          align="left"
        />

        <div className="mt-10 grid gap-4 lg:grid-cols-[320px_minmax(0,1fr)]">
          <div className="space-y-4">
            {PRODUCTS.map((item, index) => {
              const ProductIcon = item.icon
              const isActive = activeTab === index

              return (
                <button
                  key={item.slug}
                  type="button"
                  onClick={() => setActiveTab(index)}
                  className={`w-full rounded-[24px] border p-5 text-left transition-colors duration-300 ${
                    isActive
                      ? 'border-[var(--accent)]/45 bg-[var(--accent)]/12'
                      : 'border-[#E5E5E5] bg-white hover:border-[var(--accent)]/25 dark:border-white/10 dark:bg-white/[0.03] dark:hover:border-white/20'
                  }`}
                >
                  <div className="flex items-start gap-4">
                    <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl bg-[var(--accent)]/12 text-[var(--accent)] dark:bg-white/5">
                      <ProductIcon size={22} />
                    </div>
                    <div>
                      <p className="text-2xl font-semibold text-[var(--text-primary)]">{item.title}</p>
                      <p className="mt-2 text-sm leading-relaxed text-[var(--text-secondary)]">
                        {item.summary}
                      </p>
                    </div>
                  </div>
                </button>
              )
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
                  {product.tag ? <span className="section-tag">{product.tag}</span> : null}
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
                    <li key={feature} className="flex items-start gap-3 text-sm text-[var(--text-secondary)]">
                      <CheckCircle2 size={18} className="mt-0.5 shrink-0 text-[var(--accent)]" />
                      <span>{feature}</span>
                    </li>
                  ))}
                </ul>

                <div className="mt-8 flex flex-wrap gap-4">
                  <WhatsAppButton
                    mensagem={`Olá! Tenho interesse em saber mais sobre ${product.title}.`}
                    label="Saber mais pelo WhatsApp"
                  />
                  <WhatsAppButton
                    mensagem={`Olá! Gostaria de receber o material completo sobre ${product.title}.`}
                    label="Receber material completo"
                    size="sm"
                    className="border border-[#25D366]/40 bg-transparent hover:bg-[#25D366] text-[#25D366] hover:text-white"
                  />
                  {variant === 'home' ? (
                    <Link to="/investimentos" className="btn-ghost">
                      Ver detalhes da página
                    </Link>
                  ) : null}
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
      </div>
    </section>
  )
}
