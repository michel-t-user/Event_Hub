// Initialiser le formulaire d'événement
var form=document.getElementById("form-event-form");
var formData={};
var title=document.getElementById("title");
var category=document.getElementById("category");
var description=document.getElementById("description");
var date=document.getElementById("date");
var hour=document.getElementById("hour");
var locationInput=document.getElementById("location"); 
var submitButton=document.getElementById("submit-button");
var user = JSON.parse(sessionStorage.getItem('user'));

// Gérer l'événement de soumission du formulaire
submitButton.addEventListener("click", function(event) {
    event.preventDefault();

    formData = {
        title: title.value,
        category: category.value,
        description: description.value,
        date: date.value,
        hour: hour.value,
        location: locationInput.value,
        author: user ? user.id : null 
    };
    window.location.reload();//recharger la page après l'envoi du formulaire --pour reset en fait
    // Envoyer les données du formulaire au serveur
    fetch('http://localhost:3000/api/create_event', {
    method: 'POST',
    headers: {
        'Content-Type': 'application/json'
    },
    body: JSON.stringify(formData),
})
.then(response => response.json())
.then(data => {
    console.log("Success:", data);
})
.catch((error) => {
    console.error("Error:", error);
});

formData = {};
});
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
