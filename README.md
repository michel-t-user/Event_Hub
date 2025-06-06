# 📅 Campus Events Hub

Plateforme web permettant aux étudiants d’un campus de consulter, publier et gérer les événements (réunions, ateliers, compétitions, etc.).
---
## 🚀 Fonctionnalités principales

- Voir la liste des événements à venir
- Filtrer les événements par catégorie ou date
- Consulter les détails d’un événement (titre, description, date, heure, lieu)
- Créer un compte et se connecter
- Poster, modifier ou supprimer ses propres événements

---

## ⚙ Stack Technique

- *Frontend* : HTML, CSS, JavaScript
- *Backend* : Node.js avec Express ou Python avec Flask
- *Base de données* : SQLite ou PostgreSQL
- *Authentification* : Email + mot de passe

---

## 🧪 Installation et Lancement

1. *Cloner le projet*
   ```bash
   git clone https://github.com/michel-t-user/Event_Hub
   cd campus-events-hub
   
2. *configuration Nodejs*
   npm install express,cors,pg
   
4. *configuration base de donnee*
   creation de DATABASE dans postgre nomme *Hub* ainsi que des tables users et Event avec leur attribut
   Remplacer les champs password et Database convenablement dans db.js
   
 6.  *CONNEXION ET INSCRIPTION pour un utilisateur standard*
   Hub.html pour la page d'acceuil
   login.html pour la connexion d'un compte deja existant et registration.html pour une nouvelle inscription

5.*Creation d'evenement*
Elle est gerée par la page create_event.html
visualisation des evenements sur user_page.html pour un utilisateur standard et admin_user_page.html pour un dministrateur.

6.*Creation d'un administrateur*
Dans create_admin.js ,remplissez les informations sur l'administrateur
Lancer les deux serveurs a la fois server.js et create_admin.js a la fois(Astuce lancez un dans le terminal et l'autre dans le l'invite de commande
Accedez a la page admin.html pour faire tout operation en tant qu'administrateur

7. Lancez toujours le serveur avant de visualiser les evenements que ce soit en mode admin ou utilisateur.
