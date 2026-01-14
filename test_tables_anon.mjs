
import { createClient } from '@supabase/supabase-js';
import fs from 'fs';

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
// FORCE ANON KEY
const supabaseKey = envConfig.PUBLIC_SUPABASE_ANON_KEY;

console.log('Using ANON KEY for testing...');

if (!supabaseUrl || !supabaseKey) {
    console.error('Missing Supabase credentials');
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
    }
}

async function run() {
    await testTable('marche');
    await testTable('categorie');
    await testTable('alimentazioni');
    await testTable('cambi');
}

run();
