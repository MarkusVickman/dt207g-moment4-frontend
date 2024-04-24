//fil för att skriva ut från servern/databasen till webplatsens startsida
//din där cv-data ska skrivas ut
const cvDiv = document.getElementById("cv-div");
import { apiGet } from './api.js';

//När sidan laddas 
window.onload = writeCvToHtml();

//Initieras vis start och efter att ett inlägg tagits bort från webbplatsen
export async function writeCvToHtml() {
    // Anropa funktionen för att hämta data och väntar på svar
    let cvArray = await apiGet();

    //Rensar html
    cvDiv.innerHTML = "";

        //Om arrayen inte är tom byggs innehållet upp utifrån arrayen. 
        if (cvArray.length > 0) {
            for (let i = 0; i < cvArray.length; i++) {
                let newDiv = document.createElement("div");
                newDiv.classList.add(`cv-post`);
                newDiv.innerHTML = `
                <h3>${cvArray[i].companyName}</h3>
                <H4><bold>Arbetstitel:</strong> ${cvArray[i].jobTitle}</H4>
                <p><strong>Ort:</strong> ${cvArray[i].location}</p>
                <p><strong>Beskrivning:</strong>  ${cvArray[i].description}</p>
                <p>Anställd: ${cvArray[i].startDate.slice(0, 10)} - ${cvArray[i].endDate.slice(0, 10)}</p>
                <button id="${cvArray[i]._id}" class="remove-cv">Ta bort</button>
                `;
                cvDiv.appendChild(newDiv);
            }
        } else {

        }
};