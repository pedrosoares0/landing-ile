import { useState, useRef, useEffect } from 'react'
import { motion } from 'framer-motion'

interface TrailPoint {
  x: number
  y: number
  vx: number
  vy: number
  radius: number
  maxRadius: number
  opacity: number
  life: number
}

interface HeroProps {
  onOpenDemo: () => void
}

export const Hero = ({ onOpenDemo }: HeroProps) => {
  const containerRef = useRef<HTMLDivElement>(null)
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const topImgRef = useRef<HTMLImageElement | null>(null)

  const pointsRef = useRef<TrailPoint[]>([])
  const prevMouseRef = useRef({ x: -1000, y: -1000, time: Date.now() })
  const isHoveredRef = useRef(false)

  // Preload reveal image for Canvas source-in compositing
  useEffect(() => {
    const img = new Image()
    img.src = '/img/bghero-reveal.webp'
    img.onload = () => {
      topImgRef.current = img
    }
    if (img.complete) {
      topImgRef.current = img
    }
  }, [])

  // Global mouse tracking over Hero section
  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      if (!containerRef.current) return
      const rect = containerRef.current.getBoundingClientRect()

      if (
        e.clientX >= rect.left &&
        e.clientX <= rect.right &&
        e.clientY >= rect.top &&
        e.clientY <= rect.bottom
      ) {
        const x = e.clientX - rect.left
        const y = e.clientY - rect.top

        const now = Date.now()
        const dt = Math.max(1, now - prevMouseRef.current.time)

        const dx = x - prevMouseRef.current.x
        const dy = y - prevMouseRef.current.y
        const vx = dx / dt
        const vy = dy / dt
        const speed = Math.sqrt(vx * vx + vy * vy)

        prevMouseRef.current = { x, y, time: now }
        isHoveredRef.current = true

        const baseRadius = 110
        const dynamicRadius = Math.min(180, baseRadius + speed * 25)

        pointsRef.current.push({
          x,
          y,
          vx,
          vy,
          radius: dynamicRadius,
          maxRadius: dynamicRadius,
          opacity: 1,
          life: 1.0,
        })

        if (pointsRef.current.length > 75) {
          pointsRef.current.shift()
        }
      } else {
        isHoveredRef.current = false
      }
    }

    window.addEventListener('mousemove', handleMouseMove)
    return () => window.removeEventListener('mousemove', handleMouseMove)
  }, [])

  // High-performance HTML5 Canvas 2D render loop
  useEffect(() => {
    let animId: number

    const render = () => {
      const canvas = canvasRef.current
      const container = containerRef.current

      if (canvas && container) {
        const rect = container.getBoundingClientRect()
        const targetW = Math.floor(rect.width)
        const targetH = Math.floor(rect.height)

        if (canvas.width !== targetW || canvas.height !== targetH) {
          canvas.width = targetW
          canvas.height = targetH
        }

        const w = canvas.width
        const h = canvas.height
        const ctx = canvas.getContext('2d')

        if (ctx && w > 0 && h > 0) {
          ctx.clearRect(0, 0, w, h)

          const points = pointsRef.current
          for (let i = points.length - 1; i >= 0; i--) {
            const p = points[i]
            p.life -= 0.007
            p.radius = p.maxRadius * Math.pow(Math.max(0, p.life), 0.5)
            p.opacity = Math.pow(Math.max(0, p.life), 0.65)

            p.x += p.vx * 0.4
            p.y += p.vy * 0.4

            if (p.life <= 0 || p.radius <= 1.5) {
              points.splice(i, 1)
            }
          }

          // Render trail mask & composite top image with exact object-cover math
          if (points.length > 0) {
            ctx.save()

            // 1. Draw liquid trailing blobs in white
            ctx.globalCompositeOperation = 'source-over'
            for (const p of points) {
              const speed = Math.sqrt(p.vx * p.vx + p.vy * p.vy)
              const stretch = Math.min(1.5, 1 + speed * 0.25)
              const angle = Math.atan2(p.vy, p.vx)

              ctx.save()
              ctx.translate(p.x, p.y)
              ctx.rotate(angle)
              ctx.scale(stretch, 1 / Math.max(0.65, stretch * 0.65))

              const grad = ctx.createRadialGradient(0, 0, 0, 0, 0, p.radius)
              grad.addColorStop(0, `rgba(255, 255, 255, ${p.opacity})`)
              grad.addColorStop(0.65, `rgba(255, 255, 255, ${p.opacity * 0.85})`)
              grad.addColorStop(1, 'rgba(255, 255, 255, 0)')

              ctx.fillStyle = grad
              ctx.beginPath()
              ctx.arc(0, 0, p.radius, 0, Math.PI * 2)
              ctx.fill()
              ctx.restore()
            }

            // 2. Composite top image onto trail mask using 1:1 object-cover calculation
            if (topImgRef.current && topImgRef.current.complete) {
              ctx.globalCompositeOperation = 'source-in'

              const imgW = topImgRef.current.naturalWidth || w
              const imgH = topImgRef.current.naturalHeight || h
              const imgAspect = imgW / imgH
              const canvasAspect = w / h

              let drawW = w
              let drawH = h
              let offsetX = 0
              let offsetY = 0

              if (canvasAspect > imgAspect) {
                drawW = w
                drawH = w / imgAspect
                offsetY = (h - drawH) / 2
              } else {
                drawH = h
                drawW = h * imgAspect
                offsetX = (w - drawW) / 2
              }

              ctx.drawImage(topImgRef.current, offsetX, offsetY, drawW, drawH)
            }

            ctx.restore()
          }
        }
      }

      animId = requestAnimationFrame(render)
    }

    animId = requestAnimationFrame(render)
    return () => cancelAnimationFrame(animId)
  }, [])

  return (
    <section
      ref={containerRef}
      id="hero"
      className="relative w-full h-screen min-h-[680px] flex flex-col justify-between overflow-hidden bg-[#F7F1E6]"
    >
      {/* 1. BASE BACKGROUND LAYER (/img/bghero.webp) */}
      <div className="absolute inset-0 z-0 pointer-events-none overflow-hidden">
        <img
          src="/img/bghero.webp"
          alt="ILÊ Base Background"
          className="absolute inset-0 w-full h-full object-cover object-center filter blur-[1.8px] brightness-[0.98] contrast-[1.06]"
        />
        
        {/* Soft Warm Beige Overlay */}
        <div className="absolute inset-0 bg-[#E8DFD5]/10 mix-blend-color-burn" />
      </div>

      {/* 2. CANVAS LIQUID TRAIL LAYER */}
      <canvas
        ref={canvasRef}
        className="absolute inset-0 z-1 pointer-events-none w-full h-full"
      />

      {/* Hero Body Container */}
      <div className="relative z-10 w-full h-full max-w-[1400px] mx-auto px-8 md:px-16 flex flex-col justify-between pt-32 pb-14 pointer-events-none">
        
        {/* Mid-Screen Left & Right Strong Persuasive Meta Copy */}
        <div className="my-auto grid grid-cols-2 justify-between items-center w-full">
          
          {/* Left Persuasive Meta */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="font-serif text-[#F7F4EF]/85 space-y-0.5 text-left max-w-xs"
          >
            <span className="block text-base md:text-lg font-normal tracking-wide text-[#F7F4EF]">
              Tecnologia Litúrgica
            </span>
            <span className="block text-sm md:text-base font-light text-[#F7F4EF]/75 leading-tight">
              Feita por quem vive a rotina do axé
            </span>
          </motion.div>

          {/* Right Persuasive Meta */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="font-serif text-[#F7F4EF]/85 space-y-0.5 text-right max-w-xs justify-self-end"
          >
            <span className="block text-base md:text-lg font-normal tracking-wide text-[#F7F4EF]">
              Gestão Sem Caos
            </span>
            <span className="block text-sm md:text-base font-light text-[#F7F4EF]/75 leading-tight">
              Devolvendo o foco total na espiritualidade
            </span>
          </motion.div>

        </div>

        {/* Lower Screen Main Editorial Headline — Strong Ancestrality & Organization Copy */}
        <div className="w-full">
          <motion.div
            initial={{ opacity: 0, y: 25 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 0.3 }}
            className="text-center select-none max-w-5xl mx-auto"
          >
            <h1 className="font-serif text-[#F7F4EF] text-4xl sm:text-5xl md:text-6xl lg:text-7xl xl:text-[5.2rem] leading-[0.95] tracking-tight drop-shadow-md">
              
              {/* Line 1: Preservando a Ancestralidade */}
              <div className="flex flex-wrap items-baseline justify-center space-x-3 sm:space-x-4">
                <span className="font-serif font-normal">Preservando a</span>
                <span className="font-serif italic font-normal text-[#F7F4EF]/95">Ancestralidade</span>
              </div>

              {/* Line 2: Gestão Sagrada do Seu ilê */}
              <div className="flex flex-wrap items-baseline justify-center space-x-3 sm:space-x-4 mt-1 sm:mt-2">
                <span className="font-serif font-normal">Gestão Sagrada</span>
                
                {/* Stacked Small Connectors */}
                <div className="inline-flex flex-col text-[10px] sm:text-xs md:text-sm font-serif italic text-[#F7F4EF]/75 leading-[0.85] uppercase tracking-widest px-1 select-none self-center">
                  <span>Do</span>
                </div>

                <span className="font-serif italic font-normal text-[#F7F4EF]/95">Seu ilê</span>
              </div>

            </h1>
          </motion.div>
        </div>

      </div>
    </section>
  )
}
