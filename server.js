const fs = require('fs');
const path = require('path');
const express = require('express');
const pool = require('./db');
const cors = require('cors');
const port = process.env.PORT || 3000;

const app = express();

app.use(express.json());
app.use(cors());

app.post('/api/create_event', async(req, res) => {
    try {
        console.log("posting request has arrived from api/create_event");
        const post = req.body;
        const newpost = await pool.query("INSERT INTO \"Events\"(title,category,description,date,hour,location) values ($1, $2, $3, $4, $5, $6)    RETURNING*", [post.title, post.category, post.description, post.date, post.hour, post.location]
        );
        //res.json(newpost.rows[0]);
    } catch (err) {
        console.error(err.message);
    }
}); 

app.get('/api/get_events', async(req, res) => {
    try {
        console.log("getting request has arrived from api/get_events");
        const allEvents = await pool.query("SELECT * FROM \"Events\"");
        res.json(allEvents.rows);
    } catch (err) {
        console.error(err.message);
    }
});

app.delete('/api/delete_event/:id', async(req, res) => {
    try {
        console.log("deleting request has arrived from api/delete_event");
        const { id } = req.params;
        const deleteEvent = await pool.query("DELETE FROM \"Events\" WHERE id = $1", [id]);
        res.json("Event was deleted!");
        console.log(res.json);
    } catch (err) {
        console.error(err.message);
    }
});

app.post('/api/login', async(req, res) => {
    try {
        console.log("posting request has arrived from api/login");
        const { email, password } = req.body;
        const user = await pool.query("SELECT * FROM \"users\" WHERE mail = $1 AND password = $2", [email, password]);

        if (user.rows.length > 0) {
            res.json({ success: true, message: "Login successful", user: user.rows[0] });
        } else {
            res.json({ success: false, message: "Invalid email or password" });
        }
    } catch (err) {
        console.error(err.message);
        res.status(500).json({ success: false, message: "Server error" });
    }
});

app.post('/api/register', async(req, res) => {
    try {
        console.log("posting request has arrived from api/register");
        const { username, email, password } = req.body;
        const existingUser = await pool.query("SELECT * FROM \"users\" WHERE mail = $1", [email]);
console.log("Checking for existing user with email:", email);
        if (existingUser.rows.length > 0) {console.log("User already exists with email:", email);
            return res.json({ success: false, message: "Compte déjà existant" });
        }

        const newUser = await pool.query("INSERT INTO \"users\"(name, mail, password, auteur) VALUES ($1, $2, $3, $4) RETURNING *", [username, email, password, false]);
        res.json({ success: true, message: "Inscription réussie", user: newUser.rows[0] });
        console.log("User registered successfully:", newUser.rows[0]);
    
    } catch (err) {
        console.error(err.message);
        res.status(500).json({ success: false, message: "Erreur serveur" });
    }
});

app.get('/api/get_events_user', async(req, res) => {
    try {
        console.log("getting request has arrived from api/get_events_user");
        const allEvents = await pool.query("SELECT * FROM \"Events\"");
        res.json(allEvents.rows);
    } catch (err) {
        console.error(err.message);
    }
});

app.listen(port, () => {
    console.log("Server is listening to port " + port)
});