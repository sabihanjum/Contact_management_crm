const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const mysql = require('mysql2');

const app = express();
app.use(cors());
app.use(bodyParser.json());

const db = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: 'Root',
    database: 'contacts_db',
});

db.connect((err) => {
    if (err) {
        console.error('Database connection failed:', err.stack);
        return;
    }
    console.log('Connected to database.');
});

// Prevent duplicate entries
app.post('/contacts', (req, res) => {
    const { firstName, lastName, email, phone, company, jobTitle } = req.body;
    db.query('SELECT * FROM contacts WHERE email = ? OR phone = ?', [email, phone], (err, results) => {
        if (err) return res.status(500).send(err);
        if (results.length > 0) {
            return res.status(400).send({ message: 'Duplicate contact found!' });
        }
        db.query('INSERT INTO contacts (firstName, lastName, email, phone, company, jobTitle) VALUES (?, ?, ?, ?, ?, ?)', [firstName, lastName, email, phone, company, jobTitle], (err) => {
            if (err) return res.status(500).send(err);
            res.send({ message: 'Contact added successfully!' });
        });
    });
});

// Handle updating contacts
app.put('/contacts/:id', (req, res) => {
    const { id } = req.params;
    const { firstName, lastName, email, phone, company, jobTitle } = req.body;
    db.query('SELECT * FROM contacts WHERE (email = ? OR phone = ?) AND id != ?', [email, phone, id], (err, results) => {
        if (err) return res.status(500).send(err);
        if (results.length > 0) {
            return res.status(400).send({ message: 'Duplicate contact found!' });
        }
        db.query('UPDATE contacts SET firstName=?, lastName=?, email=?, phone=?, company=?, jobTitle=? WHERE id=?', [firstName, lastName, email, phone, company, jobTitle, id], (err) => {
            if (err) return res.status(500).send(err);
            res.send({ message: 'Contact updated successfully!' });
        });
    });
});

// Other routes remain unchanged
app.get('/contacts', (req, res) => {
    db.query('SELECT * FROM contacts', (err, results) => {
        if (err) return res.status(500).send(err);
        res.send(results);
    });
});

app.delete('/contacts/:id', (req, res) => {
    const { id } = req.params;
    db.query('DELETE FROM contacts WHERE id = ?', [id], (err) => {
        if (err) return res.status(500).send(err);
        res.send({ message: 'Contact deleted successfully!' });
    });
});

app.listen(5000, () => {
    console.log('Server running on port 5000');
});
