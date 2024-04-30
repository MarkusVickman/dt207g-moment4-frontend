//JS-fil med funktion för att samla in inloggnings/registreringsdata från formulär och skicka vidare till rätt api

let alertMessage = document.getElementById("alert1");

//Funktion för att logga in på sidan och spara en JWT-token i sessionstorage för authentizering
function apiLogin (login){
fetch('https://dt207g-moment4.azurewebsites.net/api/login', {
    method: 'POST',
    headers: {
        'Content-Type': 'application/json'
    },
    body: JSON.stringify(login)
})
.then(response => {
    if (!response.ok) {
        throw new Error("Fel lösenord eller användarnamn");
    }
    return response.json();
})
    .then(data => {
        sessionStorage.setItem('token', data.token);
        window.location.href = "cv.html";
    })
    .catch(error => {
        alertMessage.innerHTML = 'Fel vid inloggning: ' + error.message;
});
};

//Funktion för att registrera en användare i databasen som sedan går att logga in till.
function apiRegister (login){
    fetch('https://dt207g-moment4.azurewebsites.net/api/register', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(login)
    })
    .then(response => {
        if (!response.ok) {
            throw new Error('Testa ett annat användarnamn.');
        }
        return response.json();
    })
        .then(data => {
            window.location.href = "login.html";
        })
        .catch(error => {
            alertMessage.innerHTML = ('Fel vid Registrering:', error.message);
    });
    };
    
document.addEventListener("DOMContentLoaded", (event) => {
    // Lägg till händelselyssnare på formuläret
    form.addEventListener("submit", (e) => {
        let submit = document.getElementById("submit");
        e.preventDefault();
        // Hämta användarnamn i lowerCase och lösenord från formuläret
        let userName = document.getElementById("user_name").value.toLowerCase();
        let password = document.getElementById("password").value;

        //Letar fel i formuläret med errorCheck funktionen. Utan fel så skapas ett object som skickas till funktionen för POST-anrop
        if (errorCheck(userName, password)) {
            alertMessage.innerHTML = "";
            const login = { username: userName, password: password };

            //Utifrån sumbit-knappens titel väljs om en registrering eller inloggning ska göras. Ett object skickas med inloggningsinformation
            if(submit.title === "login"){          
            apiLogin(login);
            } else if(submit.title === "register"){
                apiRegister(login);
            }
            //Resettar formuläret om det är korrekt ifyllt
            document.getElementById("user_name").value = "";
            document.getElementById("password").value = "";
        }
    });
});

//Checkar efter fel i formuläret och skriver ut felmeddelande i så fall annars returnerar true
function errorCheck(userName, password) {
    let inputErrors = [];
    //Flera if satser för att välja vilka felmeddelanden som ska tar med
    if (userName === "") {
        inputErrors.push("användarnamn");
    }
    if (password.length < 6) {
        inputErrors.push(" lösenordet måste vara minst 6 tecken långt ");
    }

    //Om fel inte finns skapas en nytt inlägg i databasen och startsidan laddas
    if (inputErrors.length === 0) {
        return true;
    }
    //Om fel finns skrivs alla dessa ut på sidan
    else {
        alertMessage.innerHTML = "Fyll i " + inputErrors;
        return false;
    }
}
