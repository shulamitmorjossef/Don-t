import React, { useEffect, useState } from 'react';
import './reportedPatients.css'; // Make sure to create this CSS file for styling

function TherapistDashboard() {
  const [patients, setPatients] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetch('http://localhost:3000/reported-patients')
      .then(res => {
        if (!res.ok) throw new Error('Failed to fetch patients');
        return res.json();
      })
      .then(data => {
        setPatients(data);
        setLoading(false);
      })
      .catch(err => {
        setError(err.message);
        setLoading(false);
      });
  }, []);

  if (loading) return <div>טוען נתונים...</div>;
  if (error) return <div>שגיאה: {error}</div>;

return (
  <div style={{ maxWidth: 800, margin: 'auto', fontFamily: 'Arial, sans-serif' }}>
    <h1>דוחות מטופלים למטפל</h1>
    {patients.length === 0 ? (
      <p>אין מטופלים או דיווחים להצגה.</p>
    ) : (
      patients.map(patient => (
        <div key={patient.id} className="patient-card">
          <h2>{patient.name}</h2>
          {patient.reports.length === 0 ? (
            <p>אין דיווחים עבור מטופל זה.</p>
          ) : (
            <ul className="report-list">
              {patient.reports.map((report, idx) => (
                <li key={idx} className="report-item">
                  <div><strong>מועד דיווח:</strong> {new Date(report.created_at).toLocaleString()}</div>
                  <div><strong>מצב רוח:</strong> {report.mood}</div>
                  <div><strong>נטל תרופות:</strong> {report.took_meds ? 'כן' : 'לא'}</div>
                  <div><strong>סביבה בטוחה:</strong> {report.safe_env ? 'כן' : 'לא'}</div>
                  <div><strong>היו טריגרים:</strong> {report.had_triggers ? 'כן' : 'לא'}</div>
                  <div><strong>רגשות:</strong> {report.feelings?.join(', ')}</div>
                  <div><strong>טקסט חופשי:</strong> {report.text}</div>
                  <div><strong>שעות שינה:</strong> {report.sleep_hours}</div>
                  <div><strong>דופק:</strong> {report.pulse}</div>
                </li>
              ))}
            </ul>
          )}
        </div>
      ))
    )}
  </div>
);

}
export default TherapistDashboard;
