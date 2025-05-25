import React, { useEffect, useState } from 'react';
import './therapistHome.css'; // או relativeHome.css אם יש לך

export default function RelativeHome() {
  const [reports, setReports] = useState([]);

  useEffect(() => {
    fetch('http://localhost:3000/reports-by-therapist/1')
      .then((res) => res.json())
      .then((data) => {
        console.log('📦 data from server:', data);
        setReports(data);
      })
      .catch((err) => {
        console.error('❌ שגיאה בטעינת דוחות:', err);
      });
  }, []);

  return (
    <div className="home-container">
      <div className="home-box">
        <h1>📋 דוחות קרובי משפחה</h1>

        {reports.length === 0 ? (
          <p>לא נמצאו דוחות להצגה.</p>
        ) : (
          reports.map((r) => (
            <div key={r.id} className="report-card">
              <p>👤 <strong>{r.patient_name}</strong></p>
              <p>🧠 מצב רוח: <strong>{r.mood}/10</strong></p>
              <p>💊 תרופות: {r.took_meds ? '✅ כן' : '❌ לא'}</p>
              <p>🏠 סביבה בטוחה: {r.safe_env ? '✅ כן' : '❌ לא'}</p>
              <p>🎯 טריגרים: {r.had_triggers ? '🟠 כן' : '⚪ לא'}</p>
              {r.feelings && <p>😶 רגשות שעלו: {r.feelings}</p>}
              {r.text && <p>📝 שיתוף חופשי: {r.text}</p>}
              <p>🛌 שינה: {r.sleep_hours} שעות</p>
              <p>❤️ דופק: {r.pulse}</p>
              <hr />
            </div>
          ))
        )}
      </div>
    </div>
  );
}
