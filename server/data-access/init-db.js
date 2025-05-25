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

const createRelativesTable = async () => {
  try {
    await pool.query(`
      CREATE TABLE IF NOT EXISTS relatives (
        id SERIAL PRIMARY KEY,
        name TEXT NOT NULL,
        patient_id INTEGER REFERENCES patients(id) ON DELETE CASCADE
      );
    `);
    console.log("✅ Table 'relatives' created or already exists.");
  } catch (err) {
    console.error("❌ Error creating relatives table:", err);
    throw err;
  }
};

const seedData = async () => {
  try {
    // הוספת מטפל
    const result = await pool.query(
      `INSERT INTO therapists (name) VALUES ($1) RETURNING id`,
      ['ד"ר ליאת ברקוביץ']
    );
    const therapistId = result.rows[0].id;

    // הוספת מטופלים
    const patients = [
      ['עידו כהן', therapistId, '050-1234567'],
      ['נועה לוי', therapistId, '050-9876543'],
      ['אורי בן חיים', therapistId, '052-4567890'],
      ['שירה פרץ', therapistId, '054-1122334']
    ];

    const patientIds = [];

    for (const [name, therapistId, phone] of patients) {
      const res = await pool.query(
        `INSERT INTO patients (name, therapist_id, phone) VALUES ($1, $2, $3) RETURNING id`,
        [name, therapistId, phone]
      );
      patientIds.push({ name, id: res.rows[0].id });
    }

    // הוספת קרובי משפחה (נניח רק לאידו כהן ולשירה פרץ)
    const relatives = [
      ['יוסי כהן', patientIds.find(p => p.name === 'עידו כהן').id],
      ['דבורה פרץ', patientIds.find(p => p.name === 'שירה פרץ').id]
    ];

    for (const [name, patientId] of relatives) {
      await pool.query(
        `INSERT INTO relatives (name, patient_id) VALUES ($1, $2)`,
        [name, patientId]
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
    await createRelativesTable();
    await seedData();
    console.log("✅ All therapy tables initialized and seeded successfully.");
    process.exit(0);
  } catch (err) {
    console.error("❌ Error initializing therapy tables:", err);
    process.exit(1);
  }
};

<<<<<<< HEAD
=======





>>>>>>> 7cce84998f42f20a95bc24d3df21479acc3c3c55
initTherapyTables();
