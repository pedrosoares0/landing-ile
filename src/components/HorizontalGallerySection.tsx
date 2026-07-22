import { useEffect, useRef } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

interface GalleryItem {
  id: number
  src: string
  tag: string
  aspect: string
  positionStyle: string
  topQuote?: string
  quote?: string
}

const galleryItems: GalleryItem[] = [
  // 1. Photo 1.jpg (High top)
  {
    id: 1,
    src: '/img/1.jpg',
    tag: 'TRADIÇÃO ORAL, 2024',
    aspect: 'w-[210px] h-[280px]',
    positionStyle: 'self-start mt-[4vh]',
  },

  // 2. Photo 2.jpg (Low bottom)
  {
    id: 2,
    src: '/img/2.jpg',
    tag: 'CANTARIA & ATABAQUES',
    aspect: 'w-[180px] h-[180px]',
    positionStyle: 'self-end mb-[10vh]',
  },

  // 3. Photo 3.jpg (Mid top)
  {
    id: 3,
    src: '/img/3.jpg',
    tag: 'REGISTRO DE MÉDIUNS',
    aspect: 'w-[240px] h-[310px]',
    positionStyle: 'self-start mt-[12vh]',
  },

  // 4. ALEX.JPG — HERO CARD (Large hero with sharp 90° corners and clean quote below)
  {
    id: 4,
    src: '/img/alex.jpg',
    tag: 'ALEX — FUNDADOR DO ILÊ',
    aspect: 'w-[420px] h-[520px]',
    positionStyle: 'self-start mt-[2vh]',
    quote: 'Criado por Alex — praticante e desenvolvedor que vive a rotina do ilê na pele e construiu a plataforma que a própria comunidade necessitava.',
  },

  // 5. Photo 4.jpg (ORGANIZAÇÃO - High top right)
  {
    id: 5,
    src: '/img/4.jpg',
    tag: 'ORGANIZAÇÃO, 2024',
    aspect: 'w-[200px] h-[250px]',
    positionStyle: 'self-start mt-[6vh]',
  },

  // 6. Photo 5.jpg (CARTEIRINHA DIGITAL - Low bottom)
  {
    id: 6,
    src: '/img/5.jpg',
    tag: 'CARTEIRINHA DIGITAL',
    aspect: 'w-[270px] h-[270px]',
    positionStyle: 'self-end mb-[6vh]',
    topQuote: 'Kò sí ewé, kò sí axé. Honrar o orí e a caminhada de quem caminha junto.',
  },

  // 7. Photo 6.jpg (Middle offset)
  {
    id: 7,
    src: '/img/6.jpg',
    tag: 'TRANSPARÊNCIA LITÚRGICA',
    aspect: 'w-[220px] h-[290px]',
    positionStyle: 'self-start mt-[14vh]',
  },

  // 8. Photo 7.jpg (Low bottom)
  {
    id: 8,
    src: '/img/7.jpg',
    tag: 'CALENDÁRIO DE GIRAS',
    aspect: 'w-[260px] h-[330px]',
    positionStyle: 'self-end mb-[12vh]',
  },

  // 9. Photo 8.jpg (High top)
  {
    id: 9,
    src: '/img/8.jpg',
    tag: 'MENSALIDADES',
    aspect: 'w-[190px] h-[190px]',
    positionStyle: 'self-start mt-[4vh]',
  },

  // 10. Photo 9.jpg (Large ending card)
  {
    id: 10,
    src: '/img/9.jpg',
    tag: 'O FUTURO DO SEU ILÊ',
    aspect: 'w-[360px] h-[450px]',
    positionStyle: 'self-start mt-[8vh]',
    quote: 'A tradição não se opõe à tecnologia. Ela se fortalece através dela.',
  },
]

