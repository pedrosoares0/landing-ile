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
    src: '/img/2.jpg',
    tag: 'CALENDÁRIO & EVENTOS',
    aspect: 'w-[210px] h-[280px]',
    positionStyle: 'self-start mt-[4vh]',
  },

  // 2. Photo 2.jpg (Low bottom)
  {
    id: 2,
    src: '/img/1.jpg',
    tag: 'TRADIÇÃO DIGITAL',
    aspect: 'w-[180px] h-[180px]',
    positionStyle: 'self-end mb-[10vh]',
  },

  // 3. Photo 3.jpg (Mid top)
  {
    id: 3,
    src: '/img/3.jpg',
    tag: 'PAINEL DO SACERDOTE',
    aspect: 'w-[240px] h-[310px]',
    positionStyle: 'self-start mt-[12vh]',
  },

  // 4. ALEX.JPG — HERO CARD (Founder Card)
  {
    id: 4,
    src: '/img/alex.jpg',
    tag: 'VIVÊNCIA & PROPÓSITO',
    aspect: 'w-[420px] h-[520px]',
    positionStyle: 'self-start mt-[2vh]',
    quote: 'Alex, o fundador - Praticante e que vive a rotina do ilê na pele. Desenvolveu a plataforma que a própria comunidade necessitava.',
  },

  // 5. Photo 4.jpg (Horizontal landscape)
  {
    id: 5,
    src: '/img/4.jpg',
    tag: 'ORGANIZAÇÃO LITÚRGICA',
    aspect: 'w-[300px] h-[200px]',
    positionStyle: 'self-start mt-[6vh]',
  },

  // 6. Photo 5.jpg (Carteirinha digital)
  {
    id: 6,
    src: '/img/5.jpg',
    tag: 'CARTEIRINHA DIGITAL',
    aspect: 'w-[270px] h-[270px]',
    positionStyle: 'self-end mb-[6vh]',
    topQuote: 'A tradição não se opõe à tecnologia. Ela se fortalece através dela.',
  },

  // 7. Photo 6.jpg (Dashboard)
  {
    id: 7,
    src: '/img/63.png',
    tag: 'GESTÃO INTELIGENTE',
    aspect: 'w-[220px] h-[290px]',
    positionStyle: 'self-start mt-[14vh]',
  },

  // 8. Photo 7.jpg (Ancestrality)
  {
    id: 8,
    src: '/img/divindades.png',
    tag: 'ANCESTRALIDADE & AXÉ',
    aspect: 'w-[260px] h-[330px]',
    positionStyle: 'self-end mb-[12vh]',
  },

  // 9. Photo 8.jpg (Privacy)
  {
    id: 9,
    src: '/img/8.jpg',
    tag: 'SIGILO & PRIVACIDADE',
    aspect: 'w-[190px] h-[190px]',
    positionStyle: 'self-start mt-[4vh]',
  },

  // 10. Photo 9.jpg (Ending card)
  {
    id: 10,
    src: '/img/9.jpg',
    tag: 'HARMONIA NO ILÊ',
    aspect: 'w-[360px] h-[450px]',
    positionStyle: 'self-start mt-[8vh]',
    quote: 'A tecnologia a serviço da ancestralidade, da harmonia & da paz do seu Ilê.',
  },
]

export const HorizontalGallerySection = () => {
  const targetRef = useRef<HTMLDivElement>(null)
  const trackRef = useRef<HTMLDivElement>(null)
  const canvasRef = useRef<HTMLCanvasElement>(null)

  // GSAP ScrollTrigger Pinned Horizontal Scroll Engine with Fluid Scrub & Fade In/Out
  useEffect(() => {
    const ctx = gsap.context(() => {
      const track = trackRef.current
      const target = targetRef.current
      if (!track || !target) return

      const getScrollAmount = () => {
        return track.scrollWidth - window.innerWidth + 160
      }

      // Main Horizontal Track Tween (scrub: 0.4 for smooth, non-stuck fluid scroll)
      const trackTween = gsap.to(track, {
        x: () => -getScrollAmount(),
        ease: 'none',
        scrollTrigger: {
          trigger: target,
          start: 'top top',
          end: () => `+=${getScrollAmount() * 1.15}`,
          pin: true,
          scrub: 0.4,
          invalidateOnRefresh: true,
        },
      })

      // Smooth Fade-In Animation for each gallery card as it moves into viewport
      const itemCards = track.querySelectorAll('.gallery-card-item')
      itemCards.forEach((card) => {
        gsap.fromTo(
          card,
          { opacity: 0.15, scale: 0.94, y: 15 },
          {
            opacity: 1,
            scale: 1,
            y: 0,
            ease: 'power2.out',
            scrollTrigger: {
              trigger: card,
              containerAnimation: trackTween,
              start: 'left 98%',
              end: 'left 60%',
              scrub: 0.4,
            },
          }
        )
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
              className={`gallery-card-item relative flex flex-col justify-start shrink-0 ${item.positionStyle} transition-transform duration-500 hover:scale-[1.015]`}
            >
              {/* Quote ABOVE the photo frame if topQuote exists */}
              {item.topQuote && (
                <div className="-mt-20 md:-mt-24 mb-4 max-w-[340px] select-none">
                  <p className="font-serif text-lg md:text-xl lg:text-2xl text-[#262626] leading-[1.2] italic font-normal">
                    "{item.topQuote}"
                  </p>
                </div>
              )}

              {/* Subtle Micro-Tag (Soft Muted Beige/Taupe Tone) */}
              {item.tag && (
                <div className="mb-1.5 text-[9px] md:text-[10px] font-sans font-medium tracking-[0.2em] uppercase text-[#8C7A6B] select-none flex items-center space-x-1.5 opacity-80">
                  <span className="w-1 h-1 rounded-full bg-[#8C7A6B]/50" />
                  <span>{item.tag}</span>
                </div>
              )}

              {/* Photo Frame: Smooth Rounded Corners, Glass Border, Stronger Soft Shadow */}
              <div
                className={`relative ${item.aspect} overflow-hidden rounded-2xl md:rounded-[1.75rem] border border-white/80 bg-[#262626]/5 shadow-[0_18px_45px_-8px_rgba(0,0,0,0.16),0_6px_20px_-4px_rgba(118,29,25,0.08)] hover:shadow-[0_28px_60px_-10px_rgba(0,0,0,0.24),0_8px_24px_-4px_rgba(118,29,25,0.14)] transition-all duration-500 group`}
              >
                {/* Glass Light Reflection / Border Glow Layer */}
                <div className="absolute inset-0 z-10 pointer-events-none rounded-[inherit] ring-1 ring-inset ring-white/60 bg-gradient-to-b from-white/25 via-transparent to-black/10" />

                <img
                  src={item.src}
                  alt={item.tag}
                  className="w-full h-full object-cover object-center filter contrast-[1.05] brightness-[0.97] group-hover:scale-[1.04] transition-transform duration-700 ease-out pointer-events-none select-none"
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
