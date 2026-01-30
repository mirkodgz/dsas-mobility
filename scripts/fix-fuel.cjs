
const path = require('path');
const { createClient } = require('@supabase/supabase-js');
require('dotenv').config({ path: path.join(process.cwd(), '.env.local') });

const supabase = createClient(process.env.PUBLIC_SUPABASE_URL, process.env.SUPABASE_SERVICE_ROLE_KEY);

async function main() {
    console.log("Starting Fuel Standardization...");

    const { data: vehicles } = await supabase
        .from('veicoli')
        .select('*')
        .eq('noleggio_breve', false);

    let updates = 0;

    for (const v of vehicles) {
        let current = v.alimentazione;
        let proposed = current;

        // NORMALIZATION RULES
        // 1. Convert "IBRIDA" -> "Ibrida-Benzina" (Default assumption for most hybrids, unless Diesel keyword found)
        if (current === 'IBRIDA' || current === 'Hybrid') {
            // Check if model hints at Diesel Hybrid (rare in mass market except specific Mercedes/Audi models)
            const fullText = `${v.marca} ${v.modello} ${v.versione}`.toLowerCase();
            if (fullText.includes('de') || fullText.includes('diesel hybrid') || fullText.includes('hdi') || fullText.includes('mhv diesel')) {
                proposed = 'Ibrida-Diesel';
            } else {
                proposed = 'Ibrida-Benzina';
            }
        }

        // 2. Convert "IBRIDA BENZINA" -> "Ibrida-Benzina"
        if (current === 'IBRIDA BENZINA' || current === 'Mild Hybrid') {
            proposed = 'Ibrida-Benzina';
        }

        // 3. Ensure Case
        if (proposed === 'benzina') proposed = 'Benzina';
        if (proposed === 'diesel') proposed = 'Diesel';
        if (proposed === 'elettrica') proposed = 'Elettrica';

        if (proposed !== current) {
            console.log(`[UPDATE] ${v.marca} ${v.modello}: ${current} -> ${proposed}`);
            const { error } = await supabase
                .from('veicoli')
                .update({ alimentazione: proposed })
                .eq('id', v.id);
            if (!error) updates++;
        }
    }

    console.log(`Updated ${updates} vehicles.`);
}

main();
