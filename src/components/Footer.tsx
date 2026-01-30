

export default function Footer() {
    return (
        <footer className="bg-white border-t border-gray-100 pt-16 pb-8">
            <div className="max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-8">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-16">
                    {/* COLUMN 1: BRAND */}
                    <div>
                        <div className="mb-6">
                            <img src="/logo_dsas.webp" alt="DSAS Mobility" className="h-12 w-auto object-contain" />
                        </div>
                        <p className="text-gray-500 mb-6 leading-relaxed">
                            <span className="font-bold text-primary block mb-1">Oltre il semplice noleggio.</span>
                            Il punto di riferimento per il noleggio a lungo termine in Italia.
                            Semplice, trasparente, digitale.
                        </p>
                        <div className="flex gap-4">
                            {/* Social Icons placeholders */}
                            <div className="w-10 h-10 bg-gray-100 rounded-full flex items-center justify-center text-primary hover:bg-secondary hover:text-white transition-colors cursor-pointer">
                                <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z" /></svg>
                            </div>
                            <div className="w-10 h-10 bg-gray-100 rounded-full flex items-center justify-center text-primary hover:bg-secondary hover:text-white transition-colors cursor-pointer">
                                <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="2" y="2" width="20" height="20" rx="5" ry="5" /><path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" /><line x1="17.5" y1="6.5" x2="17.51" y2="6.5" /></svg>
                            </div>
                        </div>
                    </div>

                    {/* COLUMN 2: LINKS */}
                    <div>
                        <h4 className="font-bold text-primary text-lg mb-6">Navigazione</h4>
                        <ul className="space-y-4 text-gray-500">
                            <li><a href="#" className="hover:text-secondary transition-colors">Home</a></li>
                            <li><a href="#" className="hover:text-secondary transition-colors">Chi Siamo</a></li>
                            <li><a href="#" className="hover:text-secondary transition-colors">Catalogo Auto</a></li>
                            <li><a href="#" className="hover:text-secondary transition-colors">Come Funziona</a></li>
                            <li><a href="#" className="hover:text-secondary transition-colors">Contatti</a></li>
                        </ul>
                    </div>

                    {/* COLUMN 3: LEGAL */}
                    <div>
                        <h4 className="font-bold text-primary text-lg mb-6">Legale</h4>
                        <ul className="space-y-4 text-gray-500">
                            <li><a href="#" className="hover:text-secondary transition-colors">Privacy Policy</a></li>
                            <li><a href="#" className="hover:text-secondary transition-colors">Cookie Policy</a></li>
                            <li><a href="#" className="hover:text-secondary transition-colors">Termini e Condizioni</a></li>
                            <li><a href="#" className="hover:text-secondary transition-colors">Reclami</a></li>
                        </ul>
                    </div>

                    {/* COLUMN 4: CONTACT */}
                    <div>
                        <h4 className="font-bold text-primary text-lg mb-6">Contattaci</h4>
                        <ul className="space-y-4 text-gray-500">
                            <li className="flex gap-3">
                                <a
                                    href="https://api.whatsapp.com/send?phone=393317901185&text=Ciao%2C%20vorrei%20maggiori%20informazioni"
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="flex gap-3 items-center hover:text-secondary transition-colors group"
                                >
                                    <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="currentColor" className="text-secondary shrink-0 group-hover:text-secondary transition-colors">
                                        <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.008-.57-.008-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 0 1-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 0 1-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 0 1 2.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0 0 12.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 0 0 5.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 0 0-3.48-8.413Z" />
                                    </svg>
                                    <span>+39 331 790 1185</span>
                                </a>
                            </li>
                            <li className="flex gap-3">
                                <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-secondary shrink-0"><path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z" /><polyline points="22,6 12,13 2,6" /></svg>
                                <span>assistenza@dsas-mobility.it</span>
                            </li>
                            <li className="flex gap-3">
                                <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-secondary shrink-0"><path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z" /><circle cx="12" cy="10" r="3" /></svg>
                                <span>Via Giordano Bruno 23, 20092 Cinisello Balsamo (MI)</span>
                            </li>
                        </ul>
                    </div>
                </div>

                <div className="border-t border-gray-100 pt-8 flex flex-col md:flex-row justify-between items-center gap-4 text-sm text-gray-400">
                    <p>© 2024 DSAS Mobility S.r.l. - P.IVA 14261790969</p>

                </div>
            </div>
        </footer>
    );
}
