const { Client } = require('pg');

const connectionString = 'postgres://postgres.mlhhezsstlceqcxqcznj:nrBEHQdpHA18goBs@aws-1-ap-south-1.pooler.supabase.com:6543/postgres?sslmode=require&pgbouncer=true';

const client = new Client({ connectionString, ssl: { rejectUnauthorized: false } });

async function run() {
  try {
    await client.connect();
    console.log('Connected to database');
    
    // Create Select policy
    await client.query(`
      CREATE POLICY "Public Access" 
      ON storage.objects FOR SELECT 
      USING (bucket_id = 'images');
    `).catch(e => console.log('Select policy might already exist:', e.message));
    
    // Create Insert policy
    await client.query(`
      CREATE POLICY "Public Upload" 
      ON storage.objects FOR INSERT 
      WITH CHECK (bucket_id = 'images');
    `).catch(e => console.log('Insert policy might already exist:', e.message));

    // Create Update policy
    await client.query(`
      CREATE POLICY "Public Update" 
      ON storage.objects FOR UPDATE 
      USING (bucket_id = 'images');
    `).catch(e => console.log('Update policy might already exist:', e.message));

    // Create Delete policy
    await client.query(`
      CREATE POLICY "Public Delete" 
      ON storage.objects FOR DELETE 
      USING (bucket_id = 'images');
    `).catch(e => console.log('Delete policy might already exist:', e.message));

    console.log('Policies configured successfully');
  } catch (err) {
    console.error('Error:', err.message);
  } finally {
    await client.end();
  }
}

run();
