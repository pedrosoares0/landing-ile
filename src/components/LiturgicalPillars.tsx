import { useEffect, useRef } from 'react'
import { motion } from 'framer-motion'
import { ArrowRight } from 'lucide-react'

const PILLARS = [
  {
    imageSrc: '/img/concha.webp',
    title: 'Privacidade & Sigilo Litúrgico',
    description:
      'Criptografia total e sigilo absoluto. Os dados de médiuns, mensalidades e fundamentos pertencem unicamente ao seu terreiro.',
    badge: 'Segurança Total',
    hoverShadow: 'hover:shadow-[0_22px_50px_-8px_rgba(165,120,80,0.42)]',
  },
  {
    imageSrc: '/img/folha.webp',
    title: 'Desenvolvido no Respeito',
    description:
      'Criado com orientação sacerdotal para respeitar integralmente as tradições do Candomblé (todas as nações) e da Umbanda.',
    badge: 'Fundamento Sacro',
    hoverShadow: 'hover:shadow-[0_22px_50px_-8px_rgba(34,139,34,0.4)]',
  },
  {
    imageSrc: '/img/coracao.webp',
    title: 'Acessível para Qualquer Terreiro',
    description:
      'Interface limpa, moderna e altamente intuitiva. Feito para ser usado por qualquer sacerdote ou médium sem complicação.',
    badge: 'Simplicidade & Axé',
    hoverShadow: 'hover:shadow-[0_22px_50px_-8px_rgba(235,175,30,0.48)]',
  },
]

interface LiturgicalPillarsProps {
  onOpenDemo?: () => void
}

