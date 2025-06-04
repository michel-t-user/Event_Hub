var formData = {};
var form = document.getElementById("form-section");
var username = document.getElementById("fullname");
var email = document.getElementById("email");
var password = document.getElementById("password");
var confirmPassword = document.getElementById("confirm-password");
var submitButton = document.getElementById("submit-button");


submitButton.addEventListener("click", function(event) {
    event.preventDefault();

    if (username.value.trim() === "" || email.value.trim() === "" || password.value.trim() === "") {
        alert("Veuillez remplir tous les champs !");
        return;
    }
    if (!/^.+@inpt\.ac\.ma$/.test(email.value)) {
        alert("Veuillez entrer une adresse e-mail valide de l'INPT (ex: user@inpt.ac.ma)");
        return;
    }
    if (password.value.length < 6) {
        alert("Le mot de passe doit contenir au moins 6 caractères !");
        return;
    }
    if (password.value !== confirmPassword.value) {
        alert("Mot de passe différent !");
        return;
    }

    formData = {
        username: username.value,
        email: email.value,
        password: password.value,
        auteur: false 
    };
console.log("formData:", formData);
    // Send the registration data to the server
    fetch('http://localhost:3000/api/register', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(formData)
    })
    .then(response => response.json())
    .then(data => { 
        console.log("Response from server:", data);
        if (data.success) {
            alert("inscription réussie !");
            sessionStorage.setItem('user', JSON.stringify(data.user));
            window.location.href = 'login.html'; // Redirect to login page after successful registration
        } else {    
            alert(data.message);
            window.location.href = 'registration.html'; // Redirect to registration page on error
        }
    })
    .catch((error) => {
        console.error("Error:", error);
    });

});