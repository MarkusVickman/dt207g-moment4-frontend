
window.onload = init;

async function init() {

    if (!sessionStorage.getItem("token")) {
        window.location.href = "login.html";
    }

    await fetch('https://dt207g-moment4.azurewebsites.net/api/protected', {
        method: 'GET',
        headers: {
            'authorization': 'Bearer ' + sessionStorage.getItem("token")
        }
    })
    .then(response => {
        if (!response.ok) {
            throw new Error('Login to access this page.');
        }
        return response.json();
    })
        .catch(error => {
            error, 'Autentication failed:', error.message;
            window.location.href = "login.html";
    });

};
