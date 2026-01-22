
const { createClient } = require('@supabase/supabase-js');
const path = require('path');
require('dotenv').config({ path: path.join(process.cwd(), '.env.local') });

const supabase = createClient(process.env.PUBLIC_SUPABASE_URL, process.env.SUPABASE_SERVICE_ROLE_KEY);

(async () => {
    const { count, error } = await supabase.from('veicoli').select('count', { count: 'exact', head: true });
    if (error) console.error(error);
    else console.log('TOTAL VEHICLES:', count);
})();
