import React from 'react';
import { useNavigate } from 'react-router-dom';
import './HomePage.css';

export default function HomePage() {
  const navigate = useNavigate();

  return (
    <div className="home-container">
      <div className="home-box">
        <h1>שלום לך, מה תרצה לעשות היום?</h1>
        <div className="buttons">
          <button className="daily" onClick={() => navigate('/daily-share')}>שיתוף יומיומי</button>
          <button className="crisis" onClick={() => navigate('/crisis-report')}>דיווח על משבר</button>
        </div>
      </div>
    </div>
  );
}
