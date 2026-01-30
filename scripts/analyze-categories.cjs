
const path = require('path');
const { createClient } = require('@supabase/supabase-js');
require('dotenv').config({ path: path.join(process.cwd(), '.env.local') });

const supabase = createClient(process.env.PUBLIC_SUPABASE_URL, process.env.SUPABASE_SERVICE_ROLE_KEY);

const MAPPING_RULES = [
    { cat: 'SUV', keywords: ['suv', 'crossover', 'tiguan', 't-roc', 't-cross', 'q3', 'q5', 'x1', 'x3', 'x5', 'sportage', 'tucson', 'kona', 'compass', 'renegade', 'tonale', 'stelvio', 'formentor', 'kuga', 'puma', 'captur', 'arkana', '2008', '3008', '500x', 'duster', 'yaris cross', 'qashqai', 'juke', 'xc40', 'xc60', 'gale', 'strada', 'macan', 'cayenne', 'levante', 'grecale'] },
    { cat: 'City Car', keywords: ['500', 'panda', 'ypsilon', 'aygo', 'i10', 'picanto', 'up!', 'smart', 'spring', 'topolino', 'ami'] },
    { cat: 'Utilitaria', keywords: ['yaris', 'clio', '208', 'corsa', 'polo', 'fiesta', 'sandero', 'c3', 'ibiza', 'fabia', 'a1', 'mito'] },
    { cat: 'Station Wagon', keywords: ['variant', 'touring', 'avant', 'sw', 'station wagon', 'octavia wagon', 'passat variant', '308 sw', 'tipo sw', 'focus sw', 'corolla touring'] },
    { cat: 'Berlina', keywords: ['giulia', 'serie 3', 'a3 sedan', 'a4', 'classe c', 'model 3', 'tipo', 'model s'] },
    { cat: 'Veicolo Commerciale', keywords: ['doblo', 'ducato', 'fiorino', 'berlingo', 'partner', 'kangoo', 'transit', 'scudo', 'talento'] }
];

async function main() {
    // 1. Fetch valid categories
    const { data: cats } = await supabase.from('categorie').select('nome');
    const validCats = cats.map(c => c.nome);
    console.log("Valid Categories:", validCats.join(', '));

    // 2. Fetch vehicles
    const { data: vehicles } = await supabase
        .from('veicoli')
        .select('id, marca, modello, versione, categoria')
        .eq('noleggio_breve', false);

    console.log(`\nAnalyzing ${vehicles.length} vehicles...`);

    let stats = { changed: 0, unchanged: 0, unknown: 0 };

    vehicles.forEach(v => {
        const fullText = `${v.marca} ${v.modello} ${v.versione}`.toLowerCase();
        let proposed = v.categoria;
        let matchFound = false;

        for (const rule of MAPPING_RULES) {
            if (rule.keywords.some(k => fullText.includes(k))) {
                if (validCats.includes(rule.cat)) {
                    proposed = rule.cat;
                    matchFound = true;
                    break;
                }
            }
        }

        if (proposed !== v.categoria) {
            console.log(`[CHANGE] ${v.marca} ${v.modello} (${v.versione})`);
            console.log(`    ${v.categoria} -> ${proposed}`);
            stats.changed++;
        } else {
            // console.log(`[OK] ${v.marca} ${v.modello} -> ${v.categoria}`);
            stats.unchanged++;
        }
    });

    console.log("\nSummary:", stats);
}

main();