export const HorizontalGallerySection = () => {
  const targetRef = useRef<HTMLDivElement>(null)
  const trackRef = useRef<HTMLDivElement>(null)
  const canvasRef = useRef<HTMLCanvasElement>(null)

  // GSAP ScrollTrigger Pinned Horizontal Scroll Engine
  useEffect(() => {
    const ctx = gsap.context(() => {
      const track = trackRef.current
      const target = targetRef.current
      if (!track || !target) return

      const getScrollAmount = () => {
        return track.scrollWidth - window.innerWidth + 160
      }

      gsap.to(track, {
        x: () => -getScrollAmount(),
        ease: 'none',
        scrollTrigger: {
          trigger: target,
          start: 'top top',
          end: () => `+=${getScrollAmount()}`,
          pin: true,
          scrub: 1,
          invalidateOnRefresh: true,
        },
      })
    }, targetRef)

    return () => ctx.revert()
  }, [])

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

    for (let i = 0; i < 35; i++) {
      particles.push({
        x: Math.random() * canvas.width,
        y: Math.random() * canvas.height,
        r: Math.random() * 1.5 + 0.6,
        opacity: Math.random() * 0.25 + 0.08,
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
    <div
      ref={targetRef}
      className="light-bg-section relative w-full h-screen bg-[#F7F1E6] text-[#262626] overflow-hidden"
    >
      {/* 1. Tactile macOS Sand Noise Grain Overlay */}
      <svg className="absolute inset-0 w-full h-full pointer-events-none opacity-[0.035] mix-blend-multiply">
        <filter id="sand-noise-gallery">
          <feTurbulence type="fractalNoise" baseFrequency="0.8" numOctaves="4" stitchTiles="stitch" />
          <feColorMatrix type="saturate" values="0" />
        </filter>
        <rect width="100%" height="100%" filter="url(#sand-noise-gallery)" />
      </svg>

      {/* 2. Soft Drifting Ember Particles Canvas */}
      <canvas
        ref={canvasRef}
        className="absolute inset-0 w-full h-full pointer-events-none z-0"
      />

      {/* GSAP Horizontal Track Container */}
      <div className="relative w-full h-full flex items-center overflow-hidden z-10">
        
        <div
          ref={trackRef}
          className="flex items-start space-x-16 md:space-x-24 px-12 md:px-24 w-max h-full relative py-8"
        >
          {galleryItems.map((item) => (
            <div
              key={item.id}
              className={`relative flex flex-col justify-start shrink-0 ${item.positionStyle} transition-transform duration-500 hover:scale-[1.015]`}
            >
              {/* Quote ABOVE the photo frame if topQuote exists */}
              {item.topQuote && (
                <div className="mb-2 max-w-[270px] select-none">
                  <p className="font-serif text-sm md:text-base text-[#262626] leading-snug italic">
                    "{item.topQuote}"
                  </p>
                </div>
              )}

              {/* Micro Tag Above (Tiny uppercase editorial label matching Lando Norris ref) */}
              <div className="mb-1 text-[9px] md:text-[10px] font-sans tracking-[0.25em] uppercase font-semibold text-[#761D19]/70 select-none">
                {item.tag}
              </div>

              {/* Photo Frame: SHARP 90° CORNERS (rounded-none, zero border radius) */}
              <div className={`relative ${item.aspect} overflow-hidden rounded-none shadow-md border border-[#262626]/10 bg-[#262626]/5 group`}>
                <img
                  src={item.src}
                  alt={item.tag}
                  className="w-full h-full object-cover object-center filter contrast-[1.08] brightness-[0.95] group-hover:scale-105 transition-transform duration-700 ease-out pointer-events-none select-none"
                />
              </div>

              {/* Quote below photo if quote exists */}
              {item.quote && (
                <div className="mt-3 max-w-[400px] select-none">
                  <p className="font-serif text-sm md:text-base text-[#262626] leading-snug italic">
                    "{item.quote}"
                  </p>
                </div>
              )}

            </div>
          ))}
        </div>

      </div>
    </div>
  )
}
