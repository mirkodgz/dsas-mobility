
const XLSX = require('xlsx');
const path = require('path');

const inputPath = path.join(process.cwd(), 'public', 'lista-actualizada.xlsx');
// Use v2 to ensure new file
const outputPath = path.join(process.cwd(), 'public', 'lista-main_verified.xlsx');

console.log('Reading file:', inputPath);

try {
    const workbook = XLSX.readFile(inputPath);
    const sheet = workbook.Sheets[workbook.SheetNames[0]];
    const rawData = XLSX.utils.sheet_to_json(sheet);

    const cleanKey = (key) => key.trim().replace(/\s+/g, ' ');

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

        if (typeof val === 'number') {
            // FIX: 20000 interpreted as 20:00:00 (0.8333...)
            if (val > 0.833 && val < 0.834) {
                if (fieldName && fieldName.toLowerCase().includes('km')) return 20000;
                if (fieldName && fieldName.toLowerCase().includes('durata')) return 20;
            }
            return val;
        }

        let s = val.toString().replace(/[^0-9.,-]/g, '');
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

    const processedData = rawData.map(row => {
        const r = {};
        Object.keys(row).forEach(k => r[cleanKey(k)] = row[k]);

        // FUZZY MATCH LOGIC
        const getVal = (partialKey) => {
            const key = Object.keys(r).find(k => k.toLowerCase().includes(partialKey.toLowerCase()));
            return key ? r[key] : undefined;
        };

        const marca = (getVal('Marca') || '').trim();
        const versione = (getVal('Versione') || '').trim();

        let modello = (getVal('Modello') || '').trim();
        if (!modello && versione) {
            modello = versione.split(' ')[0];
        }

        let title = (getVal('Veicolo') || '').trim();
        if (!title) {
            title = `${marca} ${versione}`;
        }

        return {
            'Marca': marca,
            'Versione': versione,
            'Modello (Calc)': modello,
            'Veicolo (Calc)': title,
            'Categoria': normalize(getVal('Categoria'), CATEGORIES),
            'Alimentazione': normalize(getVal('Alimentazione'), FUELS),
            'Cambio': normalize(getVal('Cambio'), TRANSMISSIONS),
            'Promo': (getVal('Promo') || '').toString().toUpperCase() === 'SI' || getVal('Promo') === true ? 'SI' : 'NO',
            'Canone Mensile': sanitizeNumber(getVal('Canone'), 'Canone'),
            'Anticipo': sanitizeNumber(getVal('Anticipo'), 'Anticipo'),
            'Durata': sanitizeNumber(getVal('Durata'), 'Durata'),
            'Km Annui': sanitizeNumber(getVal('Km'), 'KmAnnui'),
            'Foto': getVal('Foto') || ''
        };
    });

    const newSheet = XLSX.utils.json_to_sheet(processedData);
    const newWorkbook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(newWorkbook, newSheet, "Verificacion");

    XLSX.utils.book_append_sheet(newWorkbook, XLSX.utils.json_to_sheet(rawData), "Datos Crudos");

    XLSX.writeFile(newWorkbook, outputPath);
    console.log(`Exported verification file to: ${outputPath}`);

} catch (error) {
    console.error('Error generating Excel:', error);
}
