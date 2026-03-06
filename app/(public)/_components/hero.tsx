import { Button } from "@/components/ui/button";
import heroImg from "../../../public/hero-image.png"
import logoColorido from "../../../public/logo-colorido.png"
import Image from "next/image";
import Link from "next/link";

export function Hero() {
  return (
    <section className="relative min-h-screen bg-noite flex items-center overflow-hidden">

      {/* Background glow blobs */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute w-[600px] h-[600px] rounded-full bg-orquidea/25 blur-[120px] -left-32 top-1/2 -translate-y-1/2" />
        <div className="absolute w-[400px] h-[400px] rounded-full bg-sage/12 blur-[100px] right-20 top-16" />
        <div className="absolute w-[300px] h-[300px] rounded-full bg-lavanda/12 blur-[80px] right-40 bottom-20" />
      </div>

      {/* Subtle grid */}
      <div
        className="absolute inset-0 pointer-events-none opacity-[0.04]"
        style={{
          backgroundImage: "linear-gradient(rgba(255,255,255,1) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,1) 1px, transparent 1px)",
          backgroundSize: "80px 80px"
        }}
      />

      <div className="relative container mx-auto px-6 pt-24 pb-16">
        <div className="flex flex-col md:flex-row items-center justify-between gap-16">

          {/* Text content */}
          <article className="flex-1 max-w-xl text-center md:text-left space-y-7">

            {/* Eyebrow */}
            <div className="flex items-center gap-3 justify-center md:justify-start">
              <div className="w-6 h-px bg-sage" />
              <span className="text-xs tracking-widest uppercase text-sage font-normal">
                Clínica de Psicologia
              </span>
            </div>

            <h1 className="font-['Cormorant_Garamond'] text-5xl lg:text-7xl font-light text-white leading-[1.1]">
              Cuidando da sua<br />
              saúde mental com<br />
              <em className="italic text-lavanda">clareza e afeto</em>
            </h1>

            <p className="text-base text-white/50 font-light leading-relaxed max-w-md mx-auto md:mx-0">
              Um espaço seguro para você se reconectar consigo mesmo e encontrar o equilíbrio que precisa.
            </p>

            <div className="flex items-center gap-4 justify-center md:justify-start flex-wrap">
              <Button className="rounded-full bg-sage hover:bg-sage/85 text-noite font-medium px-7 py-5 text-sm shadow-[0_4px_20px_rgba(120,191,160,0.35)] hover:shadow-[0_6px_28px_rgba(120,191,160,0.45)] hover:-translate-y-px transition-all duration-300">
                Agendar consulta
              </Button>
              <Link
                href="#profissionais"
                className="text-sm text-white/50 hover:text-white transition-colors flex items-center gap-2"
              >
                Ver profissionais
                <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                  <path d="M17 8l4 4m0 0l-4 4m4-4H3" />
                </svg>
              </Link>
            </div>
          </article>

          {/* Hero image */}
          <div className="hidden md:block relative flex-shrink-0">
            {/* Glow behind image */}
            <div className="absolute -inset-8 rounded-3xl bg-orquidea/30 blur-3xl animate-[spin_20s_linear_infinite] opacity-60" />

            {/* Border frame */}
            <div className="absolute -inset-1 rounded-3xl border border-white/10" />

            {/* Image */}
            <div className="relative w-[380px] h-[440px] lg:w-[440px] lg:h-[500px] rounded-3xl overflow-hidden">
              <Image
                src={heroImg}
                alt="Imagem de saúde mental"
                fill
                sizes="440px"
                className="object-cover"
                quality={100}
              />
              {/* Overlay tint */}
              <div className="absolute inset-0 bg-gradient-to-t from-noite/40 via-transparent to-transparent" />
            </div>

            {/* Floating badge */}
            <div className="absolute -bottom-4 -left-6 bg-noite/90 backdrop-blur-sm border border-white/10 rounded-2xl px-5 py-3 shadow-xl">
              <p className="text-xs text-white/40 tracking-widest uppercase mb-0.5">Disponível</p>
              <p className="text-sm font-medium text-white">Agendamento online</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}