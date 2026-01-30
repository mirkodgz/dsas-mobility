
const path = require('path');
const { createClient } = require('@supabase/supabase-js');
require('dotenv').config({ path: path.join(process.cwd(), '.env.local') });

const supabase = createClient(process.env.PUBLIC_SUPABASE_URL, process.env.SUPABASE_SERVICE_ROLE_KEY);

async function main() {
    const { data: vehicles } = await supabase
        .from('veicoli')
        .select('categoria')
        .eq('noleggio_breve', false);

    const distribution = {};
    vehicles.forEach(v => {
        distribution[v.categoria] = (distribution[v.categoria] || 0) + 1;
    });

    console.log("DISTRIBUTION:", JSON.stringify(distribution, null, 2));
}

main();
