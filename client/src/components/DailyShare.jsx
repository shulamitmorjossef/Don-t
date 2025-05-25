// import React, { useState } from 'react';
// import './DailyShare.css';
// import { useNavigate } from 'react-router-dom';

// export default function DailyShare() {
//   const navigate = useNavigate();
//   const [mood, setMood] = useState(5);
//   const [tookMeds, setTookMeds] = useState(null);
//   const [safeEnv, setSafeEnv] = useState(null);
//   const [hadTriggers, setHadTriggers] = useState(null);
//   const [feelings, setFeelings] = useState([]);
//   const [text, setText] = useState('');

//   const simulatedSleepHours = 6.5;
//   const simulatedPulse = 76;

//   const toggleFeeling = (feeling) => {
//     setFeelings((prev) =>
//       prev.includes(feeling) ? prev.filter((f) => f !== feeling) : [...prev, feeling]
//     );
//   };

//   const handleSubmit = () => {
//     alert('💚 השיתוף נשלח בהצלחה');
//   };

//   const calculateBodyStatusPercent = () => {
//     const sleepScore = Math.min((simulatedSleepHours / 10) * 100, 100);
//     const pulseScore = (simulatedPulse >= 60 && simulatedPulse <= 90) ? 100 : 50;
//     return Math.round((sleepScore + pulseScore) / 2);
//   };

//   const getBodyStatusLabel = () => {
//     const avg = calculateBodyStatusPercent();
//     if (avg >= 80) return 'מעולה 😊';
//     if (avg >= 60) return 'טוב 🙂';
//     if (avg >= 40) return 'בינוני 😐';
//     return 'טעון שיפור 😟';
//   };

//   return (
//     <div className="daily-container">
//       <div className="daily-box">
//         <h2>📝 שיתוף יומי</h2>

//         {/* מצב רוח ראשון */}
//         <div className="question">
//           <p>מצב רוח ({mood}/10)</p>
//           <input type="range" min="1" max="10" value={mood} onChange={(e) => setMood(e.target.value)} />
//           <div className="range-labels">
//             <span>😢 גרוע</span>
//             <span>😐 בינוני</span>
//             <span>😄 טוב</span>
//           </div>
//         </div>

   
//         <div className="dual-questions">
//           <div className="question">
//             <p>💊 האם לקחת את התרופות שלך?</p>
//             <div className="options">
//               <button className={tookMeds === true ? 'selected' : ''} onClick={() => setTookMeds(true)}>✅ כן</button>
//               <button className={tookMeds === false ? 'selected' : ''} onClick={() => setTookMeds(false)}>❌ לא</button>
//             </div>
//           </div>

//           <div className="question">
//             <p>🏠 האם אתה בסביבה בטוחה?</p>
//             <div className="options">
//               <button className={safeEnv === true ? 'selected' : ''} onClick={() => setSafeEnv(true)}>✅ כן</button>
//               <button className={safeEnv === false ? 'selected' : ''} onClick={() => setSafeEnv(false)}>❌ לא</button>
//             </div>
//           </div>
//         </div>

//         <div className="question">
//           <p>האם היו לך טריגרים רגשיים היום?</p>
//           <div className="options">
//             <button className={hadTriggers === true ? 'selected' : ''} onClick={() => setHadTriggers(true)}>✅ כן</button>
//             <button className={hadTriggers === false ? 'selected' : ''} onClick={() => setHadTriggers(false)}>❌ לא</button>
//           </div>
//         </div>

//         {hadTriggers === true && (
//           <div className="question">
//             <p>מה היו הטריגרים או התחושות שעלו?</p>
//             <div className="feelings">
//               {['בדידות', 'תקווה', 'עצב', 'שמחה', 'עייפות', 'פחד', 'חמלה', 'גאווה'].map((f) => (
//                 <button
//                   key={f}
//                   onClick={() => toggleFeeling(f)}
//                   className={feelings.includes(f) ? 'selected' : ''}
//                 >
//                   {f}
//                 </button>
//               ))}
//             </div>
//           </div>
//         )}

//         <div className="question">
//           <p>מה תרצה לשתף היום?</p>
//           <textarea
//             rows="4"
//             value={text}
//             onChange={(e) => setText(e.target.value)}
//             placeholder="כתוב כאן בחופשיות..."
//           ></textarea>
//         </div>

