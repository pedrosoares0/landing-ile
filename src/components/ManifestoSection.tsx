import { useEffect, useRef } from 'react'
import { ArrowRight } from 'lucide-react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

interface ManifestoSectionProps {
  onOpenDemo?: () => void
}

export const ManifestoSection = ({ onOpenDemo }: ManifestoSectionProps) => {
  const sectionRef = useRef<HTMLDivElement>(null)
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const headlineRef = useRef<HTMLHeadingElement>(null)
  const textBodyRef = useRef<HTMLParagraphElement>(null)
  const buttonRef = useRef<HTMLDivElement>(null)

  // Floating subtle ember / dust particles on #F7F1E6 background (alive & warm)
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

    // 45 subtle particles for alive, warm background atmosphere
    for (let i = 0; i < 45; i++) {
      particles.push({
        x: Math.random() * canvas.width,
        y: Math.random() * canvas.height,
        r: Math.random() * 1.8 + 0.6,
        opacity: Math.random() * 0.28 + 0.1,
        speedY: -(Math.random() * 0.25 + 0.1),
        speedX: (Math.random() - 0.5) * 0.15,
        pulse: Math.random() * Math.PI * 2,
      })
    }

    const render = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height)

      for (const p of particles) {
        p.y += p.speedY
        p.x += p.speedX
        p.pulse += 0.025

        if (p.y < -10) p.y = canvas.height + 10
        if (p.x < -10) p.x = canvas.width + 10
        if (p.x > canvas.width + 10) p.x = -10

        const currentOpacity = p.opacity + Math.sin(p.pulse) * 0.1

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

  // GSAP ScrollTrigger Animations for Words, Paragraph & Button
  useEffect(() => {
    const ctx = gsap.context(() => {
      // 1. Headline words reveal with scrub animation
      const words = headlineRef.current?.querySelectorAll('.scroll-word')
      if (words && words.length > 0) {
        gsap.fromTo(
          words,
          {
            opacity: 0.3,
            y: 22,
          },
          {
            opacity: 1,
            y: 0,
            duration: 0.8,
            stagger: 0.07,
            scrollTrigger: {
              trigger: headlineRef.current,
              start: 'top 82%',
              end: 'bottom 48%',
              scrub: 0.6,
            },
          }
        )
      }

      // 2. Paragraph reveal
      if (textBodyRef.current) {
        gsap.fromTo(
          textBodyRef.current,
          { opacity: 0, y: 30 },
          {
            opacity: 1,
            y: 0,
            duration: 1,
            ease: 'power3.out',
            scrollTrigger: {
              trigger: textBodyRef.current,
              start: 'top 85%',
            },
          }
        )
      }

      // 3. Button reveal
      if (buttonRef.current) {
        gsap.fromTo(
          buttonRef.current,
          { opacity: 0, y: 24, scale: 0.95 },
          {
            opacity: 1,
            y: 0,
            scale: 1,
            duration: 0.9,
            ease: 'power3.out',
            scrollTrigger: {
              trigger: buttonRef.current,
              start: 'top 90%',
            },
          }
        )
      }
    }, sectionRef)

    return () => ctx.revert()
  }, [])

  return (
    <section
      id="manifesto"
      ref={sectionRef}
      className="light-bg-section relative w-full bg-[#F7F1E6] text-[#262626] py-36 md:py-48 px-6 sm:px-12 flex flex-col items-center justify-center overflow-hidden"
    >
      {/* 1. Ambient Slow-Breathing Crimson Glow in Background */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] sm:w-[900px] h-[400px] sm:h-[550px] bg-[#761D19]/[0.05] rounded-full blur-[160px] pointer-events-none animate-pulse-slow z-0" />

      {/* 2. Ultra-Subtle Watermark Logo Emblem in Background (opacity 0.018 for delicate whisper watermark) */}
      <div className="absolute inset-0 flex items-center justify-center z-0 pointer-events-none opacity-[0.018] select-none">
        <img
          src="/img/logo.webp"
          alt="ilê watermark"
          className="h-[35vw] max-h-[420px] w-auto object-contain filter grayscale brightness-0"
        />
      </div>

      {/* 3. Tactile macOS Sand Noise Grain Overlay */}
      <svg className="absolute inset-0 w-full h-full pointer-events-none opacity-[0.035] mix-blend-multiply z-0">
        <filter id="sand-noise-manifesto-v3">
          <feTurbulence type="fractalNoise" baseFrequency="0.8" numOctaves="4" stitchTiles="stitch" />
          <feColorMatrix type="saturate" values="0" />
        </filter>
        <rect width="100%" height="100%" filter="url(#sand-noise-manifesto-v3)" />
      </svg>

      {/* 4. Soft Mystical Ember Particles Canvas */}
      <canvas
        ref={canvasRef}
        className="absolute inset-0 w-full h-full pointer-events-none z-0"
      />

      {/* Content Container */}
      <div className="relative z-10 max-w-4xl mx-auto text-center space-y-8 select-none flex flex-col items-center">
        
        {/* Clean Section Eyebrow Header */}
        <div className="text-xs md:text-sm font-sans tracking-[0.25em] uppercase font-semibold text-[#761D19]">
          — MANIFESTO ILÊ —
        </div>

        {/* Main Persuasive Headline */}
        <h2
          ref={headlineRef}
          className="font-serif text-4xl sm:text-5xl md:text-6xl lg:text-7xl xl:text-[4.5rem] leading-[1.06] tracking-tight text-[#262626] max-w-4xl mx-auto"
        >
          {/* Line 1: A sua fé não exige caos. */}
          <div className="block">
            <span className="scroll-word inline-block">A</span>{' '}
            <span className="scroll-word inline-block">sua</span>{' '}
            <span className="scroll-word inline-block">fé</span>{' '}
            <span className="scroll-word italic font-serif inline-block">não exige</span>{' '}
            <span className="scroll-word inline-block">caos.</span>
          </div>

          {/* Line 2: Deixe o ilê organizar a casa. (Red #990000 accent) */}
          <div className="block mt-2 sm:mt-3 text-[#990000]">
            <span className="scroll-word inline-block">Deixe</span>{' '}
            <span className="scroll-word inline-block">o</span>{' '}
            <span className="scroll-word italic font-serif inline-block text-[#990000]">ilê</span>{' '}
            <span className="scroll-word inline-block">organizar</span>{' '}
            <span className="scroll-word inline-block">a</span>{' '}
            <span className="scroll-word inline-block">casa.</span>
          </div>
        </h2>

        {/* Persuasive Paragraph */}
        <p
          ref={textBodyRef}
          className="max-w-3xl mx-auto text-base sm:text-lg md:text-xl font-sans font-light text-[#262626]/80 leading-relaxed pt-2"
        >
          Grupos e mais grupos de Whatsapp lotados, mensalidades em planilhas e complicação para agendar um evento.{' '}
          <span className="text-[#761D19] font-normal">
            Dirigir uma casa sagrada é um ato de devoção, não uma batalha administrativa.
          </span>{' '}
          O <span className="italic font-serif font-normal text-[#262626]">ilê</span> foi projetado para eliminar a desorganização e devolver o foco só no axé.
        </p>

        {/* Sleek Glassmorphic Pill Button Positioned Directly Below Manifesto Text */}
        <div ref={buttonRef} className="pt-6">
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
