
const path = require('path');
const { createClient } = require('@supabase/supabase-js');
require('dotenv').config({ path: path.join(process.cwd(), '.env.local') });

const url = process.env.PUBLIC_SUPABASE_URL;
const key = process.env.SUPABASE_SERVICE_ROLE_KEY;
const supabase = createClient(url, key);

async function main() {
    // 1. Fetch Valid Categories
    const { data: categories, error: catError } = await supabase
        .from('categorie')
        .select('nome')
        .order('nome');

    if (catError) {
        console.error("Error fetching categories:", catError);
        return;
    }

    // 2. Fetch Long Term Vehicles
    const { data: vehicles, error: vehError } = await supabase
        .from('veicoli')
        .select('id, marca, modello, versione, categoria')
        .eq('noleggio_breve', false)
        .order('marca', { ascending: true });

    if (vehError) {
        console.error("Error fetching vehicles:", vehError);
        return;
    }

    console.log("=== VALID CATEGORIES ===");
    console.log(categories.map(c => c.nome).join(', '));
    console.log("\n=== VEHICLES TO CATEGORIZE ===");
    vehicles.forEach(v => {
        console.log(`[${v.id}] ${v.marca} ${v.modello} - ${v.versione} (Current: ${v.categoria})`);
    });
}

main();
