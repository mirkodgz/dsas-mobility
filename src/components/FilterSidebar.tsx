

export default function FilterSidebar() {
    return (
        <div className="bg-white rounded-card shadow-soft border border-gray-100 p-6 sticky top-24">
            <div className="flex items-center gap-2 mb-6 text-primary">
                <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><line x1="4" x2="4" y1="21" y2="14" /><line x1="4" x2="4" y1="10" y2="3" /><line x1="12" x2="12" y1="21" y2="12" /><line x1="12" x2="12" y1="8" y2="3" /><line x1="20" x2="20" y1="21" y2="16" /><line x1="20" x2="20" y1="12" y2="3" /><line x1="1" x2="7" y1="14" y2="14" /><line x1="9" x2="15" y1="8" y2="8" /><line x1="17" x2="23" y1="16" y2="16" /></svg>
                <h3 className="font-bold text-lg">Filtri di ricerca</h3>
            </div>

            <div className="space-y-8">
                {/* SEARCH */}
                <div>
                    <label className="text-xs font-bold text-gray-500 uppercase tracking-wider mb-2 block">Cerca Auto</label>
                    <div className="relative">
                        <input
                            type="text"
                            placeholder="Es. Fiat 500..."
                            className="w-full bg-gray-50 border border-gray-200 rounded-lg py-3 pl-10 pr-4 text-sm focus:outline-none focus:border-secondary focus:ring-1 focus:ring-secondary transition-all"
                        />
                        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="absolute left-3 top-3.5 text-gray-400"><circle cx="11" cy="11" r="8" /><line x1="21" y1="21" x2="16.65" y2="16.65" /></svg>
                    </div>
                </div>

                {/* TYPE */}
                <div>
                    <label className="text-xs font-bold text-gray-500 uppercase tracking-wider mb-3 block">Tipo Contratto</label>
                    <div className="space-y-2">
                        <label className="flex items-center gap-3 cursor-pointer group">
                            <div className="w-5 h-5 rounded border border-gray-300 flex items-center justify-center group-hover:border-secondary transition-colors">
                                {/* Checkbox visual placeholder */}
                            </div>
                            <span className="text-gray-600 text-sm group-hover:text-secondary">Noleggio Lungo Termine</span>
                        </label>
                        <label className="flex items-center gap-3 cursor-pointer group">
                            <div className="w-5 h-5 rounded border border-gray-300 flex items-center justify-center group-hover:border-secondary transition-colors">
                            </div>
                            <span className="text-gray-600 text-sm group-hover:text-secondary">Subentro Leasing</span>
                        </label>
                    </div>
                </div>

                {/* BRANDS */}
                <div>
                    <label className="text-xs font-bold text-gray-500 uppercase tracking-wider mb-2 block">Marca</label>
                    <select className="w-full bg-gray-50 border border-gray-200 rounded-lg py-3 px-4 text-sm focus:outline-none focus:border-secondary transition-all appearance-none cursor-pointer">
                        <option value="">Tutte le Marche</option>
                        <option value="audi">Audi</option>
                        <option value="bmw">BMW</option>
                        <option value="fiat">Fiat</option>
                        <option value="tesla">Tesla</option>
                        <option value="vw">Volkswagen</option>
                    </select>
                </div>

                {/* PRICE RANGE */}
                <div>
                    <label className="text-xs font-bold text-gray-500 uppercase tracking-wider mb-2 block">Budget Mensile</label>
                    <div className="flex items-center gap-2 text-sm text-gray-600 mb-2">
                        <span>€0</span>
                        <input type="range" min="0" max="2000" className="flex-grow h-1 bg-gray-200 rounded-lg appearance-none cursor-pointer accent-secondary" />
                        <span>€2k+</span>
                    </div>
                </div>

                {/* BUTTON */}
                <button className="w-full bg-primary text-white py-3 rounded-lg font-bold hover:bg-secondary transition-colors shadow-lg">
                    Applica Filtri
                </button>
            </div>
        </div>
    );
}
