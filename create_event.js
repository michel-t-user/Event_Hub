var form=document.getElementById("form-event-form");
var formData={};
var title=document.getElementById("title");
var category=document.getElementById("category");
var description=document.getElementById("description");
var date=document.getElementById("date");
var hour=document.getElementById("hour");
var locationInput=document.getElementById("location"); 
var submitButton=document.getElementById("submit-button");

submitButton.addEventListener("click", function(event) {
    event.preventDefault();

    formData = {
        title: title.value,
        category: category.value,
        description: description.value,
        date: date.value,
        hour: hour.value,
        location: locationInput.value
    };
    window.location.reload();
     // Reset the form after submission
    fetch('http://localhost:3000/api/create_event', {
    method: 'POST',
    headers: {
        'Content-Type': 'application/json'
    },
    body: JSON.stringify(formData),
    // Optionally reload after fetch completes, not here
})
.then(response => response.json())
.then(data => {
    console.log("Success:", data);
})
.catch((error) => {
    console.error("Error:", error);
});
// Reset the form after the request completes


   // Reset formData
   formData = {};
});
