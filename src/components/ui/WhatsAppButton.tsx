import { MessageCircle } from 'lucide-react'

interface WhatsAppButtonProps {
  mensagem?: string
  label?: string
  size?: 'sm' | 'md' | 'lg'
  className?: string
}

const NUMERO = '5555996431020'

const SIZES = {
  sm: 'px-4 py-2 text-sm',
  md: 'px-6 py-3 text-base',
  lg: 'px-8 py-4 text-lg',
}

export default function WhatsAppButton({
  mensagem = 'Olá! Vim pelo site da Accione Investimentos e gostaria de saber mais.',
  label = 'WhatsApp',
  size = 'md',
  className = '',
}: WhatsAppButtonProps) {
  const url = `https://wa.me/${NUMERO}?text=${encodeURIComponent(mensagem)}`

  return (
    <a
      href={url}
      target="_blank"
      rel="noopener noreferrer"
      className={`inline-flex items-center gap-2 bg-[#25D366] hover:bg-[#20BD5C]
        text-white font-medium rounded-full transition-all duration-300
        hover:shadow-lg hover:shadow-[#25D366]/25 hover:scale-105
        active:scale-95 ${SIZES[size]} ${className}`}
    >
      <MessageCircle className="h-5 w-5 shrink-0" />
      {label}
    </a>
  )
}
