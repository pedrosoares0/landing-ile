import { useState } from 'react'
import { motion } from 'framer-motion'
import { Wallet, Calendar, Music, Users, ArrowRight, CheckCircle2, ShieldCheck, Play } from 'lucide-react'

const MODULES = [
  {
    id: 'financeiro',
    title: 'Gestão Financeira Litúrgica',
    subtitle: 'Clareza, prestação de contas e sustentabilidade para a casa de axé',
    icon: Wallet,
    tag: 'Finanças & Caixa',
    color: 'from-amber-500/20 to-rose-900/40',
    borderColor: 'border-amber-500/30',
    badgeColor: 'text-amber-400 bg-amber-950/40 border-amber-800/40',
    description:
      'Mantenha as mensalidades dos médiuns e doações em dia sem complicação. Relatórios claros e seguros para a liderança sacerdotal e a diretoria do terreiro.',
    features: [
      'Controle automatizado de mensalidades de filhos de santo',
      'Registro de doações espontâneas e compras de oferendas',
      'Fluxo de caixa transparente com recibos digitais',
      'Relatório mensal para prestação de contas litúrgica',
    ],
    mockup: {
      header: 'Caixa Litúrgico — Julho 2024',
      metric1: { label: 'Mensalidades Recebidas', val: 'R$ 4.850,00' },
      metric2: { label: 'Doações & Ofertas', val: 'R$ 1.620,00' },
      metric3: { label: 'Despesas da Casa', val: 'R$ 2.980,00' },
      status: 'Saldo Positivo: R$ 3.490,00',
    },
  },
  {
    id: 'calendario',
    title: 'Calendário de Giras & Eventos',
    subtitle: 'Organização de rituais, atendimentos e obrigações',
    icon: Calendar,
    tag: 'Agenda Sagrada',
    color: 'from-rose-900/30 to-ile-crimson/50',
    borderColor: 'border-ile-crimson/40',
    badgeColor: 'text-rose-300 bg-rose-950/40 border-rose-800/40',
    description:
      'Programe giras públicas, obrigações internas, toques de alvorada e atendimentos à comunidade com aviso aos médiuns e controle de presença.',
    features: [
      'Agenda de Giras de Umbanda e Festas de Candomblé',
      'Agendamento de atendimento público ao consulente',
      'Escala da Curimba, Cambones e médiuns de passe',
      'Notificações automáticas via WhatsApp/E-mail',
    ],
    mockup: {
      header: 'Gira de Ogum & Atendimento Público',
      metric1: { label: 'Data', val: 'Sexta-feira, 20:00h' },
      metric2: { label: 'Médiuns Confirmados', val: '28 Filhos de Santo' },
      metric3: { label: 'Atendimentos Agendados', val: '45 Senhas' },
      status: 'Escala de Curimba Completa',
    },
  },
  {
    id: 'pontos',
    title: 'Biblioteca de Pontos Cantados',
    subtitle: 'Acervo sagrado com letras, áudios e álbuns da curimba',
    icon: Music,
    tag: 'Pontos & Louvores',
    color: 'from-amber-600/20 to-amber-950/40',
    borderColor: 'border-amber-600/30',
    badgeColor: 'text-amber-300 bg-amber-950/40 border-amber-800/40',
    description:
      'Nunca mais perca a letra de um ponto antigo. Organize o acervo cantado do terreiro por Orixá, Linha de Trabalho e Entidade com player de áudio integrado.',
    features: [
      'Categorização por Orixá (Ogum, Oxum, Xangô...) e Linha',
      'Letras formatadas com cifras para atabaque e violão',
      'Upload e reprodução de áudios de gravação do terreiro',
      'Busca instantânea para uso durante o ritual ou ensaio',
    ],
    mockup: {
      header: 'Ponto Cantado — Caboclo das Sete Cachoeiras',
      metric1: { label: 'Linha', val: 'Caboclos de Oxóssi' },
      metric2: { label: 'Toque', val: 'Ijexá / Barravento' },
      metric3: { label: 'Gravado por', val: 'Curimba do Ilê' },
      status: 'Ponto Adicionado ao Repertório da Gira',
    },
  },
  {
    id: 'comunidade',
    title: 'Comunidade & Filhos de Santo',
    subtitle: 'Cadastro litúrgico, hierarquia e histórico espiritual',
    icon: Users,
    tag: 'Gestão de Médiuns',
    color: 'from-ile-border-gold/30 to-ile-surface',
    borderColor: 'border-ile-border-gold/40',
    badgeColor: 'text-ile-gold bg-ile-surface border-ile-border-gold/40',
    description:
      'Cadastre a corrente mediúnica respeitando os graus litúrgicos: Pai/Mãe de Santo, Ogãs, Cambones, Iniciados e Consulentes frequentes.',
    features: [
      'Perfil completo do médium com Orixás de cabeça',
      'Registro de amacis, coroações e obrigações cumpridas',
      'Comunicação direta com a corrente do terreiro',
      'Ficha médica simples e contatos de emergência',
    ],
    mockup: {
      header: 'Corrente Mediúnica do Ilê',
      metric1: { label: 'Total de Médiuns', val: '42 Ativos' },
      metric2: { label: 'Corrente de Cambones', val: '12 Cadastrados' },
      metric3: { label: 'Filhos da Casa', val: '30 Coroados' },
      status: 'Todos com cadastro litúrgico atualizado',
    },
  },
]

