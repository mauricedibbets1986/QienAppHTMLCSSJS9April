// INLOGGEN
function inloggen() {
    var username = document.getElementById('login-email').value;
    var password = document.getElementById('login-password').value;



    localStorage.setItem("qienusername", username);
    localStorage.setItem("qienpassword", password);

    var xhr = new XMLHttpRequest();

    xhr.onreadystatechange = function(){

        if (xhr.readyState === XMLHttpRequest.DONE) {
        
            if (xhr.status === 'OK' || (xhr.status >= 200 && xhr.status < 400)) {
        
                var inhoudDB = JSON.parse(this.responseText);
                console.log("VERSTUREN GELUKT!");
        
                if (inhoudDB.gebruikerType === "Medewerker") {
                    console.log("Je bent een medewerker.");
                    window.location.href = 'medewerker/dashboard.html';
                } else if (inhoudDB.gebruikerType === "Admin") {
                    console.log("Je bent een admin.");
                    window.location.href = 'admin/dashboard.html';

                } else {
                    alert("who are you?");
                }

            } else {
                console.log("VERSTUREN IS NIET GELUKT!");
                alert("emailadres of wachtwoord is onjuist");
            }
        }
    }
    xhr.open("GET", "https://api.qienurenapp.privatedns.org:9100/api/gebruikers/me/", true);
    xhr.setRequestHeader("Authorization", "Basic " + btoa(username + ":" + password));
    xhr.send();

}