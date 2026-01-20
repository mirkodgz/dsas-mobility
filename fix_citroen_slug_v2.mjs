
import { createClient } from '@supabase/supabase-js';

const supabaseUrl = "https://qudtubjjqhibwwwwafwb.supabase.co";
// Hardcoded Service Role Key (Verified from .env.local)
const supabaseKey = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InNlcnZpY2Vfcm9sZSIsImlhdCI6MTc2ODMzMDExNiwiZXhwIjoyMDgzOTA2MTE2fQ.l_dlOydBpeoIAej1B3o7TmbKYAPWaziavokKO8B66oA";

// Initialize with options for server-side usage
const supabase = createClient(supabaseUrl, supabaseKey, {
    auth: {
        autoRefreshToken: false,
        persistSession: false
    }
});

async function fixSlug() {
    console.log('Fixing slug for Citroen C3 PureTech...');

    const { data, error } = await supabase
        .from('veicoli')
        .update({ slug: 'citroen-c3-puretech' })
        .eq('id', '89737d61-59a7-4726-bad6-5b688907249f')
        .select();

    if (error) {
        console.error('Error updating slug:', JSON.stringify(error, null, 2));
    } else {
        console.log('Slug updated successfully:', data);
    }
}

fixSlug();
