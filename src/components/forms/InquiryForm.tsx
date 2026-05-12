import { useState, type ChangeEvent, type FormEvent } from 'react'
import { CheckCircle2, Loader2 } from 'lucide-react'

interface InquiryFormProps {
  submitLabel?: string
}

interface FormState {
  name: string
  email: string
  phone: string
  subject: string
  message: string
}

type FormField = keyof FormState

const INITIAL_FORM: FormState = { name: '', email: '', phone: '', subject: '', message: '' }
const INITIAL_TOUCH = { name: false, email: false, phone: false, subject: false, message: false }

function applyPhoneMask(raw: string) {
  const d = raw.replace(/\D/g, '').slice(0, 11)
  if (!d.length) return ''
  if (d.length <= 2) return `(${d}`
  if (d.length <= 7) return `(${d.slice(0, 2)}) ${d.slice(2)}`
  return `(${d.slice(0, 2)}) ${d.slice(2, 7)}-${d.slice(7)}`
}

function validate(form: FormState): Partial<Record<FormField, string>> {
  const errors: Partial<Record<FormField, string>> = {}
  if (!/^[a-zA-ZÀ-ú\s]{3,}$/.test(form.name.trim()))
    errors.name = 'Informe o nome completo (mínimo 3 letras).'
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email))
    errors.email = 'Informe um e-mail válido.'
  if (form.phone.replace(/\D/g, '').length < 10)
    errors.phone = 'Informe o telefone com DDD (mínimo 10 dígitos).'
  if (!form.subject)
    errors.subject = 'Selecione um assunto.'
  if (form.message.trim().length < 10)
    errors.message = 'A mensagem deve ter pelo menos 10 caracteres.'
  return errors
}

export default function InquiryForm({ submitLabel = 'Enviar mensagem' }: InquiryFormProps) {
  const [form, setForm] = useState<FormState>(INITIAL_FORM)
  const [touched, setTouched] = useState<typeof INITIAL_TOUCH>(INITIAL_TOUCH)
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [submitted, setSubmitted] = useState(false)

  const errors = validate(form)
  const isValid = Object.keys(errors).length === 0

  function handleChange(e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) {
    const { name, value } = e.target
    setForm(prev => ({
      ...prev,
      [name]: name === 'phone' ? applyPhoneMask(value) : value,
    }))
  }

  function handleBlur(field: FormField) {
    setTouched(prev => ({ ...prev, [field]: true }))
  }

  async function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault()
    setTouched({ name: true, email: true, phone: true, subject: true, message: true })
    if (!isValid) return
    setIsSubmitting(true)
    // Substituir por integração real quando disponível (Formspree, EmailJS, etc.)
    await new Promise(resolve => setTimeout(resolve, 1400))
    setIsSubmitting(false)
    setSubmitted(true)
    setForm(INITIAL_FORM)
    setTouched(INITIAL_TOUCH)
  }

  if (submitted) {
    return (
      <div className="surface-card p-8 text-center sm:p-10">
        <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-emerald-400/15 text-emerald-300">
          <CheckCircle2 size={30} />
        </div>
        <h3 className="mt-5 text-3xl font-semibold text-white">Obrigado!</h3>
        <p className="mt-3 text-sm leading-relaxed text-[var(--text-secondary)] sm:text-base">
          Em breve entraremos em contato. Um consultor da Accione retornará para entender seu momento e apresentar as alternativas mais aderentes ao seu perfil.
        </p>
      </div>
    )
  }

  function fieldClass(field: FormField, extra = '') {
    const hasError = touched[field] && errors[field]
    return `input-base${hasError ? ' !border-red-500/60' : ''}${extra ? ` ${extra}` : ''}`
  }

  function FieldError({ field }: { field: FormField }) {
    if (!touched[field] || !errors[field]) return null
    return <p className="mt-1.5 text-xs text-red-400">{errors[field]}</p>
  }

  return (
    <form onSubmit={handleSubmit} noValidate className="surface-card p-6 sm:p-8">
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
        <div className="sm:col-span-2">
          <label htmlFor="name" className="mb-2 block text-sm font-medium text-[var(--text-secondary)]">
            Nome
          </label>
          <input
            id="name" name="name" type="text"
            value={form.name} onChange={handleChange} onBlur={() => handleBlur('name')}
            placeholder="Seu nome completo"
            className={fieldClass('name')}
          />
          <FieldError field="name" />
        </div>

        <div>
          <label htmlFor="email" className="mb-2 block text-sm font-medium text-[var(--text-secondary)]">
            E-mail
          </label>
          <input
            id="email" name="email" type="email"
            value={form.email} onChange={handleChange} onBlur={() => handleBlur('email')}
            placeholder="voce@empresa.com"
            className={fieldClass('email')}
          />
          <FieldError field="email" />
        </div>

        <div>
          <label htmlFor="phone" className="mb-2 block text-sm font-medium text-[var(--text-secondary)]">
            Telefone
          </label>
          <input
            id="phone" name="phone" type="tel"
            value={form.phone} onChange={handleChange} onBlur={() => handleBlur('phone')}
            placeholder="(55) 99999-9999"
            className={fieldClass('phone')}
          />
          <FieldError field="phone" />
        </div>

        <div className="sm:col-span-2">
          <label htmlFor="subject" className="mb-2 block text-sm font-medium text-[var(--text-secondary)]">
            Assunto
          </label>
          <select
            id="subject" name="subject"
            value={form.subject} onChange={handleChange} onBlur={() => handleBlur('subject')}
            className={fieldClass('subject')}
          >
            <option value="" disabled>Selecione o tema do contato</option>
            <option value="investimentos">Quero conhecer oportunidades</option>
            <option value="empreendimentos">Tenho interesse em empreendimentos</option>
            <option value="simuladores">Quero ajuda para planejar um aporte</option>
            <option value="parcerias">Parcerias e relacionamento</option>
          </select>
          <FieldError field="subject" />
        </div>

        <div className="sm:col-span-2">
          <label htmlFor="message" className="mb-2 block text-sm font-medium text-[var(--text-secondary)]">
            Mensagem
          </label>
          <textarea
            id="message" name="message" rows={5}
            value={form.message} onChange={handleChange} onBlur={() => handleBlur('message')}
            placeholder="Conte um pouco sobre o que você busca, o prazo e o ticket aproximado."
            className={fieldClass('message', 'resize-none')}
          />
          <FieldError field="message" />
        </div>
      </div>

      <button
        type="submit"
        disabled={isSubmitting || !isValid}
        className="btn-accent mt-6 inline-flex w-full items-center justify-center gap-2 disabled:cursor-not-allowed disabled:opacity-50 sm:w-auto"
      >
        {isSubmitting ? (
          <>
            <Loader2 size={16} className="animate-spin" />
            Enviando...
          </>
        ) : (
          submitLabel
        )}
      </button>
    </form>
  )
}
