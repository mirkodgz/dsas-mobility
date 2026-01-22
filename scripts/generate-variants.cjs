
const jwt = require('jsonwebtoken');

const SECRET_STR = 'CN6WllgKvA5zIBtjgesHX/hmd0SZZi+dQZaLWDsMXbX9tW55ns2dddkxc1gnFXuTNxog//FxcOJPWvtpYFlYgA==';
const REFERENCE_ID = 'qudtubjjqhibwwwwafwb';

const payload = {
    "iss": "supabase",
    "ref": REFERENCE_ID,
    "role": "service_role",
    "iat": Math.floor(Date.now() / 1000),
    "exp": Math.floor(Date.now() / 1000) + (10 * 365 * 24 * 60 * 60)
};

const { createClient } = require('@supabase/supabase-js');
const SUPABASE_URL = process.env.PUBLIC_SUPABASE_URL || 'https://qudtubjjqhibwwwwafwb.supabase.co';

async function testToken(name, token) {
    if (!token) return;
    console.log(`Testing ${name}...`);
    const supabase = createClient(SUPABASE_URL, token);
    const { count, error } = await supabase.from('veicoli').select('count', { count: 'exact', head: true });

    if (error) {
        console.log(`❌ ${name} Failed: ${error.message}`);
    } else {
        console.log(`✅ ${name} SUCCESS! Count: ${count}`);
        console.log('VALID TOKEN:', token);
    }
}

(async () => {
    // 1. As String
    const tokenString = jwt.sign(payload, SECRET_STR);
    await testToken('TOKEN_STRING', tokenString);

    // 2. As Buffer
    try {
        const tokenBuffer = jwt.sign(payload, Buffer.from(SECRET_STR, 'base64'));
        await testToken('TOKEN_BUFFER', tokenBuffer);
    } catch (e) {
        console.log('Buffer sign error:', e);
    }
})();
