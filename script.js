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
    alert("Vous avez été déconnecté.");
    window.location.href = "login.html"; 
}
function openEvent(){
    window.location.href = "events.html"; 
}