export const LiturgicalPillars = ({ onOpenDemo }: LiturgicalPillarsProps) => {
  const canvasRef = useRef<HTMLCanvasElement>(null)

  // Soft Drifting Ember Particles Canvas
  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return
    const ctx = canvas.getContext('2d')
    if (!ctx) return

    let animId: number
    const particles: Array<{
      x: number
      y: number
      r: number
      opacity: number
      speedY: number
      speedX: number
      pulse: number
    }> = []

    const resize = () => {
      canvas.width = canvas.offsetWidth
      canvas.height = canvas.offsetHeight
    }
    resize()
    window.addEventListener('resize', resize)

    for (let i = 0; i < 30; i++) {
      particles.push({
        x: Math.random() * canvas.width,
        y: Math.random() * canvas.height,
        r: Math.random() * 1.5 + 0.6,
        opacity: Math.random() * 0.22 + 0.08,
        speedY: -(Math.random() * 0.2 + 0.08),
        speedX: (Math.random() - 0.5) * 0.12,
        pulse: Math.random() * Math.PI * 2,
      })
    }

    const render = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height)

      for (const p of particles) {
        p.y += p.speedY
        p.x += p.speedX
        p.pulse += 0.02

        if (p.y < -10) p.y = canvas.height + 10
        if (p.x < -10) p.x = canvas.width + 10
        if (p.x > canvas.width + 10) p.x = -10

        const currentOpacity = p.opacity + Math.sin(p.pulse) * 0.08

        ctx.fillStyle = `rgba(118, 29, 25, ${Math.max(0.04, currentOpacity)})`
        ctx.beginPath()
        ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2)
        ctx.fill()
      }

      animId = requestAnimationFrame(render)
    }

    render()

    return () => {
      cancelAnimationFrame(animId)
      window.removeEventListener('resize', resize)
    }
  }, [])

  return (
    <section id="tradicao" className="light-bg-section py-24 md:py-32 relative bg-[#F7F1E6] text-[#262626] overflow-hidden select-none">
      
      {/* 1. Ambient Slow Crimson Glow in Background */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[450px] bg-[#761D19]/[0.05] rounded-full blur-[160px] pointer-events-none animate-pulse-slow z-0" />

      {/* 2. Tactile macOS Sand Noise Grain Overlay */}
      <svg className="absolute inset-0 w-full h-full pointer-events-none opacity-[0.035] mix-blend-multiply z-0">
        <filter id="sand-noise-pillars-v8">
          <feTurbulence type="fractalNoise" baseFrequency="0.8" numOctaves="4" stitchTiles="stitch" />
          <feColorMatrix type="saturate" values="0" />
        </filter>
        <rect width="100%" height="100%" filter="url(#sand-noise-pillars-v8)" />
      </svg>

      {/* 3. Soft Drifting Ember Particles Canvas */}
      <canvas
        ref={canvasRef}
        className="absolute inset-0 w-full h-full pointer-events-none z-0"
      />

      <div className="max-w-[1400px] mx-auto px-6 md:px-16 relative z-10 space-y-12 md:space-y-14 flex flex-col items-center">
        
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto space-y-4">
          <div className="text-xs font-sans tracking-[0.25em] uppercase font-semibold text-[#761D19]">
            — VALORES &amp; FUNDAMENTOS —
          </div>

          <h2 className="font-serif text-3xl sm:text-4xl md:text-5xl lg:text-6xl text-[#262626] leading-[1.06] tracking-tight">
            Tecnologia com Alma &amp; <span className="font-serif italic font-normal text-[#990000]">Respeito Sagrado</span>
          </h2>

          {/* Subtitle in Mona Sans font */}
          <p className="font-sans font-light text-base sm:text-lg md:text-xl text-[#262626]/80 max-w-2xl mx-auto leading-relaxed pt-1">
            “A tecnologia deve servir à preservação da memória, à harmonia da corrente e à paz de espírito do sacerdote.”
          </p>
        </div>

        {/* 3 Generous Glassmorphic Cards with Custom Themed Hover Shadows */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 w-full">
          {PILLARS.map((pillar, idx) => {
            return (
              <motion.div
                key={idx}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: idx * 0.1 }}
                className={`relative bg-white/60 backdrop-blur-xl border border-white/80 rounded-2xl p-8 sm:p-9 shadow-[0_8px_30px_rgb(0,0,0,0.04)] ${pillar.hoverShadow} hover:-translate-y-1.5 transition-all duration-300 flex flex-col justify-between group overflow-hidden`}
              >
                {/* Subtle Inner Glass Flare */}
                <div className="absolute inset-0 bg-gradient-to-br from-white/60 via-transparent to-transparent pointer-events-none rounded-2xl" />

                <div className="space-y-5 relative z-10">
                  
                  {/* Top Badge & Borderless Direct WebP Icon */}
                  <div className="flex items-center justify-between">
                    <img
                      src={pillar.imageSrc}
                      alt={pillar.title}
                      className="w-12 h-12 object-contain filter drop-shadow-md group-hover:scale-110 transition-transform duration-300"
                    />

                    <span className="text-[10px] font-sans font-semibold uppercase tracking-widest text-[#761D19] bg-[#761D19]/10 px-3 py-1 rounded-full border border-[#761D19]/20">
                      {pillar.badge}
                    </span>
                  </div>

                  <h3 className="font-serif text-2xl sm:text-3xl font-normal text-[#262626] group-hover:text-[#990000] transition-colors leading-snug">
                    {pillar.title}
                  </h3>

                  <p className="font-sans font-light text-xs sm:text-sm text-[#262626]/85 leading-relaxed">
                    {pillar.description}
                  </p>
                </div>
              </motion.div>
            )
          })}
        </div>

        {/* Sleek Premium 3D Glassmorphic CTA Button */}
        <div className="pt-4">
          <button
            onClick={onOpenDemo}
            className="relative inline-flex items-center space-x-3.5 bg-gradient-to-r from-[#B81D18] via-[#990000] to-[#761D19] text-[#F7F1E6] px-9 py-4 rounded-full text-xs sm:text-sm font-sans font-medium tracking-wide border border-white/60 shadow-[0_10px_24px_-6px_rgba(118,29,25,0.45),inset_0_1px_2px_rgba(255,255,255,0.5)] hover:shadow-[-8px_14px_32px_-4px_rgba(118,29,25,0.65),inset_0_1px_2px_rgba(255,255,255,0.75)] hover:scale-[1.02] active:scale-[0.98] transition-all duration-300 group cursor-pointer overflow-hidden"
          >
            {/* Inner Glass Flare Radial Layer */}
            <span className="absolute inset-0 rounded-full bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-white/30 via-transparent to-transparent pointer-events-none" />

            <span className="relative z-10">Garantir Acesso Antecipado</span>
            <ArrowRight className="relative z-10 w-4 h-4 group-hover:translate-x-1 transition-transform" />
          </button>
        </div>

      </div>
    </section>
  )
}
