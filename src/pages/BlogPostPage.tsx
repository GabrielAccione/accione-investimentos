import { Link, useParams } from 'react-router-dom'
import { ArrowLeft } from 'lucide-react'
import PageHero from '@/components/ui/PageHero'
import SectionHeading from '@/components/ui/SectionHeading'
import BlogCard from '@/components/ui/BlogCard'
import { BLOG_POSTS } from '@/data/blogPosts'
import NotFoundPage from '@/pages/NotFoundPage'
import { SITE_URL, useSeo } from '@/hooks/useSeo'

/** Capas podem ser assets do build (caminho relativo) ou URLs externas. */
function absoluteImage(src: string | undefined) {
  if (!src) return undefined
  return src.startsWith('http') ? src : `${SITE_URL}${src}`
}

export default function BlogPostPage() {
  const { slug } = useParams<{ slug: string }>()
  const post = BLOG_POSTS.find((entry) => entry.slug === slug)

  useSeo({
    title: post ? post.title : 'Artigo não encontrado',
    description: post ? post.excerpt : 'O artigo que você procura não existe ou foi movido.',
    path: `/blog/${slug ?? ''}`,
    image: absoluteImage(post?.coverImage),
    noIndex: !post,
  })

  if (!post) {
    return <NotFoundPage />
  }

  const related = BLOG_POSTS.filter((entry) => entry.slug !== post.slug).slice(0, 3)

  return (
    <>
      <PageHero
        eyebrow={post.category}
        title={post.title}
        description={post.heroTagline}
        actions={
          <Link to="/blog" className="btn-ghost inline-flex items-center gap-2">
            <ArrowLeft size={18} />
            Voltar ao blog
          </Link>
        }
      />

      <article className="py-16 sm:py-20">
        <div className="section-container max-w-4xl">
          <div className="surface-card h-[360px] w-full overflow-hidden">
            <img
              src={post.coverImage}
              alt={post.title}
              className={`h-full w-full object-cover${
                post.coverZoom ? ' origin-top-left scale-[1.18]' : ''
              }`}
            />
          </div>

          {/* Autor + meta */}
          <div className="mt-6 flex flex-col gap-4 border-b border-[#484949]/15 pb-6 sm:flex-row sm:items-center sm:justify-between">
            {post.author ? (
              <div className="flex items-center gap-3">
                {post.author.image ? (
                  <img
                    src={post.author.image}
                    alt={post.author.name}
                    className="h-11 w-11 rounded-full object-cover object-top"
                  />
                ) : null}
                <div className="leading-tight">
                  <p className="text-sm font-semibold text-[var(--text-primary)]">
                    Por {post.author.name}
                  </p>
                  <p className="mt-0.5 text-xs text-[var(--accent)]">
                    {post.author.role}
                  </p>
                </div>
              </div>
            ) : null}

            <div className="flex items-center gap-2 text-xs uppercase tracking-[0.16em] text-[var(--text-muted)]">
              <span>{new Date(post.date).toLocaleDateString('pt-BR')}</span>
              <span className="text-[var(--accent)]">•</span>
              <span>{post.readTime}</span>
            </div>
          </div>

          {/* Conteúdo */}
          <div className="mt-8 space-y-8">
            {post.content.map((section, index) => (
              <section key={`${post.slug}-${index}`}>
                {section.heading ? (
                  <h2 className="text-2xl font-semibold text-[#041A2A] dark:text-white sm:text-3xl">
                    {section.heading}
                  </h2>
                ) : null}
                <div className="mt-4 space-y-4 text-base leading-relaxed text-[var(--text-secondary)]">
                  {section.paragraphs.map((paragraph) => (
                    <p key={paragraph}>{paragraph}</p>
                  ))}
                </div>
              </section>
            ))}
          </div>
        </div>
      </article>

      {/* Outros artigos */}
      {related.length > 0 ? (
        <section className="pb-20 sm:pb-24">
          <div className="section-container">
            <SectionHeading
              eyebrow="Continue lendo"
              title="Outros artigos"
              align="left"
            />
            <div className="mt-10 grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-3">
              {related.map((entry, index) => (
                <BlogCard key={entry.slug} item={entry} index={index} />
              ))}
            </div>
          </div>
        </section>
      ) : null}
    </>
  )
}
