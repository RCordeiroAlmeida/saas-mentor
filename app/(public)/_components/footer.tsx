export function Footer() {
    return (
        <footer className="bg-black text-white py-6 mt-auto">
            <div className="container mx-auto px-4 sm:px-6 lg:px-8 text-center">
                <p>&copy; {new Date().getFullYear()} Mentor. Todos os direitos reservados.</p>
            </div>
        </footer>
    )
}