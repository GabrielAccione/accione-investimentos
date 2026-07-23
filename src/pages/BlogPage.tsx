import { useMemo, useState } from 'react'
import PageHero from '@/components/ui/PageHero'
import BlogCard from '@/components/ui/BlogCard'
import { BLOG_POSTS } from '@/data/blogPosts'
import type { BlogCategory } from '@/types'
import { useSeo } from '@/hooks/useSeo'

// Derivado dos artigos publicados: nenhum filtro aparece sem ter conteúdo por trás.
const ALL_CATEGORIES: Array<BlogCategory | 'Todos'> = [
  'Todos',
  ...Array.from(new Set(BLOG_POSTS.map((post) => post.category))),
]

export default function BlogPage() {
  const [activeCategory, setActiveCategory] = useState<BlogCategory | 'Todos'>('Todos')

  useSeo({
    title: 'Blog — Mercado, imóveis, agro e investimentos alternativos',
    description:
      'Análises da Accione sobre cenário econômico, mercado imobiliário, agronegócio e investimentos alternativos, com leitura crítica de teses e estruturas.',
    path: '/blog',
  })

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

      <section className="py-16 sm:py-20">
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

          {filteredPosts.length > 0 ? (
            <div className="mt-10 grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-3">
              {filteredPosts.map((post, index) => (
                <BlogCard key={post.slug} item={post} index={index} />
              ))}
            </div>
          ) : (
            <p className="mt-10 text-sm text-[var(--text-secondary)]">
              Ainda não há artigos publicados nesta categoria. Novos conteúdos
              são publicados periodicamente.
            </p>
          )}
        </div>
      </section>
    </>
  )
}
