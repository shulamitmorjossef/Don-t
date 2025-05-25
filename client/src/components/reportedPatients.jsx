import React, { useEffect, useState } from "react";
import "./reportedPatients.css";

export default function ReportedPatients() {
  const [patients, setPatients] = useState([]);
  const [expandedPatientId, setExpandedPatientId] = useState(null);

useEffect(() => {
  const fetchPatients = async () => {
    try {
      const res = await fetch("http://localhost:3000/reports");
      const data = await res.json();
      setPatients(data);
    } catch (error) {
      console.error("❌ Failed to fetch patients:", error);
    }
  };

  fetchPatients();
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
