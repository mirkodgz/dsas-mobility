
import { createRequire } from 'module';
const require = createRequire(import.meta.url);
const XLSX = require('xlsx');
const path = require('path');

const filePath = path.join(process.cwd(), 'public', 'lista-actualizada.xlsx');

try {
    const workbook = XLSX.readFile(filePath);
    const sheet = workbook.Sheets[workbook.SheetNames[0]];
    const rawData = XLSX.utils.sheet_to_json(sheet);

    // Helper to clean keys
    const cleanKey = (key) => key.trim().replace(/\s+/g, ' ');

    const cleanedData = rawData.map(row => {
        const newRow = {};
        Object.keys(row).forEach(k => {
            newRow[cleanKey(k)] = row[k];
        });
        return newRow;
    });

    // Pick only relevant columns for inspection
    const preview = cleanedData.slice(0, 10).map(r => ({
        Marca: r['Marca'],
        Modello: r['Modello'], // Check if empty
        Versione: r['Versione'],
        Veicolo: r['Veicolo'] // Check if empty
    }));

    console.log(JSON.stringify(preview, null, 2));

} catch (error) {
    console.error(error);
}
