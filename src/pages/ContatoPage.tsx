import { Clock, Mail, MapPin, MessageCircle, Phone } from 'lucide-react'
import { motion } from 'framer-motion'
import { SITE_CONFIG } from '@/config/site'

const WHATSAPP_URL =
  'https://wa.me/5555996431020?text=Ol%C3%A1!%20Gostaria%20de%20agendar%20um%20hor%C3%A1rio%20com%20a%20Accione%20Investimentos.'

const INFO_ITEMS = [
  { icon: Phone,   label: 'WhatsApp',   value: SITE_CONFIG.whatsappDisplay },
  { icon: Mail,    label: 'E-mail',     value: SITE_CONFIG.email },
  { icon: Clock,   label: 'Horário',    value: 'Atendimento com horário marcado' },
  { icon: MapPin,  label: 'Localização', value: 'Santa Maria, RS — Brasil' },
]

export default function ContatoPage() {
  return (
    <section className="hero-gradient relative min-h-screen overflow-hidden pt-24">
      {/* Background blobs */}
      <div className="pointer-events-none absolute left-[12%] top-32 h-64 w-64 rounded-full bg-[var(--accent)]/10 blur-3xl" />
      <div className="pointer-events-none absolute bottom-24 right-[10%] h-56 w-56 rounded-full bg-white/5 blur-3xl" />

      <div className="section-container relative z-10 flex flex-col items-center py-20 text-center">

        {/* Eyebrow */}
        <motion.span
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="section-tag"
        >
          Contato
        </motion.span>

        {/* Title */}
        <motion.h1
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.55, delay: 0.06 }}
          className="mt-5 max-w-2xl text-4xl font-semibold leading-tight text-[var(--text-primary)] sm:text-5xl lg:text-6xl"
        >
          Entre em contato
        </motion.h1>

        {/* Appointment notice */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.14 }}
          className="mt-8 w-full max-w-xl rounded-xl border-l-4 py-4 pl-5 pr-4 text-left"
          style={{ borderLeftColor: '#A26547', background: 'rgba(162, 101, 71, 0.08)' }}
        >
          <p className="text-sm leading-relaxed text-white/70">
            ⚠️ Nosso atendimento é realizado exclusivamente com horário marcado.
          </p>
        </motion.div>

        {/* CTA buttons */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.22 }}
          className="mt-10 flex flex-col items-center gap-4 sm:flex-row sm:justify-center"
        >
          <a
            href={WHATSAPP_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2.5 rounded-full bg-[#25D366] px-7 py-3.5 text-base font-medium text-white transition-all duration-300 hover:scale-105 hover:bg-[#20BD5C] hover:shadow-lg hover:shadow-[#25D366]/25 active:scale-95"
          >
            <MessageCircle className="h-5 w-5" />
            Falar com um especialista
          </a>

          <a
            href={`mailto:${SITE_CONFIG.email}`}
            className="inline-flex items-center gap-2.5 rounded-full border border-[#A26547] px-7 py-3.5 text-base font-medium text-[#A26547] transition-all duration-300 hover:bg-[#A26547]/10 hover:scale-105 active:scale-95"
          >
            <Mail className="h-5 w-5" />
            {SITE_CONFIG.email}
          </a>
        </motion.div>

        {/* Info card */}
        <motion.div
          initial={{ opacity: 0, y: 28 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.32 }}
          className="surface-card mt-14 w-full max-w-2xl p-6 sm:p-8"
        >
          <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
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
