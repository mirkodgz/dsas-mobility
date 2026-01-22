
const { createClient } = require('@supabase/supabase-js');
const path = require('path');
require('dotenv').config({ path: path.join(process.cwd(), '.env.local') });

const supabaseUrl = process.env.PUBLIC_SUPABASE_URL;
const supabaseServiceKey = process.env.SUPABASE_SERVICE_ROLE_KEY;

if (!supabaseUrl || !supabaseServiceKey) {
    console.error('Missing credentials');
    process.exit(1);
}

const supabase = createClient(supabaseUrl, supabaseServiceKey);

async function check() {
    console.log('--- Checking leads table access (Service Role) ---');

    // 1. Check if table exists (by select count)
    const { count, error } = await supabase.from('leads').select('*', { count: 'exact', head: true });

    if (error) {
        console.error('Error accessing leads table:', error);
    } else {
        console.log('Leads table exists. Count:', count);

        // 2. Try to insert a dummy lead
        const dummy = {
            full_name: 'Test Debugger',
            email: 'debug@test.com',
            phone: '0000000000',
            message: 'Debug Test',
            customer_type: 'Privato'
        };

        const { data, error: insError } = await supabase.from('leads').insert([dummy]).select();

        if (insError) {
            console.error('Insert failed with Service Role:', insError);
        } else {
            console.log('Insert SUCCESS using Service Role Key. ID:', data[0].id);
            // Cleanup
            await supabase.from('leads').delete().eq('id', data[0].id);
            console.log('Cleanup dummy lead done.');
        }
    }
}

check();
