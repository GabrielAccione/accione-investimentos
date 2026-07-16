import { Clock, Mail, MapPin, Phone } from 'lucide-react'
import { motion } from 'framer-motion'
import WhatsAppButton from '@/components/ui/WhatsAppButton'
import { SITE_CONFIG } from '@/config/site'

const INFO_ITEMS = [
  { icon: Phone, label: 'WhatsApp', value: SITE_CONFIG.whatsappDisplay },
  { icon: Mail, label: 'E-mail', value: SITE_CONFIG.email },
  { icon: Clock, label: 'Horário', value: 'Atendimento com horário marcado' },
  { icon: MapPin, label: 'Localização', value: 'Santa Maria, RS — Brasil' },
]

export default function ContatoPage() {
  return (
    <section className="relative min-h-screen overflow-hidden pt-24">
      {/* Background blobs */}
      <div className="pointer-events-none absolute left-[12%] top-32 h-64 w-64 rounded-full bg-[var(--accent)]/10 blur-3xl" />
      <div className="pointer-events-none absolute bottom-24 right-[10%] h-56 w-56 rounded-full bg-white/5 blur-3xl" />

      <div className="section-container relative z-10 py-16">
        {/* Header centralizado */}
        <div className="text-center">
          <motion.span
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="section-tag"
          >
            Contato
          </motion.span>

          <motion.h1
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.55, delay: 0.06 }}
            className="mx-auto mt-5 max-w-2xl text-3xl font-semibold leading-tight text-[var(--text-primary)] sm:text-4xl lg:text-5xl"
          >
            Entre em contato
          </motion.h1>
        </div>

        {/* Card único — conteúdo à esquerda */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.16 }}
          className="surface-card mx-auto mt-10 w-full max-w-2xl p-6 text-left sm:p-8"
        >
          {/* Aviso */}
          <div
            className="rounded-xl py-3 px-4 text-center border border-[#A26547]/20"
            style={{ background: 'rgba(162, 101, 71, 0.08)' }}
          >
            <p className="text-sm leading-relaxed text-[#484949] dark:text-[#69727D] text-center w-full font-medium">
              ⚠️ Nosso atendimento é realizado exclusivamente com horário marcado.
            </p>
          </div>

          {/* Botões — centralizados */}
          <div className="mt-6 flex flex-col gap-4 sm:flex-row justify-center items-center">
            <WhatsAppButton
              mensagem="Olá! Gostaria de agendar um horário com a Accione Investimentos."
              label="Falar com um especialista"
              size="sm"
            />
            <a
              href={`mailto:${SITE_CONFIG.email}`}
              className="btn-ghost inline-flex items-center justify-center gap-2 text-sm whitespace-nowrap"
            >
              <Mail className="h-4 w-4 shrink-0" />
              <span>{SITE_CONFIG.email}</span>
            </a>
          </div>

          {/* Infos */}
          <div className="mt-8 grid grid-cols-1 gap-5 border-t border-[#484949]/15 pt-6 sm:grid-cols-2">
            {INFO_ITEMS.map(({ icon: Icon, label, value }) => (
              <div key={label} className="flex items-start gap-3">
                <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-[var(--accent)]/12 text-[var(--accent)]">
                  <Icon size={17} />
                </div>
                <div>
                  <p className="text-xs font-semibold uppercase tracking-[0.16em] text-[var(--text-muted)]">
                    {label}
                  </p>
                  <p className="mt-1 text-sm text-[var(--text-secondary)]">{value}</p>
                </div>
              </div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  )
}
