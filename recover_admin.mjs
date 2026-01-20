
import { createClient } from '@supabase/supabase-js';

// HARDCODED CREDENTIALS FOR DEBUGGING
const SUPABASE_URL = 'https://qudtubjjqhibwwwwafwb.supabase.co';
const SUPABASE_SERVICE_KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InNlcnZpY2Vfcm9sZSIsImlhdCI6MTc2ODMzMDExNiwiZXhwIjoyMDgzOTA2MTE2fQ.l_dlOydBpeoIAej1B3o7TmbKYAPWaziavokKO8B66oA';

console.log('Using Key:', SUPABASE_SERVICE_KEY.substring(0, 10) + '...');

const supabase = createClient(SUPABASE_URL, SUPABASE_SERVICE_KEY, {
    auth: {
        autoRefreshToken: false,
        persistSession: false
    }
});

const EMAIL = 'team@dgzconsulting.com';
const NEW_PASSWORD = 'Dsas2026!';

async function recoverUser() {
    console.log(`🔍 Checking for user: ${EMAIL}...`);

    const { data: { users }, error: listError } = await supabase.auth.admin.listUsers();

    if (listError) {
        console.error('❌ Error listing users:', listError.message);
        // console.error(listError);
        return;
    }

    const existingUser = users.find(u => u.email === EMAIL);

    if (existingUser) {
        console.log(`👤 User found (ID: ${existingUser.id}). Resetting password...`);

        const { data, error: updateError } = await supabase.auth.admin.updateUserById(
            existingUser.id,
            { password: NEW_PASSWORD, email_confirm: true }
        );

        if (updateError) {
            console.error('❌ Error updating password:', updateError.message);
        } else {
            console.log(`✅ PASSWORD RESET SUCCESSFUL!`);
            console.log(`📧 Email: ${EMAIL}`);
            console.log(`🔑 Password: ${NEW_PASSWORD}`);
        }

    } else {
        console.log(`🤷 User not found. Creating new user...`);

        const { data, error: createError } = await supabase.auth.admin.createUser({
            email: EMAIL,
            password: NEW_PASSWORD,
            email_confirm: true,
            user_metadata: { name: 'Admin User' }
        });

        if (createError) {
            console.error('❌ Error creating user:', createError.message);
        } else {
            console.log(`✅ USER CREATED SUCCESSFULLY!`);
            console.log(`📧 Email: ${EMAIL}`);
            console.log(`🔑 Password: ${NEW_PASSWORD}`);
        }
    }
}

recoverUser();
