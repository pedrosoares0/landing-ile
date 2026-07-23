import { useState, useRef, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { X, CheckCircle, ArrowRight, MapPin, Sparkles, Loader2, AlertCircle } from 'lucide-react'
import { filterCities, ESTADOS_UF, CityItem } from '../data/brazilianCities'
import { supabase } from '../lib/supabase'

interface InteractiveDemoModalProps {
  isOpen: boolean
  onClose: () => void
}

export const InteractiveDemoModal = ({ isOpen, onClose }: InteractiveDemoModalProps) => {
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

  // Format phone automatically in format: 71 99999-9999
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

  // Real Supabase insertion
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    setErrorMsg(null)

    try {
      const { error } = await supabase.from('landing_acesso_antecipado').insert([
        {
          landing_nome: formData.nome,
          landing_terreiro: formData.terreiro,
          landing_cidade: formData.cidade || cidadeQuery,
          landing_estado: formData.estado,
          landing_whatsapp: formData.whatsapp,
          landing_email: formData.email,
        },
      ])

      if (error) {
        console.error('Erro Supabase ao salvar pré-cadastro:', error)
        if (error.code === 'PGRST205' || error.message?.includes('schema cache')) {
          setErrorMsg('A tabela "landing_acesso_antecipado" ainda não foi criada no seu Supabase. Acesse o SQL Editor do Supabase e execute o script fornecido abaixo.')
        } else {
          setErrorMsg(`Erro no Supabase: ${error.message}`)
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
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 overflow-y-auto">
          {/* Backdrop with soft blur matching page atmosphere */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 bg-[#090506]/80 backdrop-blur-md"
          />

          {/* Modal Card - Refined, spacious editorial design */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 20 }}
            transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
            className="relative z-10 w-full max-w-[460px] bg-[#F7F1E6] text-[#262626] p-6 sm:p-8 rounded-2xl border border-[#761D19]/15 shadow-2xl overflow-hidden"
          >
            {/* Tactile Sand Noise Overlay */}
            <svg className="absolute inset-0 w-full h-full pointer-events-none opacity-[0.035] mix-blend-multiply z-0">
              <filter id="sand-noise-modal">
                <feTurbulence type="fractalNoise" baseFrequency="0.8" numOctaves="4" stitchTiles="stitch" />
                <feColorMatrix type="saturate" values="0" />
              </filter>
              <rect width="100%" height="100%" filter="url(#sand-noise-modal)" />
            </svg>

            {/* Subtle Crimson Radial Ambient Glow */}
            <div className="absolute -top-24 -right-24 w-64 h-64 bg-[#761D19]/8 rounded-full blur-3xl pointer-events-none" />
            <div className="absolute -bottom-24 -left-24 w-64 h-64 bg-[#990000]/8 rounded-full blur-3xl pointer-events-none" />

            {/* Close Button */}
            <button
              onClick={onClose}
              className="absolute top-4 right-4 z-20 p-1.5 rounded-full text-[#262626]/40 hover:text-[#761D19] hover:bg-[#761D19]/10 transition-colors cursor-pointer"
            >
              <X className="w-4 h-4" />
            </button>

            {!submitted ? (
              <div className="relative z-10 space-y-4">
                {/* Header Info - Refined & Clean Badge */}
                <div className="space-y-1.5 pr-6">
                  <div className="inline-flex items-center space-x-1.5 px-2.5 py-1 rounded-md text-[11px] font-sans font-semibold text-[#761D19] bg-[#761D19]/8 border border-[#761D19]/15">
                    <Sparkles className="w-3 h-3 text-[#990000]" />
                    <span>Lote Fundador — 40% OFF no 1º Mês</span>
                  </div>

                  <h3 className="font-serif text-2xl sm:text-[1.75rem] text-[#262626] leading-snug pt-0.5">
                    Leve o ILÊ Para a Sua{' '}
                    <span className="font-serif italic font-normal text-[#990000]">Casa de Axé</span>
                  </h3>

                  <p className="font-sans text-xs text-[#262626]/70 font-light leading-relaxed">
                    Garanta seu acesso prioritário e cupom exclusivo de lançamento.
                  </p>
                </div>

                {/* Error Banner if insertion fails */}
                {errorMsg && (
                  <div className="p-3 rounded-lg bg-red-500/10 border border-red-500/25 text-red-800 text-xs flex items-start space-x-2">
                    <AlertCircle className="w-4 h-4 text-red-600 shrink-0 mt-0.5" />
                    <span>{errorMsg}</span>
                  </div>
                )}

                {/* Form with Breathing Room */}
                <form onSubmit={handleSubmit} className="space-y-3 font-sans text-xs pt-1">
                  
                  {/* Nome */}
                  <div>
                    <label className="block text-xs font-sans text-[#262626]/80 font-medium mb-1">
                      Seu Nome / Nome Litúrgico *
                    </label>
                    <input
                      type="text"
                      required
                      placeholder="Ex: Pai João de Aruanda"
                      value={formData.nome}
                      onChange={(e) => setFormData({ ...formData, nome: e.target.value })}
                      className="w-full px-3.5 py-2.5 rounded-lg bg-white border border-[#262626]/15 text-[#262626] text-xs font-sans placeholder-[#262626]/35 focus:outline-none focus:border-[#761D19] focus:ring-2 focus:ring-[#761D19]/10 transition-all"
                    />
                  </div>

                  {/* Terreiro */}
                  <div>
                    <label className="block text-xs font-sans text-[#262626]/80 font-medium mb-1">
                      Nome do Terreiro / Tenda / Ilê *
                    </label>
                    <input
                      type="text"
                      required
                      placeholder="Ex: Tenda Espiritual Luz & Caridade"
                      value={formData.terreiro}
                      onChange={(e) => setFormData({ ...formData, terreiro: e.target.value })}
                      className="w-full px-3.5 py-2.5 rounded-lg bg-white border border-[#262626]/15 text-[#262626] text-xs font-sans placeholder-[#262626]/35 focus:outline-none focus:border-[#761D19] focus:ring-2 focus:ring-[#761D19]/10 transition-all"
                    />
                  </div>

                  {/* Cidade & Estado Grid */}
                  <div className="grid grid-cols-1 sm:grid-cols-12 gap-2.5">
                    
                    {/* Cidade Input with Autocomplete */}
                    <div ref={cityContainerRef} className="sm:col-span-8 relative">
                      <label className="block text-xs font-sans text-[#262626]/80 font-medium mb-1">
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
                          className="w-full px-3.5 py-2.5 rounded-lg bg-white border border-[#262626]/15 text-[#262626] text-xs font-sans placeholder-[#262626]/35 focus:outline-none focus:border-[#761D19] focus:ring-2 focus:ring-[#761D19]/10 transition-all pr-8"
                        />
                        <MapPin className="w-3.5 h-3.5 text-[#761D19]/40 absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none" />
                      </div>

                      {/* Autocomplete Suggestions */}
                      <AnimatePresence>
                        {showCityDropdown && citySuggestions.length > 0 && (
                          <motion.ul
                            initial={{ opacity: 0, y: -4 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0, y: -4 }}
                            className="absolute left-0 right-0 top-full mt-1 bg-white border border-[#761D19]/15 rounded-lg shadow-xl z-30 max-h-44 overflow-y-auto py-1 divide-y divide-slate-100 text-xs"
                          >
                            {citySuggestions.map((item, idx) => (
                              <li key={idx}>
                                <button
                                  type="button"
                                  onClick={() => handleSelectCity(item)}
                                  className="w-full text-left px-3.5 py-2 hover:bg-[#761D19]/8 transition-colors flex items-center justify-between font-sans text-[#262626] cursor-pointer"
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
                      <label className="block text-xs font-sans text-[#262626]/80 font-medium mb-1">
                        Estado (UF) *
                      </label>
                      <select
                        required
                        value={formData.estado}
                        onChange={(e) => setFormData({ ...formData, estado: e.target.value })}
                        className="w-full px-2.5 py-2.5 rounded-lg bg-white border border-[#262626]/15 text-[#262626] text-xs font-sans focus:outline-none focus:border-[#761D19] focus:ring-2 focus:ring-[#761D19]/10 transition-all cursor-pointer"
                      >
                        {ESTADOS_UF.map((item) => (
                          <option key={item.uf} value={item.uf}>
                            {item.uf} - {item.nome}
                          </option>
                        ))}
                      </select>
                    </div>

                  </div>

                  {/* Telefone & E-mail Grid */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                    
                    {/* Telefone */}
                    <div>
                      <label className="block text-xs font-sans text-[#262626]/80 font-medium mb-1">
                        WhatsApp *
                      </label>
                      <input
                        type="tel"
                        required
                        placeholder="71 99999-9999"
                        value={formData.whatsapp}
                        onChange={handlePhoneChange}
                        className="w-full px-3.5 py-2.5 rounded-lg bg-white border border-[#262626]/15 text-[#262626] text-xs font-sans placeholder-[#262626]/35 focus:outline-none focus:border-[#761D19] focus:ring-2 focus:ring-[#761D19]/10 transition-all"
                      />
                    </div>

                    {/* Email */}
                    <div>
                      <label className="block text-xs font-sans text-[#262626]/80 font-medium mb-1">
                        E-mail *
                      </label>
                      <input
                        type="email"
                        required
                        placeholder="exemplo@email.com"
                        value={formData.email}
                        onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                        className="w-full px-3.5 py-2.5 rounded-lg bg-white border border-[#262626]/15 text-[#262626] text-xs font-sans placeholder-[#262626]/35 focus:outline-none focus:border-[#761D19] focus:ring-2 focus:ring-[#761D19]/10 transition-all"
                      />
                    </div>

                  </div>

                  {/* Action Button */}
                  <div className="pt-1.5">
                    <button
                      type="submit"
                      disabled={loading}
                      className="relative w-full inline-flex items-center justify-center space-x-2 bg-gradient-to-r from-[#B81D18] via-[#990000] to-[#761D19] text-[#F7F1E6] px-6 py-3.5 rounded-full text-xs font-sans font-medium tracking-wide border border-white/40 shadow-md hover:shadow-lg hover:scale-[1.005] active:scale-[0.995] disabled:opacity-70 disabled:pointer-events-none transition-all group cursor-pointer overflow-hidden"
                    >
                      <span className="absolute inset-0 rounded-full bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-white/25 via-transparent to-transparent pointer-events-none" />
                      {loading ? (
                        <>
                          <Loader2 className="w-4 h-4 animate-spin text-[#F7F1E6]" />
                          <span className="relative z-10">Salvando no Banco...</span>
                        </>
                      ) : (
                        <>
                          <span className="relative z-10">Garantir Meu Super Desconto</span>
                          <ArrowRight className="relative z-10 w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
                        </>
                      )}
                    </button>
                  </div>

                  {/* Reassurance Copy */}
                  <p className="text-[10px] text-center text-[#262626]/50 font-sans tracking-wide pt-0.5">
                    🔒 Vagas limitadas no lote fundador • Seus dados estão 100% seguros
                  </p>
                </form>
              </div>
            ) : (
              /* Professional 40% OFF Coupon Success State */
              <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
                className="relative z-10 py-3 text-center space-y-4"
              >
                {/* 3D-styled 40% OFF Coupon Ticket Illustration */}
                <div className="relative w-full max-w-[300px] mx-auto pt-2 pb-1">
                  {/* Backlight Ambient Glow */}
                  <div className="absolute inset-0 bg-gradient-to-t from-[#990000]/25 via-[#761D19]/15 to-transparent blur-2xl rounded-full pointer-events-none" />

                  {/* Confetti & Sparkles Floating Graphics */}
                  <div className="absolute -top-1 left-2 w-3 h-3 rounded-full bg-[#D4AF37] opacity-80 blur-[0.5px] animate-pulse" />
                  <div className="absolute top-4 right-1 w-2.5 h-2.5 rounded-full bg-[#990000] opacity-70 blur-[0.5px]" />
                  <div className="absolute -bottom-1 left-4 w-2 h-2 rounded-full bg-[#D4AF37] opacity-90" />

                  {/* Ticket Container */}
                  <motion.div
                    initial={{ y: 20, opacity: 0, scale: 0.92 }}
                    animate={{ y: 0, opacity: 1, scale: 1 }}
                    transition={{ duration: 0.5, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
                    className="relative w-full bg-gradient-to-br from-[#761D19] via-[#990000] to-[#B81D18] text-[#F7F1E6] p-5 rounded-2xl shadow-[0_15px_35px_-10px_rgba(118,29,25,0.55)] border border-[#D4AF37]/50 overflow-hidden"
                  >
                    {/* Left & Right Curved Ticket Notches */}
                    <div className="absolute -left-3.5 top-1/2 -translate-y-1/2 w-7 h-7 bg-[#F7F1E6] rounded-full border-r border-[#761D19]/30" />
                    <div className="absolute -right-3.5 top-1/2 -translate-y-1/2 w-7 h-7 bg-[#F7F1E6] rounded-full border-l border-[#761D19]/30" />

                    {/* Dashed Line separator */}
                    <div className="absolute left-6 right-6 top-[54%] border-t-2 border-dashed border-[#F7F1E6]/30 pointer-events-none" />

                    {/* Glass Surface Flare */}
                    <div className="absolute inset-0 bg-gradient-to-tr from-transparent via-white/15 to-transparent pointer-events-none" />

                    {/* Top Section of Ticket */}
                    <div className="text-center pb-3.5 relative z-10">
                      <div className="inline-flex items-center space-x-1 text-[10px] font-sans font-bold tracking-[0.25em] text-[#F3E5AB] uppercase">
                        <Sparkles className="w-3 h-3 text-[#F3E5AB]" />
                        <span>CUPOM EXCLUSIVO — LOTE FUNDADOR</span>
                      </div>

                      <div className="flex items-center justify-center space-x-1.5 mt-1">
                        <span className="font-serif text-5xl sm:text-6xl font-bold tracking-tight text-white drop-shadow-md">
                          40%
                        </span>
                        <div className="flex flex-col text-left pl-0.5">
                          <span className="font-sans text-xs font-black text-[#F3E5AB] leading-none tracking-wider">OFF</span>
                          <span className="font-sans text-[9px] font-semibold text-white/90 leading-tight">DESCONTO</span>
                        </div>
                      </div>
                    </div>

                    {/* Bottom Section of Ticket */}
                    <div className="pt-3 text-center relative z-10">
                      <div className="inline-block bg-[#090506]/40 backdrop-blur-md px-4 py-1.5 rounded-lg border border-[#F3E5AB]/40 shadow-inner">
                        <span className="font-mono text-xs tracking-widest text-[#F7F1E6] font-bold">
                          AXE40-FUNDADOR
                        </span>
                      </div>
                      <p className="text-[9px] font-sans text-white/80 mt-1.5 font-light">
                        Aplicado automaticamente na 1ª mensalidade
                      </p>
                    </div>
                  </motion.div>

                  {/* Top Checkmark Badge */}
                  <motion.div
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    transition={{ duration: 0.4, delay: 0.35, type: 'spring' }}
                    className="absolute -top-3 left-1/2 -translate-x-1/2 bg-[#761D19] text-[#F7F1E6] p-1.5 rounded-full shadow-lg border-2 border-[#F7F1E6] flex items-center justify-center z-20"
                  >
                    <CheckCircle className="w-5 h-5 text-[#D4AF37]" />
                  </motion.div>
                </div>

                {/* Text Copy */}
                <div className="space-y-1.5 max-w-sm mx-auto pt-1">
                  <h4 className="font-serif text-2xl sm:text-3xl text-[#262626] leading-tight">
                    Super Desconto <br />
                    <span className="italic font-serif text-[#990000]">Garantido com Sucesso!</span>
                  </h4>

                  <p className="font-sans text-xs text-[#262626]/80 font-light leading-relaxed">
                    Que o axé ilumine seus passos, <strong className="font-semibold text-[#761D19]">{formData.nome}</strong>. Registramos os dados do <strong className="font-semibold text-[#262626]">{formData.terreiro}</strong> em nossa lista prioritária.
                  </p>

                  <div className="inline-block bg-[#761D19]/8 border border-[#761D19]/15 rounded-lg px-3 py-1.5 text-[11px] text-[#761D19] font-medium mt-1">
                    📱 Liberaremos seu cupom pelo WhatsApp <strong>{formData.whatsapp}</strong>
                  </div>
                </div>

                <div className="pt-2">
                  <button
                    onClick={handleReset}
                    className="relative w-full inline-flex items-center justify-center bg-gradient-to-r from-[#B81D18] via-[#990000] to-[#761D19] text-[#F7F1E6] px-8 py-3.5 rounded-full text-xs font-sans font-medium uppercase tracking-wider border border-white/40 shadow-md hover:shadow-lg hover:scale-[1.005] active:scale-[0.995] transition-all cursor-pointer"
                  >
                    <span>Concluir</span>
                  </button>
                </div>
              </motion.div>
            )}
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  )
}
