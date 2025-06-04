var user = JSON.parse(sessionStorage.getItem('user'));
console.log("User data:", user);
if (user) {
    document.getElementById("username-display").textContent = user.name;
    document.getElementById("email-display").textContent = user.mail;
    document.getElementById("password-label").textContent = user.password;
    document.getElementById("auteur").textContent = user.auteur ? "Oui" : "Non";
}
const passwordInput = document.getElementById("password-label");
var NewPasswordInput = document.getElementById("password-change");
passwordInput.value = user.password;

function togglePasswordVisibility() {
    if (passwordInput.type === "password") {
        passwordInput.type = "text";
    } else {
    passwordInput.type = "password";
    }
}
function toggleMenu() {
    const dropdown = document.getElementById("userDropdown");
    dropdown.style.display = dropdown.style.display === "block" ? "none" : "block";
}
function logout() {
    sessionStorage.removeItem('user');
    window.location.href = 'login.html'; // Redirect to login page after logout
}
function deleteAccount() {
    const userId = user.id; 
    let confirmation = confirm("Êtes-vous sûr de vouloir supprimer votre compte ? Cette action est irréversible.");
    if (!confirmation) {
        return;
    }
    fetch(`http://localhost:3000/api/delete_account/${userId}`, {
        method: 'DELETE'
    })
    .then(response => response.json())
    .then(data => {
        console.log("Response from server:", data);
        if (data.success) {
            alert("Compte supprimé avec succès !");
            sessionStorage.removeItem('user');
            window.location.href = 'Hub.html'; // Redirect to Hub page after account deletion
        } else {
            alert("Erreur lors de la suppression du compte : " + data.message);
        }
    })
    .catch((error) => {
        console.error("Error:", error);
    });
}
function updatePassword() {
    const newPassword = NewPasswordInput.value;
    const userId = user.id; 
    fetch(`http://localhost:3000/api/update_password/${userId}`, {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ password: newPassword })
    })
    .then(response => response.json())
    .then(data => {
        console.log("Response from server:", data);
        if (data.success) {
            alert("Mot de passe mis à jour avec succès !");
            sessionStorage.setItem('user', JSON.stringify({ ...user, password: newPassword }));
            window.location.reload(); // Reload the page to reflect changes
        } else {
            alert("Erreur lors de la mise à jour du mot de passe : " + data.message);
        }
    })
    .catch((error) => {
        console.error("Error:", error);
    });
}

// Fermer le menu si on clique ailleurs
document.addEventListener("click", function(event) {
    const menu = document.querySelector(".user-menu");
    const dropdown = document.getElementById("userDropdown");

    if (!menu.contains(event.target)) {
        dropdown.style.display = "none";
    }
    });