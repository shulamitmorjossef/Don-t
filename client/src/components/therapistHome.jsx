import React from 'react';
import './therapistHome.css';
import { useNavigate } from 'react-router-dom';

const TherapistDashboard = () => {
  const navigate = useNavigate();

  const handleAddProgram = () => {
    navigate('/addProgram');
  };

  const handleReportedPatients = () => {
    navigate('/reportedPatients');
  };

  return (
    <div className="daily-container">
      <div className="daily-box">
        <h2>שלום לך מטפל/ת!</h2>
        <div className="buttons-row">
          <button onClick={handleAddProgram}>הוספת תוכנית ליווי</button>
          <button onClick={handleReportedPatients}>מטופלים מדווחים</button>
        </div>
      </div>
    </div>
  );
};

export default TherapistDashboard;
