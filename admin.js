fetch('http://localhost:3000/api/get_events')
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
            editBtn.onclick = function() {
            
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

        // Fonction pour récupérer les événements en fonction des filtres

        async function fetchEvents() {
            try {
                const category = document.getElementById("category").value;
                const date = document.getElementById("date").value;
                const hour = document.getElementById("hour").value;
                const location = document.getElementById("location").value;
                const queryParams = new URLSearchParams({
                    category: category,
                    date: date,
                    hour: hour,
                    location: location
                }).toString();
                const url = `http://localhost:3000/api/get_events?${queryParams}`;
                console.log("URL de la requête :", url);
                // Effectuer la requête pour récupérer les événements
                const response = await fetch(url);
                if (!response.ok) {
                    throw new Error('Erreur lors de la récupération des événements');
                }
                const events = await response.json();
                console.log("Liste des événements :", events);
                // Vider la grille des événements avant d'afficher les nouveaux résultats
                document.getElementById("eventGrid").innerHTML = '';
                // Afficher les événements récupérés
                events.forEach(event => {
                    let div = document.createElement("div");
                    div.className = "event-card";

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
                    deleteBtn.onclick = function() {
                        let confirmation = confirm("Êtes-vous sûr de vouloir supprimer cet événement ?");
                        if (confirmation) {
                            fetch(`http://localhost:3000/api/delete_event/${event.id}`, {
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
                        // Logique pour éditer l'événement
                        console.log(`Édition de l'événement : ${event.id}`);
                    };
                    
                    let title = document.createElement("h3");
                    title.textContent = event.title;
                    div.appendChild(title);

                    let description = document.createElement("p");
                    description.textContent = ` ${event.description}`;
                    div.appendChild(description);

                    let date = document.createElement("p");
                    date.innerHTML = ` <strong>Date:</strong> ${event.date}`;
                    div.appendChild(date);

                    let hour = document.createElement("p");
                    hour.innerHTML = ` <strong>Heure:</strong> ${event.hour}`;
                    div.appendChild(hour);

                    let location = document.createElement("p");
                    location.innerHTML = ` <strong>Lieu:</strong> ${event.location}`;
                    div.appendChild(location);
                    
                    div.appendChild(divbtn);
                    
                    document.getElementById("eventGrid").appendChild(div);
                });
            } catch (error) {
                console.error("Erreur lors de la récupération des événements :", error);
            }
            // Réinitialiser les champs de filtre
            document.getElementById("category").value = '';
            document.getElementById("date").value = '';
            document.getElementById("hour").value = '';
            document.getElementById("location").value = '';
        }
        document.getElementById("filterButton").addEventListener("click", fetchEvents);
        document.getElementById("resetButton").addEventListener("click", () => {
            document.getElementById("category").value = '';
            document.getElementById("date").value = '';
            document.getElementById("hour").value = '';
            document.getElementById("location").value = '';
            fetchEvents(); // Recharger tous les événements
        });

    })
    .catch(error => {
        console.error("Erreur lors de la récupération des événements :", error);});