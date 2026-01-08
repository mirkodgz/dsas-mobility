import { useState } from 'react';

export default function Header() {
    const [isMenuOpen, setIsMenuOpen] = useState(false);

    return (
        <header className="sticky top-0 z-50 bg-white shadow-sm border-b border-gray-100">
            <div className="max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-8 h-20 flex items-center justify-between">
                {/* LOGO AREA */}
                <div className="flex items-center gap-2">
                    {/* Placeholder for Logo - eventually an Image */}
                    <div className="font-bold text-2xl tracking-tighter text-primary">
                        DSAS<span className="text-secondary">Mobility</span>
                    </div>
                </div>

                {/* DESKTOP NAV */}
                <nav className="hidden md:flex items-center gap-6 lg:gap-8 font-medium text-gray-700 text-sm lg:text-base">
                    <a href="/" className="hover:text-secondary transition-colors">Home</a>
                    <a href="/noleggio-nuovo" className="hover:text-secondary transition-colors">Noleggio Nuovo</a>
                    <a href="/catalogo" className="hover:text-secondary transition-colors">Subentro</a>
                    <a href="/come-funziona" className="hover:text-secondary transition-colors">Come Funziona</a>
                    <a href="/blog" className="hover:text-secondary transition-colors">Blog</a>
                    <a href="/contatti" className="hover:text-secondary transition-colors">Contatti</a>
                </nav>

                {/* CTAs */}
                <div className="hidden md:flex items-center gap-4">
                    <a
                        href="https://wa.me/390000000000"
                        className="flex items-center gap-2 text-primary font-bold hover:text-secondary transition-colors"
                    >
                        {/* Whatsapp Icon */}
                        <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M3 21l1.65-3.8a9 9 0 1 1 3.4 2.9L3 21" /><path d="M9 10a.5.5 0 0 0 1 0V9a.5.5 0 0 0 .5-.5l.14-.38a.5.5 0 0 0-.38-.62a9 9 0 0 0-1.74 0a.5.5 0 0 0-.3 0 .5.5 0 0 0-.25.5v1a.5.5 0 0 0 .5.5z" /></svg>
                        +39 351 000 0000
                    </a>
                    <button className="bg-secondary text-white px-6 py-2.5 rounded-pill font-bold hover:bg-orange-600 transition-all shadow-soft transform hover:-translate-y-0.5">
                        Richiedi Preventivo
                    </button>
                </div>

                {/* MOBILE MENU TOGGLE */}
                <button
                    className="md:hidden p-2 text-primary"
                    onClick={() => setIsMenuOpen(!isMenuOpen)}
                >
                    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><line x1="4" x2="20" y1="12" y2="12" /><line x1="4" x2="20" y1="6" y2="6" /><line x1="4" x2="20" y1="18" y2="18" /></svg>
                </button>
            </div>

            {/* MOBILE NAV DROPDOWN */}
            {isMenuOpen && (
                <div className="md:hidden absolute top-20 left-0 w-full bg-white border-b border-gray-100 shadow-xl p-4 flex flex-col gap-4">
                    <a href="/" className="text-lg font-medium text-gray-800">Home</a>
                    <a href="/noleggio-nuovo" className="text-lg font-medium text-gray-800">Noleggio Nuovo</a>
                    <a href="/catalogo" className="text-lg font-medium text-gray-800">Subentro</a>
                    <a href="/come-funziona" className="text-lg font-medium text-gray-800">Come Funziona</a>
                    <a href="/blog" className="text-lg font-medium text-gray-800">Blog</a>
                    <a href="/contatti" className="text-lg font-medium text-gray-800">Contatti</a>
                    <button className="bg-secondary text-white w-full py-3 rounded-pill font-bold">
                        Richiedi Preventivo
                    </button>
                </div>
            )}
        </header>
    );
}
