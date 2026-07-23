import { useState, useRef, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { X as CloseIcon, CheckCircle, ArrowRight, MapPin, Loader2, AlertCircle, Check, X, Shield, Users } from 'lucide-react'
import { filterCities, ESTADOS_UF, CityItem } from '../data/brazilianCities'
import { supabase } from '../lib/supabase'

export interface PlanFeatureItem {
  text: string
  included: boolean
}

export interface PlanFeatureSection {
  title: string
  items: PlanFeatureItem[]
}

export interface PlanItem {
  id: string
  name: string
  price: string
  priceNum: number
  subtitle: string
  headerStyle: 'gray' | 'red' | 'gold'
  adm: string
  membros: string
  sections: PlanFeatureSection[]
}

export const MODAL_PRICING_PLANS: PlanItem[] = [
  {
    id: 'gratis',
    name: 'GRÁTIS',
    price: '0',
    priceNum: 0,
    subtitle: 'Para conhecer.',
    headerStyle: 'gray',
    adm: '1 Administrador',
    membros: '10 Membros',
    sections: [
      {
        title: 'Calendário de Eventos',
        items: [
          { text: 'Criação e edição de eventos', included: true },
          { text: 'Lista de presença dos filhos', included: false },
          { text: 'Limite de vagas em eventos', included: false },
        ],
      },
      {
        title: 'Controle Financeiro',
        items: [
          { text: 'Sem controle financeiro', included: false },
        ],
      },
      {
        title: 'Divulgação',
        items: [
          { text: 'Sem exibição no Feed', included: false },
        ],
      },
    ],
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
    sections: [
      {
        title: 'Calendário completo',
        items: [
          { text: 'Criação e edição de eventos', included: true },
          { text: 'Lista de presença dos filhos', included: true },
          { text: 'Limite de vagas em eventos', included: true },
        ],
      },
      {
        title: 'Controle Financeiro',
        items: [
          { text: 'Entradas e saídas de caixa', included: true },
          { text: 'Controle de inadimplência', included: true },
          { text: 'Cobrança automática via PIX', included: false },
          { text: 'Balanço mensal consolidado', included: false },
        ],
      },
      {
        title: 'Divulgação',
        items: [
          { text: 'Exibição no Feed de Terreiros', included: false },
        ],
      },
    ],
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
    sections: [
      {
        title: 'Calendário completo',
        items: [
          { text: 'Criação e edição de eventos', included: true },
          { text: 'Lista de presença dos filhos', included: true },
          { text: 'Limite de vagas em eventos', included: true },
        ],
      },
      {
        title: 'Controle Financeiro',
        items: [
          { text: 'Entradas, saídas e inadimplência', included: true },
          { text: 'Balanço mensal consolidado', included: true },
          { text: 'Cobrança automática via PIX', included: false },
        ],
      },
      {
        title: 'Feed & Expansão',
        items: [
          { text: 'Exibição padrão no Feed', included: true },
          { text: 'Destaque prioritário no Feed', included: false },
          { text: 'Múltiplos Terreiros', included: false },
        ],
      },
    ],
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
    sections: [
      {
        title: 'Calendário completo',
        items: [
          { text: 'Criação e edição de eventos', included: true },
          { text: 'Lista de presença dos filhos', included: true },
          { text: 'Limite de vagas em eventos', included: true },
        ],
      },
      {
        title: 'Controle Financeiro',
        items: [
          { text: 'Entradas, saídas e inadimplência', included: true },
          { text: 'Balanço mensal consolidado', included: true },
          { text: 'Cobrança automática via PIX', included: true },
        ],
      },
      {
        title: 'Feed & Gestão Multi',
        items: [
          { text: 'Destaque prioritário no Feed', included: true },
          { text: 'Gestão de Múltiplos Terreiros', included: true },
        ],
      },
    ],
  },
]

interface InteractiveDemoModalProps {
  isOpen: boolean
  onClose: () => void
  selectedPlanId?: string | null
}

export const InteractiveDemoModal = ({
  isOpen,
  onClose,
  selectedPlanId = 'egbe',
}: InteractiveDemoModalProps) => {
  const [activePlanId, setActivePlanId] = useState<string>(selectedPlanId || 'egbe')
  const [billingCycle, setBillingCycle] = useState<'mensal' | 'anual'>('mensal')

  // Lock body scroll when modal is open for better performance and UX
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden'
    } else {
      document.body.style.overflow = ''
    }
    return () => {
      document.body.style.overflow = ''
    }
  }, [isOpen])

  useEffect(() => {
    if (selectedPlanId) {
      setActivePlanId(selectedPlanId)
    }
  }, [selectedPlanId])

  const [submitted, setSubmitted] = useState(false)
  const [loading, setLoading] = useState(false)
  const [errorMsg, setErrorMsg] = useState<string | null>(null)
  
  const [formData, setFormData] = useState({
    nome: '',
    terreiro: '',
    cidade: '',
    estado: 'BA',
    whatsapp: '',
    email: '',
  })

  // City autocomplete states
  const [cidadeQuery, setCidadeQuery] = useState('')
  const [showCityDropdown, setShowCityDropdown] = useState(false)
  const [citySuggestions, setCitySuggestions] = useState<CityItem[]>([])
  const cityContainerRef = useRef<HTMLDivElement>(null)

  // Handle outside click to close city autocomplete dropdown
  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (cityContainerRef.current && !cityContainerRef.current.contains(e.target as Node)) {
        setShowCityDropdown(false)
      }
    }
    document.addEventListener('mousedown', handleClickOutside)
    return () => document.removeEventListener('mousedown', handleClickOutside)
  }, [])

  // Format phone automatically: 71 99999-9999
  const handlePhoneChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const rawDigits = e.target.value.replace(/\D/g, '').slice(0, 11)
    let formatted = rawDigits

    if (rawDigits.length > 2 && rawDigits.length <= 7) {
      formatted = `${rawDigits.slice(0, 2)} ${rawDigits.slice(2)}`
    } else if (rawDigits.length > 7) {
      formatted = `${rawDigits.slice(0, 2)} ${rawDigits.slice(2, 7)}-${rawDigits.slice(7)}`
    }

    setFormData((prev) => ({ ...prev, whatsapp: formatted }))
  }

  // Handle city input typing
  const handleCityInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const query = e.target.value
    setCidadeQuery(query)
    setFormData((prev) => ({ ...prev, cidade: query }))

    if (query.trim().length > 0) {
      const filtered = filterCities(query, 7)
      setCitySuggestions(filtered)
      setShowCityDropdown(true)
    } else {
      setCitySuggestions([])
      setShowCityDropdown(false)
    }
  }

  // Select city from autocomplete dropdown
  const handleSelectCity = (city: CityItem) => {
    setCidadeQuery(city.nome)
    setFormData((prev) => ({
      ...prev,
      cidade: city.nome,
      estado: city.uf,
    }))
    setShowCityDropdown(false)
  }

  const currentPlan = MODAL_PRICING_PLANS.find((p) => p.id === activePlanId) || MODAL_PRICING_PLANS[2]

  // Calculate prices based on requested premium tiers (R$ 49, R$ 79, R$ 99 for Mensal)
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

  const currentDiscountedPrice = getDiscountedPrice(currentPlan.id, currentPlan.priceNum)

  // Dynamic Selection Styling: Prominent Colored Border & Glowing Ring on the ENTIRE Card
  const getSelectedCardStyles = (planId: string, isSelected: boolean) => {
    if (!isSelected) {
      return 'border-white/95 shadow-[0_10px_30px_rgba(0,0,0,0.04)] hover:border-[#761D19]/30 hover:-translate-y-1'
    }

    switch (planId) {
      case 'egbe':
        return 'border-[#761D19] border-[2.5px] ring-4 ring-[#761D19]/25 shadow-[0_22px_50px_rgba(118,29,25,0.28)] bg-white'
      case 'ile':
        return 'border-[#361907] border-[2.5px] ring-4 ring-[#361907]/25 shadow-[0_22px_50px_rgba(54,25,7,0.28)] bg-white'
      case 'axe':
        return 'border-[#761D19] border-[2.5px] ring-4 ring-[#761D19]/20 shadow-[0_22px_50px_rgba(118,29,25,0.20)] bg-white'
      default:
        // gratis
        return 'border-[#6E6E73] border-[2.5px] ring-4 ring-[#6E6E73]/20 shadow-[0_22px_50px_rgba(0,0,0,0.14)] bg-white'
    }
  }

  // Real Supabase insertion with robust plan capturing
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    setErrorMsg(null)

    const discountTag = billingCycle === 'mensal' ? '40% OFF 1º mês' : '25% OFF 6 primeiros meses'
    const planSelectedString = `[LOTE FUNDADOR] Plano ${currentPlan.name} (${billingCycle.toUpperCase()}) - R$ ${currentDiscountedPrice} (${discountTag}, após R$ ${currentPlan.price}/mês)`

    try {
      // 1. Primary Attempt: Save with both landing_plano and plano columns
      const fullPayload: Record<string, string> = {
        landing_nome: formData.nome,
        landing_terreiro: formData.terreiro,
        landing_cidade: formData.cidade || cidadeQuery,
        landing_estado: formData.estado,
        landing_whatsapp: formData.whatsapp,
        landing_email: formData.email,
        landing_plano: planSelectedString,
        plano: planSelectedString,
      }

      let { error } = await supabase.from('landing_acesso_antecipado').insert([fullPayload])

      if (error) {
        console.warn('Tentativa 1 (com landing_plano + plano) falhou, tentando fallback 1:', error.message)
        
        // 2. Fallback 1: Try with landing_plano only
        const payloadLandingPlano: Record<string, string> = {
          landing_nome: formData.nome,
          landing_terreiro: formData.terreiro,
          landing_cidade: formData.cidade || cidadeQuery,
          landing_estado: formData.estado,
          landing_whatsapp: formData.whatsapp,
          landing_email: formData.email,
          landing_plano: planSelectedString,
        }
        const res2 = await supabase.from('landing_acesso_antecipado').insert([payloadLandingPlano])
        error = res2.error

        if (error) {
          console.warn('Tentativa 2 (com landing_plano) falhou, tentando fallback 2:', error.message)

          // 3. Fallback 2: Try with plano only
          const payloadPlano: Record<string, string> = {
            landing_nome: formData.nome,
            landing_terreiro: formData.terreiro,
            landing_cidade: formData.cidade || cidadeQuery,
            landing_estado: formData.estado,
            landing_whatsapp: formData.whatsapp,
            landing_email: formData.email,
            plano: planSelectedString,
          }
          const res3 = await supabase.from('landing_acesso_antecipado').insert([payloadPlano])
          error = res3.error

          if (error) {
            console.warn('Tentativa 3 (sem coluna de plano) salvando dados básicos:', error.message)

            // 4. Fallback 3: Save base user data if column doesn't exist yet
            const payloadBasic: Record<string, string> = {
              landing_nome: formData.nome,
              landing_terreiro: formData.terreiro,
              landing_cidade: formData.cidade || cidadeQuery,
              landing_estado: formData.estado,
              landing_whatsapp: formData.whatsapp,
              landing_email: formData.email,
            }
            const res4 = await supabase.from('landing_acesso_antecipado').insert([payloadBasic])
            if (res4.error) {
              setErrorMsg(`Erro no Supabase: ${res4.error.message}`)
            } else {
              setSubmitted(true)
            }
          } else {
            setSubmitted(true)
          }
        } else {
          setSubmitted(true)
        }
      } else {
        setSubmitted(true)
      }
    } catch (err) {
      console.error('Erro de comunicação:', err)
      setErrorMsg('Erro de conexão ao enviar pré-cadastro. Tente novamente.')
    } finally {
      setLoading(false)
    }
  }

  const handleReset = () => {
    setSubmitted(false)
    setErrorMsg(null)
    setLoading(false)
    setFormData({
      nome: '',
      terreiro: '',
      cidade: '',
      estado: 'BA',
      whatsapp: '',
      email: '',
    })
    setCidadeQuery('')
    onClose()
  }

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-5 lg:p-6 overflow-hidden">
          {/* Backdrop with Apple translucent blur */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 bg-[#0a0708]/82 backdrop-blur-xl"
          />

          {/* Modal Container: Spacious Outer Height */}
          <motion.div
            initial={{ opacity: 0, scale: 0.97, y: 15 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.97, y: 15 }}
            transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
            className="relative z-10 w-full max-w-[1520px] max-h-[92vh] bg-[#F4F4F4] text-[#262626] rounded-[30px] border border-black/10 shadow-[0_25px_85px_rgba(0,0,0,0.35)] overflow-hidden flex flex-col my-auto"
          >
            {/* Apple Floating Close Button */}
            <button
              onClick={onClose}
              className="absolute top-3.5 right-4 z-30 p-2 rounded-full bg-white/90 text-[#262626] hover:bg-[#761D19] hover:text-white border border-black/10 shadow-md backdrop-blur-md transition-all cursor-pointer"
            >
              <CloseIcon className="w-4 h-4" />
            </button>

            {/* Scrollable Container with Lenis prevent */}
            <div
              data-lenis-prevent="true"
              className="flex-1 overflow-y-auto p-3.5 sm:p-4 lg:p-5 relative z-10 custom-modal-scroll"
            >
              {!submitted ? (
                <div className="grid grid-cols-1 lg:grid-cols-[350px_1fr] xl:grid-cols-[370px_1fr] gap-3.5 lg:gap-4 items-start w-full">
                  
                  {/* ========================================== */}
                  {/* LEFT COLUMN: FORMULARIO DE PRÉ-CADASTRO   */}
                  {/* ========================================== */}
                  <div className="w-full flex flex-col">
                    <div className="glass-card-apple rounded-[24px] p-4 sm:p-4.5 relative overflow-hidden space-y-2.5 border border-white/90 shadow-[0_14px_35px_rgba(0,0,0,0.06)]">
                      
                      {/* Ambient Red Glow Accent */}
                      <div className="absolute -top-20 -right-20 w-40 h-40 bg-[#761D19]/10 rounded-full blur-3xl pointer-events-none" />

                      {/* Header Info */}
                      <div className="space-y-1">
                        {/* Premium Lote Fundador Tag with Live Pulsing Dot */}
                        <div className="inline-flex items-center space-x-1.5 px-2.5 py-0.5 rounded-full text-[9.5px] font-sans font-bold tracking-wider text-[#761D19] bg-[#761D19]/10 border border-[#761D19]/20 uppercase">
                          <span className="relative flex h-2 w-2 shrink-0">
                            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#E60000] opacity-75" />
                            <span className="relative inline-flex rounded-full h-2 w-2 bg-[#761D19]" />
                          </span>
                          <span>LOTE FUNDADOR — 34/150 VAGAS GARANTIDAS</span>
                        </div>

                        {/* Title: Compact sleek typography */}
                        <h3 className="text-lg sm:text-xl font-bold text-[#262626] leading-tight pt-0.5">
                          <span>Leve o ILÊ Para a Sua </span>
                          <span className="font-serif italic font-normal text-[#990000] whitespace-nowrap">Casa de Axé</span>
                        </h3>

                        {/* Reassurance Copy: Pay Nothing Now */}
                        <p className="font-sans text-[11px] text-[#262626]/75 font-normal leading-relaxed">
                          <strong className="font-semibold text-[#761D19]">Você não paga nada agora.</strong> Garanta seu desconto exclusivo para o lançamento do app.
                        </p>
                      </div>

                      {/* Selected Plan Premium Banner */}
                      <div className="bg-gradient-to-r from-[#761D19]/8 via-[#990000]/6 to-[#761D19]/8 border border-[#761D19]/20 rounded-xl p-2.5 flex items-center justify-between shadow-xs">
                        <div className="flex items-center space-x-1.5">
                          <span className="w-2 h-2 rounded-full bg-[#761D19] animate-pulse shrink-0" />
                          <span className="text-xs font-bold text-[#262626] tracking-wide">
                            Plano {currentPlan.name}
                          </span>
                        </div>

                        <div className="flex items-center space-x-2">
                          {currentPlan.priceNum > 0 ? (
                            <>
                              <div className="flex flex-col text-right leading-none">
                                <span className="text-xs font-extrabold text-[#761D19]">
                                  R$ {currentDiscountedPrice} <span className="text-[9px] font-bold text-[#761D19]">{billingCycle === 'mensal' ? 'no 1º mês' : 'nos 6 primeiros meses'}</span>
                                </span>
                                <span className="text-[9px] text-[#262626]/60 font-medium mt-0.5">
                                  após R$ {currentPlan.price}/mês
                                </span>
                              </div>

                              {/* Original Strikethrough Price ABOVE Discount Tag */}
                              <div className="flex flex-col items-end justify-center space-y-0.5">
                                <span className="text-[10px] text-[#262626]/45 line-through font-semibold leading-none">
                                  R$ {currentPlan.price}
                                </span>
                                <span className="text-[9px] font-bold text-[#761D19] bg-[#761D19]/12 px-1.5 py-0.5 rounded-full border border-[#761D19]/20 leading-none">
                                  {billingCycle === 'mensal' ? '-40% OFF' : '-25% OFF'}
                                </span>
                              </div>
                            </>
                          ) : (
                            <span className="text-xs font-extrabold text-emerald-700">R$ 0/mês</span>
                          )}
                        </div>
                      </div>

                      {/* Error Banner */}
                      {errorMsg && (
                        <div className="p-2 rounded-xl bg-red-500/10 border border-red-500/25 text-red-800 text-xs flex items-start space-x-2">
                          <AlertCircle className="w-4 h-4 text-red-600 shrink-0 mt-0.5" />
                          <span>{errorMsg}</span>
                        </div>
                      )}

                      {/* Form - Lighter Inputs (#F5F3F3) */}
                      <form onSubmit={handleSubmit} className="space-y-2 font-sans text-xs pt-0.5">
                        
                        <div className="space-y-2">
                          {/* Nome */}
                          <div>
                            <label className="block text-[10.5px] font-sans text-[#262626]/85 font-semibold mb-0.5">
                              Seu Nome / Nome Litúrgico *
                            </label>
                            <input
                              type="text"
                              required
                              placeholder="Ex: Pai João de Aruanda"
                              value={formData.nome}
                              onChange={(e) => setFormData({ ...formData, nome: e.target.value })}
                              className="w-full px-3 py-1.5 rounded-xl bg-[#F5F3F3] border border-black/8 text-[#262626] text-xs font-sans font-medium placeholder-[#262626]/40 shadow-[inner_0_1.5px_3px_rgba(0,0,0,0.04)] hover:border-[#761D19]/30 hover:bg-white focus:outline-none focus:bg-white focus:border-[#761D19] focus:ring-2 focus:ring-[#761D19]/15 transition-all"
                            />
                          </div>

                          {/* Terreiro */}
                          <div>
                            <label className="block text-[10.5px] font-sans text-[#262626]/85 font-semibold mb-0.5">
                              Nome do Terreiro / Tenda / Ilê *
                            </label>
                            <input
                              type="text"
                              required
                              placeholder="Ex: Tenda Espiritual Luz & Caridade"
                              value={formData.terreiro}
                              onChange={(e) => setFormData({ ...formData, terreiro: e.target.value })}
                              className="w-full px-3 py-1.5 rounded-xl bg-[#F5F3F3] border border-black/8 text-[#262626] text-xs font-sans font-medium placeholder-[#262626]/40 shadow-[inner_0_1.5px_3px_rgba(0,0,0,0.04)] hover:border-[#761D19]/30 hover:bg-white focus:outline-none focus:bg-white focus:border-[#761D19] focus:ring-2 focus:ring-[#761D19]/15 transition-all"
                            />
                          </div>

                          {/* Cidade & Estado Grid */}
                          <div className="grid grid-cols-1 sm:grid-cols-12 gap-2">
                            
                            {/* Cidade Input with Autocomplete */}
                            <div ref={cityContainerRef} className="sm:col-span-8 relative">
                              <label className="block text-[10.5px] font-sans text-[#262626]/85 font-semibold mb-0.5">
                                Cidade *
                              </label>
                              <div className="relative">
                                <input
                                  type="text"
                                  required
                                  placeholder="Digite sua cidade"
                                  value={cidadeQuery}
                                  onChange={handleCityInputChange}
                                  onFocus={() => {
                                    if (cidadeQuery.trim().length > 0 && citySuggestions.length > 0) {
                                      setShowCityDropdown(true)
                                    }
                                  }}
                                  className="w-full px-3 py-1.5 rounded-xl bg-[#F5F3F3] border border-black/8 text-[#262626] text-xs font-sans font-medium placeholder-[#262626]/40 shadow-[inner_0_1.5px_3px_rgba(0,0,0,0.04)] hover:border-[#761D19]/30 hover:bg-white focus:outline-none focus:bg-white focus:border-[#761D19] focus:ring-2 focus:ring-[#761D19]/15 transition-all pr-8"
                                />
                                <MapPin className="w-3.5 h-3.5 text-[#761D19]/50 absolute right-2.5 top-1/2 -translate-y-1/2 pointer-events-none" />
                              </div>

                              {/* Autocomplete Suggestions */}
                              <AnimatePresence>
                                {showCityDropdown && citySuggestions.length > 0 && (
                                  <motion.ul
                                    initial={{ opacity: 0, y: -4 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    exit={{ opacity: 0, y: -4 }}
                                    className="absolute left-0 right-0 top-full mt-1 bg-white border border-[#761D19]/25 rounded-xl shadow-xl z-30 max-h-40 overflow-y-auto py-1 divide-y divide-slate-100 text-xs"
                                  >
                                    {citySuggestions.map((item, idx) => (
                                      <li key={idx}>
                                        <button
                                          type="button"
                                          onClick={() => handleSelectCity(item)}
                                          className="w-full text-left px-3 py-1.5 hover:bg-[#761D19]/8 transition-colors flex items-center justify-between font-sans text-[#262626] cursor-pointer"
                                        >
                                          <span className="font-medium">{item.nome}</span>
                                          <span className="text-[10px] font-semibold text-[#761D19] bg-[#761D19]/10 px-1.5 py-0.5 rounded">
                                            {item.uf}
                                          </span>
                                        </button>
                                      </li>
                                    ))}
                                  </motion.ul>
                                )}
                              </AnimatePresence>
                            </div>

                            {/* Estado (UF) */}
                            <div className="sm:col-span-4">
                              <label className="block text-[10.5px] font-sans text-[#262626]/85 font-semibold mb-0.5">
                                Estado *
                              </label>
                              <select
                                required
                                value={formData.estado}
                                onChange={(e) => setFormData({ ...formData, estado: e.target.value })}
                                className="w-full px-2 py-1.5 rounded-xl bg-[#F5F3F3] border border-black/8 text-[#262626] text-xs font-sans font-medium shadow-[inner_0_1.5px_3px_rgba(0,0,0,0.04)] focus:outline-none focus:bg-white focus:border-[#761D19] focus:ring-2 focus:ring-[#761D19]/15 transition-all cursor-pointer"
                              >
                                {ESTADOS_UF.map((item) => (
                                  <option key={item.uf} value={item.uf}>
                                    {item.uf}
                                  </option>
                                ))}
                              </select>
                            </div>

                          </div>

                          {/* Telefone & E-mail Grid */}
                          <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                            
                            {/* Telefone */}
                            <div>
                              <label className="block text-[10.5px] font-sans text-[#262626]/85 font-semibold mb-0.5">
                                WhatsApp *
                              </label>
                              <input
                                type="tel"
                                required
                                placeholder="71 99999-9999"
                                value={formData.whatsapp}
                                onChange={handlePhoneChange}
                                className="w-full px-3 py-1.5 rounded-xl bg-[#F5F3F3] border border-black/8 text-[#262626] text-xs font-sans font-medium placeholder-[#262626]/40 shadow-[inner_0_1.5px_3px_rgba(0,0,0,0.04)] hover:border-[#761D19]/30 hover:bg-white focus:outline-none focus:bg-white focus:border-[#761D19] focus:ring-2 focus:ring-[#761D19]/15 transition-all"
                              />
                            </div>

                            {/* Email */}
                            <div>
                              <label className="block text-[10.5px] font-sans text-[#262626]/85 font-semibold mb-0.5">
                                E-mail *
                              </label>
                              <input
                                type="email"
                                required
                                placeholder="exemplo@email.com"
                                value={formData.email}
                                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                                className="w-full px-3 py-1.5 rounded-xl bg-[#F5F3F3] border border-black/8 text-[#262626] text-xs font-sans font-medium placeholder-[#262626]/40 shadow-[inner_0_1.5px_3px_rgba(0,0,0,0.04)] hover:border-[#761D19]/30 hover:bg-white focus:outline-none focus:bg-white focus:border-[#761D19] focus:ring-2 focus:ring-[#761D19]/15 transition-all"
                              />
                            </div>

                          </div>
                        </div>

                        {/* Action Button: Requested CTA text */}
                        <div className="pt-1.5">
                          <button
                            type="submit"
                            disabled={loading}
                            className="relative w-full inline-flex items-center justify-center space-x-2 bg-gradient-to-r from-[#B81D18] via-[#990000] to-[#761D19] text-[#F7F1E6] px-5 py-2 rounded-full text-xs font-sans font-semibold tracking-wide border border-white/40 shadow-md hover:shadow-lg hover:scale-[1.005] active:scale-[0.995] disabled:opacity-70 disabled:pointer-events-none transition-all group cursor-pointer overflow-hidden"
                          >
                            <span className="absolute inset-0 rounded-full bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-white/25 via-transparent to-transparent pointer-events-none" />
                            {loading ? (
                              <>
                                <Loader2 className="w-4 h-4 animate-spin text-[#F7F1E6]" />
                                <span className="relative z-10">Salvando no Banco...</span>
                              </>
                            ) : (
                              <>
                                <span className="relative z-10">Garantir meu desconto de fundador</span>
                                <ArrowRight className="relative z-10 w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
                              </>
                            )}
                          </button>
                        </div>

                        {/* Reassurance Copy with LGPD Protection by Law */}
                        <p className="text-[9px] text-center text-[#262626]/60 font-sans tracking-wide pt-0.5">
                          🔒 Vagas limitadas no lote fundador • Seus dados estão 100% seguros e protegidos por lei (LGPD)
                        </p>
                      </form>
                    </div>
                  </div>

                  {/* ========================================== */}
                  {/* RIGHT COLUMN: TOGGLE + EXPLANATION + CARDS */}
                  {/* ========================================== */}
                  <div className="w-full flex flex-col justify-between">
                    
                    {/* Top Switcher & Explanation */}
                    <div className="w-full flex flex-col items-center shrink-0 mb-2">
                      {/* Ultra-Sophisticated Apple Pill Switcher */}
                      <div className="relative inline-flex items-center bg-white p-1 rounded-full border border-black/8 shadow-[0_6px_20px_rgba(0,0,0,0.06)]">
                        <button
                          type="button"
                          onClick={() => setBillingCycle('mensal')}
                          className={`relative z-10 px-5 py-1.5 rounded-full text-xs font-semibold font-sans transition-colors duration-200 cursor-pointer ${
                            billingCycle === 'mensal' ? 'text-[#F7F1E6]' : 'text-[#6E6E73] hover:text-[#1D1D1F]'
                          }`}
                        >
                          {billingCycle === 'mensal' && (
                            <motion.div
                              layoutId="activeBillingPillModalCompact"
                              transition={{ type: 'spring', stiffness: 450, damping: 32 }}
                              className="absolute inset-0 bg-gradient-to-r from-[#B81D18] via-[#990000] to-[#761D19] rounded-full shadow-[0_4px_14px_rgba(153,0,0,0.35)] -z-10"
                            />
                          )}
                          <span>Mensal</span>
                        </button>

                        <button
                          type="button"
                          onClick={() => setBillingCycle('anual')}
                          className={`relative z-10 px-5 py-1.5 rounded-full text-xs font-semibold font-sans transition-colors duration-200 cursor-pointer ${
                            billingCycle === 'anual' ? 'text-[#F7F1E6]' : 'text-[#6E6E73] hover:text-[#1D1D1F]'
                          }`}
                        >
                          {billingCycle === 'anual' && (
                            <motion.div
                              layoutId="activeBillingPillModalCompact"
                              transition={{ type: 'spring', stiffness: 450, damping: 32 }}
                              className="absolute inset-0 bg-gradient-to-r from-[#B81D18] via-[#990000] to-[#761D19] rounded-full shadow-[0_4px_14px_rgba(153,0,0,0.35)] -z-10"
                            />
                          )}
                          <span>Anual</span>
                        </button>
                      </div>

                      {/* Clean Explanation Text DIRECTLY BELOW Toggle */}
                      <div className="text-center mt-1.5">
                        <p className="inline-block text-[11px] font-semibold font-sans text-[#761D19] bg-[#761D19]/8 border border-[#761D19]/18 px-3.5 py-0.5 rounded-full shadow-xs">
                          {billingCycle === 'mensal'
                            ? 'No plano Mensal você garante 40% OFF no 1º mês'
                            : 'No plano Anual você garante 25% OFF nos 6 primeiros meses'}
                        </p>
                      </div>
                    </div>

                    {/* 4 Cards Grid - Clear Included (✓) and Not-Included (✕) Highlights */}
                    <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-2.5 items-stretch flex-1 w-full pt-0.5">
                      {MODAL_PRICING_PLANS.map((plan) => {
                        const isSelected = activePlanId === plan.id
                        const planDiscountedPrice = getDiscountedPrice(plan.id, plan.priceNum)

                        return (
                          <motion.div
                            key={plan.id}
                            onClick={() => setActivePlanId(plan.id)}
                            animate={{
                              y: isSelected ? -6 : 0,
                              scale: isSelected ? 1.015 : 1,
                            }}
                            transition={{ type: 'spring', stiffness: 400, damping: 28 }}
                            className={`relative flex flex-col glass-card-apple rounded-[22px] p-2.5 border transition-colors duration-300 cursor-pointer overflow-hidden h-full justify-between ${getSelectedCardStyles(
                              plan.id,
                              isSelected
                            )}`}
                          >
                            {/* Selected Check Badge in Top Right */}
                            {isSelected && (
                              <motion.div
                                initial={{ scale: 0, opacity: 0 }}
                                animate={{ scale: 1, opacity: 1 }}
                                transition={{ type: 'spring', stiffness: 500, damping: 25 }}
                                className={`absolute top-3 right-3 z-20 text-white p-1 rounded-full shadow-md ${
                                  plan.id === 'egbe'
                                    ? 'bg-[#761D19]'
                                    : plan.id === 'ile'
                                    ? 'bg-[#361907]'
                                    : 'bg-[#6E6E73]'
                                }`}
                              >
                                <Check className="w-2.5 h-2.5 stroke-[3]" />
                              </motion.div>
                            )}

                            {/* Top Header Box: Compact Height */}
                            <div
                              className={`p-3 rounded-[16px] min-h-[110px] w-full flex flex-col justify-between relative overflow-hidden shrink-0 border transition-shadow duration-300 ${
                                plan.headerStyle === 'red'
                                  ? 'text-white border-[#761D19]/30 bg-[#761D19] shadow-[0_14px_35px_rgba(118,29,25,0.35),_0_4px_12px_rgba(0,0,0,0.1)]'
                                  : plan.headerStyle === 'gold'
                                  ? 'text-[#361907] border-black/12 bg-[#D9D7D8] shadow-[0_12px_28px_rgba(0,0,0,0.12),_0_2px_8px_rgba(0,0,0,0.05)]'
                                  : 'bg-[#EDEDED]/95 text-[#262626] border-white/70 shadow-[0_10px_25px_rgba(0,0,0,0.08),_0_2px_6px_rgba(0,0,0,0.04)]'
                              }`}
                            >
                              {/* Translucent Webp Image aligned to Right for Egbé */}
                              {plan.headerStyle === 'red' && (
                                <img
                                  src="/img/pricing-egbe.webp"
                                  alt="Egbé Pricing"
                                  className="absolute right-0 top-0 bottom-0 h-full w-[48%] object-cover object-right opacity-35 mix-blend-overlay pointer-events-none rounded-r-[16px]"
                                />
                              )}

                              {/* Translucent Webp Image aligned to Right for Ilê+ */}
                              {plan.headerStyle === 'gold' && (
                                <img
                                  src="/img/pricing-ile.webp"
                                  alt="Ilê+ Pricing"
                                  className="absolute right-0 top-0 bottom-0 h-full w-[48%] object-cover object-right opacity-35 mix-blend-multiply pointer-events-none rounded-r-[16px]"
                                />
                              )}

                              {/* Premium Refined Plan Name Badge */}
                              <div className="relative z-10">
                                <span
                                  className={`inline-block px-2.5 py-0.5 rounded-full text-[9.5px] font-sans font-black tracking-widest uppercase shadow-xs backdrop-blur-md ${
                                    plan.id === 'egbe'
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

                              {/* Price Display */}
                              <div className="relative z-10">
                                <div className="flex items-baseline space-x-1 mt-1">
                                  <span className={`text-xs font-bold opacity-90 ${plan.id === 'ile' ? 'text-[#361907]' : ''}`}>R$</span>
                                  <span className={`text-2xl font-extrabold tracking-tight ${plan.id === 'ile' ? 'text-[#361907]' : ''}`}>
                                    {planDiscountedPrice}
                                  </span>
                                  {plan.priceNum > 0 && (
                                    <span className={`text-[10.5px] opacity-60 line-through ml-1 font-medium ${plan.id === 'ile' ? 'text-[#361907]' : ''}`}>
                                      R${plan.price}
                                    </span>
                                  )}
                                </div>

                                {/* Small Post-Discount Subtext Explanation */}
                                {plan.priceNum > 0 ? (
                                  <p className={`text-[9px] font-sans font-medium opacity-85 mt-0.5 leading-tight ${plan.id === 'ile' ? 'text-[#361907]' : ''}`}>
                                    {billingCycle === 'mensal'
                                      ? `no 1º mês, após R$ ${plan.price}/mês`
                                      : `nos 6 primeiros meses, após R$ ${plan.price}/mês`}
                                  </p>
                                ) : (
                                  <p className="text-[9px] font-sans font-medium opacity-75 mt-0.5 leading-tight">
                                    Grátis para sempre
                                  </p>
                                )}
                              </div>

                            </div>

                            {/* Subtitle / Tagline */}
                            <p className="font-sans text-[10.5px] font-bold text-[#262626] text-center my-1.5 min-h-[18px] flex items-center justify-center shrink-0">
                              {plan.subtitle}
                            </p>

                            {/* Features List */}
                            <div className="space-y-2 text-xs font-sans flex-1 flex flex-col justify-between px-1">
                              
                              {/* Adm & Membros */}
                              <div className="space-y-0.5 pt-1.5 border-t border-black/8">
                                <div className="flex items-center space-x-1.5 font-bold text-[#262626] text-[10.5px]">
                                  <Shield className="w-3 h-3 text-[#761D19] shrink-0" />
                                  <span>{plan.adm}</span>
                                </div>
                                <div className="flex items-center space-x-1.5 font-bold text-[#262626] text-[10.5px]">
                                  <Users className="w-3 h-3 text-[#761D19] shrink-0" />
                                  <span>{plan.membros}</span>
                                </div>
                              </div>

                              {/* Categorized Sections */}
                              <div className="space-y-2 pt-1 border-t border-black/8 flex-1">
                                {plan.sections.map((section, sIdx) => (
                                  <div key={sIdx} className="space-y-1">
                                    <p className="font-bold text-[10px] uppercase tracking-wider text-[#761D19]">
                                      {section.title}
                                    </p>
                                    <ul className="space-y-1">
                                      {section.items.map((feat, fIdx) => (
                                        <li key={fIdx} className="flex items-start space-x-1.5">
                                          {feat.included ? (
                                            <Check className="w-3 h-3 text-[#00C853] shrink-0 mt-0.5 stroke-[2.5]" />
                                          ) : (
                                            <X className="w-3 h-3 text-[#FF453A]/70 shrink-0 mt-0.5 stroke-[2.5]" />
                                          )}
                                          <span
                                            className={
                                              feat.included
                                                ? 'text-[#262626] font-normal text-[10px] leading-tight'
                                                : 'text-[#262626]/40 line-through text-[10px] leading-tight font-light'
                                            }
                                          >
                                            {feat.text}
                                          </span>
                                        </li>
                                      ))}
                                    </ul>
                                  </div>
                                ))}
                              </div>

                            </div>
                          </motion.div>
                        )
                      })}
                    </div>
                  </div>

                </div>
              ) : (
                /* Success State */
                <motion.div
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
                  className="relative z-10 py-6 text-center space-y-4 max-w-lg mx-auto my-auto"
                >
                  <div className="relative w-full max-w-[320px] mx-auto pt-2 pb-1">
                    <div className="absolute inset-0 bg-gradient-to-t from-[#990000]/25 via-[#761D19]/15 to-transparent blur-2xl rounded-full pointer-events-none" />

                    <motion.div
                      initial={{ y: 20, opacity: 0, scale: 0.92 }}
                      animate={{ y: 0, opacity: 1, scale: 1 }}
                      transition={{ duration: 0.5, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
                      className="relative w-full bg-gradient-to-br from-[#761D19] via-[#990000] to-[#B81D18] text-[#F7F1E6] p-5 rounded-3xl shadow-2xl border border-[#D4AF37]/50 overflow-hidden"
                    >
                      <div className="absolute -left-3.5 top-1/2 -translate-y-1/2 w-7 h-7 bg-[#F4F4F4] rounded-full border-r border-[#761D19]/30" />
                      <div className="absolute -right-3.5 top-1/2 -translate-y-1/2 w-7 h-7 bg-[#F4F4F4] rounded-full border-l border-[#761D19]/30" />

                      <div className="text-center pb-3 relative z-10">
                        <div className="inline-flex items-center space-x-1 text-[9.5px] font-sans font-bold tracking-[0.2em] text-[#F3E5AB] uppercase">
                          <span>PLANO {currentPlan.name} • {billingCycle.toUpperCase()}</span>
                        </div>

                        <div className="flex items-center justify-center space-x-1 mt-1">
                          <span className="font-serif text-5xl font-bold tracking-tight text-white drop-shadow-md">
                            {billingCycle === 'mensal' ? '40%' : '25%'}
                          </span>
                          <div className="flex flex-col text-left pl-0.5">
                            <span className="font-sans text-xs font-black text-[#F3E5AB] leading-none tracking-wider">OFF</span>
                            <span className="font-sans text-[8.5px] font-semibold text-white/90 leading-tight">DESCONTO</span>
                          </div>
                        </div>
                      </div>

                      <div className="pt-2.5 text-center relative z-10 border-t border-white/20">
                        <div className="inline-block bg-[#090506]/40 backdrop-blur-md px-3.5 py-1 rounded-lg border border-[#F3E5AB]/40 shadow-inner">
                          <span className="font-mono text-xs tracking-widest text-[#F7F1E6] font-bold">
                            AXE-{currentPlan.name}-{billingCycle.toUpperCase()}
                          </span>
                        </div>
                        <p className="text-[8.5px] font-sans text-white/80 mt-1 font-light">
                          {billingCycle === 'mensal'
                            ? 'Aplicado automaticamente no 1º mês'
                            : 'Aplicado automaticamente nos 6 primeiros meses'}
                        </p>
                      </div>
                    </motion.div>

                    <motion.div
                      initial={{ scale: 0 }}
                      animate={{ scale: 1 }}
                      transition={{ duration: 0.4, delay: 0.35, type: 'spring' }}
                      className="absolute -top-3 left-1/2 -translate-x-1/2 bg-[#761D19] text-[#F7F1E6] p-1.5 rounded-full shadow-lg border-2 border-[#F4F4F4] flex items-center justify-center z-20"
                    >
                      <CheckCircle className="w-4 h-4 text-[#D4AF37]" />
                    </motion.div>
                  </div>

                  <div className="space-y-1.5 max-w-sm mx-auto pt-1">
                    <h4 className="font-serif text-2xl text-[#262626] leading-tight">
                      Super Desconto Garantido!
                    </h4>

                    <p className="font-sans text-xs text-[#262626]/80 font-light leading-relaxed">
                      Que o axé ilumine seus passos, <strong className="font-semibold text-[#761D19]">{formData.nome}</strong>. Registramos o <strong className="font-semibold text-[#262626]">{formData.terreiro}</strong> no <strong className="font-semibold text-[#761D19]">Plano {currentPlan.name} ({billingCycle})</strong>.
                    </p>

                    <div className="inline-block bg-[#761D19]/8 border border-[#761D19]/15 rounded-lg px-3 py-1.5 text-[11px] text-[#761D19] font-medium mt-1">
                      📱 Entraremos em contato via WhatsApp <strong>{formData.whatsapp}</strong>
                    </div>
                  </div>

                  <div className="pt-2">
                    <button
                      onClick={handleReset}
                      className="relative w-full inline-flex items-center justify-center bg-gradient-to-r from-[#B81D18] via-[#990000] to-[#761D19] text-[#F7F1E6] px-8 py-2.5 rounded-full text-xs font-sans font-medium uppercase tracking-wider border border-white/40 shadow-md hover:scale-[1.005] transition-all cursor-pointer"
                    >
                      <span>Concluir</span>
                    </button>
                  </div>
                </motion.div>
              )}

            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  )
}