//         <div className="question">
//           <p>🩺 מצב גופני לפי נתוני שעון חכם</p>
//           <div className="meter">
//             <div className="fill overall" style={{ width: `${calculateBodyStatusPercent()}%` }}></div>
//           </div>
//           <p>מצב כללי: <strong>{getBodyStatusLabel()}</strong></p>
//         </div>

//         <div className="buttons-row">
//           <button onClick={handleSubmit}>📤 שלח שיתוף</button>
//           <button onClick={() => navigate('/')}>⬅ חזרה</button>
//         </div>
//       </div>
//     </div>
//   );
// }




import React, { useState } from 'react';
import './DailyShare.css';
import { useNavigate } from 'react-router-dom';

export default function DailyShare() {
  const navigate = useNavigate();
  const [mood, setMood] = useState(5);
  const [tookMeds, setTookMeds] = useState(null);
  const [safeEnv, setSafeEnv] = useState(null);
  const [hadTriggers, setHadTriggers] = useState(null);
  const [feelings, setFeelings] = useState([]);
  const [text, setText] = useState('');

  const simulatedSleepHours = 6.5;
  const simulatedPulse = 76;

  const toggleFeeling = (feeling) => {
    setFeelings((prev) =>
      prev.includes(feeling) ? prev.filter((f) => f !== feeling) : [...prev, feeling]
    );
  };

  const calculateBodyStatusPercent = () => {
    const sleepScore = Math.min((simulatedSleepHours / 10) * 100, 100);
    const pulseScore = (simulatedPulse >= 60 && simulatedPulse <= 90) ? 100 : 50;
    return Math.round((sleepScore + pulseScore) / 2);
  };

  const getBodyStatusLabel = () => {
    const avg = calculateBodyStatusPercent();
    if (avg >= 80) return 'מעולה 😊';
    if (avg >= 60) return 'טוב 🙂';
    if (avg >= 40) return 'בינוני 😐';
    return 'טעון שיפור 😟';
  };

  const handleSubmit = async () => {
    const payload = {
      patient_id: 1, 
      mood: Number(mood),
      took_meds: tookMeds,
      safe_env: safeEnv,
      had_triggers: hadTriggers,
      feelings: feelings,
      text: text,
      sleep_hours: simulatedSleepHours,
      pulse: simulatedPulse
    };
  
    try {
      const response = await fetch('http://localhost:3000/submit-report', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload)
      });
  
      if (response.ok) {
        alert('💚 השיתוף נשלח ונשמר בהצלחה');
      } else {
        alert('❌ אירעה שגיאה בעת שליחת הדיווח לשרת');
      }
    } catch (error) {
      console.error('Network error:', error);
      alert('🚫 לא הצלחנו לשלוח את הדיווח. בדקי חיבור לשרת.');
    }
  };
  

  return (
    <div className="daily-container">
      <div className="daily-box">
        <h2>📝 שיתוף יומי</h2>

        <div className="question">
          <p>מצב רוח ({mood}/10)</p>
          <input type="range" min="1" max="10" value={mood} onChange={(e) => setMood(e.target.value)} />
          <div className="range-labels">
            <span>😢 גרוע</span>
            <span>😐 בינוני</span>
            <span>😄 טוב</span>
          </div>
        </div>

        <div className="dual-questions">
          <div className="question">
            <p>💊 האם לקחת את התרופות שלך?</p>
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
        </div>

        <div className="question">
          <p>האם היו לך טריגרים רגשיים היום?</p>
          <div className="options">
            <button className={hadTriggers === true ? 'selected' : ''} onClick={() => setHadTriggers(true)}>✅ כן</button>
            <button className={hadTriggers === false ? 'selected' : ''} onClick={() => setHadTriggers(false)}>❌ לא</button>
          </div>
        </div>

        {hadTriggers === true && (
          <div className="question">
            <p>מה היו הטריגרים או התחושות שעלו?</p>
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
        )}

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
          <p>🩺 מצב גופני לפי נתוני שעון חכם</p>
          <div className="meter">
            <div className="fill overall" style={{ width: `${calculateBodyStatusPercent()}%` }}></div>
          </div>
          <p>מצב כללי: <strong>{getBodyStatusLabel()}</strong></p>
        </div>

        <div className="buttons-row">
          <button onClick={handleSubmit}>📤 שלח שיתוף</button>
          <button onClick={() => navigate('/')}>⬅ חזרה</button>
        </div>
      </div>
    </div>
  );
}
