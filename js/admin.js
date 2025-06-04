//Récupérer les événements depuis l'API et les afficher dans la grille
var user = JSON.parse(sessionStorage.getItem('user'));
const userId = user.id;
var filterIcon = document.getElementById("filterIcon");

fetch(`http://localhost:3000/api/get_events_admin/${userId}`)
    .then(response => response.json())
    .then(data => {
        console.log("Liste des événements :", data);
        for (let i = 0; i < data.length; i++) {
            
            let div = document.createElement("div");
            div.className = "event-card";

            let divbtn = document.createElement("div");
            divbtn.className = "action-buttons";

            let editBtn = document.createElement("button");
            editBtn.className = "btn edit";
            editBtn.textContent = "Éditer";
            divbtn.appendChild(editBtn);

            editBtn.onclick = function() {
                console.log("Éditer l'événement avec ID:", data[i].id);
                // Exemple de redirection vers une page d'édition
                window.location.href = `edit_event.html?id=${data[i].id}`;
            };

            let deleteBtn = document.createElement("button");
            deleteBtn.className = "btn delete";
            deleteBtn.textContent = "Supprimer";
            divbtn.appendChild(deleteBtn);

            deleteBtn.onclick = function() {
                let confirmation = confirm("Êtes-vous sûr de vouloir supprimer cet événement ?");
                if (confirmation) {
                    fetch(`http://localhost:3000/api/delete_event/${data[i].id}`, {
                        method: 'DELETE'
                    }).then(response => {
                        if (response.ok) {
                            alert("Événement supprimé avec succès !");
                            div.remove();
                        } else {
                            alert("Erreur lors de la suppression de l'événement.");
                        }
                    });
                }
            };
        
            let title = document.createElement("h3");
            title.textContent = data[i].title;
            div.appendChild(title);

            let description = document.createElement("p");
            description.textContent = ` ${data[i].description}`;
            div.appendChild(description);

            let date = document.createElement("p");
            date.innerHTML = ` <strong>Date:</strong> ${data[i].date}`;
            div.appendChild(date);

            let hour = document.createElement("p");
            hour.innerHTML = ` <strong>Heure:</strong> ${data[i].hour}`;
            div.appendChild(hour);

            let location = document.createElement("p");
            location.innerHTML = ` <strong>Lieu:</strong> ${data[i].location}`;
            div.appendChild(location);
            div.appendChild(divbtn);

            document.getElementById("eventGrid").appendChild(div);
        }
    })
    .catch(error => {
        console.error("Erreur lors de la récupération des événements :", error);
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

filterIcon.addEventListener("click", function(event) {
    const category = document.getElementById("category").value;
    const date = document.getElementById("date").value;
    console.log(category, date);
    applyFilters(category, date);
});

function applyFilters(category, date) {
    fetch(`http://localhost:3000/api/get_admin_filtered?user=${userId}&category=${encodeURIComponent(category)}&date=${encodeURIComponent(date)}`)
    .then(response => response.json())
    .then(data => {
        console.log("Liste des événements filtrés :", data);
        document.getElementById("eventGrid").innerHTML = ""; // Vider la grille avant d'afficher les événements filtrés
        for (let i = 0; i < data.length; i++) {
            let div = document.createElement("div");
            div.className = "event-card";
            let title = document.createElement("h3");
            title.textContent = data[i].title;
            div.appendChild(title);

            let description = document.createElement("p");
            description.textContent = ` ${data[i].description}`;
            div.appendChild(description);

            let date = document.createElement("p");
            date.innerHTML = ` <strong>Date:</strong> ${data[i].date}`;
            div.appendChild(date);

            let hour = document.createElement("p");
            hour.innerHTML = ` <strong>Heure:</strong> ${data[i].hour}`;
            div.appendChild(hour);

            let location = document.createElement("p");
            location.innerHTML = ` <strong>Lieu:</strong> ${data[i].location}`;
            div.appendChild(location);

            document.getElementById("eventGrid").appendChild(div);
            let divbtn = document.createElement("div");
            divbtn.className = "action-buttons";

            let editBtn = document.createElement("button");
            editBtn.className = "btn edit";
            editBtn.textContent = "Éditer";
            divbtn.appendChild(editBtn);

            let deleteBtn = document.createElement("button");
            deleteBtn.className = "btn delete";
            deleteBtn.textContent = "Supprimer";
            divbtn.appendChild(deleteBtn);
            div.appendChild(divbtn);
            deleteBtn.onclick = function() {
                let confirmation = confirm("Êtes-vous sûr de vouloir supprimer cet événement ?");
                if (confirmation) {
                    fetch(`http://localhost:3000/api/delete_event/${data[i].id}`, {
                        method: 'DELETE'
                    }).then(response => {
                        if (response.ok) {
                            alert("Événement supprimé avec succès !");
                            div.remove();
                        } else {
                            alert("Erreur lors de la suppression de l'événement.");
                        }
                    });
                }
            };
            editBtn.onclick = function() {
                console.log("Éditer l'événement avec ID:", data[i].id);
                // Exemple de redirection vers une page d'édition
                window.location.href = `edit_event.html?id=${data[i].id}`;
            };
        }
        if (data.length === 0) {
            let noEventsMessage = document.createElement("p");
            noEventsMessage.textContent = "Aucun événement trouvé pour les critères sélectionnés.";
            document.getElementById("eventGrid").appendChild(noEventsMessage);
        }
        // Ici, vous pouvez mettre à jour l'affichage des événements avec les données filtrées
    })
        .catch(error => {
            console.error("Erreur lors de l'application des filtres :", error);
        });
    }