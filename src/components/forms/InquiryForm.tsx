import { useState, type ChangeEvent, type FormEvent } from 'react'
import { CheckCircle2 } from 'lucide-react'

interface InquiryFormProps {
  submitLabel?: string
}

interface InquiryFormState {
  name: string
  email: string
  phone: string
  subject: string
  message: string
}

const INITIAL_STATE: InquiryFormState = {
  name: '',
  email: '',
  phone: '',
  subject: '',
  message: '',
}

export default function InquiryForm({ submitLabel = 'Enviar mensagem' }: InquiryFormProps) {
  const [form, setForm] = useState<InquiryFormState>(INITIAL_STATE)
  const [submitted, setSubmitted] = useState(false)

  function handleChange(
    event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>,
  ) {
    const { name, value } = event.target
    setForm((current) => ({ ...current, [name]: value }))
  }

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault()
    setSubmitted(true)
    setForm(INITIAL_STATE)
  }

  if (submitted) {
    return (
      <div className="surface-card p-8 text-center sm:p-10">
        <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-emerald-400/15 text-emerald-300">
          <CheckCircle2 size={30} />
        </div>
        <h3 className="mt-5 text-3xl font-semibold text-white">Recebemos seu contato</h3>
        <p className="mt-3 text-sm leading-relaxed text-[var(--text-secondary)] sm:text-base">
          Um consultor da Accione retornará em breve para entender seu momento e apresentar as alternativas mais aderentes ao seu perfil.
        </p>
      </div>
    )
  }

  return (
    <form onSubmit={handleSubmit} className="surface-card p-6 sm:p-8">
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
        <div className="sm:col-span-2">
          <label htmlFor="name" className="mb-2 block text-sm font-medium text-[var(--text-secondary)]">
            Nome
          </label>
          <input
            id="name"
            name="name"
            type="text"
            required
            value={form.name}
            onChange={handleChange}
            placeholder="Seu nome completo"
            className="input-base"
          />
        </div>

        <div>
          <label htmlFor="email" className="mb-2 block text-sm font-medium text-[var(--text-secondary)]">
            E-mail
          </label>
          <input
            id="email"
            name="email"
            type="email"
            required
            value={form.email}
            onChange={handleChange}
            placeholder="voce@empresa.com"
            className="input-base"
          />
        </div>

        <div>
          <label htmlFor="phone" className="mb-2 block text-sm font-medium text-[var(--text-secondary)]">
            Telefone
          </label>
          <input
            id="phone"
            name="phone"
            type="tel"
            required
            value={form.phone}
            onChange={handleChange}
            placeholder="(55) 99999-9999"
            className="input-base"
          />
        </div>

        <div className="sm:col-span-2">
          <label htmlFor="subject" className="mb-2 block text-sm font-medium text-[var(--text-secondary)]">
            Assunto
          </label>
          <select
            id="subject"
            name="subject"
            required
            value={form.subject}
            onChange={handleChange}
            className="input-base"
          >
            <option value="" disabled>
              Selecione o tema do contato
            </option>
            <option value="investimentos">Quero conhecer oportunidades</option>
            <option value="empreendimentos">Tenho interesse em empreendimentos</option>
            <option value="simuladores">Quero ajuda para planejar um aporte</option>
            <option value="parcerias">Parcerias e relacionamento</option>
          </select>
        </div>

        <div className="sm:col-span-2">
          <label htmlFor="message" className="mb-2 block text-sm font-medium text-[var(--text-secondary)]">
            Mensagem
          </label>
          <textarea
            id="message"
            name="message"
            rows={5}
            required
            value={form.message}
            onChange={handleChange}
            placeholder="Conte um pouco sobre o que você busca, o prazo e o ticket aproximado."
            className="input-base resize-none"
          />
        </div>
      </div>

      <button type="submit" className="btn-accent mt-6 w-full justify-center text-center sm:w-auto">
        {submitLabel}
      </button>
    </form>
  )
}
