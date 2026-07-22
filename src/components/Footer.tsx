import { useState, useEffect, useRef } from 'react'
import { ArrowRight, ArrowUp } from 'lucide-react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

interface FooterProps {
  onOpenDemo?: () => void
}

export const Footer = ({ onOpenDemo }: FooterProps) => {
  const [countdown, setCountdown] = useState({ days: 0, hours: 0, minutes: 0, seconds: 0 })

  const footerRef = useRef<HTMLElement>(null)
  const leavesRef = useRef<HTMLDivElement>(null)

  // Live countdown timer calculating time from now to the 20th of next month
  useEffect(() => {
    const calculateTargetDate = () => {
      const now = new Date()
      let targetYear = now.getFullYear()
      let targetMonth = now.getMonth() + 1
      if (targetMonth > 11) {
        targetMonth = 0
        targetYear += 1
      }
      return new Date(targetYear, targetMonth, 20, 0, 0, 0)
    }

    const targetDate = calculateTargetDate()

    const updateCountdown = () => {
      const now = new Date().getTime()
      const distance = targetDate.getTime() - now

      if (distance < 0) {
        setCountdown({ days: 0, hours: 0, minutes: 0, seconds: 0 })
        return
      }

      const days = Math.floor(distance / (1000 * 60 * 60 * 24))
      const hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60))
      const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60))
      const seconds = Math.floor((distance % (1000 * 60)) / 1000)

      setCountdown({ days, hours, minutes, seconds })
    }

    updateCountdown()
    const timer = setInterval(updateCountdown, 1000)
    return () => clearInterval(timer)
  }, [])

  // GSAP ScrollTrigger for leaves rising progressively as user scrolls into the footer
  useEffect(() => {
    if (!footerRef.current || !leavesRef.current) return

    const ctx = gsap.context(() => {
      gsap.fromTo(
        leavesRef.current,
        { yPercent: 65, opacity: 0.3 },
        {
          yPercent: 0,
          opacity: 1,
          ease: 'power1.out',
          scrollTrigger: {
            trigger: footerRef.current,
            start: 'top 85%',
            end: 'bottom bottom',
            scrub: 1.8,
          },
        }
      )
    }, footerRef)

    return () => ctx.revert()
  }, [])

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }

  const handleLinkClick = (e: React.MouseEvent<HTMLAnchorElement>, targetId: string) => {
    e.preventDefault()
    const element = document.querySelector(targetId)
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' })
    }
  }

  return (
    <footer
      ref={footerRef}
      className="light-bg-section relative w-full bg-[#F7F1E6] text-[#262626] pt-12 pb-0 overflow-hidden select-none"
    >
      
      {/* 1. Tactile macOS Sand Noise Grain Overlay */}
      <svg className="absolute inset-0 w-full h-full pointer-events-none opacity-[0.035] mix-blend-multiply z-0">
        <filter id="sand-noise-footer-3d">
          <feTurbulence type="fractalNoise" baseFrequency="0.8" numOctaves="4" stitchTiles="stitch" />
          <feColorMatrix type="saturate" values="0" />
        </filter>
        <rect width="100%" height="100%" filter="url(#sand-noise-footer-3d)" />
      </svg>

      {/* Main Content Container */}
      <div className="relative z-20 w-full max-w-[1400px] mx-auto px-6 md:px-16 space-y-14 pb-12">
        
        {/* Top Header Bar: Clean Transparent Logo, Ultra-Sleek Countdown Readout & Back to Top */}
        <div className="flex flex-col md:flex-row justify-between items-center pb-8 border-b border-[#761D19]/15 space-y-4 md:space-y-0 text-xs font-sans">
          
          {/* Brand Logo Image logo.webp without any background box */}
          <a href="#hero" onClick={(e) => handleLinkClick(e, '#hero')} className="flex items-center hover:opacity-80 transition-opacity">
            <img
              src="/img/logo.webp"
              alt="ilê logo"
              className="h-7 md:h-8 w-auto object-contain pointer-events-none select-none"
            />
          </a>

          {/* Ultra-Sleek Editorial Countdown Readout */}
          <div className="flex flex-wrap items-center justify-center space-x-2.5 text-[#262626]/75 tracking-[0.18em] uppercase font-sans font-medium text-[11px]">
            <span className="w-2 h-2 rounded-full bg-[#990000] animate-pulse" />
            <span>Lançamento ilê 1.0 — 20 de Agosto</span>
            <span className="text-[#761D19]/40">•</span>
            <span>Faltam</span>
            <span className="font-mono font-bold text-[#761D19] tracking-normal text-xs bg-[#761D19]/8 px-2.5 py-1 rounded">
              {countdown.days}d {String(countdown.hours).padStart(2, '0')}h {String(countdown.minutes).padStart(2, '0')}m {String(countdown.seconds).padStart(2, '0')}s
            </span>
          </div>

          {/* Back to Top */}
          <button
            onClick={scrollToTop}
            className="flex items-center space-x-1.5 text-[#262626]/75 hover:text-[#761D19] transition-colors group cursor-pointer"
          >
            <span>Voltar ao topo</span>
            <ArrowUp className="w-3.5 h-3.5 group-hover:-translate-y-0.5 transition-transform" />
          </button>
        </div>

        {/* Main Content Grid: Clean Organized Links & Refined Editorial CTA */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start pt-2">
          
          {/* Navigation Links Columns */}
          <div className="lg:col-span-6 grid grid-cols-2 sm:grid-cols-3 gap-8">
            
            {/* Column 1: Navegação */}
            <div className="space-y-4">
              <h4 className="text-[11px] font-sans tracking-[0.22em] uppercase font-semibold text-[#761D19]">
                Navegação
              </h4>
              <ul className="space-y-2.5 text-xs font-sans font-light text-[#262626]/80">
                <li>
                  <a href="#hero" onClick={(e) => handleLinkClick(e, '#hero')} className="hover:text-[#990000] transition-colors">
                    Início
                  </a>
                </li>
                <li>
                  <a href="#manifesto" onClick={(e) => handleLinkClick(e, '#manifesto')} className="hover:text-[#990000] transition-colors">
                    Manifesto
                  </a>
                </li>
                <li>
                  <a href="#galeria" onClick={(e) => handleLinkClick(e, '#galeria')} className="hover:text-[#990000] transition-colors">
                    Galeria Litúrgica
                  </a>
                </li>
                <li>
                  <a href="#tradicao" onClick={(e) => handleLinkClick(e, '#tradicao')} className="hover:text-[#990000] transition-colors">
                    Valores &amp; Fundamentos
                  </a>
                </li>
              </ul>
            </div>

            {/* Column 2: Soluções */}
            <div className="space-y-4">
              <h4 className="text-[11px] font-sans tracking-[0.22em] uppercase font-semibold text-[#761D19]">
                Soluções
              </h4>
              <ul className="space-y-2.5 text-xs font-sans font-light text-[#262626]/80">
                <li>
                  <button onClick={onOpenDemo} className="hover:text-[#990000] transition-colors text-left">
                    Gestão Financeira
                  </button>
                </li>
                <li>
                  <button onClick={onOpenDemo} className="hover:text-[#990000] transition-colors text-left">
                    Carteirinha Digital
                  </button>
                </li>
                <li>
                  <button onClick={onOpenDemo} className="hover:text-[#990000] transition-colors text-left">
                    Acervo de Pontos
                  </button>
                </li>
                <li>
                  <button onClick={onOpenDemo} className="hover:text-[#990000] transition-colors text-left">
                    Calendário de Giras
                  </button>
                </li>
              </ul>
            </div>

            {/* Column 3: Institucional */}
            <div className="space-y-4">
              <h4 className="text-[11px] font-sans tracking-[0.22em] uppercase font-semibold text-[#761D19]">
                Institucional
              </h4>
              <ul className="space-y-2.5 text-xs font-sans font-light text-[#262626]/80">
                <li>
                  <a href="#galeria" onClick={(e) => handleLinkClick(e, '#galeria')} className="hover:text-[#990000] transition-colors">
                    Sobre o Criador
                  </a>
                </li>
                <li>
                  <button onClick={onOpenDemo} className="hover:text-[#990000] transition-colors text-left">
                    Fila de Prioridade
                  </button>
                </li>
                <li>
                  <button onClick={onOpenDemo} className="hover:text-[#990000] transition-colors text-left">
                    Suporte &amp; Dúvidas
                  </button>
                </li>
              </ul>
            </div>

          </div>

          {/* Right Column: Refined Editorial Headline with Line Break & Upgraded 3D Glassmorphic Pill Button */}
          <div className="lg:col-span-6 space-y-6 lg:text-right flex flex-col lg:items-end">
            
            {/* Headline with requested line break */}
            <h3 className="font-serif text-3xl sm:text-4xl md:text-5xl leading-[1.08] tracking-tight text-[#262626]">
              Vamos transformar <br />
              a gestão do <span className="font-serif italic font-normal text-[#990000]">seu ilê</span>?
            </h3>

            {/* Refined Copy Above Button */}
            <p className="font-sans text-sm font-light text-[#262626]/75 max-w-md leading-relaxed">
              Garanta sua vaga na fila de prioridade e seja um dos primeiros terreiros a transformar a gestão da sua casa sagrada com o <span className="font-semibold text-[#761D19]">ilê</span>.
            </p>

            <div className="pt-2">
              {/* Sleek Glassmorphic Pill Button */}
              <button
                onClick={onOpenDemo}
                className="relative inline-flex items-center space-x-3.5 bg-gradient-to-r from-[#B81D18] via-[#990000] to-[#761D19] text-[#F7F1E6] px-8 py-4 rounded-full text-xs sm:text-sm font-sans font-medium tracking-wide border border-white/60 shadow-[0_10px_24px_-6px_rgba(118,29,25,0.45),inset_0_1px_2px_rgba(255,255,255,0.5)] hover:shadow-[-8px_14px_32px_-4px_rgba(118,29,25,0.65),inset_0_1px_2px_rgba(255,255,255,0.75)] hover:scale-[1.02] active:scale-[0.98] transition-all duration-300 group cursor-pointer overflow-hidden"
              >
                {/* Inner Glass Flare Radial Layer */}
                <span className="absolute inset-0 rounded-full bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-white/30 via-transparent to-transparent pointer-events-none" />

                <span className="relative z-10">Garantir Acesso Antecipado</span>
                <ArrowRight className="relative z-10 w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </button>
            </div>

          </div>

        </div>

        {/* Bottom Hairline & Copyright */}
        <div className="pt-8 border-t border-[#761D19]/15 flex flex-col sm:flex-row justify-between items-center text-xs font-sans font-light text-[#262626]/70 space-y-4 sm:space-y-0 relative z-30">
          <span>© {new Date().getFullYear()} ilê. Todos os direitos reservados.</span>
          <div className="flex items-center space-x-6">
            <a href="#" onClick={(e) => { e.preventDefault(); onOpenDemo?.(); }} className="hover:text-[#990000] transition-colors">
              Política de Privacidade
            </a>
            <a href="#" onClick={(e) => { e.preventDefault(); onOpenDemo?.(); }} className="hover:text-[#990000] transition-colors">
              Termos &amp; Condições
            </a>
          </div>
        </div>

      </div>

      {/* GIGANTIC WATERMARK LOGO & ANIMATED ESPADA DE SÃO JORGE LEAVES COMPOSITION */}
      <div className="relative w-full h-[260px] sm:h-[320px] md:h-[380px] overflow-hidden select-none pointer-events-none mt-2">
        
        {/* Layer 1: Watermark LOGO (logo.webp) with Gradient Fade Transparency (middle to bottom) */}
        <div className="absolute inset-0 flex items-center justify-center z-0 pb-10 pointer-events-none">
          <img
            src="/img/logo.webp"
            alt="ilê watermark"
            className="h-[22vw] md:h-[15vw] max-h-[240px] w-auto object-contain opacity-[0.14] filter grayscale brightness-0 select-none pointer-events-none"
            style={{
              maskImage: 'linear-gradient(to bottom, rgba(0, 0, 0, 1) 25%, rgba(0, 0, 0, 0) 88%)',
              WebkitMaskImage: 'linear-gradient(to bottom, rgba(0, 0, 0, 1) 25%, rgba(0, 0, 0, 0) 88%)',
            }}
          />
        </div>

        {/* Layer 2: Espada de São Jorge Leaves (footer.webp) rising smoothly on scroll covering the bottom of the logo */}
        <div
          ref={leavesRef}
          className="absolute bottom-0 left-0 right-0 w-full h-[180px] sm:h-[240px] md:h-[300px] z-10 overflow-hidden flex items-end justify-center pointer-events-none"
        >
          <img
            src="/img/footer.webp"
            alt="Espada de São Jorge"
            className="w-full h-full object-contain object-bottom filter contrast-[1.05] brightness-[1.02]"
          />
        </div>

      </div>

    </footer>
  )
}
