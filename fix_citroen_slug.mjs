
import { createClient } from '@supabase/supabase-js';

const supabaseUrl = "https://qudtubjjqhibwwwwafwb.supabase.co";
// Using Service Role Key to ALLOW UPDATE (bypass RLS if needed, although usually better for admin tasks)
const supabaseKey = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InNlcnZpY2Vfcm9sZSIsImlhdCI6MTc2ODMzMDExNiwiZXhwIjoyMDgzOTA2MTE2fQ.l_dlOydBpeoIAej1B3o7TmbKYAPWaziavokKO8B66oA";

const supabase = createClient(supabaseUrl, supabaseKey);

async function fixSlug() {
    console.log('Fixing slug for Citroen C3 PureTech...');

    const { data, error } = await supabase
        .from('veicoli')
        .update({ slug: 'citroen-c3-puretech' })
        .eq('id', '89737d61-59a7-4726-bad6-5b688907249f')
        .select();

    if (error) {
        console.error('Error updating slug:', error);
    } else {
        console.log('Slug updated successfully:', data);
    }
}

fixSlug();
