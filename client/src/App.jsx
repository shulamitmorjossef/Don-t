import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import HomePage from './components/HomePage';
import DailyShare from './components/DailyShare';
import CrisisReport from './components/CrisisReport';
import Therapist from './components/therapistHome';
import ReportedPatients from './components/reportedPatients';
// import AddProgram from './components/addProgram';

export default function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/daily-share" element={<DailyShare />} />
        <Route path="/crisis-report" element={<CrisisReport />} />
        <Route path="/therapist" element={<Therapist />} />
        <Route path="/reportedPatients" element={<ReportedPatients />} />
        {/* <Route path="/addProgram" element={<AddProgram />} /> */}
      </Routes>
    </Router>
  );
}
