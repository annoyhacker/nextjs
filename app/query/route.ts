import postgres from 'postgres';

// Initialize the PostgreSQL client
const sql = postgres(process.env.POSTGRES_URL!, { ssl: 'require' });

// Function to fetch invoices from the database
async function listInvoices() {
  const data = await sql`
        SELECT invoices.amount, customers.name
        FROM invoices
        JOIN customers ON invoices.customer_id = customers.id
        WHERE invoices.amount = 666;
    `;

  return data;
}

// GET endpoint to fetch invoices
export async function GET() {
  try {
    const invoices = await listInvoices();
    return Response.json(invoices);
  } catch (error) {
    console.error('Error fetching invoices:', error);
    return Response.json(
      { error: 'Internal Server Error' },
      { status: 500 }
    );
  }
}