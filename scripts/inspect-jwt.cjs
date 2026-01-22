
const jwt = require('jsonwebtoken');
const path = require('path');
require('dotenv').config({ path: path.join(process.cwd(), '.env.local') });

const key = process.env.SUPABASE_SERVICE_ROLE_KEY;
console.log("Inspecting Key:", key ? key.substring(0, 20) + '...' : 'MISSING');

if (key) {
    const decoded = jwt.decode(key, { complete: true });
    console.log("Header:", decoded.header);
    console.log("Payload:", decoded.payload);
}
