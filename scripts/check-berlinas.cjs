
const path = require('path');
const { createClient } = require('@supabase/supabase-js');
require('dotenv').config({ path: path.join(process.cwd(), '.env.local') });

const supabase = createClient(process.env.PUBLIC_SUPABASE_URL, process.env.SUPABASE_SERVICE_ROLE_KEY);

async function main() {
    const { data: vehicles } = await supabase
        .from('veicoli')
        .select('marca, modello, versione, categoria')
        .eq('noleggio_breve', false)
        .eq('categoria', 'Berlina')
        .order('marca');

    console.log(`\n=== REMAINING 'BERLINA' VEHICLES (${vehicles.length}) ===`);
    vehicles.forEach(v => {
        console.log(`- [${v.marca}] ${v.modello} ${v.versione}`);
    });
}

main();
