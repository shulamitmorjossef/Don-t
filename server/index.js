import express from 'express';
import cors from 'cors';
import pool from './data-access/db.js';



const app = express();
const port = process.env.PORT || 3000;

app.use(cors());
app.use(express.json());

app.get('/api/hello', (req, res) => {
  res.json({ message: 'Hello from server using import!' });
});

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
