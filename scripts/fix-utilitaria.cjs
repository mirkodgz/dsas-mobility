const { createClient } = require('@supabase/supabase-js');
const path = require('path');
require('dotenv').config({ path: path.join(process.cwd(), '.env.local') });

const supabase = createClient(process.env.PUBLIC_SUPABASE_URL, process.env.SUPABASE_SERVICE_ROLE_KEY);

(async () => {
    console.log('--- FIXING UTILITARIA -> CITY CAR ---');

    const { data, error } = await supabase
        .from('veicoli')
        .update({ categoria: 'City Car' })
        .eq('categoria', 'Utilitaria')
        .select();

    if (error) {
        console.error('Error:', error);
    } else {
        console.log(`Successfully updated ${data.length} vehicles from 'Utilitaria' to 'City Car'.`);
    }
})();
