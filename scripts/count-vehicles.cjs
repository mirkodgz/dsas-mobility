
const { createClient } = require('@supabase/supabase-js');
const path = require('path');
require('dotenv').config({ path: path.join(process.cwd(), '.env.local') });

const supabase = createClient(process.env.PUBLIC_SUPABASE_URL, process.env.SUPABASE_SERVICE_ROLE_KEY);

(async () => {
    // Total
    const { count: total, error: errTotal } = await supabase.from('veicoli').select('*', { count: 'exact', head: true });

    // Luxury (noleggio_breve = true)
    const { count: luxury, error: errLuxury } = await supabase.from('veicoli').select('*', { count: 'exact', head: true }).eq('noleggio_breve', true);

    // Long Term (noleggio_breve = false)
    const { count: longTerm, error: errLong } = await supabase.from('veicoli').select('*', { count: 'exact', head: true }).eq('noleggio_breve', false);

    if (errTotal || errLuxury || errLong) {
        console.error('Error fetching counts:', errTotal, errLuxury, errLong);
    } else {
        console.log('--- STATISTICHE VEICOLI ---');
        console.log('TOTALE:', total);
        console.log('Luxury (Breve Termine):', luxury);
        console.log('Lungo Termine:', longTerm);
    }
})();
