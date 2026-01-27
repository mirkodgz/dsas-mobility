import { useState, useEffect } from 'react';
import Button from './ui/Button';

export default function Header() {
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const [currentPath, setCurrentPath] = useState('');

    useEffect(() => {
        setCurrentPath(window.location.pathname);
    }, []);

    const navLinkClass = (path: string) =>
        `hover:text-secondary transition-colors uppercase ${currentPath === path ? 'text-secondary' : ''}`;

    const navLinkClassNormal = (path: string) =>
        `hover:text-secondary transition-colors ${currentPath === path ? 'text-secondary' : ''}`;


    return (
        <header className="fixed top-0 w-full z-50 bg-white shadow-sm border-b border-gray-100">
            <div className="max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-8 h-20 flex items-center justify-between">
                {/* LOGO AREA */}
                <a href="/" className="flex items-center gap-2">
                    <img
                        src="/logo_dsas.webp"
                        alt="DSAS Mobility Logo"
                        className="h-14 w-auto object-contain"
                    />
                </a>

                {/* DESKTOP NAV */}
                <nav className="hidden md:flex items-center gap-6 lg:gap-8 font-bold text-gray-800 text-sm lg:text-base">
                    <a href="/lungo-termine" className={navLinkClass('/lungo-termine')}>Noleggio LUNGO TERMINE</a>
                    <a href="/noleggio-luxury" className={navLinkClass('/noleggio-luxury')}>Noleggio LUXURY</a>
                    <a href="/acquisto-auto" className={navLinkClass('/acquisto-auto')}>ACQUISTO AUTO</a>
                    <a href="/chi-siamo" className={navLinkClassNormal('/chi-siamo')}>Chi siamo</a>
                    <a href="/faq" className={navLinkClassNormal('/faq')}>FAQ</a>
                </nav>

                {/* CTAs */}
                <div className="hidden md:flex items-center space-x-6">
                    <Button variant="primary" size="md" className="rounded-full! px-8 py-3 shadow-md hover:shadow-lg transition-all" onClick={() => window.location.href = '/contatti'}>
                        RICHIEDI PREVENTIVO
                    </Button>
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
                <div className="md:hidden absolute top-20 left-0 w-full h-[calc(100vh-80px)] overflow-y-auto bg-white border-b border-gray-100 shadow-xl p-4 flex flex-col gap-4 pb-8">
                    <a href="/lungo-termine" className={`text-lg font-medium uppercase ${currentPath === '/lungo-termine' ? 'text-secondary' : 'text-gray-800'}`}>Noleggio LUNGO TERMINE</a>
                    <a href="/noleggio-luxury" className={`text-lg font-medium uppercase ${currentPath === '/noleggio-luxury' ? 'text-secondary' : 'text-gray-800'}`}>Noleggio LUXURY</a>
                    <a href="/acquisto-auto" className={`text-lg font-medium uppercase ${currentPath === '/acquisto-auto' ? 'text-secondary' : 'text-gray-800'}`}>ACQUISTO AUTO</a>
                    <a href="/chi-siamo" className={`text-lg font-medium ${currentPath === '/chi-siamo' ? 'text-secondary' : 'text-gray-800'}`}>Chi siamo</a>
                    <a href="/faq" className={`text-lg font-medium ${currentPath === '/faq' ? 'text-secondary' : 'text-gray-800'}`}>FAQ</a>
                    <Button variant="primary" className="w-full mt-auto">
                        Richiedi Preventivo
                    </Button>
                </div>
            )}
        </header>
    );
}
