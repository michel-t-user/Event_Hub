var formData = {};
formData = {
        username: "A2S",
        email: "A2S@inpt.ac.ma",
        password: "A2S1234",
        auteur: true
    };
     fetch('http://localhost:3000/api/register', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(formData)
    })
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
