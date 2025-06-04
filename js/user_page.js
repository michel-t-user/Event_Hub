var userDropdown = document.getElementById("userDropdown");
var filterIcon = document.getElementById("filterIcon");

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

fetch('http://localhost:3000/api/get_events_user')
.then(response => response.json())
.then(data => {
    console.log("Liste des événements :", data);
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
            //div.appendChild(divbtn);

            document.getElementById("eventGrid").appendChild(div);
        }
    })
.catch(error => {
        console.error("Erreur lors de la récupération des événements :", error);
    });

filterIcon.addEventListener("click", function(event) {
    const category = document.getElementById("category").value;
    const date = document.getElementById("date").value;
    console.log(category, date);
    applyFilters(category, date);
});

function applyFilters(category, date) {
    fetch(`http://localhost:3000/api/get_events_user_filtered?category=${encodeURIComponent(category)}&date=${encodeURIComponent(date)}`)
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