export const SaasOverview = () => {
  const [activeTab, setActiveTab] = useState(0)

  const activeModule = MODULES[activeTab]

  return (
    <section id="recursos" className="py-24 relative bg-ile-bg bg-grain overflow-hidden">
      {/* Subtle Background Glow */}
      <div className="absolute top-1/2 left-0 w-96 h-96 bg-ile-crimson/15 rounded-full blur-[140px] pointer-events-none" />
      <div className="absolute bottom-10 right-0 w-96 h-96 bg-ile-gold/10 rounded-full blur-[140px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-6 md:px-12 relative z-10">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto space-y-4 mb-16">
          <span className="font-serif italic text-ile-gold text-xl md:text-2xl">
            Solução Completa & Respeitosa
          </span>
          <h2 className="font-serif text-4xl sm:text-5xl md:text-6xl text-silver-gradient tracking-tight">
            Projetado para as Necessidades do Seu <span className="font-serif italic text-gold-gradient">Terreiro</span>
          </h2>
          <p className="font-sans text-ile-cream/70 text-base md:text-lg font-light">
            O ILÊ une a tradição litúrgica à tecnologia moderna em quatro módulos intuitivos desenvolvidos especificamente para Umbanda e Candomblé.
          </p>
        </div>

        {/* Tab Selection Buttons */}
        <div className="flex flex-wrap justify-center gap-3 mb-12">
          {MODULES.map((mod, index) => {
            const Icon = mod.icon
            const isActive = activeTab === index
            return (
              <button
                key={mod.id}
                onClick={() => setActiveTab(index)}
                className={`flex items-center space-x-2 px-5 py-3 rounded-full text-xs font-sans uppercase tracking-wider transition-all duration-300 ${
                  isActive
                    ? 'bg-gold-gradient text-ile-bg shadow-xl font-semibold scale-[1.03]'
                    : 'glass-panel text-ile-cream/70 hover:text-ile-cream hover:border-ile-gold/40'
                }`}
              >
                <Icon className={`w-4 h-4 ${isActive ? 'text-ile-bg' : 'text-ile-gold'}`} />
                <span>{mod.title}</span>
              </button>
            )
          })}
        </div>

        {/* Active Module Display Card */}
        <motion.div
          key={activeModule.id}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className={`glass-panel p-8 md:p-12 rounded-3xl border ${activeModule.borderColor} relative overflow-hidden shadow-2xl`}
        >
          {/* Subtle Ambient Card Gradient */}
          <div className={`absolute inset-0 bg-gradient-to-br ${activeModule.color} pointer-events-none opacity-40`} />

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center relative z-10">
            
            {/* Left Column: Description & Checklist */}
            <div className="lg:col-span-7 space-y-6">
              <div className="inline-flex items-center space-x-2 px-3 py-1 rounded-full text-xs font-medium border uppercase tracking-widest ${activeModule.badgeColor}">
                <ShieldCheck className="w-3.5 h-3.5" />
                <span>{activeModule.tag}</span>
              </div>

              <h3 className="font-serif text-3xl sm:text-4xl md:text-5xl text-ile-cream">
                {activeModule.title}
              </h3>

              <p className="font-sans text-lg font-light text-ile-cream/80 leading-relaxed">
                {activeModule.description}
              </p>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-4 border-t border-ile-border/40">
                {activeModule.features.map((feat, idx) => (
                  <div key={idx} className="flex items-start space-x-3 text-sm text-ile-cream/80">
                    <CheckCircle2 className="w-5 h-5 text-ile-gold shrink-0 mt-0.5" />
                    <span className="font-sans font-light">{feat}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Right Column: Simulated Live UI Card */}
            <div className="lg:col-span-5">
              <div className="glass-panel p-6 rounded-2xl border border-ile-border-gold/40 shadow-2xl relative space-y-6 bg-ile-surface/90">
                
                {/* Header */}
                <div className="flex items-center justify-between border-b border-ile-border/40 pb-4">
                  <div className="flex items-center space-x-2">
                    <div className="w-3 h-3 rounded-full bg-ile-crimson" />
                    <span className="font-serif italic text-ile-gold text-lg">{activeModule.mockup.header}</span>
                  </div>
                  <span className="text-[10px] text-ile-cream/40 uppercase tracking-widest font-sans">Live ILÊ App</span>
                </div>

                {/* Metrics Grid */}
                <div className="space-y-3">
                  <div className="flex justify-between items-center p-3 rounded-lg bg-ile-bg/60 border border-ile-border/30">
                    <span className="text-xs text-ile-cream/60 font-sans">{activeModule.mockup.metric1.label}</span>
                    <span className="font-serif text-lg text-ile-cream font-medium">{activeModule.mockup.metric1.val}</span>
                  </div>
                  
                  <div className="flex justify-between items-center p-3 rounded-lg bg-ile-bg/60 border border-ile-border/30">
                    <span className="text-xs text-ile-cream/60 font-sans">{activeModule.mockup.metric2.label}</span>
                    <span className="font-serif text-lg text-ile-gold font-medium">{activeModule.mockup.metric2.val}</span>
                  </div>

                  <div className="flex justify-between items-center p-3 rounded-lg bg-ile-bg/60 border border-ile-border/30">
                    <span className="text-xs text-ile-cream/60 font-sans">{activeModule.mockup.metric3.label}</span>
                    <span className="font-serif text-lg text-ile-cream/90 font-medium">{activeModule.mockup.metric3.val}</span>
                  </div>
                </div>

                {/* Bottom Live Status Pill */}
                <div className="p-3 rounded-xl bg-ile-crimson/20 border border-ile-crimson/40 flex items-center justify-between text-xs text-ile-cream">
                  <div className="flex items-center space-x-2">
                    <Play className="w-3.5 h-3.5 text-ile-gold fill-current" />
                    <span className="font-sans font-medium">{activeModule.mockup.status}</span>
                  </div>
                  <span className="text-[10px] text-ile-gold/80 font-serif italic">Sincronizado</span>
                </div>

              </div>
            </div>

          </div>
        </motion.div>

      </div>
    </section>
  )
}
