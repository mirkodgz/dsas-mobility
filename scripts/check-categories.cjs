const { createClient } = require('@supabase/supabase-js');
const path = require('path');
require('dotenv').config({ path: path.join(process.cwd(), '.env.local') });

const supabase = createClient(process.env.PUBLIC_SUPABASE_URL, process.env.SUPABASE_SERVICE_ROLE_KEY);

(async () => {
    console.log('--- STARTING CATEGORY ANALYSIS ---');

    // 1. Get all unique categories used in 'veicoli'
    const { data: veicoliCategories, error: errVeicoli } = await supabase
        .from('veicoli')
        .select('categoria');

    if (errVeicoli) {
        console.error('Error fetching veicoli:', errVeicoli);
        return;
    }

    // Count occurrences
    const categoryCounts = {};
    veicoliCategories.forEach(v => {
        const cat = v.categoria || 'NULL';
        categoryCounts[cat] = (categoryCounts[cat] || 0) + 1;
    });

    console.log('\nCategories currently used in `veicoli` table:');
    console.log(JSON.stringify(categoryCounts, null, 2));

    // 2. Get all valid categories from 'categorie'
    const { data: validCategories, error: errCats } = await supabase
        .from('categorie')
        .select('*');

    if (errCats) {
        console.error('Error fetching categorie:', errCats);
        return;
    }

    const validCategorySet = new Set(validCategories.map(c => c.nome));
    console.log('\nValid categories in `categorie` table:', JSON.stringify(Array.from(validCategorySet), null, 2));

    // 3. Find invalid entries
    const invalidCategories = [];
    Object.keys(categoryCounts).forEach(cat => {
        if (!validCategorySet.has(cat)) {
            invalidCategories.push(cat);
        }
    });

    console.log('\n--- DISCREPANCIES FOUND ---');
    if (invalidCategories.length === 0) {
        console.log('All categories in `veicoli` exist in `categorie` table.');
    } else {
        console.log('Categories in `veicoli` NOT found in `categorie`:');
        invalidCategories.forEach(cat => {
            console.log(`- "${cat}" (Count: ${categoryCounts[cat]})`);
        });
    }

    // 4. Update SUV if needed
    if (categoryCounts['SUV'] > 0) {
        console.log('\n--- FIXING SUV -> SUV / Crossover ---');
        const { data: updateData, error: updateError } = await supabase
            .from('veicoli')
            .update({ categoria: 'SUV / Crossover' })
            .eq('categoria', 'SUV')
            .select();

        if (updateError) {
            console.error('Error updating SUV:', updateError);
        } else {
            console.log(`Successfully updated ${updateData.length} vehicles from 'SUV' to 'SUV / Crossover'.`);
        }
    } else {
        console.log('\nNo vehicles with category "SUV" found to update.');
    }

})();
