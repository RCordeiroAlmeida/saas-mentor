import { Button } from "@/components/ui/button";
import heroImg from "../../../public/hero-image.png"

import logoColorido from "../../../public/logo-colorido.png"
import Image from "next/image";
import { ArrowRight, ChevronRight } from "lucide-react";

export function Hero() {
  return (
    <section>
        <div className="container mx-auto px-4 pt-8 sm:px-6 lg:px-8">
           <main className="flex items-center justify-center min-h-screen md:justify-between flex-col md:flex-row gap-10 relative">
                {/* Glow behind article on SM - small detail */}
                <div className="block md:hidden absolute w-60 h-60 rounded-full bg-purple-400 blur-2xl opacity-30 animate-spin -z-10  left-1/2 transform -translate-x-1/2" style={{ animationDuration: '20s' }}></div>

                <article className="space-y-8 max-w-1/2 text-center md:text-left flex flex-col md:block md:items-start items-center">
                    <Image src={logoColorido} alt="Logo do Mentor colorido"/>
                    <h1 className="text-3xl lg:text-6xl font-bold  text-gray-800">Bem-vindo a Mentor</h1>
                    <p className=" text-base  lg:text-lg text-gray-600">Atendimento psicológico humanizado, com cuidado real e responsabilidade.</p>

                    <Button className=" bg-violet-500 hover:bg-violet-100 hover:text-violet-500 duration-500">
                        Agende sua consulta 
                    </Button>
                </article>

                <div className="hidden md:block ml-10">
                    <div className="relative w-[600px] h-[600] md:w-[380px] md:h-[380px] lg:w-[480px] lg:h-[480px]">
                        {/* Glow */}
                        <div className="absolute -inset-6 rounded-2xl bg-purple-300 blur-3xl opacity-75 animate-spin" style={{ animationDuration: '20s' }}></div>

                        
                        <div className="absolute -inset-3 rounded-2xl bg-white/5"></div>

                        
                        <div className="relative z-10 w-full h-full rounded-2xl overflow-hidden">
                            <Image
                                src={heroImg}
                                alt="Imagem de saúde mental"
                                fill
                                sizes="(min-width: 768px) 420px, 300px"
                                className="object-cover" />
                        </div>

                        
                        <div className="absolute inset-0 pointer-events-none">
                            <div className="absolute inset-3 rounded-2xl border-4 border-white/90"></div>
                        </div>
                    </div>
                </div>
           </main>
        </div>
    </section>
  )
} 