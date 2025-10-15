const express = require('express');
const { Pool } = require('pg');
const app = express();

// --- DATABASE CONNECTION ---
// This connects to Supabase using the secret URL you set in Render.
const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
  ssl: {
    rejectUnauthorized: false
  }
});

// --- API ENDPOINTS ---

// Root endpoint (for checking if the server is alive)
app.get('/', (req, res) => {
  res.send('Local Vibe API is alive!');
});

// NEW: Endpoint to get all workshops from the database
app.get('/api/workshops', async (req, res) => {
  try {
    const client = await pool.connect();
    const result = await client.query('SELECT * FROM workshops ORDER BY created_at DESC');
    res.json(result.rows); // Send workshop data back to the frontend
    client.release();
  } catch (err) {
    console.error('Error fetching workshops:', err);
    res.status(500).send('Error connecting to the database');
  }
});


// --- START THE SERVER ---
const PORT = process.env.PORT || 10000;
app.listen(PORT, () => {
  console.log(`Server is running and listening on port ${PORT}`);
});
