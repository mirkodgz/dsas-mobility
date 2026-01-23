
const { createClient } = require('@supabase/supabase-js');
require('dotenv').config({ path: '.env.local' });

const supabase = createClient(
    process.env.PUBLIC_SUPABASE_URL,
    process.env.SUPABASE_SERVICE_ROLE_KEY
);

(async () => {
    console.log('Checking for gallery column...');
    const { data, error } = await supabase
        .from('veicoli')
        .select('gallery')
        .limit(1);

    if (error) {
        console.error('Error selecting gallery column:', error.message);
        if (error.message.includes('does not exist')) {
            console.log('CONFIRMED: Column gallery does not exist.');
        }
    } else {
        console.log('Success! Gallery column exists.');
    }
})();
