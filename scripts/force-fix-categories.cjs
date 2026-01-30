
const path = require('path');
const { createClient } = require('@supabase/supabase-js');
require('dotenv').config({ path: path.join(process.cwd(), '.env.local') });

const supabase = createClient(process.env.PUBLIC_SUPABASE_URL, process.env.SUPABASE_SERVICE_ROLE_KEY);

const FORCED_UPDATES = [
    // Volvo
    { match: 'XC40', cat: 'SUV' },
    { match: 'XC60', cat: 'SUV' },
    { match: 'EX30', cat: 'SUV' },
    { match: 'V60', cat: 'Station Wagon' },

    // Toyota
    { match: 'Yaris Cross', cat: 'SUV' },
    { match: 'Aygo', cat: 'City Car' },
    { match: 'Yaris', cat: 'Utilitaria' }, // Explicit Yaris fallback

    // Audi
    { match: 'Q2', cat: 'SUV' },
    { match: 'Q3', cat: 'SUV' },
    { match: 'Q5', cat: 'SUV' },
    { match: 'A1', cat: 'Utilitaria' },
    { match: 'A3 Sportback', cat: 'Berlina' }, // Or Utilitaria? Usually C-Segment Hatch = Berlina in Italian market often, or Utilitaria. Let's keep Berlina or map to Utilitaria if client prefers compacts there. But A3 is larger. Let's assume Berlina for C-segment if no Hatchback cat.

    // BMW
    { match: 'X1', cat: 'SUV' },
    { match: 'X3', cat: 'SUV' },
    { match: 'Serie 1', cat: 'Berlina' }, // C-Segment

    // Mercedes
    { match: 'GLA', cat: 'SUV' },
    { match: 'GLC', cat: 'SUV' },

    // Jeep
    { match: 'Renegade', cat: 'SUV' },
    { match: 'Compass', cat: 'SUV' },
    { match: 'Avenger', cat: 'SUV' },

    // Fiat
    { match: '500X', cat: 'SUV' },
    { match: '600', cat: 'SUV' },
    { match: 'Panda', cat: 'City Car' },
    { match: '500', cat: 'City Car' },

    // Alfa
    { match: 'Tonale', cat: 'SUV' },
    { match: 'Stelvio', cat: 'SUV' },

    // Ford
    { match: 'Puma', cat: 'SUV' },
    { match: 'Kuga', cat: 'SUV' },

    // Volkswagen
    { match: 'T-Roc', cat: 'SUV' },
    { match: 'T-Cross', cat: 'SUV' },
    { match: 'Tiguan', cat: 'SUV' },

    // Other Common
    { match: 'Sportage', cat: 'SUV' },
    { match: 'Tucson', cat: 'SUV' },
    { match: 'Duster', cat: 'SUV' },
    { match: 'Captur', cat: 'SUV' },
    { match: '2008', cat: 'SUV' },
    { match: '3008', cat: 'SUV' }
];

async function main() {
    console.log("Starting FORCED Category Fix...");

    // Fetch all Long Term vehicles that are effectively "unknown" or need check
    // Actually, let's just iterate ALL long term and force fix based on Priority list
    const { data: vehicles } = await supabase
        .from('veicoli')
        .select('id, marca, modello, versione, categoria')
        .eq('noleggio_breve', false);

    let updatesCount = 0;

    for (const v of vehicles) {
        const fullText = `${v.marca} ${v.modello} ${v.versione}`.toLowerCase(); // Normalized for searching

        let proposed = v.categoria;
        let matchedRule = null;

        for (const rule of FORCED_UPDATES) {
            // Check if string contains the match phrase (case insensitive check done via lowercasing both)
            if (fullText.includes(rule.match.toLowerCase())) {
                proposed = rule.cat;
                matchedRule = rule.match;
                break; // First match wins (Ordered list!)
            }
        }

        // Apply Update if different
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
