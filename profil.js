var user = JSON.parse(sessionStorage.getItem('user'));
console.log("User data:", user);
if (user) {
    document.getElementById("username-display").textContent = user.name;
    document.getElementById("email-display").textContent = user.mail;
    document.getElementById("password-label").textContent = user.password;
    document.getElementById("auteur").textContent = user.auteur ? "Oui" : "Non";
}