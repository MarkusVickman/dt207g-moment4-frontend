
//variabler för meddelanden och eventlistener 
const alertMessage = document.getElementById("alert");
const userDiv = document.getElementById("user-div");

document.addEventListener("DOMContentLoaded", (e) => {
    //Eventlistener som lyssnar efter klick på ta bort knappen för en användare, initierar funktionen userDelete() och skickar med id/index som argument
    userDiv.addEventListener("click", (e) => {
        if (e.target.classList.contains("remove-user")) {
            userDelete();
        }
    });
});

//Get fetch-anrop för att hämta specifik använtarinformation
async function userApi() {
    try {
        const response = await fetch('https://dt207g-moment4.azurewebsites.net/api/protected/user', {
            method: 'GET',
            headers: {
                'authorization': 'Bearer ' + sessionStorage.getItem("token"),
                'Content-Type': 'application/json'
            },
        })
        const result = await response.json();
        return result[0];
    } catch (error) {
        alertMessage.innerHTML = "Användar uppgifter kunde inte laddas.";
        console.error(error);
    }
};

//Delete fetch-anrop som tar in ett id som skickas med till servern för att tas bort från databasen. Både användare och tillhörande inlägg tas bort. Sen tar token bort från lokalstorage.
export async function userDelete(id) {
    let response = await fetch(`https://dt207g-moment4.azurewebsites.net/api/protected/user/delete`, {
        method: 'DELETE',
        headers: {
            'authorization': 'Bearer ' + sessionStorage.getItem("token"),
            'Content-Type': 'application/json'
        },
        body: JSON.stringify()
    })
        .then(response => {
            if (!response.ok) {
                throw new Error("Vänligen kontakta oss för hjälp.");
            }
            return response.json();
        })
        .then(data => {
            sessionStorage.removeItem("token");
            window.location.href = "index.html";
        })
        .catch(error => {
            alertMessage.innerHTML = 'Fel vid borttagning av användare: ' + error.message;
        });
};

//När sidan laddas 
window.onload = writeUserToHtml();

//Initieras vis start och efter att ett inlägg tagits bort från webbplatsen
async function writeUserToHtml() {
    // Anropa funktionen för att hämta data och väntar på svar
    let user = await userApi();

    //innehållet om användaren bygg upp. 
        let newDiv = document.createElement("div");
        newDiv.classList.add(`cv-post`);

        let h3 = document.createElement("h3");
        let h3Text = document.createTextNode(user.username.charAt(0).toUpperCase()
        + user.username.slice(1));
        h3.appendChild(h3Text);

        let p1 = document.createElement("p");
        let p1Text = document.createTextNode(user.created.slice(0, 10));
        p1.style.fontWeight = "strong";
        p1.appendChild(p1Text);

        let p2 = document.createElement("p");
        let p2Text = document.createTextNode("Varning! Om du tar bort användaren försvinner alla dina skapade cv och går inte att återkalla.");
        p2.appendChild(p2Text);

        let button = document.createElement("button");
        let buttonText = document.createTextNode("Ta bort");
        button.appendChild(buttonText);
        button.id = "remove";
        button.classList.add("remove-user");

        newDiv.appendChild(h3);
        newDiv.appendChild(p1);
        newDiv.appendChild(p2);
        newDiv.appendChild(button);
        userDiv.appendChild(newDiv);
};