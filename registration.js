var formData = {};
var form = document.getElementById("form-section");
var username = document.getElementById("fullname");
var email = document.getElementById("email");
var password = document.getElementById("password");
var confirmPassword = document.getElementById("confirm-password");
var submitButton = document.getElementById("submit-button");


submitButton.addEventListener("click", function(event) {
    //event.preventDefault();

    // Validate password match
    if (password.value !== confirmPassword.value) {
        alert("Mot de passe différent !");
        return;
    }

    formData = {
        username: username.value,
        email: email.value,
        password: password.value
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
    .then(data => {
        if (data.success) {
            alert("inscription réussie !");
            sessionStorage.setItem('user', JSON.stringify(data.user));
            window.location.href = 'login.html'; // Redirect to login page after successful registration
        } else {
            alert(data.message); // Show error message from server
        }
    })
    .catch((error) => {
        console.error("Error:", error);
    });

    // Clear all input fields in the form
    /*Array.from(form.querySelectorAll('input')).forEach(element => {
        element.value = '';
    });*/
});