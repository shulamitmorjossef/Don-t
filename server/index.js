import express from 'express';
import cors from 'cors';
import pool from './data-access/db.js';



const app = express();
const port = process.env.PORT || 3000;

app.use(cors());
app.use(express.json());
app.get('/reports', async (req, res) => {
  try {
    const result = await pool.query(`
      SELECT 
        dr.*,
        p.name AS patient_name
      FROM daily_reports dr
      LEFT JOIN patients p ON dr.patient_id = p.id
      ORDER BY dr.id DESC
    `);
    res.json(result.rows);
  } catch (error) {
    console.error('Error fetching reports:', error);
    res.status(500).json({ error: 'Failed to fetch reports' });
  }
});

app.get('/api/hello', (req, res) => {
  res.json({ message: 'Hello from server using import!' });
});
app.post('/submit-report', async (req, res) => {
  const {
    patient_id,
    mood,
    took_meds,
    safe_env,
    had_triggers,
    feelings,
    text,
    sleep_hours,
    pulse
  } = req.body;

  try {
    await pool.query(
      `INSERT INTO daily_reports 
      (patient_id, mood, took_meds, safe_env, had_triggers, feelings, text, sleep_hours, pulse)
      VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9)`,
      [patient_id, mood, took_meds, safe_env, had_triggers, feelings, text, sleep_hours, pulse]
    );
    res.status(201).json({ message: 'Report saved successfully!' });
  } catch (error) {
    console.error('Error inserting report:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
