import { Link, useParams } from 'react-router-dom'
import { ArrowLeft } from 'lucide-react'
import PageHero from '@/components/ui/PageHero'
import { BLOG_POSTS } from '@/data/blogPosts'
import NotFoundPage from '@/pages/NotFoundPage'

export default function BlogPostPage() {
  const { slug } = useParams<{ slug: string }>()
  const post = BLOG_POSTS.find((entry) => entry.slug === slug)

  if (!post) {
    return <NotFoundPage />
  }

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

      <article className="py-20 sm:py-24">
        <div className="section-container max-w-4xl">
          <img src={post.coverImage} alt={post.title} className="surface-card h-[360px] w-full object-cover" />

          <div className="mt-8 flex flex-wrap items-center gap-3 text-xs uppercase tracking-[0.16em] text-[var(--text-muted)]">
            <span>{new Date(post.date).toLocaleDateString('pt-BR')}</span>
            <span>{post.readTime}</span>
          </div>

          <div className="mt-8 space-y-8">
            {post.content.map((section, index) => (
              <section key={`${post.slug}-${index}`}>
                {section.heading ? (
                  <h2 className="text-4xl font-semibold text-[#041A2A] dark:text-white">{section.heading}</h2>
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
    </>
  )
}
