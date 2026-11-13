const express = require('express');
const { Pool } = require('pg');

const app = express();
const pool = new Pool({ connectionString: process.env.DATABASE_URL });

app.get('/health', async (req, res) => {
  try {
    const r = await pool.query('SELECT NOW()');
    res.json({
      status: 'ok',
      dbTime: r.rows[0].now,
      color: process.env.DEPLOY_COLOR || 'none',
      version: process.env.APP_VERSION || 'dev'
    });
  } catch (e) {
    res.status(500).json({ status: 'error', message: e.message });
  }
});

app.listen(process.env.PORT || 4000, () => console.log('API running'));
