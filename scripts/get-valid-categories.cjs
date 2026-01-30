const { createClient } = require('@supabase/supabase-js');
const fs = require('fs');
const path = require('path');
require('dotenv').config({ path: path.join(process.cwd(), '.env.local') });

const supabase = createClient(process.env.PUBLIC_SUPABASE_URL, process.env.SUPABASE_SERVICE_ROLE_KEY);

(async () => {
    const { data: validCategories } = await supabase.from('categorie').select('*');
    const { data: veicoliCategories } = await supabase.from('veicoli').select('categoria');

    const validNames = validCategories.map(c => c.nome);
    const veicoliCounts = {};
    veicoliCategories.forEach(v => {
        veicoliCounts[v.categoria] = (veicoliCounts[v.categoria] || 0) + 1;
    });

    const report = {
        valid_categories: validNames,
        veicoli_usage: veicoliCounts,
        discrepancies: Object.keys(veicoliCounts).filter(k => !validNames.includes(k))
    };

    fs.writeFileSync('category_report.json', JSON.stringify(report, null, 2), 'utf8');
    console.log('Report written to category_report.json');
})();
