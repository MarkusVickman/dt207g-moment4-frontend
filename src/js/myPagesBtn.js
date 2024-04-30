//Används enbart för att dirigera användaren när mina sidor-knappen används i menyn. Om man inte är inloggad skickas användaren till inloggningssidan.

let myPages = document.getElementById("my-pages-btn");


document.addEventListener("DOMContentLoaded", (e) => {
    myPages.addEventListener("click", (e) => {
    if (!sessionStorage.getItem("token")) {
        window.location.href = "login.html";
    } else {
        window.location.href = "cv.html";
    }
});
});