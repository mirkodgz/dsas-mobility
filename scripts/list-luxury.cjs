
const { createClient } = require('@supabase/supabase-js');
require('dotenv').config({ path: '.env.local' });

const supabase = createClient(
    process.env.PUBLIC_SUPABASE_URL,
    process.env.SUPABASE_SERVICE_ROLE_KEY
);

(async () => {
    const { data, error } = await supabase
        .from('veicoli')
        .select('slug, marca, modello, gallery')
        .eq('noleggio_breve', true)
        .limit(1);

    if (error) console.error(error);
    else console.log(data);
})();
