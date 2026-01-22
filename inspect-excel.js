
import { createRequire } from 'module';
const require = createRequire(import.meta.url);
const XLSX = require('xlsx');
const path = require('path');

const filePath = path.join(process.cwd(), 'public', 'lista-actualizada.xlsx');
console.log('Reading file:', filePath);

try {
    const workbook = XLSX.readFile(filePath);
    const sheetName = workbook.SheetNames[0];
    const sheet = workbook.Sheets[sheetName];

    // Default: first row is header
    const data = XLSX.utils.sheet_to_json(sheet);

    // Print Keys from first row
    if (data.length > 0) {
        console.log('Detected Columns:', Object.keys(data[0]));

        // Print First 3 rows
        console.log('First 3 rows:', JSON.stringify(data.slice(0, 3), null, 2));
    } else {
        console.log('No data found');
    }

} catch (error) {
    console.error('Error reading file:', error);
}
