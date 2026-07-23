import { Link } from 'react-router-dom'
import { useSeo } from '@/hooks/useSeo'

export default function NotFoundPage() {
  useSeo({
    title: 'Página não encontrada',
    description: 'O endereço que você tentou acessar não existe ou foi movido.',
    path: '/404',
    noIndex: true,
  })

  return (
    <section className="hero-gradient flex min-h-screen items-center pt-16">
      <div className="section-container text-center">
        <span className="section-tag">404</span>
        <h1 className="mt-6 text-3xl font-semibold text-[#041A2A] dark:text-white sm:text-4xl lg:text-5xl">
          Página não encontrada.
        </h1>
        <p className="mx-auto mt-5 max-w-xl text-base leading-relaxed text-[var(--text-secondary)]">
          O endereço que você tentou acessar não existe ou foi movido. Use a navegação principal ou volte para a página inicial.
        </p>
        <Link to="/" className="btn-accent mt-8 inline-flex">
          Voltar para o início
        </Link>
      </div>
    </section>
  )
}
