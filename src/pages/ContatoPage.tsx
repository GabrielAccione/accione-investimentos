import { Mail, MapPin, Phone } from 'lucide-react'
import InquiryForm from '@/components/forms/InquiryForm'
import PageHero from '@/components/ui/PageHero'
import { SITE_CONFIG } from '@/config/site'

export default function ContatoPage() {
  const mapSrc = `https://maps.google.com/maps?q=${encodeURIComponent(
    SITE_CONFIG.mapQuery,
  )}&z=13&output=embed`

  return (
    <>
      <PageHero
        eyebrow="Contato"
        title={
          <>
            Abra uma conversa sobre
            <span className="text-gradient"> patrimônio e estratégia.</span>
          </>
        }
        description="A Accione atende investidores de Santa Maria/RS e região com uma abordagem próxima, técnica e voltada a decisões patrimoniais mais qualificadas."
      />

      <section className="bg-[var(--bg-primary)] py-20 sm:py-24">
        <div className="section-container grid gap-8 lg:grid-cols-[400px_minmax(0,1fr)]">
          <aside className="space-y-5">
            <article className="surface-card p-6 sm:p-8">
              <span className="section-tag">Informações</span>
              <div className="mt-6 space-y-5">
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
            </article>

            <article className="surface-card overflow-hidden">
              <iframe
                title="Mapa de Santa Maria RS"
                src={mapSrc}
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                className="h-72 w-full border-0"
              />
            </article>
          </aside>

          <InquiryForm submitLabel="Enviar mensagem" />
        </div>
      </section>
    </>
  )
}
