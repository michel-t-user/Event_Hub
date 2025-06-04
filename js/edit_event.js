var id= new URLSearchParams(window.location.search).get("id");
console.log("ID de l'événement à éditer :", id);    
fetch(`http://localhost:3000/api/get_event/${id}`)
    .then(response => response.json())
    .then(data => {
        console.log("Données de l'événement :", data);
        if (data) {
            document.getElementById("title").value = data.title;
            document.getElementById("category").value = data.category;
            document.getElementById("description").value = data.description;
            document.getElementById("date").value = data.date;
            document.getElementById("hour").value = data.hour;
            document.getElementById("location").value = data.location;
        }
    })
    .catch(error => {
        console.error("Error fetching event data:", error);
    });

function updateEvent() {
        const title = document.getElementById("title").value;
        const category = document.getElementById("category").value;
        const description = document.getElementById("description").value;
        const date = document.getElementById("date").value;
        const hour = document.getElementById("hour").value;
        const location = document.getElementById("location").value;

        fetch(`http://localhost:3000/api/update_event/${id}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                title,
                category,
                description,
                date,
                hour,
                location
            })
        })
        .then(response => response.json())
        .then(data => {
            if (data.success) {
                alert("Event updated successfully!");
                window.location.href = "admin.html"; // Redirect to admin page
            } else {
                alert("Failed to update event: " + data.message);
            }
        })
        .catch(error => {
            console.error("Error updating event:", error);
        });
    }

