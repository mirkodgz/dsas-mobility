
const path = require('path');
const { createClient } = require('@supabase/supabase-js');
require('dotenv').config({ path: path.join(process.cwd(), '.env.local') });

const supabase = createClient(process.env.PUBLIC_SUPABASE_URL, process.env.SUPABASE_SERVICE_ROLE_KEY);

const MAPPING_RULES = [
    // SUVS & CROSSOVERS
    { cat: 'SUV', keywords: ['suv', 'crossover', 'tiguan', 't-roc', 't-cross', 'q2', 'q3', 'q5', 'q7', 'q8', 'x1', 'x2', 'x3', 'x4', 'x5', 'x6', 'x7', 'sportage', 'tucson', 'kona', 'compass', 'renegade', 'tonale', 'stelvio', 'formentor', 'kuga', 'puma', 'captur', 'arkana', 'austral', '2008', '3008', '500x', '600', 'duster', 'yaris cross', 'qashqai', 'juke', 'x-trail', 'xc40', 'xc60', 'xc90', 'gale', 'strada', 'macan', 'cayenne', 'levante', 'grecale', 'rav4', 'chr', 'c-hr', 'corolla cross', 'niro', 'sorento', 'santa fe', 'tarraco', 'ateca', 'kodiaq', 'karoq', 'kamiq', 'defender', 'discovery', 'range rover', 'velar', 'evoque', 'cx-30', 'cx-5', 'cx-60', 'hr-v', 'cr-v', 'zr-v', 'glc', 'gle', 'gla', 'glb', 'eqc', 'eqa', 'eqb', 'ix1', 'ix3'] },

    // CITY CARS
    { cat: 'City Car', keywords: ['500', 'panda', 'ypsilon', 'aygo', 'i10', 'picanto', 'up!', 'smart', 'forfour', 'fortwo', 'spring', 'topolino', 'ami', 'twingo', 'ignis', 'space star'] },

    // UTILITARIA (Small Hatchbacks)
    { cat: 'Utilitaria', keywords: ['yaris', 'clio', '208', 'corsa', 'polo', 'fiesta', 'sandero', 'c3', 'ibiza', 'fabia', 'a1', 'mito', 'swift', 'micra', 'rio', 'i20', 'mazda2', 'jazz', 'zoe'] },

    // STATION WAGON
    { cat: 'Station Wagon', keywords: ['variant', 'touring', 'avant', 'sw', 'station wagon', 'octavia wagon', 'passat variant', '308 sw', '508 sw', 'tipo sw', 'focus sw', 'corolla touring', 'astra sports tourer', 'leon sportstourer', 'v60', 'v90', 'c-class estate', 'e-class estate', 'a4 avant', 'a6 avant'] },

    // BERLINA (Sedans & larger Hatchbacks represented as standard)
    { cat: 'Berlina', keywords: ['giulia', 'serie 3', 'serie 5', 'a3 sedan', 'a4', 'a6', 'classe c', 'classe e', 'classe a', 'model 3', 'model s', 'tipo 4 porte', 'mazda3', 'civic', 'octavia', 'superb', 'passat', '508', 'ds 4', 'ds 9'] },

    // VEICOLI COMMERCIALI
    { cat: 'Veicolo Commerciale', keywords: ['doblo', 'ducato', 'fiorino', 'berlingo', 'partner', 'kangoo', 'transit', 'scudo', 'talento', 'proace', 'combo', 'vivaro', 'master', 'sprinter', 'vito', 'caddy', 'crafter'] }
];

async function main() {
    console.log("Starting Category Fix...");

    // 1. Fetch valid categories from DB to verify we are using correct names
    const { data: cats } = await supabase.from('categorie').select('nome');
    const validCategoryNames = cats.map(c => c.nome);
    console.log("Valid Categories in DB:", validCategoryNames.join(', '));

    // 2. Fetch all Long Term vehicles
    const { data: vehicles } = await supabase
        .from('veicoli')
        .select('id, marca, modello, versione, categoria')
        .eq('noleggio_breve', false);

    let updatesCount = 0;

    for (const v of vehicles) {
        const fullText = `${v.marca} ${v.modello} ${v.versione}`.toLowerCase();
        let proposed = v.categoria; // Default to keep current

        // Find match
        for (const rule of MAPPING_RULES) {
            // Check if ANY keyword matches
            // We use word boundary check or simple includes? Simple includes is safer for dirty data, but risks false positives (e.g. 'super' in 'superb'). 
            // For now, simple includes is robust enough for car lists.
            if (rule.keywords.some(k => fullText.includes(k))) {
                if (validCategoryNames.includes(rule.cat)) {
                    proposed = rule.cat;
                    break; // Stop at first match (ordered by priority if needed, here SUV first)
                }
            }
        }

        // Apply Update if different
        if (proposed !== v.categoria) {
            console.log(`[UPDATE] ${v.marca} ${v.modello}: ${v.categoria} -> ${proposed}`);

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

    console.log(`\n✅ Finished! Updated ${updatesCount} vehicles.`);
}

main();
