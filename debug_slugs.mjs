
import { createClient } from '@supabase/supabase-js';

const supabaseUrl = "https://qudtubjjqhibwwwwafwb.supabase.co";
// Using Anon Key instead of Service Role Key
const supabaseKey = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InF1ZHR1YmpqcWhpYnd3d3dhZndiIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NjgzMzAxMTYsImV4cCI6MjA4MzkwNjExNn0.FDDMHAoxMsfyCh7-ir5OKPllw_tJ5OJhGkzqV5b0yzs";

const supabase = createClient(supabaseUrl, supabaseKey);

async function checkSlugs() {
    console.log('Fetching all vehicle slugs...');
    const { data, error } = await supabase
        .from('veicoli')
        .select('id, marca, modello, slug');

    if (error) {
        console.error('Error fetching vehicles:', error);
        return;
    }

    console.log('Found vehicles:');
    data.forEach(v => {
        console.log(`- [${v.id}] ${v.marca} ${v.modello} => Slug: "${v.slug}"`);
    });
}

checkSlugs();
