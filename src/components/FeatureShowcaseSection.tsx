import { useRef, useEffect } from 'react'
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
    description: 'Gestão de mensalistas, dízimos e recibos digitais sem complicação.',
    previewImg: '/img/finan.png',
  },
  {
    id: 2,
    category: 'BIBLIOTECA DE PONTOS',
    title: 'Acervo de Pontos Cantados',
    description: 'Letras e áudios litúrgicos organizados por linha de trabalho.',
    previewImg: '/img/pontos.png',
  },
  {
    id: 3,
    category: 'IDENTIDADE & RESPEITO',
    title: 'Criado para a Nossa Tradição',
    description: 'Feito do zero por quem é de axé, respeitando o fundamento da casa.',
    previewImg: '/img/3.jpg',
  },
  {
    id: 4,
    category: 'CALENDÁRIO',
    title: 'Giras & Festas Litúrgicas',
    description: 'Escalas de trabalho, calendário de giras e homenagens aos orixás.',
    previewImg: '/img/2.jpg',
  },
]

export const FeatureShowcaseSection = () => {
  const containerRef = useRef<HTMLDivElement>(null)
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const oxalaRef = useRef<HTMLImageElement>(null)
  const yemanjanRef = useRef<HTMLImageElement>(null)

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
          scrollTrigger: {
            trigger: container,
            start: 'top 85%',
            end: 'center 45%',
            scrub: 1.2,
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
          scrollTrigger: {
            trigger: container,
            start: 'top 85%',
            end: 'center 45%',
            scrub: 1.2,
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
        r: Math.random() * 1.6 + 0.6,
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
    <section
      ref={containerRef}
      className="light-bg-section relative w-full min-h-screen bg-[#F7F1E6] text-[#262626] py-16 md:py-24 px-6 md:px-16 overflow-hidden flex flex-col justify-center select-none"
    >
      <svg className="absolute inset-0 w-full h-full pointer-events-none opacity-[0.035] mix-blend-multiply">
        <filter id="sand-noise-showcase-smooth">
          <feTurbulence type="fractalNoise" baseFrequency="0.8" numOctaves="4" stitchTiles="stitch" />
          <feColorMatrix type="saturate" values="0" />
        </filter>
        <rect width="100%" height="100%" filter="url(#sand-noise-showcase-smooth)" />
      </svg>

      <div className="absolute left-[-100px] bottom-0 w-[550px] h-[550px] bg-gradient-to-tr from-[#761D19]/15 via-[#761D19]/05 to-transparent rounded-full blur-3xl pointer-events-none" />
      <div className="absolute right-[-100px] bottom-0 w-[550px] h-[550px] bg-gradient-to-tl from-[#761D19]/15 via-[#761D19]/05 to-transparent rounded-full blur-3xl pointer-events-none" />

      <canvas
        ref={canvasRef}
        className="absolute inset-0 w-full h-full pointer-events-none z-0"
      />

      <div className="hidden lg:flex absolute left-[-4vw] xl:left-[-2vw] bottom-0 pointer-events-none z-10 items-end justify-start max-w-[42vw]">
        <img
          ref={oxalaRef}
          src="/img/oxala.png"
          alt="Oxalá"
          className="h-[95vh] max-h-[920px] w-auto object-contain object-bottom filter drop-shadow-2xl scale-105"
        />
      </div>

      <div className="hidden lg:flex absolute right-[-4vw] xl:right-[-2vw] bottom-0 pointer-events-none z-10 items-end justify-end max-w-[42vw]">
        <img
          ref={yemanjanRef}
          src="/img/yeman.png"
          alt="Yemanjá"
          className="h-[95vh] max-h-[920px] w-auto object-contain object-bottom filter drop-shadow-2xl scale-105"
        />
      </div>

      <div className="relative z-20 w-full max-w-[1280px] mx-auto flex-1 flex flex-col justify-center items-center py-12 md:py-16">
        <div className="max-w-[620px] w-full mx-auto space-y-7 text-center">
          
          <div className="text-xs md:text-sm font-sans tracking-[0.25em] uppercase font-semibold text-[#761D19]">
            — TECNOLOGIA LITÚRGICA —
          </div>

          <h2 className="font-serif text-3xl sm:text-4xl md:text-5xl lg:text-6xl leading-[1.06] tracking-tight text-[#262626]">
            Projetado para as Necessidades do <span className="font-serif italic font-normal text-[#990000]">Seu ilê</span>.
          </h2>

          <p className="font-sans text-sm md:text-base font-light text-[#262626]/75 max-w-lg mx-auto leading-relaxed">
            Passe o cursor sobre os módulos abaixo para visualizar como simplificamos a gestão sagrada e comunitária do seu terreiro.
          </p>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2 text-left">
            {features.map((item, idx) => {
              const isLeftCard = idx % 2 === 0
              return (
                <div
                  key={item.id}
                  className="group relative bg-[#F7F1E6] border border-white/80 hover:border-white p-5 sm:p-6 rounded-2xl md:rounded-3xl shadow-[0_8px_25px_-6px_rgba(0,0,0,0.06),0_2px_8px_-2px_rgba(118,29,25,0.04)] hover:shadow-[0_16px_35px_-8px_rgba(118,29,25,0.12),0_4px_16px_-4px_rgba(0,0,0,0.06)] transition-all duration-300 hover:-translate-y-1 cursor-pointer"
                >
                  {/* Vertical Portrait Preview Tooltip: Left Card shows to the Left, Right Card shows to the Right with Fade In/Out */}
                  <div
                    className={`absolute top-1/2 -translate-y-1/2 ${
                      isLeftCard
                        ? '-left-32 md:-left-36 group-hover:-translate-x-2'
                        : '-right-32 md:-right-36 group-hover:translate-x-2'
                    } w-28 h-36 md:w-32 md:h-44 rounded-2xl p-1 bg-white/95 backdrop-blur-md border border-white shadow-[0_15px_35px_rgba(118,29,25,0.18)] opacity-0 scale-90 pointer-events-none group-hover:opacity-100 group-hover:scale-100 transition-all duration-300 ease-out z-40 overflow-hidden hidden sm:block`}
                  >
                    <img
                      src={item.previewImg}
                      alt={item.title}
                      className="w-full h-full object-cover object-center rounded-xl filter contrast-[1.05]"
                    />
                  </div>

                  <div className="absolute inset-0 bg-gradient-to-br from-white/50 via-transparent to-transparent pointer-events-none rounded-[inherit]" />

                  <div className="flex items-center justify-between mb-2 relative z-10">
                    <span className="text-[10px] font-sans tracking-[0.2em] uppercase font-semibold text-[#761D19]">
                      {item.category}
                    </span>
                    <ArrowUpRight className="w-4 h-4 text-[#761D19]/50 group-hover:text-[#761D19] group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-all" />
                  </div>

                  <h3 className="font-serif text-lg md:text-xl font-normal text-[#262626] mb-1 group-hover:text-[#990000] transition-colors relative z-10">
                    {item.title}
                  </h3>

                  <p className="text-xs font-sans font-light text-[#262626]/80 leading-relaxed relative z-10">
                    {item.description}
                  </p>
                </div>
              )
            })}
          </div>

        </div>
      </div>
    </section>
  )
}
