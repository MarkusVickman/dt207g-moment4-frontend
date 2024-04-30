//fil för att ta bort cv-inlägg från startsidan
import { apiDelete } from "./api";
import { writeCvToHtml } from "./cv-list";
//variabler för meddelanden och eventlistener 
const alert2 = document.getElementById("alert2");
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

//Funktionen skickar med id/index till delete fetch-funktionen och väntar på svar. När svar nås skrivs ett meddelande ut på skärmen
async function removeCV(id) {
    let data = await apiDelete(id);
    writeCvToHtml();
    alert2.innerHTML = `Ett CV-inlägg är borttaget från databasen.`;
}