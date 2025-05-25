import React, { useEffect, useState } from "react";
import "./reportedPatients.css";

export default function ReportedPatients() {
  const [patients, setPatients] = useState([]);
  const [expandedPatientId, setExpandedPatientId] = useState(null);

  useEffect(() => {
    const mockPatients = [
      {
        id: 1,
        name: "דניאל כהן",
        reports: ["הרגשתי עצב הבוקר", "עבר עליי יום קשה", "הייתה לי שיחה טובה עם חברה"],
      },
      {
        id: 2,
        name: "נועה לוי",
        reports: ["שבוע חיובי", "הצלחתי להתמודד עם לחץ"],
      },
      {
        id: 3,
        name: "אורי בן דוד",
        reports: ["לא ישנתי טוב", "הייתי עצבני בצהריים"],
      },
      {
        id: 4,
        name: "ליאן מזרחי",
        reports: ["הרגשתי שמחה כשיצאתי לריצה"],
      },
      {
        id: 5,
        name: "תומר רז",
        reports: [],
      },
    ];
    setPatients(mockPatients);
  }, []);

  const togglePatient = (id) => {
    setExpandedPatientId((prevId) => (prevId === id ? null : id));
  };

  return (
    <div className="therapist-container">
      <div className="therapist-box">
        <h2>מטופלים שדיווחו</h2>
        <div className="patients-list">
          {patients.map((patient) => (
            <div
              className="patient-card"
              key={patient.id}
              onClick={() => togglePatient(patient.id)}
            >
              <h3>{patient.name}</h3>
              {expandedPatientId === patient.id && (
                <>
                  {patient.reports.length > 0 ? (
                    <ul>
                      {patient.reports.map((report, idx) => (
                        <li key={idx}>{report}</li>
                      ))}
                    </ul>
                  ) : (
                    <p className="no-reports">אין דיווחים</p>
                  )}
                </>
              )}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
