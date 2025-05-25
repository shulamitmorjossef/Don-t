-- טבלת מטפלים
CREATE TABLE therapists (
    id INT PRIMARY KEY AUTO_INCREMENT,
    name VARCHAR(100) NOT NULL
);

-- טבלת מטופלים
CREATE TABLE patients (
    id INT PRIMARY KEY AUTO_INCREMENT,
    name VARCHAR(100) NOT NULL,
    therapist_id INT NOT NULL,
    phone VARCHAR(20),
    FOREIGN KEY (therapist_id) REFERENCES therapists(id)
);

CREATE TABLE IF NOT EXISTS relatives (
  id SERIAL PRIMARY KEY,
  name TEXT NOT NULL,
  patient_id INTEGER REFERENCES patients(id) ON DELETE CASCADE
);