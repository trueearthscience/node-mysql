const express = require('express');
const mysql = require('mysql');
const cors = require('cors');
const app = express();
const port = 3000;

app.use(cors()); // Enable CORS for all routes

// MySQL connection setup
const connection = mysql.createConnection({
  host: 'localhost', 
  port: '3306',
  user: 'root',
  password: '',
  database: 'supplychaintrace_koltitrace_apr_24'
});

connection.connect(err => {
  if (err) {
    console.error('Error connecting to MySQL:', err);
    return;
  }
  console.log('Connected to MySQL');
});

// Route to get data from MySQL
app.get('/data', (req, res) => {
  const query = 'SELECT * FROM gis_maa_filter'; // Adjust the query as needed
  connection.query(query, (err, results) => {
    if (err) {
      res.status(500).json({ error: err });
    } else {
      res.json(results);
    }
  });
});

app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
