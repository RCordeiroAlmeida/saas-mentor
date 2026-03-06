export function Footer() {
    return (
        <footer className="bg-noite border-t border-white/8 py-10">
            <div className="container mx-auto px-6 flex flex-col md:flex-row items-center justify-between gap-4">
                <span className="font-['Cormorant_Garamond'] text-lg font-light text-white/40 tracking-widest italic">
                    Mentor
                </span>
                <p className="text-xs text-white/25 tracking-wide">
                    © {new Date().getFullYear()} NeuroTech · Todos os direitos reservados.
                </p>
                <div className="w-6 h-px bg-sage/40 hidden md:block" />
            </div>
        </footer>
    )
}