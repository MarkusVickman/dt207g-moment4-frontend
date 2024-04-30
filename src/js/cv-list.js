//fil för att skriva ut från servern/databasen till webplatsens
//div där cv-data ska skrivas ut
const cvDiv = document.getElementById("cv-div");
import { apiGet } from './api.js';

//När sidan laddas 
window.onload = writeCvToHtml();

//Initieras vid start och efter att ett inlägg tagits bort från webbplatsen
export async function writeCvToHtml() {
    // Anropa funktionen för att hämta data och väntar på svar
    let cvArray = await apiGet();

    //Rensar html
    cvDiv.innerHTML = "";

        //Om arrayen inte är tom byggs innehållet upp utifrån arrayen som loopas igenom. 
        if (cvArray.length > 0) {
            for (let i = 0; i < cvArray.length; i++) {
                let newDiv = document.createElement("div");
                newDiv.classList.add(`cv-post`);

                let h3 = document.createElement("h3");
                let h3Text = document.createTextNode(cvArray[i].companyName);
                h3.appendChild(h3Text);

                let h4 = document.createElement("h4");
                let h4Text = document.createTextNode(cvArray[i].jobTitle);
                h4.style.fontWeight = "bold";
                h4.appendChild(h4Text);

                let p1 = document.createElement("p");
                let p1Text = document.createTextNode(cvArray[i].location);
                p1.style.fontWeight = "strong";
                p1.appendChild(p1Text);

                let p2 = document.createElement("p");
                let p2Text = document.createTextNode(cvArray[i].description);
                p2.style.fontWeight = "strong";
                p2.appendChild(p2Text);

                let p3 = document.createElement("p");
                let p3Text = document.createTextNode(cvArray[i].startDate.slice(0, 10) + " - " + cvArray[i].endDate.slice(0, 10));
                p3.appendChild(p3Text);

                let button = document.createElement("button");
                let buttonText = document.createTextNode("Ta bort");
                button.appendChild(buttonText);
                button.id = cvArray[i]._id;
                button.classList.add("remove-cv");

                newDiv.appendChild(h3);
                newDiv.appendChild(h4);
                newDiv.appendChild(p1);
                newDiv.appendChild(p2);
                newDiv.appendChild(p3);
                newDiv.appendChild(button);
                cvDiv.appendChild(newDiv);
            }
        } else {

        }
};