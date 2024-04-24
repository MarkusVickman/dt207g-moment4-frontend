//Fil för att ta in formulärdata, checka efter fel och skicka med ett argument till api-post funktionen

//Deklarerar variabler för formulär och där meddelande ska skrivar ut
const form = document.getElementById("form");
const alert = document.getElementById("alert");
const alert2 = document.getElementById("alert2");

import { apiPost } from './api.js';

document.addEventListener("DOMContentLoaded", (event) => {
    // Lägg till händelselyssnare på formuläret
    form.addEventListener("submit", (e) => {
        e.preventDefault();
        // Hämta CV-data från formuläret
        let companyName = document.getElementById("company_name").value;
        let jobTitle = document.getElementById("job_title").value;
        let location = document.getElementById("location").value;
        let startDate = document.getElementById("start_date").value;
        let endDate = document.getElementById("end_date").value;
        let description = document.getElementById("description").value;

        //Letar fel i formuläret med errorCheck funktionen. Utan fel så skapas ett object som skickas till funktionen för POST-anrop
        if (errorCheck(companyName, jobTitle, location, startDate, endDate, description)) {
            alert.innerHTML = "";
            const cv = { companyName: companyName, jobTitle: jobTitle, location: location, startDate: startDate, endDate: endDate, description: description };
            apiPost(cv);
            //Resetar formuläret om det är korrekt ifyllt
            document.getElementById("company_name").value = "";
            document.getElementById("job_title").value = "";
            document.getElementById("location").value = "";
            document.getElementById("start_date").value = "";
            document.getElementById("end_date").value = "";
            document.getElementById("description").value = "";
        }
    });
});

//Checkar efter fel i formuläret och skriver ut felmeddelande i så fall annars returnerar true
function errorCheck(companyName, jobTitle, location, startDate, endDate, description) {
    let inputErrors = [];
    //Flera if satser för att välja vilka felmeddelanden som ska tar med
    if (companyName === "") {
        inputErrors.push("företagsnamn ");
    }
    if (jobTitle === "") {
        inputErrors.push("jobbtitel ");
    }
    if (location === "") {
        inputErrors.push("ort ");
    }
    if (startDate === "") {
        inputErrors.push("startdatum ");
    }
    if (endDate === "") {
        inputErrors.push("slutdatum ");
    }
    if (description === "") {
        inputErrors.push("beskrivning!");
    }

    //Om fel inte finns skapas en nytt inlägg i databasen och startsidan laddas
    if (inputErrors.length === 0) {
        return true;
    }
    //Om fel finns skrivs alla dessa ut på sidan
    else {
        alert.innerHTML = "Fyll i " + inputErrors;
        alert2.innerHTML = "";
        return false;
    }
}
