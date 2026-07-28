import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { X, ArrowRight } from 'lucide-react'

interface NavbarProps {
  onOpenDemo: () => void
}

export const Navbar = ({ onOpenDemo }: NavbarProps) => {
  const [isVisible, setIsVisible] = useState(true)
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)

  useEffect(() => {
    let lastScrollY = window.scrollY

    const updateScrollDirection = () => {
      const currentScrollY = window.scrollY
      if (currentScrollY <= 100) {
        setIsVisible(true)
      } else if (currentScrollY > lastScrollY + 5) {
        // Scrolling DOWN -> hide navbar
        setIsVisible(false)
      } else if (currentScrollY < lastScrollY - 5) {
        // Scrolling UP -> show navbar
        setIsVisible(true)
      }
      lastScrollY = currentScrollY
    }

    window.addEventListener('scroll', updateScrollDirection)
    return () => window.removeEventListener('scroll', updateScrollDirection)
  }, [])

  const handleNavClick = (e: React.MouseEvent<HTMLAnchorElement>, targetId: string) => {
    e.preventDefault()
    setMobileMenuOpen(false)
    const element = document.querySelector(targetId)
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' })
    }
  }

  return (
    <>
      {/* Top Announcement Banner */}
      <div className="fixed top-0 left-0 right-0 z-50 bg-gradient-to-r from-[#B81D18] via-[#990000] to-[#761D19] text-[#F7F1E6] text-center py-2 px-4 text-[9px] sm:text-[10px] md:text-xs font-sans font-semibold tracking-wider shadow-sm uppercase select-none flex items-center justify-center space-x-2">
        <img
          src="/img/logo.webp"
          alt="ilê logo"
          className="h-3 sm:h-3.5 w-auto object-contain filter brightness-0 invert pointer-events-none select-none"
        />
        <span>LOTE FUNDADOR: 1º Mês Grátis + 60% OFF nos 2 meses seguintes • Migração Gratuita &amp; Suporte via WhatsApp</span>
      </div>

      {/* Header Container: Pure transparent, mix-blend-difference text & logo */}
      <motion.header
        initial={{ y: 0, opacity: 1 }}
        animate={{
          y: isVisible ? 0 : -100,
          opacity: isVisible ? 1 : 0,
        }}
        transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
        className="fixed top-8 left-0 right-0 z-50 py-6 md:py-8 bg-transparent mix-blend-difference pointer-events-none"
      >
        <div className="max-w-[1400px] mx-auto px-6 md:px-16 flex items-center justify-between pointer-events-auto">
          
          {/* Left: — MENU (Desktop) / 3 Hamburger Lines (Mobile) */}
          <button
            onClick={() => setMobileMenuOpen(true)}
            className="group flex items-center space-x-2 text-[11px] text-white hover:opacity-80 transition-opacity tracking-[0.25em] font-sans font-medium uppercase cursor-pointer"
            aria-label="Abrir Menu"
          >
            {/* 3 clean lines for Mobile */}
            <div className="flex sm:hidden flex-col justify-between w-5 h-3.5">
              <span className="w-full h-[1.5px] bg-white rounded-full" />
              <span className="w-full h-[1.5px] bg-white rounded-full" />
              <span className="w-full h-[1.5px] bg-white rounded-full" />
            </div>

            {/* — MENU for Desktop */}
            <div className="hidden sm:flex items-center space-x-2">
              <span className="w-4 h-[1.5px] bg-white group-hover:w-6 transition-all duration-300" />
              <span>MENU</span>
            </div>
          </button>

          {/* Center: Brand Logo logo.webp */}
          <a
            href="#hero"
            onClick={(e) => handleNavClick(e, '#hero')}
            className="hover:opacity-80 transition-opacity flex items-center cursor-pointer"
          >
            <img
              src="/img/logo.webp"
              alt="ilê logo"
              className="h-7 md:h-9 w-auto object-contain filter brightness-0 invert pointer-events-none select-none"
            />
          </a>

          {/* Right: Clean & Refined Glass Pill Button with spinning glow */}
          <button
            onClick={onOpenDemo}
            className="border-glow-container rounded-full group cursor-pointer"
          >
            <div className="border-glow-inner rounded-full px-3.5 sm:px-5 py-1.5 sm:py-2 text-xs font-sans font-medium tracking-wide text-white transition-all duration-300">
              <span className="hidden sm:inline">Acesso Antecipado</span>
              <span className="inline sm:hidden">Garantir</span>
              <ArrowRight className="w-3 h-3.5 sm:w-3.5 sm:h-3.5 group-hover:translate-x-0.5 inline-block ml-1.5 transition-transform" />
            </div>
          </button>
        </div>
      </motion.header>

      {/* Fullscreen Navigation Overlay */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="fixed inset-0 z-50 bg-[#120B0D]/98 backdrop-blur-2xl flex flex-col justify-between p-8 md:p-16 text-[#F7F1E6]"
          >
            <div className="flex justify-between items-center max-w-[1400px] mx-auto w-full pt-4">
              <img
                src="/img/logo.webp"
                alt="ilê logo"
                className="h-8 w-auto object-contain filter brightness-0 invert"
              />
              <button
                onClick={() => setMobileMenuOpen(false)}
                className="p-2 text-[#F7F1E6]/70 hover:text-[#F7F1E6] transition-colors cursor-pointer"
              >
                <X className="w-6 h-6" />
              </button>
            </div>

            <div className="max-w-3xl mx-auto w-full my-auto space-y-6 text-center md:text-left">
              <a
                href="#hero"
                onClick={(e) => handleNavClick(e, '#hero')}
                className="block font-serif text-3xl md:text-5xl text-[#F7F1E6] hover:text-[#990000] transition-colors"
              >
                01. <span className="font-serif italic font-normal">Início &amp; Visão</span>
              </a>
              <a
                href="#manifesto"
                onClick={(e) => handleNavClick(e, '#manifesto')}
                className="block font-serif text-3xl md:text-5xl text-[#F7F1E6] hover:text-[#990000] transition-colors"
              >
                02. <span className="font-serif italic font-normal">Manifesto ilê</span>
              </a>
              <a
                href="#galeria"
                onClick={(e) => handleNavClick(e, '#galeria')}
                className="block font-serif text-3xl md:text-5xl text-[#F7F1E6] hover:text-[#990000] transition-colors"
              >
                03. <span className="font-serif italic font-normal">Galeria Litúrgica</span>
              </a>
              <a
                href="#recursos"
                onClick={(e) => handleNavClick(e, '#recursos')}
                className="block font-serif text-3xl md:text-5xl text-[#F7F1E6] hover:text-[#990000] transition-colors"
              >
                04. <span className="font-serif italic font-normal">Módulos &amp; Recursos</span>
              </a>
              <a
                href="#tradicao"
                onClick={(e) => handleNavClick(e, '#tradicao')}
                className="block font-serif text-3xl md:text-5xl text-[#F7F1E6] hover:text-[#990000] transition-colors"
              >
                05. <span className="font-serif italic font-normal">Valores &amp; Fundamentos</span>
              </a>
              <a
                href="#pricing"
                onClick={(e) => handleNavClick(e, '#pricing')}
                className="block font-serif text-3xl md:text-5xl text-[#F7F1E6] hover:text-[#990000] transition-colors"
              >
                06. <span className="font-serif italic font-normal">Planos &amp; Preços</span>
              </a>
              <button
                onClick={() => {
                  setMobileMenuOpen(false)
                  onOpenDemo()
                }}
                className="block font-serif text-3xl md:text-5xl text-[#990000] hover:text-white transition-colors pt-3 cursor-pointer text-left"
              >
                07. <span className="font-serif italic font-normal">Garantir Acesso Antecipado ➔</span>
                <span className="block text-[11px] font-sans text-[#F7F1E6]/50 mt-1.5 font-bold tracking-widest uppercase">
                  📦 Migração Gratuita &amp; Suporte Humano Incluso
                </span>
              </button>
            </div>

            <div className="max-w-[1400px] mx-auto w-full flex justify-between items-center text-xs text-[#F7F1E6]/60 font-sans tracking-wider border-t border-white/10 pt-6">
              <span>Umbanda &amp; Candomblé — Gestão Sagrada</span>
              <span>Est. 2024</span>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}
