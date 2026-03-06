import { Card, CardContent } from "@/components/ui/card"
import Image from "next/image"
import psicologa from "./../../../public/psicologa.jpg"
import Link from "next/link"
import { ArrowRight } from "lucide-react"

export function Professionals() {
    return (
        <section id="profissionais" className="relative bg-noite py-28 overflow-hidden">

            {/* Background glow */}
            <div className="absolute inset-0 pointer-events-none">
                <div className="absolute w-[500px] h-[500px] rounded-full bg-orquidea/15 blur-[120px] right-0 top-0 translate-x-1/2 -translate-y-1/2" />
                <div className="absolute w-[400px] h-[400px] rounded-full bg-sage/10 blur-[100px] left-0 bottom-0 -translate-x-1/2 translate-y-1/2" />
            </div>

            <div className="relative container mx-auto px-6">

                {/* Header */}
                <div className="text-center mb-16">
                    <div className="flex items-center gap-3 justify-center mb-4">
                        <div className="w-6 h-px bg-sage" />
                        <span className="text-xs tracking-widest uppercase text-sage font-normal">
                            Nossa equipe
                        </span>
                        <div className="w-6 h-px bg-sage" />
                    </div>
                    <h2 className="font-['Cormorant_Garamond'] text-4xl lg:text-5xl font-light text-white leading-tight mb-4">
                        Profissionais <em className="italic text-lavanda">qualificados</em>
                    </h2>
                    <p className="text-sm text-white/40 font-light max-w-md mx-auto leading-relaxed">
                        Encontre profissionais experientes e agende um horário facilmente.
                    </p>
                </div>

                {/* Cards grid */}
                <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
                    <Card className="p-0 overflow-hidden bg-white/5 border border-white/8 hover:border-lavanda/40 hover:bg-white/8 transition-all duration-300 hover:-translate-y-1 hover:shadow-[0_12px_40px_rgba(107,79,160,0.2)] group">
                        <CardContent className="p-0">
                            {/* Photo */}
                            <div className="relative h-56 overflow-hidden">
                                <Image
                                    src={psicologa}
                                    alt="Psicóloga 1"
                                    fill
                                    className="object-cover object-center group-hover:scale-105 transition-transform duration-500"
                                />
                                <div className="absolute inset-0 bg-gradient-to-t from-noite/80 via-noite/20 to-transparent" />
                                <div className="absolute left-4 bottom-4 text-white">
                                    <h3 className="font-['Cormorant_Garamond'] text-lg font-light leading-tight">Dr. Ana Silva</h3>
                                    <p className="text-xs text-white/60 tracking-wide">Psicóloga Clínica</p>
                                </div>
                            </div>

                            {/* Body */}
                            <div className="p-4 space-y-4">
                                <p className="text-xs text-white/35 font-light">Rua x, 123 · Bairro Y · Cidade Z</p>

                                <div className="flex items-center justify-between">
                                    <div className="flex items-center gap-2">
                                        <div className="w-2 h-2 rounded-full bg-sage shadow-[0_0_8px_rgba(120,191,160,0.6)]" />
                                        <span className="text-xs font-medium text-sage">Disponível</span>
                                    </div>

                                    <Link
                                        href="/agendamento/123"
                                        className="inline-flex items-center gap-1.5 bg-orquidea hover:bg-orquidea/85 text-white text-xs font-medium px-4 py-2 rounded-full transition-all duration-200 hover:shadow-[0_4px_14px_rgba(107,79,160,0.4)]"
                                    >
                                        Agendar
                                        <ArrowRight className="w-3 h-3" />
                                    </Link>
                                </div>
                            </div>
                        </CardContent>
                    </Card>
                </div>
            </div>
        </section>
    )
}