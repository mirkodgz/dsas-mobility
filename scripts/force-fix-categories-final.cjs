
const path = require('path');
const { createClient } = require('@supabase/supabase-js');
require('dotenv').config({ path: path.join(process.cwd(), '.env.local') });

const supabase = createClient(process.env.PUBLIC_SUPABASE_URL, process.env.SUPABASE_SERVICE_ROLE_KEY);

const FORCED_UPDATES = [
    // COMMERCIAL
    { match: 'Ducato', cat: 'Veicolo Commerciale' },
    { match: 'Jumper', cat: 'Veicolo Commerciale' },
    { match: 'Boxer', cat: 'Veicolo Commerciale' },
    { match: 'Transit', cat: 'Veicolo Commerciale' },
    { match: 'Berlingo', cat: 'Veicolo Commerciale' }, // Often Van

    // SUV / CROSSOVER
    { match: 'C-HR', cat: 'SUV' },
    { match: 'X2', cat: 'SUV' },
    { match: 'Formentor', cat: 'SUV' },
    { match: 'C3 Aircross', cat: 'SUV' },
    { match: 'Junior', cat: 'SUV' }, // Alfa Junior
    { match: 'HR-V', cat: 'SUV' },
    { match: 'Jaecoo', cat: 'SUV' },
    { match: 'Lynk & Co', cat: 'SUV' },
    { match: 'X-Trail', cat: 'SUV' },
    { match: 'Qashqai', cat: 'SUV' },
    { match: 'Juke', cat: 'SUV' },
    { match: 'Omoda', cat: 'SUV' },
    { match: 'Frontera', cat: 'SUV' },
    { match: 'Symbioz', cat: 'SUV' },
    { match: 'Kodiaq', cat: 'SUV' },
    { match: 'Karoq', cat: 'SUV' },

    // CITY CAR / UTILITARIA
    { match: 'Pandina', cat: 'City Car' },
    { match: 'C3', cat: 'Utilitaria' }, // Standard C3
    { match: 'Corsa', cat: 'Utilitaria' },
    { match: 'Fabia', cat: 'Utilitaria' },
    { match: 'Renault 5', cat: 'Utilitaria' },
    { match: 'Jazz', cat: 'Utilitaria' },

    // STATION WAGON
    { match: 'Octavia', cat: 'Station Wagon' }, // Assuming Wagon due to output saw 'Wagon'

    // BERLINA (Keep or Force for clarity)
    // { match: 'A3', cat: 'Berlina' },
    // { match: '118d', cat: 'Berlina' },
    // { match: 'Leon', cat: 'Berlina' },
];

async function main() {
    console.log("Starting FINAL Forced Category Fix...");

    const { data: vehicles } = await supabase
        .from('veicoli')
        .select('id, marca, modello, versione, categoria')
        .eq('noleggio_breve', false); // All Long Term

    let updatesCount = 0;

    for (const v of vehicles) {
        const fullText = `${v.marca} ${v.modello} ${v.versione}`.toLowerCase();

        // Skip correct ones to avoid redundant updates/logs? No, verify all.
        let proposed = v.categoria;
        let matchedRule = null;

        for (const rule of FORCED_UPDATES) {
            // Priority Check
            if (fullText.includes(rule.match.toLowerCase())) {
                proposed = rule.cat;
                matchedRule = rule.match;
                break;
            }
        }

        // Handle "C3" vs "C3 Aircross" conflict:
        // C3 Aircross matches 'C3', so order matters or specific check.
        // My list above puts 'C3 Aircross' BEFORE 'C3' check? No, 'Forced Updates' array order matters.
        // I put C3 Aircross before C3 in array?
        // Let's verify array order: C3 Aircross is earlier. GOOD.

        if (proposed !== v.categoria) {
            console.log(`[UPDATE] ${v.marca} ${v.modello}: ${v.categoria} -> ${proposed} (Matched: "${matchedRule}")`);

            const { error } = await supabase
                .from('veicoli')
                .update({ categoria: proposed })
                .eq('id', v.id);

            if (error) {
                console.error(`  ❌ Error updating ${v.id}:`, error.message);
            } else {
                updatesCount++;
            }
        }
    }

    console.log(`\n✅ Finished! Forced Updated ${updatesCount} vehicles.`);
}

main();
