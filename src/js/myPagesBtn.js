

let myPages = document.getElementById("my-pages-btn");


document.addEventListener("DOMContentLoaded", (e) => {
    myPages.addEventListener("click", (e) => {
    if (!sessionStorage.getItem("token")) {
        window.location.href = "login.html";
    } else {
        window.location.href = "my_cv.html";
    }
});
});