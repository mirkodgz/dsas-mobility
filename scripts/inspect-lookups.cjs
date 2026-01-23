
const path = require('path');
const { createClient } = require('@supabase/supabase-js');
require('dotenv').config({ path: path.join(process.cwd(), '.env.local') });

const url = process.env.PUBLIC_SUPABASE_URL;
const key = process.env.SUPABASE_SERVICE_ROLE_KEY;
const supabase = createClient(url, key);

async function inspect(table) {
    const { data, error } = await supabase.from(table).select('*').limit(1);
    if (error) {
        console.log(`❌ Table '${table}' Error:`, error.message);
    } else if (data && data.length > 0) {
        console.log(`✅ Table '${table}' OK. Columns:`, Object.keys(data[0]).join(', '));
        console.log(`   Sample:`, JSON.stringify(data[0]));
    } else {
        console.log(`⚠️ Table '${table}' OK but EMPTY.`);
    }
}

async function main() {
    await inspect('marche');
    await inspect('categorie');
    await inspect('alimentazioni');
    await inspect('cambi');
    await inspect('tempi_consegna');
}

main();
