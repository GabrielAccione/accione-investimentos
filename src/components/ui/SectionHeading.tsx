import type { ReactNode } from 'react'

interface SectionHeadingProps {
  eyebrow: string
  title: ReactNode
  description?: string
  align?: 'left' | 'center'
}

export default function SectionHeading({
  eyebrow,
  title,
  description,
  align = 'center',
}: SectionHeadingProps) {
  const alignmentClass = align === 'left' ? 'text-left' : 'text-center'
  const widthClass = align === 'left' ? 'max-w-2xl' : 'mx-auto max-w-3xl'

  return (
    <div className={`${alignmentClass} ${widthClass}`}>
      <span className="section-tag">{eyebrow}</span>
      <h2 className="mt-4 text-3xl font-semibold leading-tight text-[var(--text-primary)] sm:text-4xl lg:text-5xl">
        {title}
      </h2>
      {description ? (
        <p className="mt-4 text-sm leading-relaxed text-[var(--text-secondary)] sm:text-base">
          {description}
        </p>
      ) : null}
    </div>
  )
}
