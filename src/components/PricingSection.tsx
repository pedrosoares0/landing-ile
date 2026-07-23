import React, { useState } from 'react'
import { motion } from 'framer-motion'
import { Check, X, ArrowRight, Shield, Users } from 'lucide-react'

export interface PricingPlan {
  id: string
  name: string
  price: string
  priceNum: number
  subtitle: string
  headerStyle: 'gray' | 'red' | 'gold'
  adm: string
  membros: string
  calType: string
  calFeatures: { text: string; included: boolean }[]
  finFeatures: { text: string; included: boolean }[]
  feedFeature: { text: string; included: boolean }
  multiTerreiroFeature: { text: string; included: boolean }
}

export const LANDING_PRICING_PLANS: PricingPlan[] = [
  {
    id: 'gratis',
    name: 'GRÁTIS',
    price: '0',
    priceNum: 0,
    subtitle: 'Para conhecer.',
    headerStyle: 'gray',
    adm: '1 Administrador',
    membros: '10 Membros',
    calType: 'Calendário básico',
    calFeatures: [
      { text: 'Criação e edição de eventos', included: true },
      { text: 'Lista de presença dos filhos', included: false },
      { text: 'Limite de vagas', included: false },
    ],
    finFeatures: [
      { text: 'Entradas e saídas', included: false },
      { text: 'Controle de inadimplência', included: false },
      { text: 'Cobrança automática PIX', included: false },
      { text: 'Balanço mensal consolidado', included: false },
    ],
    feedFeature: { text: 'Exibição no feed', included: false },
    multiTerreiroFeature: { text: 'Múltiplos Terreiros', included: false },
  },
  {
    id: 'axe',
    name: 'AXÉ',
    price: '79',
    priceNum: 79,
    subtitle: 'Para organizar o terreiro.',
    headerStyle: 'gray',
    adm: '1 Administrador',
    membros: '30 Membros',
    calType: 'Calendário completo',
    calFeatures: [
      { text: 'Criação e edição de eventos', included: true },
      { text: 'Lista de presença dos filhos', included: true },
      { text: 'Limite de vagas', included: true },
    ],
    finFeatures: [
      { text: 'Entradas e saídas', included: true },
      { text: 'Controle de inadimplência', included: true },
      { text: 'Cobrança automática PIX', included: false },
      { text: 'Balanço mensal consolidado', included: false },
    ],
    feedFeature: { text: 'Exibição no feed', included: false },
    multiTerreiroFeature: { text: 'Múltiplos Terreiros', included: false },
  },
  {
    id: 'egbe',
    name: 'EGBÉ',
    price: '119',
    priceNum: 119,
    subtitle: 'Para cuidar melhor da sua comunidade.',
    headerStyle: 'red',
    adm: '2 Administradores',
    membros: 'Membros ilimitados',
    calType: 'Calendário completo',
    calFeatures: [
      { text: 'Criação e edição de eventos', included: true },
      { text: 'Lista de presença dos filhos', included: true },
      { text: 'Limite de vagas', included: true },
    ],
    finFeatures: [
      { text: 'Entradas e saídas', included: true },
      { text: 'Controle de inadimplência', included: true },
      { text: 'Cobrança automática PIX', included: false },
      { text: 'Balanço mensal consolidado', included: true },
    ],
    feedFeature: { text: 'Exibição padrão no feed', included: true },
    multiTerreiroFeature: { text: 'Múltiplos Terreiros', included: false },
  },
  {
    id: 'ile',
    name: 'ILÊ+',
    price: '149',
    priceNum: 149,
    subtitle: 'Para liderar com controle.',
    headerStyle: 'gold',
    adm: '2 Administradores',
    membros: 'Membros ilimitados',
    calType: 'Calendário completo',
    calFeatures: [
      { text: 'Criação e edição de eventos', included: true },
      { text: 'Lista de presença dos filhos', included: true },
      { text: 'Limite de vagas', included: true },
    ],
    finFeatures: [
      { text: 'Entradas e saídas', included: true },
      { text: 'Controle de inadimplência', included: true },
      { text: 'Cobrança automática PIX', included: true },
      { text: 'Balanço mensal consolidado', included: true },
    ],
    feedFeature: { text: 'Destaque prioritário no feed', included: true },
    multiTerreiroFeature: { text: 'Múltiplos Terreiros', included: true },
  },
]

