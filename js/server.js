const fs = require('fs');
const path = require('path');
const express = require('express');
const pool = require('./db');
const cors = require('cors');
const port = process.env.PORT || 3000;

const app = express();

app.use(express.json());
app.use(cors());


// Créer un event -->venu depuis create_event.js de l'admin
app.post('/api/create_event', async(req, res) => {
    try {
        console.log("posting request has arrived from api/create_event");
        const post = req.body;
        const author= await pool.query("SELECT auteur FROM \"users\" WHERE id = $1", [post.author]);
        console.log(author);
        if (author.rowCount > 0) {
            const newpost = await pool.query("INSERT INTO \"Events\"(title,category,description,date,hour,location,author) values ($1, $2, $3, $4, $5, $6, $7)    RETURNING*", [post.title, post.category, post.description, post.date, post.hour, post.location, post.author]
            );
        }
        else {
            return res.status(403).json({ success: false, message: "Publication illégale car vous n'êtes pas auteur" });
        }
    } catch (err) {
        console.error(err.message);
    }
}); 

// Supprimer un event avec son id-->venu depuis admin.js de l'admin
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

// Se connecter à un compte -->venu depuis login.js de l'admin
app.post('/api/login', async(req, res) => {
    try {
        console.log("posting request has arrived from api/login");
        const { email, password } = req.body;
        const user = await pool.query("SELECT * FROM \"users\" WHERE mail = $1 AND password = $2", [email, password]);
        if (user.rowCount > 0) {
            res.json({ success: true, message: "Login successful", user: user.rows[0] });
        } else {
            res.json({ success: false, message: "Invalid email or password" });
        }
    } catch (err) {
        console.error(err.message);
        res.status(500).json({ success: false, message: "Server error" });
    }
});

// S'inscrire à un compte -->venu depuis register.js de l'admin
app.post('/api/register', async(req, res) => {
    try {
        console.log("posting request has arrived from api/register");
        const { username, email, password, auteur } = req.body;
        const existingUser = await pool.query("SELECT * FROM \"users\" WHERE mail = $1", [email]);
        console.log("Checking for existing user with email:", email);
        if (existingUser.rows.length > 0) { console.log("User already exists with email:", email);
            return res.json({ success: false, message: "Compte déjà existant" });
        }

        const newUser = await pool.query("INSERT INTO \"users\"(name, mail, password, auteur) VALUES ($1, $2, $3, $4) RETURNING *", [username, email, password, auteur]);
        res.json({ success: true, message: "Inscription réussie", user: newUser.rows[0] });
        console.log("User registered successfully:", newUser.rows[0]);
    
    } catch (err) {
        console.error(err.message);
        res.status(500).json({ success: false, message: "Erreur serveur" });
    }
});

// Récupérer tous les events pour l'utilisateur -->venu depuis user_page.js de l'utilisateur
app.get('/api/get_events_user', async(req, res) => {
    try {
        console.log("getting request has arrived from api/get_events_user");
        const allEvents = await pool.query("SELECT * FROM \"Events\"");
        res.json(allEvents.rows);
    } catch (err) {
        console.error(err.message);
    }
});

// Récupérer les événements filtrés pour l'utilisateur
app.get('/api/get_events_user_filtered', async(req, res) => {
    try {
        console.log("getting request has arrived from api/get_events_user_filtered");
        const { category, date } = req.query;
        console.log("Filtering events with category:", category, "and date:", date);
        let query = "SELECT * FROM \"Events\" WHERE category IS NOT NULL AND date IS NOT NULL";
        let params = [];

        if (category && category !== "all") {
            params.push(category);
            query += ` AND category = $${params.length}`;
        }

        if (date) {
            params.push(date);
            query += ` AND date = $${params.length}`;
        }

        const filteredEvents = await pool.query(query, params);
        res.json(filteredEvents.rows);
    } catch (err) {
        console.error(err.message);
    }
});

