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

const professionals = [
  {
    id: 1,
    name: "Dra. Ana Silva",
    specialty: "Psicóloga Clínica",
    description: "Especialista em terapia cognitivo-comportamental com 10 anos de experiência",
    image: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=400&h=400&fit=crop"
  },
  {
    id: 2,
    name: "Dr. Carlos Mendes",
    specialty: "Psiquiatra",
    description: "Especialista em transtornos de humor e diagnóstico diferencial",
    image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&h=400&fit=crop"
  },
  {
    id: 3,
    name: "Dra. Marina Costa",
    specialty: "Terapeuta Ocupacional",
    description: "Focada em reabilitação psicossocial e desenvolvimento pessoal",
    image: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=400&h=400&fit=crop"
  },
  {
    id: 4,
    name: "Dr. Rafael Santos",
    specialty: "Neuropsicólogo",
    description: "Especialista em avaliação cognitiva e reabilitação neurológica",
    image: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=400&h=400&fit=crop"
  }
]

export function Professionals(){
    return (
        <section id="profissionais" className="bg-gradient-to-br from-slate-50 to-slate-100 py-16">
            <div className="container mx-auto px-4 sm:px-6 lg:px-8">
                <div className="text-center mb-12">
                    <h2 className="text-4xl font-bold mb-3 bg-gradient-to-r from-violet-600 to-violet-500 bg-clip-text text-transparent">
                        Profissionais Qualificados
                    </h2>
                    <p className="text-gray-600 text-lg">Conheça nossa equipe de especialistas prontos para ajudar você</p>
                </div>

                <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-4">
                    {professionals.map((professional) => (
                        <Card key={professional.id} className="overflow-hidden hover:shadow-2xl transition-all duration-300 hover:-translate-y-2 group flex flex-col">
                            {/* Imagem com sobreposição e efeito */}
                            <div className="relative w-full aspect-square bg-gray-900 overflow-hidden flex-shrink-0">
                                <Image
                                    src={professional.image}
                                    alt={professional.name}
                                    width={400}
                                    height={400}
                                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
                                />
                                {/* Overlay com gradiente */}
                                <div className="absolute inset-0 bg-gradient-to-t from-gray-900 via-transparent to-transparent opacity-40"></div>
                            </div>

                            {/* Conteúdo */}
                            <CardHeader className="pb-2">
                                <CardTitle className="text-xl text-gray-900">{professional.name}</CardTitle>
                                <CardDescription className="text-violet-600 font-semibold text-sm">
                                    {professional.specialty}
                                </CardDescription>
                            </CardHeader>

                            <CardContent className="pb-4">
                                <p className="text-gray-600 text-sm leading-relaxed">
                                    {professional.description}
                                </p>
                            </CardContent>

                            <CardFooter className="mt-auto">
                                <button className="w-full bg-gradient-to-r from-violet-600 to-violet-500 hover:from-violet-700 hover:to-violet-600 text-white font-semibold py-2 px-4 rounded-lg transition-all duration-200 hover:shadow-lg">
                                    Agendar Consulta
                                </button>
                            </CardFooter>
                        </Card>
                    ))}
                </div>
                </div>
        </section>
    )
}