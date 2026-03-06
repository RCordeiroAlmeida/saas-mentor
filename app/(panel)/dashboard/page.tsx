import getSesion from '@/lib/getSession'
import { redirect } from 'next/navigation'
import {
  Calendar,
  TrendingUp,
  Users,
  Clock,
  ArrowUpRight,
  ArrowDownRight,
  MoreHorizontal,
  CheckCircle2,
  Circle,
  Sparkles,
} from 'lucide-react'

export default async function Dashboard() {
  const session = await getSesion();

  if (!session) {
    redirect('/');
  }

  const stats = [
    {
      label: 'Consultas este mês',
      value: '48',
      delta: '+12%',
      up: true,
      icon: <Calendar className="w-5 h-5" />,
      color: 'text-orquidea',
      bg: 'bg-lavanda-light',
    },
    {
      label: 'Pacientes ativos',
      value: '31',
      delta: '+3',
      up: true,
      icon: <Users className="w-5 h-5" />,
      color: 'text-sage',
      bg: 'bg-sage-light',
    },
    {
      label: 'Horas atendidas',
      value: '96h',
      delta: '-4h',
      up: false,
      icon: <Clock className="w-5 h-5" />,
      color: 'text-lavanda',
      bg: 'bg-lavanda-light',
    },
    {
      label: 'Receita do mês',
      value: 'R$ 9.600',
      delta: '+18%',
      up: true,
      icon: <TrendingUp className="w-5 h-5" />,
      color: 'text-orquidea',
      bg: 'bg-lavanda-light',
    },
  ]

  const appointments = [
    { time: '08:00', name: 'Ana Beatriz Silva', type: 'Psicoterapia Individual', status: 'confirmed', duration: '50 min' },
    { time: '09:00', name: 'Carlos Eduardo Lima', type: 'Terapia Infantil', status: 'confirmed', duration: '45 min' },
    { time: '10:30', name: 'Mariana Ferreira', type: 'Avaliação Psicológica', status: 'pending', duration: '90 min' },
    { time: '14:00', name: 'Roberto Alves', type: 'Psicoterapia Individual', status: 'confirmed', duration: '50 min' },
    { time: '15:30', name: 'Juliana Costa', type: 'Orientação Parental', status: 'pending', duration: '60 min' },
  ]

  const weekDays = [
    { day: 'Seg', consultations: 6, height: 60 },
    { day: 'Ter', consultations: 9, height: 90 },
    { day: 'Qua', consultations: 7, height: 70 },
    { day: 'Qui', consultations: 11, height: 100 },
    { day: 'Sex', consultations: 8, height: 80 },
    { day: 'Sáb', consultations: 4, height: 40 },
    { day: 'Dom', consultations: 0, height: 5 },
  ]

  const recentPatients = [
    { name: 'Ana Beatriz', initials: 'AB', sessions: 12, lastSeen: 'Hoje', color: 'bg-orquidea' },
    { name: 'Carlos Lima', initials: 'CL', sessions: 7, lastSeen: 'Ontem', color: 'bg-sage' },
    { name: 'Mariana F.', initials: 'MF', sessions: 3, lastSeen: '3 dias', color: 'bg-lavanda' },
    { name: 'Roberto A.', initials: 'RA', sessions: 20, lastSeen: 'Hoje', color: 'bg-orquidea' },
  ]

  return (
    <div className="min-h-screen bg-nevoa px-4 py-8 md:px-8">

      {/* ── PAGE HEADER ── */}
      <div className="mb-10 flex items-end justify-between gap-4 flex-wrap">
        <div>
          <p className="text-xs tracking-widest uppercase text-gray-400 font-normal mb-1.5">
            Claramente · Psicólogo
          </p>
          <h1 className="font-['Cormorant_Garamond'] text-4xl font-light text-noite leading-tight">
            Bom dia, <em className="italic text-orquidea">{session.user?.name?.split(' ')[0] ?? 'Doutor'}</em>
          </h1>
          <p className="text-sm text-gray-400 font-light mt-1">
            Você tem <span className="text-orquidea font-medium">5 consultas</span> agendadas para hoje.
          </p>
        </div>

        <div className="flex items-center gap-2 bg-white border border-lavanda/20 rounded-2xl px-4 py-2.5 shadow-sm">
          <Sparkles className="w-4 h-4 text-orquidea" />
          <span className="text-sm text-noite font-medium">
            {new Date().toLocaleDateString('pt-BR', { weekday: 'long', day: 'numeric', month: 'long' })}
          </span>
        </div>
      </div>

      {/* ── STATS ── */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
        {stats.map((stat, i) => (
          <div
            key={i}
            className="bg-white rounded-2xl p-5 border border-lavanda/15 shadow-sm hover:shadow-md hover:-translate-y-0.5 transition-all duration-200"
          >
            <div className="flex items-start justify-between mb-4">
              <div className={`w-10 h-10 rounded-xl ${stat.bg} flex items-center justify-center ${stat.color}`}>
                {stat.icon}
              </div>
              <span className={`flex items-center gap-1 text-xs font-medium ${stat.up ? 'text-sage' : 'text-red-400'}`}>
                {stat.up ? <ArrowUpRight className="w-3.5 h-3.5" /> : <ArrowDownRight className="w-3.5 h-3.5" />}
                {stat.delta}
              </span>
            </div>
            <p className="font-['Cormorant_Garamond'] text-3xl font-semibold text-noite leading-none mb-1">
              {stat.value}
            </p>
            <p className="text-xs text-gray-400 font-light">{stat.label}</p>
          </div>
        ))}
      </div>

      {/* ── MAIN GRID ── */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-6">

        {/* Agenda do dia */}
        <div className="lg:col-span-2 bg-white rounded-2xl border border-lavanda/15 shadow-sm overflow-hidden">
          <div className="px-6 py-5 flex items-center justify-between border-b border-lavanda/10">
            <div>
              <p className="text-xs tracking-widest uppercase text-gray-400 mb-0.5">Hoje</p>
              <h2 className="font-['Cormorant_Garamond'] text-xl font-light text-noite">
                Agenda do dia
              </h2>
            </div>
            <button className="w-8 h-8 rounded-xl border border-lavanda/30 flex items-center justify-center text-gray-400 hover:bg-lavanda-light hover:text-orquidea transition-colors">
              <MoreHorizontal className="w-4 h-4" />
            </button>
          </div>

          <div className="divide-y divide-lavanda/8">
            {appointments.map((apt, i) => (
              <div key={i} className="px-6 py-4 flex items-center gap-4 hover:bg-nevoa/60 transition-colors group">
                {/* Time */}
                <div className="w-14 flex-shrink-0">
                  <p className="text-sm font-medium text-noite">{apt.time}</p>
                  <p className="text-xs text-gray-400">{apt.duration}</p>
                </div>

                {/* Divider dot */}
                <div className="flex flex-col items-center gap-1 flex-shrink-0">
                  <div className={`w-2.5 h-2.5 rounded-full ${apt.status === 'confirmed' ? 'bg-sage' : 'bg-lavanda'}`} />
                  {i < appointments.length - 1 && <div className="w-px h-6 bg-lavanda/20" />}
                </div>

                {/* Info */}
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-medium text-noite truncate">{apt.name}</p>
                  <p className="text-xs text-gray-400 truncate">{apt.type}</p>
                </div>

                {/* Status badge */}
                <span className={`text-xs font-medium px-3 py-1 rounded-full flex-shrink-0 flex items-center gap-1.5 ${
                  apt.status === 'confirmed'
                    ? 'bg-sage-light text-sage'
                    : 'bg-lavanda-light text-orquidea'
                }`}>
                  {apt.status === 'confirmed'
                    ? <><CheckCircle2 className="w-3 h-3" /> Confirmado</>
                    : <><Circle className="w-3 h-3" /> Pendente</>
                  }
                </span>
              </div>
            ))}
          </div>
        </div>

        {/* Pacientes recentes */}
        <div className="bg-white rounded-2xl border border-lavanda/15 shadow-sm overflow-hidden">
          <div className="px-6 py-5 border-b border-lavanda/10">
            <p className="text-xs tracking-widest uppercase text-gray-400 mb-0.5">Recentes</p>
            <h2 className="font-['Cormorant_Garamond'] text-xl font-light text-noite">
              Meus pacientes
            </h2>
          </div>

          <div className="p-4 flex flex-col gap-2">
            {recentPatients.map((p, i) => (
              <div
                key={i}
                className="flex items-center gap-3 p-3 rounded-xl hover:bg-nevoa transition-colors cursor-pointer group"
              >
                <div className={`w-9 h-9 rounded-xl ${p.color} flex items-center justify-center text-white text-xs font-semibold flex-shrink-0`}>
                  {p.initials}
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-medium text-noite truncate">{p.name}</p>
                  <p className="text-xs text-gray-400">{p.sessions} sessões</p>
                </div>
                <span className="text-xs text-gray-300 flex-shrink-0">{p.lastSeen}</span>
              </div>
            ))}
          </div>

          <div className="px-6 pb-5">
            <div className="h-px bg-lavanda-light mb-4" />
            <button className="w-full text-xs text-orquidea font-medium tracking-wide hover:underline">
              Ver todos os pacientes →
            </button>
          </div>
        </div>
      </div>

      {/* ── BOTTOM GRID ── */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">

        {/* Gráfico de barras semanal */}
        <div className="lg:col-span-2 bg-white rounded-2xl border border-lavanda/15 shadow-sm p-6">
          <div className="flex items-center justify-between mb-6">
            <div>
              <p className="text-xs tracking-widest uppercase text-gray-400 mb-0.5">Esta semana</p>
              <h2 className="font-['Cormorant_Garamond'] text-xl font-light text-noite">
                Consultas por dia
              </h2>
            </div>
            <span className="text-xs bg-lavanda-light text-orquidea font-medium px-3 py-1 rounded-full">
              45 no total
            </span>
          </div>

          {/* Bar chart */}
          <div className="flex items-end justify-between gap-2 h-32">
            {weekDays.map((d, i) => (
              <div key={i} className="flex-1 flex flex-col items-center gap-2">
                <span className="text-xs text-gray-400">{d.consultations || ''}</span>
                <div className="w-full relative" style={{ height: `${d.height}px` }}>
                  <div
                    className={`absolute bottom-0 w-full rounded-t-lg transition-all duration-300 ${
                      d.day === 'Qui'
                        ? 'bg-orquidea'
                        : d.consultations === 0
                        ? 'bg-lavanda/15'
                        : 'bg-lavanda-light hover:bg-lavanda/50'
                    }`}
                    style={{ height: '100%' }}
                  />
                </div>
                <span className="text-xs text-gray-400">{d.day}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Resumo financeiro */}
        <div className="bg-gradient-to-br from-orquidea to-noite rounded-2xl p-6 relative overflow-hidden shadow-lg">
          {/* Decorative circles */}
          <div className="absolute -top-10 -right-10 w-40 h-40 rounded-full bg-white/5" />
          <div className="absolute -bottom-8 -left-8 w-32 h-32 rounded-full bg-sage/10" />

          <div className="relative z-10">
            <p className="text-xs tracking-widest uppercase text-white/40 mb-1">Financeiro</p>
            <h2 className="font-['Cormorant_Garamond'] text-xl font-light text-white mb-6">
              Resumo do mês
            </h2>

            <div className="space-y-4">
              <div>
                <p className="text-xs text-white/40 mb-1">Receita total</p>
                <p className="font-['Cormorant_Garamond'] text-3xl font-semibold text-white leading-none">
                  R$ 9.600
                </p>
              </div>

              <div className="h-px bg-white/10" />

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <p className="text-xs text-white/40 mb-1">Recebido</p>
                  <p className="text-lg font-medium text-sage">R$ 7.200</p>
                </div>
                <div>
                  <p className="text-xs text-white/40 mb-1">A receber</p>
                  <p className="text-lg font-medium text-white/70">R$ 2.400</p>
                </div>
              </div>

              <div className="h-px bg-white/10" />

              {/* Progress bar */}
              <div>
                <div className="flex justify-between text-xs text-white/40 mb-2">
                  <span>Meta mensal</span>
                  <span>75%</span>
                </div>
                <div className="w-full h-1.5 bg-white/10 rounded-full overflow-hidden">
                  <div className="h-full w-3/4 bg-sage rounded-full" />
                </div>
              </div>
            </div>
          </div>
        </div>

      </div>
    </div>
  )
}