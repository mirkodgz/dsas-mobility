
import type { APIRoute } from 'astro';
import { createClient } from '@supabase/supabase-js';
import * as XLSX from 'xlsx';
import path from 'path';
import fs from 'fs';

export const GET: APIRoute = async () => {
    const supabaseUrl = import.meta.env.PUBLIC_SUPABASE_URL;
    const supabaseKey = import.meta.env.SUPABASE_SERVICE_ROLE_KEY;

    if (!supabaseUrl || !supabaseKey) {
        return new Response(JSON.stringify({ error: 'Missing Credentials (URL or Service Role Key)' }), { status: 500 });
    }

    const supabase = createClient(supabaseUrl, supabaseKey);

    try {
        // 1. DELETE EXISTING DATA
        console.log('Deleting existing vehicles...');
        const { error: delError } = await supabase
            .from('veicoli')
            .delete()
            .neq('id', 0); // Delete all

        if (delError) {
            console.error('Delete Error:', delError);
            return new Response(JSON.stringify({ error: 'Delete failed', details: delError }), { status: 500 });
        }

        // 2. READ EXCEL
        const filePath = path.join(process.cwd(), 'public', 'lista-actualizada.xlsx');
        if (!fs.existsSync(filePath)) {
            return new Response(JSON.stringify({ error: 'Excel file not found' }), { status: 404 });
        }

        const fileBuffer = fs.readFileSync(filePath);
        const workbook = XLSX.read(fileBuffer, { type: 'buffer' });
        const sheet = workbook.Sheets[workbook.SheetNames[0]];
        const rawData = XLSX.utils.sheet_to_json(sheet);

        const cleanKey = (key: string) => key.trim().replace(/\s+/g, ' ');

        const slugify = (text: string) => {
            return text.toString().toLowerCase()
                .replace(/\s+/g, '-')
                .replace(/[^\w\-]+/g, '')
                .replace(/\-\-+/g, '-')
                .replace(/^-+/, '')
                .replace(/-+$/, '');
        };

        const normalize = (val: any, options: string[]) => {
            if (!val) return '';
            if (typeof val !== 'string') return val;
            let v = val.trim();
            // Simple mapping
            const match = options.find(o => o.toLowerCase() === v.toLowerCase());
            return match || v;
        };

        const CATEGORIES = ['Berlina', 'City Car', 'Station Wagon', 'SUV / Crossover', 'Veicoli commerciali', 'Cabrio', 'Coupé', 'Monovolume', 'Pick-up', 'Roadster', 'Fuoristrada', 'Elettrica'];
        const FUELS = ['Benzina', 'Diesel', 'Elettrica', 'Ibrida-Benzina', 'Ibrida-Diesel', 'GPL', 'Metano'];
        const TRANSMISSIONS = ['Manuale', 'Automatico'];

        const vehicles = rawData.map((row: any) => {
            const r: any = {};
            Object.keys(row).forEach(k => r[cleanKey(k)] = row[k]);

            const marca = (r['Marca'] || '').trim();
            const versione = (r['Versione'] || '').trim();

            let modello = (r['Modello'] || '').trim();
            if (!modello && versione) {
                // Heuristic: First word of version
                modello = versione.split(' ')[0];
            }

            let title = (r['Veicolo'] || '').trim();
            if (!title) {
                title = `${marca} ${versione}`;
            }

            const slug = slugify(title);
            const sku = `SKU-${marca.substring(0, 3).toUpperCase()}-${slug.substring(0, 5).toUpperCase()}-${Math.floor(Math.random() * 1000)}`;

            return {
                titolo: title,
                marca: marca,
                modello: modello,
                versione: versione,
                slug: slug,
                sku: sku,
                categoria: normalize(r['Categoria'], CATEGORIES) || 'Berlina',
                alimentazione: normalize(r['Alimentazione'], FUELS) || 'Diesel',
                cambio: normalize(r['Cambio'], TRANSMISSIONS) || 'Manuale',
                promo: String(r['Promo']).toUpperCase() === 'SI' || r['Promo'] === true,
                canone_mensile: r['Canone'] || 0,
                anticipo: r['Anticipo'] || 0,
                durata_mesi: r['Durata'] || 36,
                km_annui: r['Km Annui'] || 10000,
                immagine_url: '',
                noleggio_breve: false,
                tempo_consegna: 'Pronta Consegna'
            };
        });

        console.log(`Inserting ${vehicles.length} vehicles...`);

        // Split into batches of 50
        const batchSize = 50;
        for (let i = 0; i < vehicles.length; i += batchSize) {
            const batch = vehicles.slice(i, i + batchSize);
            const { error: insError } = await supabase.from('veicoli').insert(batch);
            if (insError) {
                console.error('Insert Error:', insError);
                return new Response(JSON.stringify({ error: 'Insert failed', details: insError }), { status: 500 });
            }
        }

        return new Response(JSON.stringify({ success: true, count: vehicles.length }), { status: 200 });

    } catch (e: any) {
        console.error('Migration Exception:', e);
        return new Response(JSON.stringify({ error: e.message }), { status: 500 });
    }
}
