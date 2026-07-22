import { useState, useRef, useEffect } from 'react'
import { motion, useSpring } from 'framer-motion'
import { ArrowUpRight } from 'lucide-react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

interface FeatureCard {
  id: number
  category: string
  title: string
  description: string
  previewImg: string
}

const features: FeatureCard[] = [
  {
    id: 1,
    category: 'FINANCEIRO',
    title: 'Mensalidades & Recibos',
    description: 'Gestão transparente de mensalistas e dízimos com emissão automática de recibos digitais.',
    previewImg: '/img/1.jpg',
  },
  {
    id: 2,
    category: 'CANTARIA',
    title: 'Acervo de Pontos Cantados',
    description: 'Letras, cifras e áudios litúrgicos organizados por orixá e linha de trabalho.',
    previewImg: '/img/2.jpg',
  },
  {
    id: 3,
    category: 'IDENTIDADE',
    title: 'Carteirinha & Ficha de Médiuns',
    description: 'Registro de filhos de santo, histórico de feitura e carteirinha digital com QR Code.',
    previewImg: '/img/5.jpg',
  },
  {
    id: 4,
    category: 'CALENDÁRIO',
    title: 'Giras & Festas Litúrgicas',
    description: 'Escala de trabalho, calendário de giras e organização de homenagens aos orixás.',
    previewImg: '/img/7.jpg',
  },
]

