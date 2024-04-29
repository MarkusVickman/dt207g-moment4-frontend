


let login = document.getElementById("login-btn");
let logout = document.getElementById("logout-btn");

window.onload = checkLoggedInStatus();

function checkLoggedInStatus(){
    if (!sessionStorage.getItem("token")) {
        logout.style.display = "none";
        login.style.display = "block";
    } else {
        login.style.display = "none";
        logout.style.display = "block";
    }
};

document.addEventListener("DOMContentLoaded", (e) => {
    login.addEventListener("click", (e) => {
        window.location.href = "login.html";
    });

    logout.addEventListener("click", (e) => {
        window.location.href = "index.html";
        sessionStorage.removeItem("token");
    });
    
});
