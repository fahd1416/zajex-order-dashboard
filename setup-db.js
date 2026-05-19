import pg from 'pg';
import readline from 'readline';

const { Client } = pg;

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

const setupDatabase = async (connectionString) => {
  const client = new Client({
    connectionString,
    ssl: { rejectUnauthorized: false }
  });

  try {
    console.log('Connecting to Supabase PostgreSQL database...');
    await client.connect();

    console.log('Creating "orders" table with all required columns...');
    const createTableQuery = `
      CREATE TABLE IF NOT EXISTS public.orders (
          id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
          created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
          order_date DATE,
          order_time TIME,
          order_id TEXT UNIQUE,
          store_name TEXT,
          shipping_from_url TEXT,
          shipping_to_url TEXT,
          order_status TEXT DEFAULT 'pending',
          shipment_status TEXT,
          shipment_weight NUMERIC,
          shipping_company_name TEXT,
          shipping_company_logo TEXT,
          customer_name TEXT,
          customer_phone TEXT,
          merchant_phone TEXT,
          order_value NUMERIC,
          cod_amount NUMERIC,
          shipping_cost NUMERIC,
          total_amount NUMERIC,
          payment_method TEXT,
          payment_status TEXT,
          amount_paid NUMERIC,
          amount_remaining NUMERIC
      );
    `;
    await client.query(createTableQuery);
    console.log('✅ Table "orders" created successfully.');

    console.log('Enabling Supabase Realtime for the "orders" table...');
    // We need to alter the publication for realtime
    const enableRealtimeQuery = `
      DO $$
      BEGIN
          IF NOT EXISTS (
              SELECT 1 FROM pg_publication_tables 
              WHERE pubname = 'supabase_realtime' AND tablename = 'orders'
          ) THEN
              ALTER PUBLICATION supabase_realtime ADD TABLE public.orders;
          END IF;
      END
      $$;
    `;
    await client.query(enableRealtimeQuery);
    console.log('✅ Realtime enabled successfully.');

    console.log('🎉 Database setup complete! You can now use the dashboard.');
  } catch (err) {
    console.error('❌ Error setting up the database:', err.message);
  } finally {
    await client.end();
  }
};

rl.question('Please paste your Supabase Database Connection URI (starts with postgresql://): ', (uri) => {
  if (!uri || !uri.startsWith('postgresql://')) {
    console.error('❌ Invalid URI provided.');
    rl.close();
    return;
  }
  setupDatabase(uri).then(() => rl.close());
});
