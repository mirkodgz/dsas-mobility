
const path = require('path');
require('dotenv').config({ path: path.join(process.cwd(), '.env.local') });

console.log('Available Env Vars:', Object.keys(process.env).filter(k => k.includes('SUPABASE')));

const key = process.env.SUPABASE_SERVICE_ROLE_KEY;
if (key) {
    console.log('Key Length:', key.length);
    console.log('Starts with:', key.substring(0, 5));
    console.log('Ends with:', key.substring(key.length - 5));
    console.log('Has whitespace?', /\s/.test(key));
    console.log('Has quotes?', /['"]/.test(key));
} else {
    console.log('Key is empty/undefined');
}
