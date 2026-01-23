
import { useState, useMemo } from 'react';
import VehicleCard from './VehicleCard';

interface Vehicle {
    brand: string;
    model: string;
    version: string;
    price: number;
    image: string;
    fuel: string;
    transmission: string;
    available: boolean;
    category?: string;
    slug?: string;
    priceLabel?: string;
    hidePrice?: boolean;
}

interface LuxuryCatalogProps {
    initialVehicles: Vehicle[];
    hidePrice?: boolean;
}

export default function LuxuryCatalog({ initialVehicles, hidePrice = false }: LuxuryCatalogProps) {
    const [selectedBrand, setSelectedBrand] = useState<string>('All');

    // Extract unique brands
    const brands = useMemo(() => {
        const b = new Set(initialVehicles.map(v => v.brand));
        return ['All', ...Array.from(b).sort()];
    }, [initialVehicles]);

    const filteredVehicles = useMemo(() => {
        if (selectedBrand === 'All') return initialVehicles;
        return initialVehicles.filter(v => v.brand === selectedBrand);
    }, [initialVehicles, selectedBrand]);

    return (
        <div className="w-full">
            {/* TOP FILTER (Centered - Select Dropdown) */}
            <div className="flex flex-col items-center justify-center mb-8">
                <div className="relative">
                    <select
                        value={selectedBrand}
                        onChange={(e) => setSelectedBrand(e.target.value)}
                        className="appearance-none bg-white border border-gray-200 text-gray-600 text-sm py-2 pl-4 pr-10 rounded-full font-semibold focus:outline-none focus:ring-2 focus:ring-secondary/20 focus:border-secondary cursor-pointer shadow-sm hover:shadow transition-shadow"
                    >
                        <option value="All">Tutte le Marche</option>
                        {brands.filter(b => b !== 'All').map(brand => (
                            <option key={brand} value={brand}>{brand}</option>
                        ))}
                    </select>
                    <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-3 text-gray-400">
                        <svg className="fill-current h-3 w-3" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20"><path d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z" /></svg>
                    </div>
                </div>
            </div>

            {/* GRID */}
            {filteredVehicles.length > 0 ? (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                    {filteredVehicles.map((vehicle, index) => (
                        <div key={index} className="h-full">
                            <VehicleCard vehicle={{ ...vehicle, hidePrice }} />
                        </div>
                    ))}
                </div>
            ) : (
                <div className="text-center py-20">
                    <p className="text-gray-400 text-lg">Nessun veicolo trovato per questo marchio.</p>
                    <button
                        onClick={() => setSelectedBrand('All')}
                        className="mt-4 text-primary font-bold underline hover:no-underline"
                    >
                        Vedi tutti i veicoli
                    </button>
                </div>
            )}
        </div>
    );
}
