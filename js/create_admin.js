var formData = {};
formData = {
        username: "Great Debaters",
        email: "great_debaters@inpt.ac.ma",
        password: "inpt-great-debaters@2025",
        auteur: true
    };
    fetch('http://localhost:3000/api/register', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(formData)
    })
    .then(response => response.json())
    .then(data => {
        if (data.success) {
            console.log("Inscription réussie !");
        } else {
            console.error("Erreur d'inscription :", data.message);
        }
    })
    .catch((error) => {
        console.error("Error:", error);
    });
