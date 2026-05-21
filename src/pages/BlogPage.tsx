import { useMemo, useState } from 'react'
import { Link } from 'react-router-dom'
import PageHero from '@/components/ui/PageHero'
import { BLOG_POSTS } from '@/data/blogPosts'
import type { BlogCategory } from '@/types'

const ALL_CATEGORIES: Array<BlogCategory | 'Todos'> = [
  'Todos',
  'Investimentos Alternativos',
  'Agronegócio',
  'Mercado Financeiro',
  'Imóveis',
]

export default function BlogPage() {
  const [activeCategory, setActiveCategory] = useState<BlogCategory | 'Todos'>('Todos')

  const filteredPosts = useMemo(() => {
    if (activeCategory === 'Todos') return BLOG_POSTS
    return BLOG_POSTS.filter((post) => post.category === activeCategory)
  }, [activeCategory])

  return (
    <>
      <PageHero
        eyebrow="Blog"
        title={
          <>
            Conteúdo para acompanhar teses, contexto e
            <span className="text-gradient"> leitura de cenário.</span>
          </>
        }
        description="Uma base editorial para traduzir conceitos, aprofundar estruturas e registrar a visão da Accione sobre mercado, imóveis, agro e investimentos alternativos."
      />

      <section className="bg-[var(--bg-primary)] py-16 sm:py-20">
        <div className="section-container">
          <div className="flex flex-wrap gap-3">
            {ALL_CATEGORIES.map((category) => (
              <button
                key={category}
                type="button"
                onClick={() => setActiveCategory(category)}
                className={`rounded-full border px-4 py-2 text-sm transition-colors duration-300 ${
                  activeCategory === category
                    ? 'border-[var(--accent)]/40 bg-[var(--accent)]/12 text-[#041A2A] dark:text-white'
                    : 'border-[#E5E5E5] text-[var(--text-secondary)] hover:border-[var(--accent)]/30 dark:border-white/10 dark:hover:border-white/20'
                }`}
              >
                {category}
              </button>
            ))}
          </div>

          <div className="mt-10 grid gap-6 lg:grid-cols-2">
            {filteredPosts.map((post) => (
              <article key={post.slug} className="surface-card overflow-hidden">
                <img src={post.coverImage} alt={post.title} className="h-56 w-full object-cover" />
                <div className="p-6 sm:p-8">
                  <div className="flex flex-wrap items-center gap-3 text-xs uppercase tracking-[0.16em] text-[var(--text-muted)]">
                    <span>{new Date(post.date).toLocaleDateString('pt-BR')}</span>
                    <span>{post.category}</span>
                    <span>{post.readTime}</span>
                  </div>
                  <h2 className="mt-4 text-4xl font-semibold text-[#041A2A] dark:text-white">{post.title}</h2>
                  <p className="mt-4 text-sm leading-relaxed text-[var(--text-secondary)]">
                    {post.excerpt}
                  </p>
                  <Link to={`/blog/${post.slug}`} className="btn-accent mt-6 inline-flex">
                    Ler artigo
                  </Link>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>
    </>
  )
}
