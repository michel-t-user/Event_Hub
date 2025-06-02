var email = document.getElementById('email');
var password = document.getElementById('password');
var loginButton = document.getElementById("my-button");


loginButton.addEventListener("click", function(event) {
event.preventDefault(); // Prevent the default form submission
console.log("Login button clicked");
    fetch('http://localhost:3000/api/login', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            email: email.value,
        password: password.value
    })
})
.then(response => response.json())
.then(data => {
    if (data.success) {
        sessionStorage.setItem('user', JSON.stringify(data.user));
        if (JSON.parse(sessionStorage.getItem('user')).auteur === 'True') {
            window.location.href = 'admin_page.html';
        } else {
            window.location.href = 'user_page.html';
        }
    } else {
        // Afficher un message d'erreur
        alert(data.message);
    }
})
.catch(error => {
    console.error('Erreur lors de la connexion :', error);
});
}
);