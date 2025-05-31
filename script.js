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

function logout() {
    // Simuler la déconnexion
    alert("Vous avez été déconnecté.");
    // Rediriger vers la page de connexion ou d'accueil
    window.location.href = "login.html"; // Remplacez par l'URL de votre page de connexion
}
function openEvent(){
    // Simuler l'ouverture d'un événement
    //alert("Événement ouvert.");
    // Rediriger vers la page de l'événement
    window.location.href = "events.html"; // Remplacez par l'URL de votre page d'événement
    
}