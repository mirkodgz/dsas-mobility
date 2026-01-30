const { createClient } = require('@supabase/supabase-js');
const path = require('path');
require('dotenv').config({ path: path.join(process.cwd(), '.env.local') });

const supabase = createClient(process.env.PUBLIC_SUPABASE_URL, process.env.SUPABASE_SERVICE_ROLE_KEY);

(async () => {
    console.log('--- FIXING CATEGORY MISMATCHES ---');

    console.log('Fixing "Veicolo Commerciale" -> "Veicoli commerciali"...');
    const { data, error } = await supabase
        .from('veicoli')
        .update({ categoria: 'Veicoli commerciali' })
        .eq('categoria', 'Veicolo Commerciale')
        .select();

    if (error) {
        console.error('Error:', error);
    } else {
        console.log(`Updated ${data.length} vehicles.`);
    }
})();
