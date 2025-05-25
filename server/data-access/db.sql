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
