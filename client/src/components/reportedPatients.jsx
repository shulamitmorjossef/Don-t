// import React, { useEffect, useState } from 'react';
// import './reportedPatients.css'; // Make sure to create this CSS file for styling

// function TherapistDashboard() {
//   const [patients, setPatients] = useState([]);
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState(null);

//   useEffect(() => {
//     fetch('http://localhost:3000/reported-patients')
//       .then(res => {
//         if (!res.ok) throw new Error('Failed to fetch patients');
//         return res.json();
//       })
//       .then(data => {
//         setPatients(data);
//         setLoading(false);
//       })
//       .catch(err => {
//         setError(err.message);
//         setLoading(false);
//       });
//   }, []);

//   if (loading) return <div>טוען נתונים...</div>;
//   if (error) return <div>שגיאה: {error}</div>;

// return (
//   <div style={{ maxWidth: 800, margin: 'auto', fontFamily: 'Arial, sans-serif' }}>
//     <h1>דוחות מטופלים למטפל</h1>
//     {patients.length === 0 ? (
//       <p>אין מטופלים או דיווחים להצגה.</p>
//     ) : (
//       patients.map(patient => (
//         <div key={patient.id} className="patient-card">
//           <h2>{patient.name}</h2>
//           {patient.reports.length === 0 ? (
//             <p>אין דיווחים עבור מטופל זה.</p>
//           ) : (
//             <ul className="report-list">
//               {patient.reports.map((report, idx) => (
//                 <li key={idx} className="report-item">
//                   <div><strong>מועד דיווח:</strong> {new Date(report.created_at).toLocaleString()}</div>
//                   <div><strong>מצב רוח:</strong> {report.mood}</div>
//                   <div><strong>נטל תרופות:</strong> {report.took_meds ? 'כן' : 'לא'}</div>
//                   <div><strong>סביבה בטוחה:</strong> {report.safe_env ? 'כן' : 'לא'}</div>
//                   <div><strong>היו טריגרים:</strong> {report.had_triggers ? 'כן' : 'לא'}</div>
//                   <div><strong>רגשות:</strong> {report.feelings?.join(', ')}</div>
//                   <div><strong>טקסט חופשי:</strong> {report.text}</div>
//                   <div><strong>שעות שינה:</strong> {report.sleep_hours}</div>
//                   <div><strong>דופק:</strong> {report.pulse}</div>
//                 </li>
//               ))}
//             </ul>
//           )}
//         </div>
//       ))
//     )}
//   </div>
// );

// }
// export default TherapistDashboard;


// import React, { useEffect, useState } from 'react';
// import './therapistHome.css'; // או relativeHome.css אם יש לך

// export default function RelativeHome() {
//   const [reports, setReports] = useState([]);

//   useEffect(() => {
//     fetch('http://localhost:3000/reports-by-therapist/1')
//       .then((res) => res.json())
//       .then((data) => {
//         console.log('📦 data from server:', data);
//         setReports(data);
//       })
//       .catch((err) => {
//         console.error('❌ שגיאה בטעינת דוחות:', err);
//       });
//   }, []);

//   return (
//     <div className="home-container">
//       <div className="home-box">
//         <h1>📋 דוחות מטופלים</h1>

//         {reports.length === 0 ? (
//           <p>לא נמצאו דוחות להצגה.</p>
//         ) : (
//           reports.map((r) => (
//             <div key={r.id} className="report-card">
//               <p>👤 <strong>{r.patient_name}</strong></p>
//               <p>🧠 מצב רוח: <strong>{r.mood}/10</strong></p>
//               <p>💊 תרופות: {r.took_meds ? '✅ כן' : '❌ לא'}</p>
//               <p>🏠 סביבה בטוחה: {r.safe_env ? '✅ כן' : '❌ לא'}</p>
//               <p>🎯 טריגרים: {r.had_triggers ? '🟠 כן' : '⚪ לא'}</p>
//               {r.feelings && <p>😶 רגשות שעלו: {r.feelings}</p>}
//               {r.text && <p>📝 שיתוף חופשי: {r.text}</p>}
//               <p>🛌 שינה: {r.sleep_hours} שעות</p>
//               <p>❤️ דופק: {r.pulse}</p>
//               <hr />
//             </div>
//           ))
//         )}
//       </div>
//     </div>
//   );
// }


import React, { useEffect, useState } from 'react';
import './therapistHome.css';

export default function TherapistHome() {
  const [patients, setPatients] = useState([]);
  const [selectedPatient, setSelectedPatient] = useState(null);
  const [reports, setReports] = useState([]);
  const [loadingReports, setLoadingReports] = useState(false);

  useEffect(() => {
    // טוען את רשימת המטופלים של המטפל (לדוגמה: מטפל ID 1)
    fetch('http://localhost:3000/therapist-patients/1')
      .then(res => res.json())
      .then(data => setPatients(data))
      .catch(err => console.error('❌ שגיאה בטעינת מטופלים:', err));
  }, []);

  const fetchReports = (patient) => {
    setSelectedPatient(patient);
    setReports([]);
    setLoadingReports(true);
    fetch(`http://localhost:3000/reports-by-patient/${patient.id}`)
      .then(res => res.json())
      .then(data => {
        setReports(data);
        setLoadingReports(false);
      })
      .catch(err => {
        console.error('❌ שגיאה בטעינת דוחות:', err);
        setLoadingReports(false);
      });
  };

  return (
    <div className="home-container">
      <div className="home-box">
        <h1>👨‍⚕️ מטופלים</h1>

        {patients.length === 0 ? (
          <p>לא נמצאו מטופלים</p>
        ) : (
          <ul className="patient-list">
            {patients.map((p) => (
              <li key={p.id}>
                <button className="patient-button" onClick={() => fetchReports(p)}>
                  👤 {p.name}
                </button>
              </li>
            ))}
          </ul>
        )}

        {selectedPatient && (
          <div className="report-section">
            <h2>📋 דוחות עבור {selectedPatient.name}</h2>
            {loadingReports ? (
              <p>טוען דוחות...</p>
            ) : reports.length === 0 ? (
              <p>אין דוחות להצגה.</p>
            ) : (
              reports.map((r) => (
                <div key={r.id} className="report-card">
                  <p>🧠 מצב רוח: <strong>{r.mood}/10</strong></p>
                  <p>💊 תרופות: {r.took_meds ? '✅ כן' : '❌ לא'}</p>
                  <p>🏠 סביבה בטוחה: {r.safe_env ? '✅ כן' : '❌ לא'}</p>
                  <p>🎯 טריגרים: {r.had_triggers ? '🟠 כן' : '⚪ לא'}</p>
                  {r.feelings && <p>😶 רגשות: {r.feelings}</p>}
                  {r.text && <p>📝 טקסט: {r.text}</p>}
                  <p>🛌 שינה: {r.sleep_hours} שעות</p>
                  <p>❤️ דופק: {r.pulse}</p>
                  <p>🕒 תאריך: {new Date(r.created_at).toLocaleString()}</p>
                  <hr />
                </div>
              ))
            )}
          </div>
        )}
      </div>
    </div>
  );
}
