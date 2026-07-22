import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { X, CheckCircle, Send } from 'lucide-react'

interface InteractiveDemoModalProps {
  isOpen: boolean
  onClose: () => void
}

export const InteractiveDemoModal = ({ isOpen, onClose }: InteractiveDemoModalProps) => {
  const [submitted, setSubmitted] = useState(false)
  const [formData, setFormData] = useState({
    nome: '',
    terreiro: '',
    vertente: 'Umbanda',
    whatsapp: '',
  })

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    setSubmitted(true)
  }

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 overflow-y-auto">
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 bg-ile-bg/90 backdrop-blur-md"
          />

          {/* Modal Card */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 20 }}
            transition={{ duration: 0.3 }}
            className="relative z-10 w-full max-w-lg glass-panel p-8 sm:p-10 rounded-3xl border border-ile-border-gold/50 shadow-2xl bg-ile-surface/95"
          >
            {/* Close Button */}
            <button
              onClick={onClose}
              className="absolute top-6 right-6 p-2 rounded-full text-ile-cream/60 hover:text-ile-cream hover:bg-ile-card transition-colors"
            >
              <X className="w-5 h-5" />
            </button>

            {!submitted ? (
              <div className="space-y-6">
                <div className="space-y-2">
                  <div className="inline-flex items-center space-x-1.5 px-3 py-1 rounded-full text-xs font-sans uppercase tracking-widest text-ile-gold border border-ile-border-gold/30 bg-ile-bg">
                    <span>Acesso Antecipado</span>
                  </div>
                  <h3 className="font-serif text-3xl text-silver-gradient">
                    Leve o ILÊ Para a Sua Casa de Axé
                  </h3>
                  <p className="font-sans text-xs text-ile-cream/70 font-light">
                    Preencha os dados abaixo para receber uma demonstração exclusiva e o acesso prioritário à plataforma.
                  </p>
                </div>

                <form onSubmit={handleSubmit} className="space-y-4 font-sans text-sm">
                  <div>
                    <label className="block text-xs uppercase tracking-wider text-ile-cream/80 mb-1.5 font-medium">
                      Seu Nome / Nome Litúrgico
                    </label>
                    <input
                      type="text"
                      required
                      placeholder="Ex: Pai João de Aruanda"
                      value={formData.nome}
                      onChange={(e) => setFormData({ ...formData, nome: e.target.value })}
                      className="w-full px-4 py-3 rounded-xl bg-ile-bg border border-ile-border text-ile-cream placeholder-ile-cream/30 focus:outline-none focus:border-ile-gold transition-colors"
                    />
                  </div>

                  <div>
                    <label className="block text-xs uppercase tracking-wider text-ile-cream/80 mb-1.5 font-medium">
                      Nome do Terreiro / Tenda / Ilê
                    </label>
                    <input
                      type="text"
                      required
                      placeholder="Ex: Tenda Espiritual Luz & Caridade"
                      value={formData.terreiro}
                      onChange={(e) => setFormData({ ...formData, terreiro: e.target.value })}
                      className="w-full px-4 py-3 rounded-xl bg-ile-bg border border-ile-border text-ile-cream placeholder-ile-cream/30 focus:outline-none focus:border-ile-gold transition-colors"
                    />
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs uppercase tracking-wider text-ile-cream/80 mb-1.5 font-medium">
                        Tradicionalidade
                      </label>
                      <select
                        value={formData.vertente}
                        onChange={(e) => setFormData({ ...formData, vertente: e.target.value })}
                        className="w-full px-4 py-3 rounded-xl bg-ile-bg border border-ile-border text-ile-cream focus:outline-none focus:border-ile-gold transition-colors"
                      >
                        <option value="Umbanda">Umbanda</option>
                        <option value="Candomblé Ketu">Candomblé Ketu</option>
                        <option value="Candomblé Angola">Candomblé Angola</option>
                        <option value="Candomblé Jeje">Candomblé Jeje</option>
                        <option value="Omolocô / Outras">Omolocô / Outras</option>
                      </select>
                    </div>

                    <div>
                      <label className="block text-xs uppercase tracking-wider text-ile-cream/80 mb-1.5 font-medium">
                        WhatsApp de Contato
                      </label>
                      <input
                        type="tel"
                        required
                        placeholder="(11) 99999-9999"
                        value={formData.whatsapp}
                        onChange={(e) => setFormData({ ...formData, whatsapp: e.target.value })}
                        className="w-full px-4 py-3 rounded-xl bg-ile-bg border border-ile-border text-ile-cream placeholder-ile-cream/30 focus:outline-none focus:border-ile-gold transition-colors"
                      />
                    </div>
                  </div>

                  <button
                    type="submit"
                    className="w-full py-4 rounded-xl bg-gold-gradient text-ile-bg font-sans font-semibold text-xs uppercase tracking-widest shadow-xl hover:brightness-110 transition-all flex items-center justify-center space-x-2 mt-2"
                  >
                    <Send className="w-4 h-4" />
                    <span>Enviar & Solicitar Demonstração</span>
                  </button>
                </form>
              </div>
            ) : (
              <div className="py-8 text-center space-y-4">
                <div className="w-16 h-16 rounded-full bg-ile-crimson/20 border border-ile-gold/40 flex items-center justify-center text-ile-gold mx-auto">
                  <CheckCircle className="w-8 h-8" />
                </div>
                <h4 className="font-serif text-3xl text-gold-gradient">
                  Solicitação Recebida com Sucesso!
                </h4>
                <p className="font-sans text-sm text-ile-cream/80 font-light max-w-sm mx-auto">
                  Que o axé ilumine seus passos. Nossa equipe entrará em contato via WhatsApp em breve para agendar sua demonstração.
                </p>
                <button
                  onClick={onClose}
                  className="px-6 py-2.5 rounded-full glass-panel border border-ile-border-gold/40 text-ile-gold text-xs uppercase tracking-widest hover:bg-ile-card transition-colors mt-4"
                >
                  Fechar
                </button>
              </div>
            )}
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  )
}
