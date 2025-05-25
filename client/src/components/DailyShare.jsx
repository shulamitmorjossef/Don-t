import React, { useState } from 'react';
import './DailyShare.css';
import { useNavigate } from 'react-router-dom';
import {
  LineChart, Line, XAxis, YAxis, CartesianGrid,
  Tooltip, ResponsiveContainer, BarChart, Bar, Legend
} from 'recharts';

export default function DailyShare() {
  const navigate = useNavigate();
  const [mood, setMood] = useState(5);
  const [tookMeds, setTookMeds] = useState(null);
  const [safeEnv, setSafeEnv] = useState(null);
  const [feelings, setFeelings] = useState([]);
  const [talkedTo, setTalkedTo] = useState('');
  const [text, setText] = useState('');

  // Fake data from smartwatch
  const simulatedSleepHours = 6.5;
  const simulatedPulse = 76;

  const sleepData = [
    { day: 'א', hours: 5 },
    { day: 'ב', hours: 6 },
    { day: 'ג', hours: 6.5 },
    { day: 'ד', hours: 7 },
    { day: 'ה', hours: 5.5 },
    { day: 'ו', hours: 6 },
    { day: 'ש', hours: 7.2 }
  ];

  const pulseData = [
    { day: 'א', pulse: 78 },
    { day: 'ב', pulse: 80 },
    { day: 'ג', pulse: 75 },
    { day: 'ד', pulse: 77 },
    { day: 'ה', pulse: 76 },
    { day: 'ו', pulse: 79 },
    { day: 'ש', pulse: 74 }
  ];

  const toggleFeeling = (feeling) => {
    setFeelings((prev) =>
      prev.includes(feeling) ? prev.filter((f) => f !== feeling) : [...prev, feeling]
    );
  };

  const handleSubmit = () => {
    console.log({
      mood,
      tookMeds,
      safeEnv,
      feelings,
      talkedTo,
      text,
      sleepHours: simulatedSleepHours,
      pulse: simulatedPulse
    });
    alert('💚 השיתוף נשלח בהצלחה');
  };

  return (
    <div className="daily-container">
      <div className="daily-box">
        <h2>📝 שיתוף יומי</h2>

        <div className="question">
          <p>💊 האם לקחת את התרופות שלך היום?</p>
          <div className="options">
            <button className={tookMeds === true ? 'selected' : ''} onClick={() => setTookMeds(true)}>✅ כן</button>
            <button className={tookMeds === false ? 'selected' : ''} onClick={() => setTookMeds(false)}>❌ לא</button>
          </div>
        </div>

        <div className="question">
          <p>🏠 האם אתה בסביבה בטוחה?</p>
          <div className="options">
            <button className={safeEnv === true ? 'selected' : ''} onClick={() => setSafeEnv(true)}>✅ כן</button>
            <button className={safeEnv === false ? 'selected' : ''} onClick={() => setSafeEnv(false)}>❌ לא</button>
          </div>
        </div>

        <div className="question">
          <p>מצב רוח ({mood}/10)</p>
          <input type="range" min="1" max="10" value={mood} onChange={(e) => setMood(e.target.value)} />
          <div className="range-labels">
            <span>😢 גרוע</span>
            <span>😐 בינוני</span>
            <span>😄 טוב</span>
          </div>
        </div>

        <div className="question">
          <p>מה הרגשות שעלו בי היום?</p>
          <div className="feelings">
            {['בדידות', 'תקווה', 'עצב', 'שמחה', 'עייפות', 'פחד', 'חמלה', 'גאווה'].map((f) => (
              <button
                key={f}
                onClick={() => toggleFeeling(f)}
                className={feelings.includes(f) ? 'selected' : ''}
              >
                {f}
              </button>
            ))}
          </div>
        </div>

        <div className="question">
          <p>האם דיברת עם מישהו שתומך בך?</p>
          <div className="options">
            {['משפחה', 'מטפל', 'חבר/ה', 'עדיין לא'].map((o) => (
              <button
                key={o}
                className={talkedTo === o ? 'selected' : ''}
                onClick={() => setTalkedTo(o)}
              >
                {o}
              </button>
            ))}
          </div>
        </div>

        <div className="question">
          <p>מה תרצה לשתף היום?</p>
          <textarea
            rows="4"
            value={text}
            onChange={(e) => setText(e.target.value)}
            placeholder="כתוב כאן בחופשיות..."
          ></textarea>
        </div>

        <div className="question">
          <p>🛌 שעות שינה (מהשעון החכם): <strong>{simulatedSleepHours}</strong> שעות</p>
        </div>

        <div className="question">
          <p>❤️ דופק ממוצע היום: <strong>{simulatedPulse}</strong> פעימות לדקה</p>
        </div>

        {/* גרפים */}
        <h3 style={{ textAlign: 'center', marginTop: '30px' }}>📊 נתונים מהשעון החכם</h3>

        <div style={{ width: '100%', height: 300 }}>
          <h4 style={{ textAlign: 'center' }}>שעות שינה</h4>
          <ResponsiveContainer width="100%" height={200}>
            <BarChart data={sleepData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="day" />
              <YAxis />
              <Tooltip />
              <Legend />
              <Bar dataKey="hours" fill="#81c784" />
            </BarChart>
          </ResponsiveContainer>
        </div>

        <div style={{ width: '100%', height: 300, marginTop: '30px' }}>
          <h4 style={{ textAlign: 'center' }}>דופק ממוצע</h4>
          <ResponsiveContainer width="100%" height={200}>
            <LineChart data={pulseData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="day" />
              <YAxis />
              <Tooltip />
              <Legend />
              <Line type="monotone" dataKey="pulse" stroke="#64b5f6" />
            </LineChart>
          </ResponsiveContainer>
        </div>

        {/* כפתורים בסוף! */}
        <div className="buttons-row">
          <button onClick={handleSubmit}>📤 שלח שיתוף</button>
          <button onClick={() => navigate('/')}>⬅ חזרה</button>
        </div>
      </div>
    </div>
  );
}
