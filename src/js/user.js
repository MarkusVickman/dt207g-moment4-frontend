
//variabler för meddelanden och eventlistener 
const alertMessage = document.getElementById("alert");
const userDiv = document.getElementById("user-div");

document.addEventListener("DOMContentLoaded", (e) => {
    //Eventlistener som lyssnar efter klick på ta bort knapparna för cv, initierar funktionen removeCV och skickar med id/index som argument
    userDiv.addEventListener("click", (e) => {
        if (e.target.classList.contains("remove-user")) {
            userDelete();
        }
    });
});


//Get fetch-anrop för att hämta array med cv
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


//Delete fetch-anrop som tar in ett id/index som skickas med till servern för att tas bort från databasen 
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
     console.log(user);
    //Om arrayen inte är tom byggs innehållet upp utifrån arrayen. 
    
        let newDiv = document.createElement("div");
        newDiv.classList.add(`cv-post`);
        newDiv.innerHTML = `
                    <h3>${user.username.charAt(0).toUpperCase()
                        + user.username.slice(1)}</h3>
                    <p><strong>Skapad:</strong> ${user.created.slice(0, 10)}</p>
                    <p>Varning! Om du tar bort användaren försvinner alla dina skapade cv och går inte att återkalla.</p>
                    <button id="remove" class="remove-user">Ta bort</button>
                    `;
        userDiv.appendChild(newDiv);
    

};