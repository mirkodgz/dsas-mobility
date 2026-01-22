
const { Client } = require('pg');

const client = new Client({
    host: 'db.qudtubjjqhibwwwwafwb.supabase.co',
    port: 5432,
    user: 'postgres',
    password: 'Dsas2026!',
    database: 'postgres',
    ssl: { rejectUnauthorized: false }
});

console.log('Connecting to Postgres...');

(async () => {
    try {
        await client.connect();
        console.log('Connected!');
        const res = await client.query('SELECT count(*) FROM veicoli');
        console.log('Count:', res.rows[0].count);
        await client.end();
    } catch (err) {
        console.error('Connection error', err.message);
    }
})();
