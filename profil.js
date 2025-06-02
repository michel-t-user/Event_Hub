var user = JSON.parse(sessionStorage.getItem('user'));
console.log("User data:", user);
if (user) {
    document.getElementById("username-display").textContent = user.name;
    document.getElementById("email-display").textContent = user.mail;
    document.getElementById("password-label").textContent = user.password;
    document.getElementById("auteur").textContent = user.auteur ? "Oui" : "Non";
}
const passwordInput = document.getElementById("password-label");
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

// Fermer le menu si on clique ailleurs
document.addEventListener("click", function(event) {
    const menu = document.querySelector(".user-menu");
    const dropdown = document.getElementById("userDropdown");

    if (!menu.contains(event.target)) {
        dropdown.style.display = "none";
    }
    });