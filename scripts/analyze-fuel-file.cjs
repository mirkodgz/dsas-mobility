
const fs = require('fs');
const path = require('path');
const { createClient } = require('@supabase/supabase-js');
require('dotenv').config({ path: path.join(process.cwd(), '.env.local') });

const supabase = createClient(process.env.PUBLIC_SUPABASE_URL, process.env.SUPABASE_SERVICE_ROLE_KEY);

async function main() {
    let output = "=== ANALYZING FUEL TYPES (ALIMENTAZIONE) ===\n";

    // 1. Fetch Valid Fuel Types
    const { data: validTypes } = await supabase.from('alimentazioni').select('nome');
    output += "\n✅ VALID TYPES: " + validTypes.map(t => t.nome).join(', ') + "\n";

    // 2. Fetch Current Vehicles Distribution
    const { data: vehicles } = await supabase
        .from('veicoli')
        .select('alimentazione')
        .eq('noleggio_breve', false);

    const distribution = {};
    vehicles.forEach(v => {
        distribution[v.alimentazione] = (distribution[v.alimentazione] || 0) + 1;
    });

    output += "\n📊 CURRENT DISTRIBUTION (LONG TERM):\n";
    output += JSON.stringify(distribution, null, 2);

    fs.writeFileSync('fuel_report.txt', output);
    console.log("Written to fuel_report.txt");
}

main();
