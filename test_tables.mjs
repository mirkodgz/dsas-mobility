
import { createClient } from '@supabase/supabase-js';
import fs from 'fs';
import path from 'path';

// Manual parser
const parseEnv = (content) => {
    const res = {};
    content.split('\n').forEach(line => {
        const [key, ...vals] = line.split('=');
        if (key && vals.length > 0) {
            res[key.trim()] = vals.join('=').trim().replace(/(^"|"$)/g, '');
        }
    });
    return res;
};

const envConfig = parseEnv(fs.readFileSync('.env.local', 'utf8'));

const supabaseUrl = envConfig.PUBLIC_SUPABASE_URL;
const supabaseKey = envConfig.SUPABASE_SERVICE_ROLE_KEY || envConfig.PUBLIC_SUPABASE_ANON_KEY;

if (!supabaseUrl || !supabaseKey) {
    console.error('Missing Supabase credentials in .env.local');
    process.exit(1);
}

const supabase = createClient(supabaseUrl, supabaseKey);

async function testTable(tableName) {
    console.log(`Testing table: ${tableName}...`);
    const { data, error } = await supabase.from(tableName).select('*').limit(1);

    if (error) {
        console.error(`❌ Error querying ${tableName}:`, error.message, error.code);
    } else {
        console.log(`✅ Success querying ${tableName}. Found ${data.length} rows.`);
        if (data.length > 0) console.log('Sample:', data[0]);
    }
}

async function run() {
    await testTable('veicoli');
    await testTable('marche');
    await testTable('categorie');
    await testTable('alimentazioni');
    await testTable('cambi');
    await testTable('tempi_consegna');
}

run();
