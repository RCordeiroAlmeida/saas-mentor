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
                <h2 className="text-3xl text-center mb-12 ">
                    Profissionais Qualificados
                </h2>
            </div>

            <section className="grid grid-cols-1 gap-6 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 container mx-auto px-4 sm:px-6 lg:px-8">
                <Card className="p-0 overflow-hidden">
                    <CardContent className="p-0">
                        <div>
                            <div className="relative h-48">
                                <Image
                                    src={psicologa}
                                    alt="Psicóloga 1"
                                    fill
                                    className="object-cover object-center"
                                ></Image>
                            </div>
                        </div>

                        <div className="p-4 space-y-4">
                            <div className="flex items-center justify-between">
                                <div>
                                    <h3 className="text-lg font-semibold">
                                        Dr. Ana Silva
                                    </h3>
                                    <p>
                                        Rua x, 123 - Bairro Y, Cidade Z
                                    </p>
                                </div>
                                <div className=" w-2.5 h-2.5 rounded-full bg-emerald-500"></div>
                            </div>

                            <Link href="/agendamento/123" className="bg-violet-600 hover:bg-violet-100 hover:text-violet-700 duration-500 flex items-center justify-center rounded-md px-4 py-2 text-sm font-medium text-white">
                                Agendar horário
                                <ArrowRight className="ml-2 h-4 w-4" />
                            </Link>
                        </div>
                    </CardContent>
                </Card>
                
            </section>
        </section>
    )
}
