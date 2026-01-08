

export default function HorizontalFilterBar() {
    return (
        <div className="bg-white rounded-card shadow-soft border border-gray-100 p-4 mb-12 flex flex-col md:flex-row items-center gap-4">

            {/* SEARCH */}
            <div className="flex-grow w-full md:w-auto relative">
                <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="absolute left-3 top-3.5 text-gray-400"><circle cx="11" cy="11" r="8" /><line x1="21" y1="21" x2="16.65" y2="16.65" /></svg>
                <input
                    type="text"
                    placeholder="Cerca per marca, modello..."
                    className="w-full bg-gray-50 border border-gray-200 rounded-pill py-3 pl-10 pr-4 text-sm focus:outline-none focus:border-secondary transition-all"
                />
            </div>

            {/* BRAND DROPDOWN */}
            <div className="w-full md:w-48 relative">
                <select className="w-full bg-gray-50 border border-gray-200 rounded-pill py-3 px-4 text-sm focus:outline-none focus:border-secondary transition-all appearance-none cursor-pointer text-gray-700">
                    <option value="">Tutte le Marche</option>
                    <option value="audi">Audi</option>
                    <option value="bmw">BMW</option>
                    <option value="fiat">Fiat</option>
                    <option value="mercedes">Mercedes</option>
                </select>
                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="absolute right-4 top-3.5 text-gray-400 pointer-events-none"><path d="M6 9l6 6 6-6" /></svg>
            </div>

            {/* CATEGORY DROPDOWN */}
            <div className="w-full md:w-48 relative">
                <select className="w-full bg-gray-50 border border-gray-200 rounded-pill py-3 px-4 text-sm focus:outline-none focus:border-secondary transition-all appearance-none cursor-pointer text-gray-700">
                    <option value="">Tutte le Categorie</option>
                    <option value="suv">SUV</option>
                    <option value="citycar">City Car</option>
                    <option value="station-wagon">Station Wagon</option>
                    <option value="commerciali">Veicoli Commerciali</option>
                </select>
                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="absolute right-4 top-3.5 text-gray-400 pointer-events-none"><path d="M6 9l6 6 6-6" /></svg>
            </div>

            {/* ADVANCED FILTER BUTTON */}
            <button className="w-full md:w-auto flex items-center justify-center gap-2 px-6 py-3 rounded-pill border border-gray-200 text-gray-600 hover:bg-gray-50 hover:text-secondary hover:border-secondary transition-all font-bold text-sm">
                <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><line x1="4" x2="4" y1="21" y2="14" /><line x1="4" x2="4" y1="10" y2="3" /><line x1="12" x2="12" y1="21" y2="12" /><line x1="12" x2="12" y1="8" y2="3" /><line x1="20" x2="20" y1="21" y2="16" /><line x1="20" x2="20" y1="12" y2="3" /><line x1="1" x2="7" y1="14" y2="14" /><line x1="9" x2="15" y1="8" y2="8" /><line x1="17" x2="23" y1="16" y2="16" /></svg>
                <span className="hidden md:inline">Filtri</span>
            </button>

            {/* SEARCH BUTTON */}
            <button className="w-full md:w-auto bg-primary text-white px-8 py-3 rounded-pill font-bold hover:bg-secondary transition-colors shadow-md">
                Cerca
            </button>

        </div>
    );
}
