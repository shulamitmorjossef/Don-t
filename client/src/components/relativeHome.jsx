import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import "./relativeReports.css";

export default function RelativeReports() {
  const { relativeId } = useParams();
  const [patientName, setPatientName] = useState("");
  const [reports, setReports] = useState([]);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchReports = async () => {
      try {
        const res = await fetch(`http://localhost:3000/relative/${relativeId}/reports`);
        const data = await res.json();
        if (res.ok) {
          setPatientName(data.patient_name);
          setReports(data.reports);
        } else {
          setError(data.error || "שגיאה בטעינת הדיווחים");
        }
      } catch (err) {
        console.error("❌ Error fetching relative reports:", err);
        setError("שגיאה בחיבור לשרת");
      }
    };

    fetchReports();
  }, [relativeId]);

  return (
    <div className="relative-container">
      <div className="relative-box">
        <h2>דיווחים של {patientName}</h2>
        {error ? (
          <p className="error">{error}</p>
        ) : reports.length > 0 ? (
          <ul>
            {reports.map((report, idx) => (
              <li key={idx}>{report}</li>
            ))}
          </ul>
        ) : (
          <p className="no-reports">אין דיווחים</p>
        )}
      </div>
    </div>
  );
}
