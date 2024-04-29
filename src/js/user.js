

//fil för att ta bort cv-inlägg från startsidan
import { apiDelete } from "./api";
import { writeCvToHtml } from "./cv-list";
//variabler för meddelanden och eventlistener 
const alertMessage = document.getElementById("alert");
const cvDiv = document.getElementById("cv-div");

document.addEventListener("DOMContentLoaded", (e) => {
    //Eventlistener som lyssnar efter klick på ta bort knapparna för cv, initierar funktionen removeCV och skickar med id/index som argument
    cvDiv.addEventListener("click", (e) => {
        if (e.target.classList.contains("remove-cv")) {
            let id = e.target.id;
            removeCV(id);
        }
    });
});


//Get fetch-anrop för att hämta array med cv
function userApi() {
    fetch('https://dt207g-moment4.azurewebsites.net/api/login', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: username
    })
        .then(response => {
            if (!response.ok) {
                throw new Error("Fel lösenord eller användarnamn");
            }
            return response.json();
        })
        .then(data => {
            sessionStorage.setItem('token', data.token);
            window.location.href = "my_cv.html";
        })
        .catch(error => {
            alertMessage.innerHTML = 'Fel vid inloggning: ' + error.message;
        });
};



//Funktionen skickar med id/index till delete fetch-funktionen och väntar på svar. När svar nås skrivs ett meddelande ut på skärmen
async function removeCV(id) {
    let data = await apiDelete(id);
    window.location.href = "index.html";
    sessionStorage.removeItem("token");
}

//Delete fetch-anrop som tar in ett id/index som skickas med till servern för att tas bort från databasen 
export async function userDelete(id) {
    let response = await fetch(`https://dt207g-moment4.azurewebsites.net/api/user/delete/${id}`, {
        method: 'DELETE',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify()
    });
    //Väntar på data och först när den finns görs en retur till funktionen removeCV(id) där den väntar på svar
    let data = await response.json();
    return data;
}




//När sidan laddas 
window.onload = writeUserToHtml();

//Initieras vis start och efter att ett inlägg tagits bort från webbplatsen
async function writeUserToHtml() {
    // Anropa funktionen för att hämta data och väntar på svar
    let user = await userApi();

    //Om arrayen inte är tom byggs innehållet upp utifrån arrayen. 

    let newDiv = document.createElement("div");
    newDiv.classList.add(`cv-post`);
    newDiv.innerHTML = `
                <h3>${user.username}</h3>
                <H4><bold>Arbetstitel:</strong> ${cvArray[i].jobTitle}</H4>
                <p><strong>Ort:</strong> ${cvArray[i].location}</p>
                <p><strong>Beskrivning:</strong>  ${cvArray[i].description}</p>
                <p>Anställd: ${cvArray[i].startDate.slice(0, 10)} - ${cvArray[i].endDate.slice(0, 10)}</p>
                <button id="${cvArray[i]._id}" class="remove-cv">Ta bort</button>
                `;
    cvDiv.appendChild(newDiv);


};