
import { createClient } from '@supabase/supabase-js';
import fs from 'fs';

const supabaseUrl = "https://qudtubjjqhibwwwwafwb.supabase.co";
const supabaseKey = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InF1ZHR1YmpqcWhpYnd3d3dhZndiIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NjgzMzAxMTYsImV4cCI6MjA4MzkwNjExNn0.FDDMHAoxMsfyCh7-ir5OKPllw_tJ5OJhGkzqV5b0yzs";

const supabase = createClient(supabaseUrl, supabaseKey);

async function checkCitroen() {
    const { data, error } = await supabase
        .from('veicoli')
        .select('id, marca, modello, slug')
        .ilike('modello', '%C3%');

    if (error) {
        fs.writeFileSync('citroen_data.txt', `Error: ${JSON.stringify(error)}`);
        return;
    }

    let output = 'Found vehicles:\n';
    data.forEach(v => {
        output += `ID: ${v.id}\n`;
        output += `Marca: "${v.marca}"\n`;
        output += `Modello: "${v.modello}"\n`;
        output += `Slug: "${v.slug}"\n`;
        output += '-------------------\n';
    });

    fs.writeFileSync('citroen_data.txt', output);
}

checkCitroen();
