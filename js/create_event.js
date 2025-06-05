// Initialiser le formulaire d'événement
var form=document.getElementById("event-form");
var formData={};
var title=document.getElementById("title");
var category=document.getElementById("category");
var description=document.getElementById("description");
var date=document.getElementById("date");
var hour=document.getElementById("hour");
var locationInput=document.getElementById("location"); 
var submitButton=document.getElementById("submit-button");
var user = null;
try {
    user = JSON.parse(sessionStorage.getItem('user'));
} catch (e) {
    console.warn("Utilisateur non authentifié ou données corrompues dans sessionStorage.");
}


// Gérer l'événement de soumission du formulaire
submitButton.addEventListener("click", function(event) {
    event.preventDefault();
     // Empêcher le rechargement de la page
    if (!title.value || !category.value || !description.value || !date.value || !hour.value || !locationInput.value) {
    alert("Veuillez remplir tous les champs.");
    return;
}


    formData = {
        title: title.value,
        category: category.value,
        description: description.value,
        date: date.value,
        hour: hour.value,
        location: locationInput.value,
        author: user ? user.id : null 
    };
    
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
    if(data.success) {
        alert("Événement créé avec succès !");
        window.location.href = "admin.html"; // Rediriger vers la page admin après la création de l'événement
    }
    else {
        alert("Erreur lors de la création de l'événement : " + data.message);
    }
})
.catch((error) => {
    console.error("Error:", error);
});

}
);

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
