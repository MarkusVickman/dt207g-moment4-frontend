//Fil med fetch-anrop

//Läser in variabel med ett element där meddelanden ska visas
const alert = document.getElementById("alert");
const alert2 = document.getElementById("alert2");

//Get fetch-anrop för att hämta array med cv
export async function apiGet() {
      const url = 'https://dt207g-moment3.azurewebsites.net/api/cv';
      try {
            const response = await fetch(url);
            const result = await response.json();
            //returnerar json-data till funktionen writeCvToHtml()
            alert.innerHTML = "";
            return result;
      } catch (error) {
            alert.innerHTML = "Inläggen kunde inte laddas in.";
            console.error(error);
      }
}

//Post fetch-anrop som tar in ett objekt som parameter
export async function apiPost(cv) {
      let response = await fetch('https://dt207g-moment3.azurewebsites.net/api/add', {
            method: 'POST',
            headers: {
                  'Content-Type': 'application/json'
            },
            body: JSON.stringify(cv)
      });
      let data = await response.json();
      //När det är klart skrivs ett meddelande ut på skärmen att inlägget är sparat
      alert2.innerHTML = "Ditt inlägg är nu lagrat i databasen och går att se på startsidan.";
}

//Delete fetch-anrop som tar in ett id/index som skickas med till servern för att tas bort från databasen 
export async function apiDelete(id) {
      let response = await fetch(`https://dt207g-moment3.azurewebsites.net/api/delete/${id}`, {
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
