import { useMemo, useState } from 'react'
import PageHero from '@/components/ui/PageHero'
import BlogCard from '@/components/ui/BlogCard'
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

          <div className="mt-10 grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-3">
            {filteredPosts.map((post, index) => (
              <BlogCard key={post.slug} item={post} index={index} />
            ))}
          </div>
        </div>
      </section>
    </>
  )
}
