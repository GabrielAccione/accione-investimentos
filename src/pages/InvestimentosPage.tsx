import { Link } from 'react-router-dom'
import PageHero from '@/components/ui/PageHero'
import Products from '@/components/sections/Products'

export default function InvestimentosPage() {
  return (
    <>
      <PageHero
        eyebrow="Investimentos"
        title={
          <>
            Estruturas com leitura de risco,
            <span className="text-gradient"> lastro e propósito.</span>
          </>
        }
        description="A Accione trabalha com teses em que o retorno faz sentido porque a estrutura também faz. O objetivo é ampliar repertório de alocação sem abrir mão de clareza."
        actions={
          <>
            <Link to="/contato" className="btn-accent">
              Quero conversar sobre meu perfil
            </Link>
            <Link to="/indicadores" className="btn-ghost">
              Ver cenário econômico
            </Link>
          </>
        }
      />

      <Products variant="page" />
    </>
  )
}
