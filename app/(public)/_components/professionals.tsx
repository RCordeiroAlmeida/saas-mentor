import {
  Card,
  CardAction,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"

import Image from "next/image"

import psicologa from "./../../../public/psicologa.jpg"
import Link from "next/link"
import { ArrowRight } from "lucide-react"

export function Professionals(){
    return (
        <section className="bg-gray-50 py-16">
            <div className="container mx-auto px-4 sm:px-6 lg:px-8">
                <h2 className="text-3xl text-center font-semibold mb-2">
                    Profissionais Qualificados
                </h2>
                <p className="text-center text-muted-foreground max-w-2xl mx-auto mb-10">
                    Encontre profissionais experientes e agende um horário facilmente.
                </p>
            </div>

            <section className="container mx-auto px-4 sm:px-6 lg:px-8 grid grid-cols-1 gap-6 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
                <Card className="p-0 overflow-hidden transform transition-all hover:scale-[1.02] hover:shadow-lg">
                    <CardContent className="p-0">
                        <div className="relative h-56">
                            <Image
                                src={psicologa}
                                alt="Psicóloga 1"
                                fill
                                className="object-cover object-center"
                            />
                            <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent" />
                            <div className="absolute left-4 bottom-4 text-white">
                                <h3 className="text-lg font-semibold leading-tight">Dr. Ana Silva</h3>
                                <p className="text-sm opacity-90">Psicóloga Clínica</p>
                            </div>
                        </div>

                        <div className="p-4">
                            <p className="text-sm text-muted-foreground">Rua x, 123 · Bairro Y · Cidade Z</p>

                            <div className="mt-4 flex items-center justify-between">
                                <div className="flex items-center gap-3">
                                    <div className="w-2.5 h-2.5 rounded-full bg-emerald-500" />
                                    <span className="text-sm font-medium text-emerald-700">Disponível</span>
                                </div>

                                <Link
                                    href="/agendamento/123"
                                    className="inline-flex items-center gap-2 bg-violet-600 hover:bg-violet-700 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-violet-400 text-white text-sm font-medium px-4 py-2 rounded-md transition"
                                >
                                    Agendar
                                    <ArrowRight className="w-4 h-4" />
                                </Link>
                            </div>
                        </div>
                    </CardContent>
                </Card>

            </section>
        </section>
    )
}
