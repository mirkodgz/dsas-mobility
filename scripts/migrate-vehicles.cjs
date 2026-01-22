
const XLSX = require('xlsx');
const path = require('path');
const { createClient } = require('@supabase/supabase-js');
require('dotenv').config({ path: path.join(process.cwd(), '.env.local') });

const filePath = path.join(process.cwd(), 'public', 'lista-actualizada.xlsx');
console.log('Reading file:', filePath);

// SUPABASE SETUP
const supabaseUrl = process.env.PUBLIC_SUPABASE_URL;
const supabaseKey = process.env.SUPABASE_SERVICE_ROLE_KEY;

if (supabaseKey) console.log('Key Length:', supabaseKey.length);

if (!supabaseUrl || !supabaseKey) {
    console.error('Missing Supabase Credentials in .env');
    process.exit(1);
}

const supabase = createClient(supabaseUrl, supabaseKey);

const slugify = (text) => {
    return text.toString().toLowerCase()
        .replace(/\s+/g, '-')
        .replace(/[^\w\-]+/g, '')
        .replace(/\-\-+/g, '-')
        .replace(/^-+/, '')
        .replace(/-+$/, '');
}

const normalize = (val, options) => {
    if (!val) return '';
    if (typeof val !== 'string') return val;
    val = val.trim();
    if (options.includes(val)) return val;
    const match = options.find(o => o.toLowerCase() === val.toLowerCase());
    return match || val;
};

const sanitizeNumber = (val, fieldName) => {
    if (val === undefined || val === null || val === '') return 0;

    // HEURISTIC: Fix Excel Time Fraction specifically for 20.000 misinterpreted as 20:00 (0.8333...)
    if (typeof val === 'number') {
        if (val > 0.833 && val < 0.834) {
            // Found the culprit
            if (fieldName && fieldName.toLowerCase().includes('km')) {
                console.log(`Fixing corrupted 20.000 (read as ${val}) in ${fieldName}`);
                return 20000;
            }
            if (fieldName && fieldName.toLowerCase().includes('durata')) {
                console.log(`Fixing corrupted 20 (read as ${val}) in ${fieldName}`);
                return 20; // Unlikely to be 20000 months
            }
        }
        return val;
    }

    let s = val.toString();
    s = s.replace(/[^0-9.,-]/g, '');

    if (s.indexOf(',') > -1 && s.indexOf('.') === -1) {
        s = s.replace(',', '.');
    } else if (s.indexOf(',') > -1 && s.indexOf('.') > -1) {
        if (s.lastIndexOf(',') > s.lastIndexOf('.')) {
            s = s.replace(/\./g, '').replace(',', '.');
        } else {
            s = s.replace(/,/g, '');
        }
    }

    const n = parseFloat(s);
    return isNaN(n) ? 0 : n;
};

const CATEGORIES = ['Berlina', 'City Car', 'Station Wagon', 'SUV / Crossover', 'Veicoli commerciali', 'Cabrio', 'Coupé', 'Monovolume', 'Pick-up', 'Roadster', 'Fuoristrada', 'Elettrica'];
const FUELS = ['Benzina', 'Diesel', 'Elettrica', 'Ibrida-Benzina', 'Ibrida-Diesel', 'GPL', 'Metano'];
const TRANSMISSIONS = ['Manuale', 'Automatico'];

async function migrate() {
    try {
        console.log('Testing connection with SELECT...');
        const { count, error: selError } = await supabase.from('veicoli').select('count', { count: 'exact', head: true });
        if (selError) throw selError;
        console.log('SELECT OK. Count:', count);

        // 1. DELETE EXISTING DATA
        console.log('Deleting existing vehicles...');
        const { error: delError } = await supabase
            .from('veicoli')
            .delete()
            .neq('id', '00000000-0000-0000-0000-000000000000');

        if (delError) throw delError;
        console.log('Existing vehicles deleted.');

        // 2. READ EXCEL
        const workbook = XLSX.readFile(filePath);
        const sheet = workbook.Sheets[workbook.SheetNames[0]];
        const rawData = XLSX.utils.sheet_to_json(sheet);

        const cleanKey = (key) => key.trim().replace(/\s+/g, ' ');

        const vehicles = rawData.map(row => {
            const r = {};
            Object.keys(row).forEach(k => r[cleanKey(k)] = row[k]);

            // FUZZY MATCH
            const getVal = (partialKey) => {
                const key = Object.keys(r).find(k => k.toLowerCase().includes(partialKey.toLowerCase()));
                return key ? r[key] : undefined;
            };

            const marca = (getVal('Marca') || '').trim();
            const versione = (getVal('Versione') || '').trim();

            let modello = (getVal('Modello') || '').trim();
            if (!modello && versione) modello = versione.split(' ')[0];

            let title = (getVal('Veicolo') || '').trim();
            if (!title) title = `${marca} ${versione}`;

            const slug = slugify(title);
            const sku = `SKU-${marca.substring(0, 3).toUpperCase()}-${modello.substring(0, 3).toUpperCase()}-${Math.floor(Math.random() * 1000)}`;

            return {
                titolo: title,
                marca: marca,
                modello: modello,
                versione: versione,
                slug: slug,
                sku: sku,
                categoria: normalize(getVal('Categoria'), CATEGORIES) || 'Berlina',
                alimentazione: normalize(getVal('Alimentazione'), FUELS) || 'Diesel',
                cambio: normalize(getVal('Cambio'), TRANSMISSIONS) || 'Manuale',
                promo: (getVal('Promo') || '').toString().toUpperCase() === 'SI' || getVal('Promo') === true,
                canone_mensile: sanitizeNumber(getVal('Canone'), 'Canone'),
                anticipo: sanitizeNumber(getVal('Anticipo'), 'Anticipo'),
                durata_mesi: sanitizeNumber(getVal('Durata'), 'Durata') || 36,
                km_annui: sanitizeNumber(getVal('Km'), 'KmAnnui') || 10000,
                immagine_url: '',
                noleggio_breve: false,
                tempo_consegna: 'Pronta Consegna'
            };
        });

        console.log(`Prepared ${vehicles.length} vehicles for insertion.`);

        // 3. INSERT IN BATCHES
        const batchSize = 50;
        for (let i = 0; i < vehicles.length; i += batchSize) {
            const batch = vehicles.slice(i, i + batchSize);
            const { error } = await supabase.from('veicoli').insert(batch);
            if (error) {
                console.error(`Error inserting batch ${i}:`, error);
            } else {
                process.stdout.write('.');
            }
        }

        console.log('\nMigration Complete!');

    } catch (error) {
        console.error('Migration failed:', error);
    }
}

migrate();
