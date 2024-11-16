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

app.get('/contacts', (req, res) => {
    db.query('SELECT * FROM contacts', (err, results) => {
        if (err) return res.status(500).send(err);
        res.send(results);
    });
});

app.post('/contacts', (req, res) => {
    const { firstName, lastName, email, phone, company, jobTitle } = req.body;
    db.query('INSERT INTO contacts (firstName, lastName, email, phone, company, jobTitle) VALUES (?, ?, ?, ?, ?, ?)', [firstName, lastName, email, phone, company, jobTitle], (err) => {
        if (err) return res.status(500).send(err);
        res.send({ message: 'Contact added successfully!' });
    });
});

app.put('/contacts/:id', (req, res) => {
    const { id } = req.params;
    const { firstName, lastName, email, phone, company, jobTitle } = req.body;
    db.query('UPDATE contacts SET firstName=?, lastName=?, email=?, phone=?, company=?, jobTitle=? WHERE id=?', [firstName, lastName, email, phone, company, jobTitle, id], (err) => {
        if (err) return res.status(500).send(err);
        res.send({ message: 'Contact updated successfully!' });
    });
});

app.delete('/contacts/:id', (req, res) => {
    const { id } = req.params;
    db.query('DELETE FROM contacts WHERE id=?', [id], (err) => {
        if (err) return res.status(500).send(err);
        res.send({ message: 'Contact deleted successfully!' });
    });
});

app.listen(5000, () => {
    console.log('Server running on port 5000');
});