export const FeatureShowcaseSection = () => {
  const containerRef = useRef<HTMLDivElement>(null)
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const oxalaRef = useRef<HTMLImageElement>(null)
  const yemanjanRef = useRef<HTMLImageElement>(null)

  const [activeHoverImg, setActiveHoverImg] = useState<string | null>(null)

  // Spring tracking for mouse-following floating preview image
  const springConfig = { stiffness: 220, damping: 26 }
  const mouseX = useSpring(-300, springConfig)
  const mouseY = useSpring(-300, springConfig)

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!containerRef.current) return
    const rect = containerRef.current.getBoundingClientRect()
    mouseX.set(e.clientX - rect.left)
    mouseY.set(e.clientY - rect.top)
  }

  // GSAP ScrollTrigger: Extended Buttery Smooth Scrub Slide-In for Oxalá and Yemanjá
  useEffect(() => {
    const ctx = gsap.context(() => {
      const container = containerRef.current
      const oxala = oxalaRef.current
      const yemanja = yemanjanRef.current

      if (!container || !oxala || !yemanja) return

      // Oxalá slides in smoothly over extended scroll distance
      gsap.fromTo(
        oxala,
        { x: '-75%', opacity: 0 },
        {
          x: '0%',
          opacity: 1,
          ease: 'power1.out',
          scrollTrigger: {
            trigger: container,
            start: 'top 95%',
            end: 'center 40%',
            scrub: 2,
          },
        }
      )

      // Yemanjá slides in smoothly over extended scroll distance
      gsap.fromTo(
        yemanja,
        { x: '75%', opacity: 0 },
        {
          x: '0%',
          opacity: 1,
          ease: 'power1.out',
          scrollTrigger: {
            trigger: container,
            start: 'top 95%',
            end: 'center 40%',
            scrub: 2,
          },
        }
      )
    }, containerRef)

    return () => ctx.revert()
  }, [])

  // Soft Drifting Ember Particles Canvas Focused Behind Oxalá and Yemanjá
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
      side: 'left' | 'right'
    }> = []

    const resize = () => {
      canvas.width = canvas.offsetWidth
      canvas.height = canvas.offsetHeight
    }
    resize()
    window.addEventListener('resize', resize)

    // Generate 40 ember particles focused behind left (Oxalá) and right (Yemanjá)
    for (let i = 0; i < 40; i++) {
      const isLeft = i % 2 === 0
      particles.push({
        x: isLeft
          ? Math.random() * (canvas.width * 0.32)
          : canvas.width * 0.68 + Math.random() * (canvas.width * 0.32),
        y: Math.random() * canvas.height,
        r: Math.random() * 1.8 + 0.8,
        opacity: Math.random() * 0.28 + 0.1,
        speedY: -(Math.random() * 0.22 + 0.08),
        speedX: (Math.random() - 0.5) * 0.12,
        pulse: Math.random() * Math.PI * 2,
        side: isLeft ? 'left' : 'right',
      })
    }

    const render = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height)

      for (const p of particles) {
        p.y += p.speedY
        p.x += p.speedX
        p.pulse += 0.02

        if (p.y < -10) p.y = canvas.height + 10

        if (p.side === 'left') {
          if (p.x < -10 || p.x > canvas.width * 0.35) {
            p.x = Math.random() * (canvas.width * 0.3)
          }
        } else {
          if (p.x < canvas.width * 0.65 || p.x > canvas.width + 10) {
            p.x = canvas.width * 0.7 + Math.random() * (canvas.width * 0.3)
          }
        }

        const currentOpacity = p.opacity + Math.sin(p.pulse) * 0.09

        ctx.fillStyle = `rgba(118, 29, 25, ${Math.max(0.05, currentOpacity)})`
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
    <section
      ref={containerRef}
      onMouseMove={handleMouseMove}
      className="light-bg-section relative w-full min-h-screen bg-[#F7F1E6] text-[#262626] py-16 md:py-24 px-6 md:px-16 overflow-hidden flex flex-col justify-center select-none"
    >
      {/* 1. Tactile macOS Sand Noise Grain Overlay */}
      <svg className="absolute inset-0 w-full h-full pointer-events-none opacity-[0.035] mix-blend-multiply">
        <filter id="sand-noise-showcase-smooth">
          <feTurbulence type="fractalNoise" baseFrequency="0.8" numOctaves="4" stitchTiles="stitch" />
          <feColorMatrix type="saturate" values="0" />
        </filter>
        <rect width="100%" height="100%" filter="url(#sand-noise-showcase-smooth)" />
      </svg>

      {/* 2. Soft Backlight Glows Behind Oxalá (Left) & Yemanjá (Right) */}
      <div className="absolute left-[-100px] bottom-0 w-[550px] h-[550px] bg-gradient-to-tr from-[#761D19]/15 via-[#761D19]/05 to-transparent rounded-full blur-3xl pointer-events-none" />
      <div className="absolute right-[-100px] bottom-0 w-[550px] h-[550px] bg-gradient-to-tl from-[#761D19]/15 via-[#761D19]/05 to-transparent rounded-full blur-3xl pointer-events-none" />

      {/* 3. Soft Drifting Ember Particles Canvas Focused Behind Figures */}
      <canvas
        ref={canvasRef}
        className="absolute inset-0 w-full h-full pointer-events-none z-0"
      />

      {/* 4. Mouse-Following Floating Preview Image (SILKY SMOOTH SMOOTH TRANSITION, ALWAYS ABOVE CURSOR) */}
      <motion.div
        style={{
          left: mouseX,
          top: mouseY,
        }}
        animate={{
          scale: activeHoverImg ? 1 : 0.85,
          opacity: activeHoverImg ? 1 : 0,
          y: activeHoverImg ? 0 : 15,
        }}
        transition={{
          duration: 0.38,
          ease: [0.16, 1, 0.3, 1],
        }}
        className="pointer-events-none absolute z-50 -translate-x-1/2 -translate-y-[calc(100%+20px)] w-64 h-64 rounded-2xl p-1.5 bg-[#F7F1E6]/70 backdrop-blur-md border border-white/80 shadow-[0_25px_60px_rgba(118,29,25,0.25)] overflow-hidden"
      >
        {activeHoverImg && (
          <div className="w-full h-full rounded-xl overflow-hidden relative bg-[#262626]">
            <img
              src={activeHoverImg}
              alt="Feature Preview"
              className="w-full h-full object-cover object-center filter brightness-[0.98] contrast-[1.08]"
            />
            <div className="absolute inset-0 ring-1 ring-black/10 rounded-xl pointer-events-none" />
          </div>
        )}
      </motion.div>

      {/* Left Side Cutout Figure: Oxalá (LARGER & BLEEDING SLIGHTLY OFF-SCREEN LEFT) */}
      <div className="hidden lg:flex absolute left-[-4vw] xl:left-[-2vw] bottom-0 pointer-events-none z-10 items-end justify-start max-w-[42vw]">
        <img
          ref={oxalaRef}
          src="/img/oxala.png"
          alt="Oxalá"
          className="h-[95vh] max-h-[920px] w-auto object-contain object-bottom filter drop-shadow-2xl scale-105"
        />
      </div>

      {/* Right Side Cutout Figure: Yemanjá (LARGER & BLEEDING SLIGHTLY OFF-SCREEN RIGHT) */}
      <div className="hidden lg:flex absolute right-[-4vw] xl:right-[-2vw] bottom-0 pointer-events-none z-10 items-end justify-end max-w-[42vw]">
        <img
          ref={yemanjanRef}
          src="/img/yeman.png"
          alt="Yemanjá"
          className="h-[95vh] max-h-[920px] w-auto object-contain object-bottom filter drop-shadow-2xl scale-105"
        />
      </div>

      {/* Center Content Container (Vertically & Horizontally Balanced relative to Oxalá & Yemanjá) */}
      <div className="relative z-20 w-full max-w-[1280px] mx-auto flex-1 flex flex-col justify-center items-center py-12 md:py-16">
        <div className="max-w-[620px] w-full mx-auto space-y-7 text-center">
          
          {/* Eyebrow */}
          <div className="text-xs md:text-sm font-sans tracking-[0.25em] uppercase font-semibold text-[#761D19]">
            — TECNOLOGIA LITÚRGICA —
          </div>

          {/* Headline */}
          <h2 className="font-serif text-3xl sm:text-4xl md:text-5xl lg:text-6xl leading-[1.06] tracking-tight text-[#262626]">
            Projetado para as Necessidades do <span className="font-serif italic font-normal text-[#990000]">Seu ilê</span>.
          </h2>

          <p className="font-sans text-sm md:text-base font-light text-[#262626]/75 max-w-lg mx-auto leading-relaxed">
            Passe o cursor sobre os módulos abaixo para visualizar como simplificamos a gestão sagrada e comunitária do seu terreiro.
          </p>

          {/* 4 Interactive Solution Cards with Mouse-Following Preview Image */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2 text-left">
            {features.map((item) => (
              <div
                key={item.id}
                onMouseEnter={() => setActiveHoverImg(item.previewImg)}
                onMouseLeave={() => setActiveHoverImg(null)}
                className="group relative bg-[#F7F1E6]/95 border border-[#761D19]/20 hover:border-[#761D19]/60 p-5 rounded-none shadow-sm hover:shadow-md transition-all duration-300 cursor-pointer backdrop-blur-sm"
              >
                <div className="flex items-center justify-between mb-2">
                  <span className="text-[10px] font-sans tracking-[0.2em] uppercase font-semibold text-[#761D19]">
                    {item.category}
                  </span>
                  <ArrowUpRight className="w-4 h-4 text-[#761D19]/50 group-hover:text-[#761D19] group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-all" />
                </div>

                <h3 className="font-serif text-lg md:text-xl font-normal text-[#262626] mb-1 group-hover:text-[#990000] transition-colors">
                  {item.title}
                </h3>

                <p className="text-xs font-sans font-light text-[#262626]/75 leading-relaxed">
                  {item.description}
                </p>
              </div>
            ))}
          </div>

        </div>
      </div>
    </section>
  )
}
