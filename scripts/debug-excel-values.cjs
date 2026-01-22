
const XLSX = require('xlsx');
const path = require('path');

const filePath = path.join(process.cwd(), 'public', 'lista-actualizada.xlsx');
console.log('Reading:', filePath);

const workbook = XLSX.readFile(filePath);
const sheet = workbook.Sheets[workbook.SheetNames[0]];
const rawData = XLSX.utils.sheet_to_json(sheet);

console.log('First 3 rows raw data:');
rawData.slice(0, 3).forEach((row, i) => {
    console.log(`--- Row ${i} ---`);
    console.log('Keys:', Object.keys(row));
    console.log('Canone (Undefined?):', row['Canone']);
    console.log('Canone key check:', Object.keys(row).find(k => k.includes('Canone')));
    console.log('Anticipo:', row['Anticipo']);
    console.log('Durata:', row['Durata']);
    console.log('Km Annui:', row['Km Annui']);
});
