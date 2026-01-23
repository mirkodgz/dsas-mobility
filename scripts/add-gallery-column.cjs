
const { Client } = require('pg');

// Using credentials from test-pg.cjs
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

        console.log('Adding gallery column...');
        await client.query(`
            ALTER TABLE veicoli 
            ADD COLUMN IF NOT EXISTS gallery text[] DEFAULT '{}';
        `);

        console.log('Column added successfully!');

        // Verify
        const res = await client.query(`
            SELECT column_name, data_type 
            FROM information_schema.columns 
            WHERE table_name = 'veicoli' AND column_name = 'gallery';
        `);

        console.log('Verification:', res.rows[0]);

        await client.end();
    } catch (err) {
        console.error('Migration error', err.message);
        process.exit(1);
    }
})();
