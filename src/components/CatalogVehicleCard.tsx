

interface VehicleProps {
    brand: string;
    model: string;
    version: string;
    price: number;
    image: string;
    fuel: string;
    transmission: string;
    seats: number;
    available: boolean;
    type?: string;
    partner?: boolean;
}

export default function CatalogVehicleCard({ vehicle }: { vehicle: VehicleProps }) {
    return (
        <div className="bg-white rounded-card shadow-soft hover:shadow-xl transition-all duration-300 overflow-hidden border border-gray-100 flex flex-col md:flex-row h-full transform hover:-translate-y-1">
            {/* IMAGE AREA (Left / Top) */}
            <div className="md:w-2/5 relative min-h-[220px]">
                <img
                    src={vehicle.image}
                    alt={`${vehicle.brand} ${vehicle.model}`}
                    className="w-full h-full object-cover object-center"
                    loading="lazy"
                />
                {/* Available Badge */}
                <div className="absolute top-4 left-4 z-10">
                    {vehicle.available ? (
                        <span className="bg-green-100/90 backdrop-blur text-green-700 px-3 py-1 rounded-pill text-xs font-bold uppercase tracking-wide border border-green-200 shadow-sm">
                            Pronta Consegna
                        </span>
                    ) : (
                        <span className="bg-blue-50/90 backdrop-blur text-blue-700 px-3 py-1 rounded-pill text-xs font-bold uppercase tracking-wide border border-blue-200 shadow-sm">
                            Ordinabile
                        </span>
                    )}
                </div>
            </div>

            {/* CONTENT (Right / Bottom) */}
            <div className="p-6 md:p-8 flex flex-col justify-between flex-grow md:w-3/5">
                <div>
                    {/* Header / Badges */}
                    <div className="flex flex-wrap items-start justify-between gap-4 mb-3">
                        <div>
                            <h3 className="text-secondary font-bold text-sm tracking-wide uppercase mb-1">{vehicle.brand}</h3>
                            <h2 className="text-primary font-bold text-2xl leading-tight">
                                {vehicle.model}
                            </h2>
                            <p className="text-gray-500 text-sm mt-1">{vehicle.version}</p>
                        </div>
                        {/* Partner Chip */}
                        {vehicle.partner && (
                            <span className="hidden sm:inline-block bg-gray-100 text-gray-500 px-3 py-1 rounded-md text-[10px] font-bold uppercase tracking-widest border border-gray-200">
                                Partner Ufficiale
                            </span>
                        )}
                    </div>

                    {/* Contract Type Badge (Like reference) */}
                    <div className="mb-6">
                        <span className="inline-block px-3 py-1 rounded border border-orange-200 bg-orange-50 text-secondary text-xs font-bold uppercase tracking-wide">
                            {vehicle.type || 'Noleggio Lungo Termine'}
                        </span>
                    </div>

                    {/* Specs Grid */}
                    <div className="flex flex-wrap gap-4 md:gap-8 mb-6 text-gray-600">
                        <div className="flex items-center gap-2" title="Carburante">
                            <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M3 22v-8a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2v8" /><line x1="3" y1="18" x2="21" y2="18" /><circle cx="7" cy="18" r="2" /><circle cx="17" cy="18" r="2" /></svg>
                            <span className="text-sm font-medium">{vehicle.fuel}</span>
                        </div>
                        <div className="flex items-center gap-2" title="Cambio">
                            <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10" /><path d="M9.09 9a3 3 0 0 1 5.83 1c0 2-3 3-3 3" /><line x1="12" y1="17" x2="12.01" y2="17" /></svg>
                            <span className="text-sm font-medium">{vehicle.transmission}</span>
                        </div>
                        <div className="flex items-center gap-2" title="Posti">
                            <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M19 9l-7 7-7-7" /></svg>
                            <span className="text-sm font-medium">{vehicle.seats} Posti</span>
                        </div>
                    </div>
                </div>

                {/* PRICE & ACTION */}
                <div className="flex flex-col sm:flex-row items-end sm:items-center justify-between gap-4 pt-6 border-t border-gray-100">
                    <div>
                        <p className="text-xs text-gray-400 uppercase font-bold tracking-wider mb-1 text-right sm:text-left">Canone Mensile</p>
                        <div className="flex items-baseline gap-1">
                            <span className="text-3xl font-bold text-secondary">€{vehicle.price}</span>
                            <span className="text-sm text-gray-400 font-medium">/mese</span>
                        </div>
                        <p className="text-[10px] text-gray-400 text-right sm:text-left">iva esclusa</p>
                    </div>

                    <button className="w-full sm:w-auto bg-secondary text-white px-8 py-3 rounded-pill font-bold hover:bg-orange-600 transition-all shadow-lg hover:shadow-orange-500/30 text-sm tracking-wide">
                        SCOPRI DI PIÙ
                    </button>
                </div>
            </div>
        </div>
    );
}
