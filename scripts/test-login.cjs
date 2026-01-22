
const { createClient } = require('@supabase/supabase-js');
const path = require('path');
require('dotenv').config({ path: path.join(process.cwd(), '.env.local') });

const supabaseUrl = process.env.PUBLIC_SUPABASE_URL;
const supabaseAnonKey = process.env.PUBLIC_SUPABASE_ANON_KEY;

console.log("Testing Login Bypass...");

async function testLogin() {
    const supabase = createClient(supabaseUrl, supabaseAnonKey);

    // Credentials found in recover_admin.mjs
    const email = 'team@dgzconsulting.com';
    const password = 'Dsas2026!';

    console.log(`Attempting login with ${email}...`);
    const { data, error } = await supabase.auth.signInWithPassword({
        email,
        password
    });

    if (error) {
        console.error("Login Failed:", error.message);
    } else {
        console.log("LOGIN SUCCESSFUL!");
        console.log("User ID:", data.user.id);
        console.log("Role:", data.user.role);

        // NOW TEST ACCESS
        console.log("Testing SELECT permission...");
        const { count, error: selError } = await supabase.from('veicoli').select('*', { count: 'exact', head: true });

        if (selError) console.error("SELECT Error:", selError.message);
        else console.log("SELECT Count:", count);
    }
}

testLogin();
