
const jwt = require('jsonwebtoken');

const SECRET = 'CN6WllgKvA5zIBtjgesHX/hmd0SZZi+dQZaLWDsMXbX9tW55ns2dddkxc1gnFXuTNxog//FxcOJPWvtpYFlYgA==';
const REFERENCE_ID = 'qudtubjjqhibwwwwafwb'; // From supabase URL

const payload = {
    "iss": "supabase",
    "ref": REFERENCE_ID,
    "role": "service_role",
    "iat": Math.floor(Date.now() / 1000),
    "exp": Math.floor(Date.now() / 1000) + (10 * 365 * 24 * 60 * 60) // 10 years
};

const token = jwt.sign(payload, SECRET);
console.log(token);
