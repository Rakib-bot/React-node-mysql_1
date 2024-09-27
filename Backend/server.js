const express = require('express');
const mysql = require('mysql2');
const cors = require('cors');
require('dotenv').config();

const app = express();
const port = process.env.PORT || 5000;


app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors({
    origin: 'http://localhost:5173'  // Frontend origin
  }));


const db = mysql.createConnection({
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME,
});

db.connect((err) => {
    if (err) {
        console.error('Error connecting to MySQL database:', err);
        return;
    }
    console.log('Connected to MySQL database');
});


app.get('/', (req, res) => {
    const query = 'SELECT name,cgpa,versity FROM user order by cgpa desc';
    db.query(query, (err, result) => {
        if (err) {
            console.error('Error executing MySQL query:', err);
            res.status(500).json({ error: 'Internal server error' });
            return;
        }
       return res.json(result)
    })
    
    
}
)
app.post('/insert',(req,res)=>{
    console.log(req.body)
    const {name,versity,cgpa} = req.body;
    const query = 'INSERT INTO user (name,versity,cgpa) VALUES (?,?,?)';
    db.query(query,[name, versity, cgpa],(err,result)=>{
        if (err) {
            console.error('Error inserting data:', err);
            res.status(500).json({ error: 'An error occurred while inserting data' });
            return;
          }
          res.json({ message: 'Data inserted successfully' });
    })


})

app.listen(port, () => {
    console.log(`Server running on port ${port}`);
});