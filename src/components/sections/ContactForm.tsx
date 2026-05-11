import { Mail, MapPin, Phone } from 'lucide-react'
import InquiryForm from '@/components/forms/InquiryForm'
import { SITE_CONFIG } from '@/config/site'

export default function ContactForm() {
  return (
    <section id="contato" className="bg-[var(--bg-secondary)] py-20 sm:py-24">
      <div className="section-container">
        <div className="grid gap-8 lg:grid-cols-[minmax(0,0.9fr)_minmax(0,1.1fr)]">
          <div className="surface-card p-6 sm:p-8">
            <span className="section-tag">Contato</span>
            <h2 className="mt-5 text-4xl font-semibold text-white">
              Fale com um consultor da Accione.
            </h2>
            <p className="mt-4 text-sm leading-relaxed text-[var(--text-secondary)] sm:text-base">
              Se você quer entender melhor uma tese, projetar um aporte ou iniciar uma conversa sobre empreendimentos, este é o ponto de partida.
            </p>

            <div className="mt-8 space-y-4">
              <div className="flex items-start gap-3 text-sm text-[var(--text-secondary)]">
                <Mail size={18} className="mt-0.5 shrink-0 text-[var(--accent)]" />
                <span>{SITE_CONFIG.email}</span>
              </div>
              <div className="flex items-start gap-3 text-sm text-[var(--text-secondary)]">
                <Phone size={18} className="mt-0.5 shrink-0 text-[var(--accent)]" />
                <span>{SITE_CONFIG.phone}</span>
              </div>
              <div className="flex items-start gap-3 text-sm text-[var(--text-secondary)]">
                <MapPin size={18} className="mt-0.5 shrink-0 text-[var(--accent)]" />
                <span>{SITE_CONFIG.address}</span>
              </div>
            </div>
          </div>

          <InquiryForm submitLabel="Enviar e falar com um consultor" />
        </div>
      </div>
    </section>
  )
}