// Récupérer les événements de l'admin filtrés pour l'admin
app.get('/api/get_admin_filtered', async(req, res) => {
    try {
        const { user, category, date } = req.query;
        console.log("Filtering events for admin user:", user, "with category:", category, "and date:", date);
        let query = "SELECT * FROM \"Events\" WHERE author = $1";
        let params = [user];

        if (category && category !== "all") {
            params.push(category);
            query += ` AND category = $${params.length}`;
        }

        if (date) {
            params.push(date);
            query += ` AND date = $${params.length}`;
        }

        const filteredEvents = await pool.query(query, params);
        res.json(filteredEvents.rows);
    } catch (err) {
        console.error(err.message);
        res.status(500).json({ success: false, message: "Erreur lors de la suppression du compte" });
    }
});

// Mettre à jour le mot de passe de l'utilisateur -->venu depuis profil.js de l'utilisateur
app.put('/api/update_password/:id', async(req, res) => {
    try {
        console.log("putting request has arrived from api/update_password");
        const { id } = req.params;
        const { password } = req.body;
        const updateUser = await pool.query("UPDATE \"users\" SET password = $1 WHERE id = $2", [password, id]);
        res.json({ success: true, message: "Mot de passe mis à jour avec succès" });
    } catch (err) {
        console.error(err.message);
        res.status(500).json({ success: false, message: "Erreur lors de la mise à jour du mot de passe" });
    }
});

// Récupérer les événements de l'administrateur -->venu depuis admin.js de l'admin
app.get('/api/get_events_admin/:id', (req, res) => {
    const { id } = req.params;
    // Récupérer les événements de l'administrateur avec l'ID spécifié
    pool.query("SELECT * FROM \"Events\" WHERE author = $1", [id])
        .then(result => {
            res.json(result.rows);
        })
        .catch(err => {
            console.error(err);
            res.status(500).json({ error: "Internal server error" });
        });
});

// Récupérer un événement spécifique avec son ID -->venu depuis edit_event.js de l'admin
app.get('/api/get_event/:id', (req, res) => {
    const { id } = req.params;
    // Récupérer un événement spécifique avec l'ID spécifié
    pool.query("SELECT * FROM \"Events\" WHERE id = $1", [id])
        .then(result => {
            if (result.rows.length > 0) {
                res.json(result.rows[0]);
            } else {
                res.status(404).json({ error: "Event not found" });
            }
        })
        .catch(err => {
            console.error(err);
            res.status(500).json({ error: "Internal server error" });
        });
}
);

// Mettre à jour un événement spécifique avec son ID -->venu depuis edit_event.js de l'admin
app.put('/api/update_event/:id', (req, res) => {
    const { id } = req.params;
    const { title, category, description, date, hour, location } = req.body;
    // Mettre à jour un événement spécifique avec l'ID spécifié
    pool.query("UPDATE \"Events\" SET title = $1, category = $2, description = $3, date = $4, hour = $5, location = $6 WHERE id = $7 RETURNING *",
        [title, category, description, date, hour, location, id])
        .then(result => {
            if (result.rowCount > 0) {
                res.json({ success: true, message: "Event updated successfully", event: result.rows[0] });
            } else {
                res.status(404).json({ success: false, message: "Event not found" });
            }
        })
        .catch(err => {
            console.error(err);
            res.status(500).json({ success: false, message: "Internal server error" });
        });
}); // <-- Close the app.put handler properly

// Supprimer un compte utilisateur -->venu depuis profil.js de l'utilisateur
app.delete('/api/delete_account/:id', async(req, res) => {
    try {
        const { id } = req.params;
        const deleteUser = await pool.query("DELETE FROM \"users\" WHERE id = $1", [id]);
        res.json({ success: true, message: "Compte supprimé avec succès" });
    } catch (err) {
        console.error(err.message);
        res.status(500).json({ success: false, message: "Erreur lors de la suppression du compte" });
    }
});

app.listen(port, () => {
    console.log("Server is listening to port " + port)
});