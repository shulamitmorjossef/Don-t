import pool from './db.js'; // דואג להתחברות ל-PostgreSQL

const createTherapistsTable = async () => {
  try {
    await pool.query(`
      CREATE TABLE IF NOT EXISTS therapists (
        id SERIAL PRIMARY KEY,
        name TEXT NOT NULL
      );
    `);
    console.log("✅ Table 'therapists' created or already exists.");
  } catch (err) {
    console.error("❌ Error creating therapists table:", err);
    throw err;
  }
};

const createPatientsTable = async () => {
  try {
    await pool.query(`
      CREATE TABLE IF NOT EXISTS patients (
        id SERIAL PRIMARY KEY,
        name TEXT NOT NULL,
        therapist_id INTEGER REFERENCES therapists(id) ON DELETE SET NULL,
        phone VARCHAR(20)
      );
    `);
    console.log("✅ Table 'patients' created or already exists.");
  } catch (err) {
    console.error("❌ Error creating patients table:", err);
    throw err;
  }
};

const seedData = async () => {
  try {
    // הוספת מטפל
    const result = await pool.query(
      `INSERT INTO therapists (name) VALUES ($1) RETURNING id`,
      ["ד\"ר ליאת ברקוביץ"]
    );
    const therapistId = result.rows[0].id;

    // הוספת מטופלים
    const patients = [
      ["עידו כהן", therapistId, "050-1234567"],
      ["נועה לוי", therapistId, "050-9876543"],
      ["אורי בן חיים", therapistId, "052-4567890"],
      ["שירה פרץ", therapistId, "054-1122334"]
    ];

    for (const [name, therapistId, phone] of patients) {
      await pool.query(
        `INSERT INTO patients (name, therapist_id, phone) VALUES ($1, $2, $3)`,
        [name, therapistId, phone]
      );
    }

    console.log("✅ Seed data inserted successfully.");
  } catch (err) {
    console.error("❌ Error inserting seed data:", err);
    throw err;
  }
};

const createDailyReportsTable = async () => {
  try {
    await pool.query(`
      CREATE TABLE IF NOT EXISTS daily_reports (
        id SERIAL PRIMARY KEY,
        patient_id INTEGER REFERENCES patients(id) ON DELETE CASCADE,
        mood INTEGER NOT NULL,
        took_meds BOOLEAN,
        safe_env BOOLEAN,
        had_triggers BOOLEAN,
        feelings TEXT[],
        text TEXT,
        sleep_hours REAL,
        pulse INTEGER,
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
      );
    `);
    console.log("✅ Table 'daily_reports' created or already exists.");
  } catch (err) {
    console.error("❌ Error creating 'daily_reports' table:", err);
    throw err;
  }
};

const initTherapyTables = async () => {
  try {
    await createDailyReportsTable();
    await createTherapistsTable();
    await createPatientsTable();
    await seedData();
    console.log("✅ Therapy tables initialized and seeded successfully.");
    process.exit(0);
  } catch (err) {
    console.error("❌ Error initializing therapy tables:", err);
    process.exit(1);
  }
};






initTherapyTables();