interface PricingSectionProps {
  onSelectPlan: (planId: string) => void
  onOpenDemo?: () => void
}

export const PricingSection: React.FC<PricingSectionProps> = ({ onSelectPlan }) => {
  const [billingCycle, setBillingCycle] = useState<'mensal' | 'anual'>('mensal')

  const getDiscountedPrice = (planId: string, priceNum: number) => {
    if (priceNum === 0) return 0
    if (billingCycle === 'mensal') {
      if (planId === 'axe') return 49
      if (planId === 'egbe') return 79
      if (planId === 'ile') return 99
      return Math.round(priceNum * 0.6)
    } else {
      return Math.round(priceNum * 0.75) // 25% OFF 6 primeiros meses
    }
  }

  return (
    <section id="pricing" className="py-20 bg-[#F7F1E6] text-[#262626] relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 space-y-10">

        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto space-y-3">
          <div className="inline-flex items-center space-x-2 px-3 py-1 rounded-full text-xs font-bold tracking-widest text-[#761D19] bg-[#761D19]/10 border border-[#761D19]/20 uppercase">
            <span>PLANOS & INVESTIMENTO</span>
          </div>

          <h2 className="text-3xl sm:text-4xl md:text-5xl text-[#262626] leading-tight">
            <span className="font-sans font-bold">Escolha o Plano Ideal Para o Seu </span>
            <span className="font-serif italic font-normal text-[#990000]">Terreiro</span>
          </h2>

          {/* Ultra-Sophisticated Apple Pill Switcher */}
          <div className="pt-3 flex flex-col items-center">
            <div className="relative inline-flex items-center bg-white p-1 rounded-full border border-black/8 shadow-[0_10px_30px_rgba(0,0,0,0.08),_0_2px_8px_rgba(0,0,0,0.04)]">
              <button
                type="button"
                onClick={() => setBillingCycle('mensal')}
                className={`relative z-10 px-6 py-2 rounded-full text-xs font-semibold font-sans transition-colors duration-200 cursor-pointer ${billingCycle === 'mensal' ? 'text-[#F7F1E6]' : 'text-[#6E6E73] hover:text-[#1D1D1F]'
                  }`}
              >
                {billingCycle === 'mensal' && (
                  <motion.div
                    layoutId="activeBillingPillLanding"
                    transition={{ type: 'spring', stiffness: 450, damping: 32 }}
                    className="absolute inset-0 bg-gradient-to-r from-[#B81D18] via-[#990000] to-[#761D19] rounded-full shadow-[0_4px_14px_rgba(153,0,0,0.35)] -z-10"
                  />
                )}
                <span>Mensal</span>
              </button>

              <button
                type="button"
                onClick={() => setBillingCycle('anual')}
                className={`relative z-10 px-6 py-2 rounded-full text-xs font-semibold font-sans transition-colors duration-200 cursor-pointer ${billingCycle === 'anual' ? 'text-[#F7F1E6]' : 'text-[#6E6E73] hover:text-[#1D1D1F]'
                  }`}
              >
                {billingCycle === 'anual' && (
                  <motion.div
                    layoutId="activeBillingPillLanding"
                    transition={{ type: 'spring', stiffness: 450, damping: 32 }}
                    className="absolute inset-0 bg-gradient-to-r from-[#B81D18] via-[#990000] to-[#761D19] rounded-full shadow-[0_4px_14px_rgba(153,0,0,0.35)] -z-10"
                  />
                )}
                <span>Anual</span>
              </button>
            </div>

            <div className="text-center mt-2.5">
              <p className="inline-block text-xs font-semibold font-sans text-[#761D19] bg-[#761D19]/8 border border-[#761D19]/18 px-4 py-1.5 rounded-full shadow-xs">
                {billingCycle === 'mensal'
                  ? 'No plano Mensal você garante 40% OFF no 1º mês'
                  : 'No plano Anual você garante 25% OFF nos 6 primeiros meses'}
              </p>
            </div>
          </div>
        </div>

        {/* 4 Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 items-stretch">
          {LANDING_PRICING_PLANS.map((plan) => {
            const planDiscountedPrice = getDiscountedPrice(plan.id, plan.priceNum)

            return (
              <div
                key={plan.id}
                onClick={() => onSelectPlan(plan.id)}
                className="relative flex flex-col glass-card-apple rounded-[24px] p-4 border border-white/90 shadow-[0_12px_36px_rgba(0,0,0,0.05)] hover:shadow-[0_22px_50px_rgba(0,0,0,0.12)] transition-all duration-300 cursor-pointer overflow-hidden group hover:scale-[1.015]"
              >
                {/* Header Container */}
                <div
                  className={`p-4 rounded-[18px] min-h-[125px] flex flex-col justify-between relative overflow-hidden shrink-0 border ${plan.headerStyle === 'red'
                    ? 'text-white border-[#761D19]/30 shadow-md bg-[#761D19]'
                    : plan.headerStyle === 'gold'
                      ? 'text-[#361907] border-black/12 shadow-xs bg-[#D9D7D8]'
                      : 'bg-[#EDEDED]/95 text-[#262626] border-white/70 shadow-xs'
                    }`}
                >
                  {/* Webp Header Background Image for Egbé */}
                  {plan.headerStyle === 'red' && (
                    <img
                      src="/img/pricing-egbe.webp"
                      alt="Egbé Pricing"
                      className="absolute right-0 top-0 bottom-0 h-full w-[48%] object-cover object-right opacity-35 mix-blend-overlay pointer-events-none rounded-r-[18px]"
                    />
                  )}

                  {/* Webp Header Background Image for Ilê+ */}
                  {plan.headerStyle === 'gold' && (
                    <img
                      src="/img/pricing-ile.webp"
                      alt="Ilê+ Pricing"
                      className="absolute right-0 top-0 bottom-0 h-full w-[48%] object-cover object-right opacity-35 mix-blend-multiply pointer-events-none rounded-r-[18px]"
                    />
                  )}

                  {/* Badge */}
                  <div className="relative z-10">
                    <span
                      className={`inline-block px-3 py-0.5 rounded-full text-[9.5px] font-sans font-black tracking-widest uppercase shadow-xs backdrop-blur-md ${plan.id === 'egbe'
                        ? 'bg-white text-[#990000] border border-white/40'
                        : plan.id === 'ile'
                          ? 'bg-[#361907] text-[#F7F1E6] border border-[#361907]/30'
                          : plan.id === 'axe'
                            ? 'bg-white/90 text-[#761D19] border border-[#761D19]/20'
                            : 'bg-white/90 text-[#262626] border border-black/10'
                        }`}
                    >
                      {plan.name}
                    </span>
                  </div>

                  {/* Price */}
                  <div className="relative z-10">
                    <div className="flex items-baseline space-x-1 mt-1.5">
                      <span className={`text-xs font-bold opacity-90 ${plan.id === 'ile' ? 'text-[#361907]' : ''}`}>R$</span>
                      <span className={`text-3xl font-extrabold tracking-tight ${plan.id === 'ile' ? 'text-[#361907]' : ''}`}>
                        {planDiscountedPrice}
                      </span>
                      {plan.priceNum > 0 && (
                        <span className={`text-xs opacity-60 line-through ml-1 font-medium ${plan.id === 'ile' ? 'text-[#361907]' : ''}`}>
                          R${plan.price}
                        </span>
                      )}
                    </div>

                    {/* Small Post-Discount Subtext Explanation */}
                    {plan.priceNum > 0 ? (
                      <p className={`text-[9.5px] font-sans font-medium opacity-85 mt-0.5 leading-tight ${plan.id === 'ile' ? 'text-[#361907]' : ''}`}>
                        {billingCycle === 'mensal'
                          ? `no 1º mês, após R$ ${plan.price}/mês`
                          : `nos 6 primeiros meses, após R$ ${plan.price}/mês`}
                      </p>
                    ) : (
                      <p className="text-[9.5px] font-sans font-medium opacity-75 mt-0.5 leading-tight">
                        Grátis para sempre
                      </p>
                    )}
                  </div>
                </div>

                {/* Subtitle */}
                <p className="font-sans text-xs font-bold text-[#262626] text-center my-3 min-h-[22px] flex items-center justify-center shrink-0">
                  {plan.subtitle}
                </p>

                {/* Features */}
                <div className="space-y-3 text-xs font-sans flex-1 flex flex-col justify-between">

                  {/* Adm & Membros */}
                  <div className="space-y-1.5 pt-2 border-t border-black/8">
                    <div className="flex items-center space-x-1.5 font-bold text-[#262626]">
                      <Shield className="w-3.5 h-3.5 text-[#761D19] shrink-0" />
                      <span>{plan.adm}</span>
                    </div>
                    <div className="flex items-center space-x-1.5 font-bold text-[#262626]">
                      <Users className="w-3.5 h-3.5 text-[#761D19] shrink-0" />
                      <span>{plan.membros}</span>
                    </div>
                  </div>

                  {/* Calendário */}
                  <div className="space-y-1.5 pt-2 border-t border-black/8">
                    <p className="font-bold text-[#262626]">{plan.calType}</p>
                    <ul className="space-y-1">
                      {plan.calFeatures.map((item, idx) => (
                        <li key={idx} className="flex items-start space-x-1.5">
                          {item.included ? (
                            <Check className="w-3.5 h-3.5 text-[#00C853] shrink-0 mt-0.5 stroke-[2.5]" />
                          ) : (
                            <X className="w-3.5 h-3.5 text-[#FF453A]/60 shrink-0 mt-0.5 stroke-[2.5]" />
                          )}
                          <span className={item.included ? 'text-[#262626] font-normal' : 'text-[#262626]/35 line-through'}>
                            {item.text}
                          </span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  {/* Financeiro */}
                  <div className="space-y-1.5 pt-2 border-t border-black/8">
                    <p className="font-bold text-[#262626]">Controle Financeiro</p>
                    <ul className="space-y-1">
                      {plan.finFeatures.map((item, idx) => (
                        <li key={idx} className="flex items-start space-x-1.5">
                          {item.included ? (
                            <Check className="w-3.5 h-3.5 text-[#00C853] shrink-0 mt-0.5 stroke-[2.5]" />
                          ) : (
                            <X className="w-3.5 h-3.5 text-[#FF453A]/60 shrink-0 mt-0.5 stroke-[2.5]" />
                          )}
                          <span className={item.included ? 'text-[#262626] font-normal' : 'text-[#262626]/35 line-through'}>
                            {item.text}
                          </span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  {/* feed & Terreiros */}
                  <div className="space-y-1.5 pt-2 border-t border-black/8">
                    <div className="flex items-start space-x-1.5">
                      {plan.feedFeature.included ? (
                        <Check className="w-3.5 h-3.5 text-[#00C853] shrink-0 mt-0.5 stroke-[2.5]" />
                      ) : (
                        <X className="w-3.5 h-3.5 text-[#FF453A]/60 shrink-0 mt-0.5 stroke-[2.5]" />
                      )}
                      <span className={plan.feedFeature.included ? 'font-bold text-[#262626]' : 'text-[#262626]/35 line-through'}>
                        {plan.feedFeature.text}
                      </span>
                    </div>

                    <div className="flex items-start space-x-1.5">
                      {plan.multiTerreiroFeature.included ? (
                        <Check className="w-3.5 h-3.5 text-[#00C853] shrink-0 mt-0.5 stroke-[2.5]" />
                      ) : (
                        <X className="w-3.5 h-3.5 text-[#FF453A]/60 shrink-0 mt-0.5 stroke-[2.5]" />
                      )}
                      <span className={plan.multiTerreiroFeature.included ? 'font-bold text-[#262626]' : 'text-[#262626]/35 line-through'}>
                        {plan.multiTerreiroFeature.text}
                      </span>
                    </div>
                  </div>

                  {/* CTA Button inside card */}
                  <div className="pt-3">
                    <button
                      type="button"
                      className="w-full inline-flex items-center justify-center space-x-2 bg-gradient-to-r from-[#B81D18] via-[#990000] to-[#761D19] text-[#F7F1E6] py-2.5 rounded-full text-xs font-semibold border border-white/40 shadow-xs hover:shadow-md transition-all group-hover:scale-[1.01]"
                    >
                      <span>Garantir Desconto</span>
                      <ArrowRight className="w-3.5 h-3.5" />
                    </button>
                  </div>

                </div>
              </div>
            )
          })}
        </div>
      </div>
    </section>
  )
}
