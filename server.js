const express = require('express');
    const mysql = require('mysql2');
    const cors = require('cors');
    const multer = require('multer');
    const path = require('path');

    const app = express();
    const port = process.env.PORT || 3001;

    // Database configuration
    const db = mysql.createConnection({
      host: 'localhost',
      user: 'your_username',
      password: 'your_password',
      database: 'your_database_name',
    });

    // Connect to the database
    db.connect((err) => {
      if (err) {
        console.error('Error connecting to database:', err);
      } else {
        console.log('Connected to database!');
      }
    });

    // Enable CORS
    app.use(cors());

    // Set up multer for image uploads
    const storage = multer.diskStorage({
      destination: (req, file, cb) => {
        cb(null, 'uploads/');
      },
      filename: (req, file, cb) => {
        cb(null, Date.now() + path.extname(file.originalname));
      },
    });

    const upload = multer({ storage: storage });

    // Create a table for diary entries if it doesn't exist
    db.query(
      'CREATE TABLE IF NOT EXISTS entries (id INT AUTO_INCREMENT PRIMARY KEY, text TEXT, mood VARCHAR(255), image VARCHAR(255), date DATE, time TIME)',
      (err) => {
        if (err) {
          console.error('Error creating table:', err);
        } else {
          console.log('Table created successfully!');
        }
      }
    );

    // API endpoint to save diary entries
    app.post('/api/entries', upload.single('image'), (req, res) => {
      const { text, mood } = req.body;
      const image = req.file ? req.file.filename : null;
      const date = new Date();
      const formattedDate = date.toISOString().slice(0, 10);
      const formattedTime = date.toLocaleTimeString();

      const sql = 'INSERT INTO entries (text, mood, image, date, time) VALUES (?, ?, ?, ?, ?)';
      const values = [text, mood, image, formattedDate, formattedTime];

      db.query(sql, values, (err, result) => {
        if (err) {
          console.error('Error saving entry:', err);
          res.status(500).send('Error saving entry');
        } else {
          console.log('Entry saved successfully!');
          res.status(200).send({ id: result.insertId });
        }
      });
    });

    // API endpoint to get all diary entries
    app.get('/api/entries', (req, res) => {
      const sql = 'SELECT * FROM entries';

      db.query(sql, (err, results) => {
        if (err) {
          console.error('Error fetching entries:', err);
          res.status(500).send('Error fetching entries');
        } else {
          res.status(200).json(results);
        }
      });
    });

    // Serve static files (images)
    app.use('/uploads', express.static('uploads'));

    // Start the server
    app.listen(port, () => {
      console.log(`Server listening on port ${port}`);
    });
