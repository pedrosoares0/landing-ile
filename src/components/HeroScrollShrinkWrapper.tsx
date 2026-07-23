import { useRef } from 'react'
import { motion, useScroll, useTransform } from 'framer-motion'
import { Hero } from './Hero'

interface Props {
  onOpenDemo: () => void
}

const WORDS = [
  'RESPEITO',
  'TRADIÇÃO',
  'ANCESTRALIDADE',
  'FUNDAMENTO',
  'HARMONIA',
  'DEVOÇÃO',
  'SAGRADO',
  'AXÉ',
]

export const HeroScrollShrinkWrapper = ({ onOpenDemo }: Props) => {
  const containerRef = useRef<HTMLDivElement>(null)

  // Track scroll progress within the Hero section scroll track
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start start', 'end start'],
  })

  // Map scroll progress to scale and opacity (keeping sharp 90° straight corners)
  const scale = useTransform(scrollYProgress, [0, 0.55, 0.9], [1, 0.72, 0.5])
  const opacity = useTransform(scrollYProgress, [0.6, 0.95], [1, 0])

  // Scroll-driven horizontal motion: Line 1 moves Left, Line 2 moves Right according to scroll
  const xLine1 = useTransform(scrollYProgress, [0, 1], ['0%', '-35%'])
  const xLine2 = useTransform(scrollYProgress, [0, 1], ['-35%', '0%'])

  return (
    <div ref={containerRef} className="relative w-full h-[175vh] sm:h-[210vh] bg-[#F7F1E6]">
      
      {/* Centered 2-Line Scroll-Driven Marquee Ticker behind Hero with solid colors */}
      <div className="absolute top-1/2 -translate-y-1/2 left-0 right-0 w-full flex flex-col space-y-4 md:space-y-6 pointer-events-none select-none z-0 overflow-hidden">
        
        {/* Row 1 (Top Line): Solid Lighter Crimson (#990000) moving LEFT on scroll */}
        <div className="overflow-hidden whitespace-nowrap">
          <motion.div style={{ x: xLine1 }} className="flex whitespace-nowrap">
            {Array.from({ length: 8 }).flatMap(() => WORDS).map((word, i) => (
              <span
                key={i}
                className="font-serif italic text-4xl sm:text-7xl md:text-8xl lg:text-9xl text-[#990000] tracking-[0.18em] uppercase flex items-center shrink-0"
              >
                <span>{word}</span>
                <span className="text-[#990000]/40 font-sans not-italic text-xl sm:text-2xl md:text-3xl mx-5 sm:mx-8 md:mx-12">·</span>
              </span>
            ))}
          </motion.div>
        </div>

        {/* Row 2 (Bottom Line): Solid Dark Crimson (#761D19) moving RIGHT on scroll */}
        <div className="overflow-hidden whitespace-nowrap">
          <motion.div style={{ x: xLine2 }} className="flex whitespace-nowrap">
            {Array.from({ length: 8 }).flatMap(() => WORDS).map((word, i) => (
              <span
                key={i}
                className="font-serif italic text-4xl sm:text-7xl md:text-8xl lg:text-9xl text-[#761D19] tracking-[0.18em] uppercase flex items-center shrink-0"
              >
                <span>{word}</span>
                <span className="text-[#761D19]/40 font-sans not-italic text-xl sm:text-2xl md:text-3xl mx-5 sm:mx-8 md:mx-12">·</span>
              </span>
            ))}
          </motion.div>
        </div>

      </div>

      {/* Sticky container that locks during scroll shrink (Straight 90° sharp corners) */}
      <div className="sticky top-0 w-full h-screen flex items-center justify-center overflow-hidden z-10">
        <motion.div
          style={{
            scale,
            opacity,
          }}
          className="w-full h-full rounded-none overflow-hidden origin-center"
        >
          <Hero onOpenDemo={onOpenDemo} />
        </motion.div>
      </div>

    </div>
  )
}
