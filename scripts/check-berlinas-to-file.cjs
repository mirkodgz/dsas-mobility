
const fs = require('fs');
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

    const lines = vehicles.map(v => `[${v.marca}] ${v.modello} ${v.versione} (${v.categoria})`);
    fs.writeFileSync('berlinas_list.txt', lines.join('\n'));
    console.log("Wrote berlinas_list.txt");
}

main();
