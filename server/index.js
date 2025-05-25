import express from 'express';
import cors from 'cors';
import pool from './data-access/db.js';



const app = express();
const port = process.env.PORT || 3000;

app.use(cors());
app.use(express.json());
app.get('/reports-by-therapist/:therapistId', async (req, res) => {
  const { therapistId } = req.params;

  try {
    const result = await pool.query(`
      SELECT 
        r.id AS report_id,
        r.patient_id,
        p.name AS patient_name,
        r.mood,
        r.took_meds,
        r.safe_env,
        r.had_triggers,
        r.feelings,
        r.text,
        r.sleep_hours,
        r.pulse,
        r.created_at -- אם יש תאריך יצירה
      FROM daily_reports r
      JOIN patients p ON r.patient_id = p.id
      WHERE p.therapist_id = $1
      ORDER BY r.id DESC
    `, [therapistId]);

    res.json(result.rows);
  } catch (error) {
    console.error('❌ Error fetching full reports:', error);
    res.status(500).json({ error: 'Server error' });
  }
});

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

app.get("/reported-patients", async (req, res) => {
  try {
    const { rows } = await pool.query(`
      SELECT 
        p.id,
        p.name,
        COALESCE(json_agg(r.content) FILTER (WHERE r.content IS NOT NULL), '[]') AS reports
      FROM patients p
      LEFT JOIN reports r ON p.id = r.patient_id
      GROUP BY p.id, p.name
      ORDER BY p.id;
    `);
    res.json(rows);
  } catch (err) {
    console.error("❌ Failed to fetch reported patients:", err);
    res.status(500).json({ error: "Server error" });
  }
});

app.get("/relative/:relativeId/reports", async (req, res) => {
  const { relativeId } = req.params;
  try {
    const { rows } = await pool.query(`
      SELECT 
        p.name AS patient_name,
        COALESCE(json_agg(r.content) FILTER (WHERE r.content IS NOT NULL), '[]') AS reports
      FROM relatives rel
      JOIN patients p ON rel.patient_id = p.id
      LEFT JOIN reports r ON p.id = r.patient_id
      WHERE rel.id = $1
      GROUP BY p.name;
    `, [relativeId]);

    if (rows.length === 0) {
      return res.status(404).json({ error: "Relative not found or no reports available" });
    }

    res.json(rows[0]); // מחזיר את שם המטופל והדיווחים שלו
  } catch (err) {
    console.error("❌ Failed to fetch relative reports:", err);
    res.status(500).json({ error: "Server error" });
  }
});


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
