import { lazy, Suspense } from 'react'
import { Route, Routes } from 'react-router-dom'
import Footer from '@/components/sections/Footer'
import Navbar from '@/components/sections/Navbar'
import ScrollToTop from '@/components/global/ScrollToTop'
import WhatsappFloat from '@/components/global/WhatsappFloat'
import { EconomicIndicatorsProvider } from '@/context/EconomicIndicatorsContext'

const BlogPage = lazy(() => import('@/pages/BlogPage'))
const BlogPostPage = lazy(() => import('@/pages/BlogPostPage'))
const ContatoPage = lazy(() => import('@/pages/ContatoPage'))
const CprFPage = lazy(() => import('@/pages/CprFPage'))
const CreditoPrivadoPage = lazy(() => import('@/pages/CreditoPrivadoPage'))
const EmpreendimentoDetalhe = lazy(() => import('@/pages/EmpreendimentoDetalhe'))
const Empreendimentos = lazy(() => import('@/pages/Empreendimentos'))
const HomePage = lazy(() => import('@/pages/HomePage'))
const IndicadoresPage = lazy(() => import('@/pages/IndicadoresPage'))
const InvestimentosPage = lazy(() => import('@/pages/InvestimentosPage'))
const NotFoundPage = lazy(() => import('@/pages/NotFoundPage'))
const RetirementSimulatorPage = lazy(() => import('@/pages/RetirementSimulatorPage'))
const SobrePage = lazy(() => import('@/pages/SobrePage'))

function RouteFallback() {
  return (
    <div className="hero-gradient flex min-h-[60vh] items-center pt-16">
      <div className="section-container">
        <div className="surface-card mx-auto max-w-xl p-8 text-center">
          <p className="text-sm uppercase tracking-[0.16em] text-[var(--text-muted)]">
            Carregando conteúdo
          </p>
          <h1 className="mt-4 text-4xl font-semibold text-[#041A2A] dark:text-white">
            Preparando a próxima página.
          </h1>
        </div>
      </div>
    </div>
  )
}

function App() {
  return (
    <EconomicIndicatorsProvider>
      <main className="min-h-screen overflow-x-hidden">
        <ScrollToTop />
        <Navbar />
        <Suspense fallback={<RouteFallback />}>
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/investimentos" element={<InvestimentosPage />} />
            <Route path="/investimentos/cpr-f" element={<CprFPage />} />
            <Route path="/investimentos/credito-privado" element={<CreditoPrivadoPage />} />
            <Route path="/empreendimentos" element={<Empreendimentos />} />
            <Route path="/empreendimentos/:slug" element={<EmpreendimentoDetalhe />} />
            <Route path="/indicadores" element={<IndicadoresPage />} />
            <Route path="/simuladores/aposentadoria" element={<RetirementSimulatorPage />} />
            <Route path="/sobre" element={<SobrePage />} />
            <Route path="/contato" element={<ContatoPage />} />
            <Route path="/blog" element={<BlogPage />} />
            <Route path="/blog/:slug" element={<BlogPostPage />} />
            <Route path="*" element={<NotFoundPage />} />
          </Routes>
        </Suspense>
        <WhatsappFloat />
        <Footer />
      </main>
    </EconomicIndicatorsProvider>
  )
}

export default App
