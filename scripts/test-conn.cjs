
const path = require('path');
const { createClient } = require('@supabase/supabase-js');
require('dotenv').config({ path: path.join(process.cwd(), '.env.local') });

const url = process.env.PUBLIC_SUPABASE_URL;
const key = process.env.SUPABASE_SERVICE_ROLE_KEY;
const anonKey = process.env.PUBLIC_SUPABASE_ANON_KEY;

console.log('URL:', url);
console.log('Key (SR):', key ? 'OK' : 'MISSING');
console.log('Key (ANON):', anonKey ? 'OK' : 'MISSING');

if (url && anonKey) {
    console.log('--- Testing Anon Key ---');
    const supabaseAnon = createClient(url, anonKey);
    supabaseAnon.from('veicoli').select('count', { count: 'exact', head: true })
        .then(({ count, error }) => {
            if (error) console.error('Anon Error:', error);
            else console.log('Anon Connection OK. Count:', count);
        });
}

console.log('--- Testing Service Key (SELECT) ---');
const supabase = createClient(url, key);
supabase.from('veicoli').select('count', { count: 'exact', head: true })
    .then(({ count, error }) => {
        if (error) {
            console.error('Service SELECT Error Object:', JSON.stringify(error, null, 2));
            console.error('Error Details:', {
                message: error.message,
                code: error.code,
                details: error.details,
                hint: error.hint
            });
        }
        else {
            console.log('Service SELECT OK. Count:', count);

            // NOW TEST DELETE
            console.log('--- Testing Service Key (DELETE) ---');
            // Try to delete a non-existent ID to test permissions without damage
            supabase.from('veicoli').delete().eq('id', '00000000-0000-0000-0000-000000000000')
                .then(({ error: delError, count: delCount }) => {
                    if (delError) {
                        console.error('Service DELETE Error:', delError);
                        console.log('❌ KEY IS READ-ONLY OR BLOCKED');
                    } else {
                        console.log('Service DELETE OK (No error returned).');
                        console.log('✅ KEY HAS WRITE PERMISSIONS');
                    }
                });
        }
    });

