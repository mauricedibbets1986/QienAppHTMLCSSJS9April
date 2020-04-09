// ============================MEDEWERKER JS =============================
var username = localStorage.qienusername;
var password = localStorage.qienpassword;
checkLogin();

window.onload = function() {
this.start();
    
}

function start() {
    laadMedewerkerDashboard();
    laadUrendeclaratiesKort();
}

function checkLogin() {
    var xhr = new XMLHttpRequest();
    xhr.onreadystatechange = function(){
        if (xhr.readyState === XMLHttpRequest.DONE) {
            if (xhr.status === 'OK' || (xhr.status >= 200 && xhr.status < 400)) {
                var inhoudDB = JSON.parse(this.responseText);
                console.log("Ophalen gelukt");
                if (inhoudDB.gebruikerType === "Medewerker") {
                    console.log("Je bent een medewerker");
                } else if (inhoudDB.gebruikerType === "Admin") {
                    console.log("Je bent een admin.");
                    alert("You are not logged in as a medewerker. Try to login as a medewerker");
                    window.location.href = '../login.html';
                } else {
                    console.log("Geen idee wie je bent");
                    alert("You are not logged in as a medewerker. Try to login as a medewerker");
                    window.location.href = '../login.html';
                }
            } else {
                console.log("VERSTUREN IS NIET GELUKT!");
                alert("You are not logged in as a medewerker. Try to login as a medewerker");
                window.location.href = '../login.html';
            }
        }
    }
    xhr.open("GET", "https://api.qienurenapp.privatedns.org:9100/api/gebruikers/me/", true);
    xhr.setRequestHeader("Authorization", "Basic " + btoa(username + ":" + password));
    xhr.send();
}

// Active page
if (window.location.href.indexOf("dashboard") > -1) {
    document.getElementById("medewerker-dashboard-link").classList.add("current-nav-link");
}

// Active tab
if (window.location.href.indexOf("medewerker-dashboard") > -1) {
    document.getElementById("aside-medewerker-dashboard").classList.add("active");
    openGebruikerTab("medewerker-dashboard");
}
if (window.location.href.indexOf("medewerker-uren") > -1) {
    document.getElementById("aside-medewerker-uren").classList.add("active");
    openGebruikerTab("medewerker-uren");
}

// SHOW TAB SCREENS
function openGebruikerTab(tabname) {
    var i;
    var x = document.getElementsByClassName("content-wrapper");
    for (i = 0; i < x.length; i++) {
        x[i].style.display = "none";
    }
    document.getElementById(tabname).style.display = "flex";
}

function asideActive(elem) {
    var i;
    var y = document.getElementsByClassName("aside-link-block");
    for (i = 0; i < y.length; i++) {
        y[i].classList.remove("active")
    }
    elem.classList.add("active");
}

function openGebruikerTabFromOtherPage(tabname) {
    window.location.href = "../admin/dashboard.html#" + tabname;
}

// SHOW POPUPS
function openGebruikerPopup(popupname) {
    var i;
    var x = document.getElementsByClassName("popup-background");
    for (i = 0; i < x.length; i++) {
        x[i].style.display = "none";  
    }
    document.getElementById(popupname).style.display = "flex";  
}

function closeGebruikerPopup() {
    var i;
    var x = document.getElementsByClassName("popup-background");
    for (i = 0; i < x.length; i++) {
        x[i].style.display = "none";  
    }
}


// LAAD FUNCTIES
function laadMedewerkerDashboard() {
var xhr = new XMLHttpRequest();
xhr.onreadystatechange = function(){
    if (xhr.readyState === XMLHttpRequest.DONE) {
        if (xhr.status === 'OK' || (xhr.status >= 200 && xhr.status < 400)) {
            var inhoudDB = JSON.parse(this.responseText);
            console.log("Ophalen gelukt");
            if (inhoudDB.gebruikerType === "Medewerker") {
                console.log("Je bent een medewerker");
            } else if (inhoudDB.gebruikerType === "Admin") {
                console.log("Je bent een admin.");
                window.location.href = 'admin/dashboard.html';
            } else {
                console.log("Geen idee wie je bent");
                window.location.href = '../login.html';
            }
        } else {
            console.log("VERSTUREN IS NIET GELUKT!");
            window.location.href = '../login.html';
        }
    }

    var string1 = ""
    string1 += `
    <!--  MEDEWERKER NAVBAR  -->
    <div class="navbar">
        <div class="nav-container">
            <div class="content-flex"><a href="#" class="aside-wrapper aside-logo"><img src="../img/qien-logo-purple.svg" alt="Qien logo purple" class="logo"></a>
                <div class="main-content-wrapper">
                    <nav role="navigation" class="nav-menu">
                        <div class="nav-main-links-inner left">
                            <a id="medewerker-dashboard-link" href="../medewerker/dashboard.html" class="nav-link">Dashboard</a>
                            <a href="../medewerker/berichten.html" class="nav-link">Berichten</a>
                        </div>
                    </nav>
                </div>
                <div class="side-content-wrapper nav-side-content-wrapper">
                    <div class="nav-side-links-flex">
                        <div class="circle-button small-circle-button edit"></div>
                        <div class="circle-button small-circle-button edit"></div>
                        <div class="circle-button small-circle-button edit"></div>
                    </div>
                </div>
            </div>
        </div>
    </div>

    <!--  MAIN CONTENT OUTER  -->
    <div class="main-outer-wrapper">
        <div class="content-flex">

            <!--  ASIDE MEDEWERKER TABS/LINKS  -->
            <aside class="aside-wrapper">
                <div class="aside-links-wrapper">
                    <a onclick="openGebruikerTab('medewerkers-content'); asideActive(this)" class="aside-link-block"></a>
                    <a onclick="openGebruikerTab('uren-content'); asideActive(this)" class="aside-link-block uren-aside-link"></a>
                </div>
            </aside>

            <!--  MAIN CONTENT INNER  -->
            <div class="main-content-wrapper">
                <div class="main-container">
                
                    <!-- Scherm Profiel -->
                    <div id="medewerkers-content" class="content-wrapper">
                        <div class="main-header-flex">
                            <div class="gebruiker-header">
                                <div id="gebruiker-single-img-circle-dashboard" class="gebruiker-single-img-circle"></div>
                                <h1 class="h1 no-margin">${inhoudDB.voornaam} ${inhoudDB.achternaam}</h1>
                            </div>
                            <div onclick="openGebruikerPopup('gebruiker-zichzelf-aanpassen')" class="circle-button"></div>
                        </div>
                        <div class="content-sections-wrapper">
                            <!-- gegevens -->
                            <div class="content-section">
                                <h2>Gegevens</h2>
                                <div class="gebruiker-gegevens-flex">
                                    <div class="flex-item-block">
                                        <h3>NAW gegevens</h3>
                                        <div class="block-items-flex">
                                            <div class="gegevens-item">
                                                <div class="label">Titel</div>
                                                <div class="paragraph-content">mevr.</div>
                                            </div>
                                            <div class="gegevens-item">
                                                <div class="label">Voornaam</div>
                                                <div class="paragraph-content">${inhoudDB.voornaam}</div>
                                            </div>
                                            <div class="gegevens-item">
                                                <div class="label">Achternaam</div>
                                                <div class="paragraph-content">${inhoudDB.achternaam}</div>
                                            </div>
                                            <div class="gegevens-item">
                                                <div class="label">Adres</div>
                                                <div class="paragraph-content">${inhoudDB.adres}</div>
                                            </div>
                                            <div class="gegevens-item">
                                                <div class="label">Plaatsnaam</div>
                                                <div class="paragraph-content">${inhoudDB.plaats}</div>
                                            </div>
                                        </div>
                                    </div>
                                    <div class="flex-item-block">
                                        <h3>Contactgegevens</h3>
                                        <div class="block-items-flex">
                                        <div class="gegevens-item">
                                            <div class="label">E-mailadres</div>
                                            <div class="paragraph-content">${inhoudDB.email}</div>
                                        </div>
                                        <div class="gegevens-item">
                                            <div class="label">Telefoonnummer</div>
                                            <div class="paragraph-content">${inhoudDB.telefoonNummer}</div>
                                        </div>
                                        </div>
                                    </div>
                                    <div class="flex-item-block">
                                        <h3>Werkzaam bij</h3>
                                        <div class="block-items-flex">
                                            <div class="gegevens-item">
                                                <div class="label">Bedrijf</div>
                                                <div class="paragraph-content">${inhoudDB.opdrachtgever.bedrijfsnaam}</div>
                                            </div>
                                            <div class="gegevens-item">
                                                <div class="label">Datum in dienst</div>
                                                <div class="paragraph-content">${inhoudDB.opdrachtgever.datimInDienst}</div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            <!-- urendeclaraties -->
                            <div class="content-section">
                                <h2>Mijn urendeclaraties</h2>
                                <div class="uren-declaraties-block">
                                    <div class="labels-wrapper">
                                        <div class="uren-declaraties-flex">
                                            <div class="medewerkers-content-wrapper maand-wrapper">
                                                <div class="label label-small">Maand</div>
                                            </div>
                                            <div class="medewerkers-content-wrapper medewerker-name-wrapper">
                                                <div class="label label-small">Klant</div>
                                            </div>
                                            <div class="medewerkers-content-wrapper medewerker-uren-wrapper">
                                                <div class="label label-small">Totaal Uren</div>
                                            </div>
                                            <div class="medewerkers-content-wrapper medewerker-uren-wrapper">
                                                <div class="label label-small">Opdracht</div>
                                            </div>
                                            <div class="medewerkers-content-wrapper medewerker-uren-wrapper">
                                                <div class="label label-small">Verlof</div>
                                            </div>
                                            <div class="medewerkers-content-wrapper medewerker-uren-wrapper">
                                                <div class="label label-small">Ziek</div>
                                            </div>
                                            <div class="medewerkers-content-wrapper medewerker-uren-wrapper">
                                                <div class="label label-small">Training</div>
                                            </div>
                                            <div class="medewerkers-content-wrapper medewerker-uren-wrapper">
                                                <div class="label label-small">Overig</div>
                                            </div>
                                            <div class="medewerkers-content-wrapper status-wrapper">
                                                <div class="label label-small">Status</div>
                                            </div>
                                        </div>
                                    </div>
                                    <div id="urendeclaraties-short-outer" class="medewerker-outer">
                                        <div class="medewerkers-item-flex">
                                            <div class="medewerkers-content-wrapper maand-wrapper">
                                                <div class="paragraph-content">Februari</div>
                                            </div>
                                            <div class="medewerkers-content-wrapper medewerker-name-wrapper">
                                                <div class="paragraph-content">BedrijfsnaamX</div>
                                            </div>
                                            <div class="medewerkers-content-wrapper medewerker-uren-wrapper">
                                                <div class="paragraph-content">160</div>
                                            </div>
                                            <div class="medewerkers-content-wrapper medewerker-uren-wrapper">
                                                <div class="paragraph-content">120</div>
                                            </div>
                                            <div class="medewerkers-content-wrapper medewerker-uren-wrapper">
                                                <div class="paragraph-content">20</div>
                                            </div>
                                            <div class="medewerkers-content-wrapper medewerker-uren-wrapper">
                                                <div class="paragraph-content">0</div>
                                            </div>
                                            <div class="medewerkers-content-wrapper medewerker-uren-wrapper">
                                                <div class="paragraph-content">20</div>
                                            </div>
                                            <div class="medewerkers-content-wrapper medewerker-uren-wrapper">
                                                <div class="paragraph-content">0</div>
                                            </div>
                                            <div class="medewerkers-content-wrapper status-wrapper">
                                                <div class="paragraph-content">Beschikbaar</div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    
                    <!-- Scherm Urendeclaraties -->
                    <div id="uren-content" class="content-wrapper none-start">
                        <div class="main-header-flex">
                            <div class="gebruiker-header">
                                <div class="gebruiker-single-img-circle"></div>
                                <h1 class="h1 no-margin">Michiel Janssens</h1>
                            </div>
                            <div class="circle-button"></div>
                        </div>
                        <div class="content-sections-wrapper">
                            <div class="content-section">
                                <h2>Mijn uren declaraties</h2>
                                <div class="uren-declaraties-block">
                                    <div class="labels-wrapper">
                                        <div class="uren-declaraties-flex">
                                            <div class="medewerkers-content-wrapper maand-wrapper">
                                                <div class="label label-small">Maand</div>
                                            </div>
                                            <div class="medewerkers-content-wrapper medewerker-name-wrapper">
                                                <div class="label label-small">Klant</div>
                                            </div>
                                            <div class="medewerkers-content-wrapper medewerker-uren-wrapper">
                                                <div class="label label-small">Totaal</div>
                                            </div>
                                            <div class="medewerkers-content-wrapper medewerker-uren-wrapper">
                                                <div class="label label-small">Opdracht</div>
                                            </div>
                                            <div class="medewerkers-content-wrapper medewerker-uren-wrapper">
                                                <div class="label label-small">Verlof</div>
                                            </div>
                                            <div class="medewerkers-content-wrapper medewerker-uren-wrapper">
                                                <div class="label label-small">Ziek</div>
                                            </div>
                                            <div class="medewerkers-content-wrapper medewerker-uren-wrapper">
                                                <div class="label label-small">Training</div>
                                            </div>
                                            <div class="medewerkers-content-wrapper medewerker-uren-wrapper">
                                                <div class="label label-small">Overig</div>
                                            </div>
                                            <div class="medewerkers-content-wrapper status-wrapper">
                                                <div class="label label-small">Status</div>
                                            </div>
                                        </div>
                                    </div>
                                    <div id="alle-uren-declaraties" class="medewerker-outer">
                                        <div class="medewerkers-item-flex">
                                            <div class="medewerkers-content-wrapper maand-wrapper">
                                                <div class="paragraph-content">Februari</div>
                                            </div>
                                            <div class="medewerkers-content-wrapper medewerker-name-wrapper">
                                                <div class="paragraph-content">BedrijfsnaamX</div>
                                            </div>
                                            <div class="medewerkers-content-wrapper medewerker-uren-wrapper">
                                                <div class="paragraph-content">160</div>
                                            </div>
                                            <div class="medewerkers-content-wrapper medewerker-uren-wrapper">
                                                <div class="paragraph-content">120</div>
                                            </div>
                                            <div class="medewerkers-content-wrapper medewerker-uren-wrapper">
                                                <div class="paragraph-content">20</div>
                                            </div>
                                            <div class="medewerkers-content-wrapper medewerker-uren-wrapper">
                                                <div class="paragraph-content">0</div>
                                            </div>
                                            <div class="medewerkers-content-wrapper medewerker-uren-wrapper">
                                                <div class="paragraph-content">20</div>
                                            </div>
                                            <div class="medewerkers-content-wrapper medewerker-uren-wrapper">
                                                <div class="paragraph-content">0</div>
                                            </div>
                                            <div class="medewerkers-content-wrapper status-wrapper">
                                                <div class="paragraph-content">Beschikbaar</div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                    <!-- Scherm UrendeclaratiesSingle -->
                    <div id="uren-single-content" class="content-wrapper none-start">
                        <!-- wordt geladen js -->
                    </div>


                    <!-- POPUPS -->
                    <div id="gebruiker-zichzelf-aanpassen" class="popup-background">
                        <div class="popup-wrapper">
                            <h2 class="h2">Aanpassen Gegevens</h2>
                            <form id="medewerker-aanpassen" name="medewerker-aanpassen" class="popup-form">
                                <div class="form-rows-wrapper">
                                    <div class="form-flex">
                                        <div class="form-item small">
                                            <label for="aanhef" class="label form-label">Aanhef</label>
                                            <select id="aanhef" name="aanhef" data-name="Aanhef" required="" class="text-field select-field">
                                                <option value="dhr">dhr.</option>
                                                <option value="mvr">mvr.</option>
                                            </select>
                                        </div>
                                        <div class="form-item">
                                            <label for="voornaam" class="label form-label">Voornaam</label>
                                            <input type="text" class="text-field" maxlength="256" name="voornaam" data-name="Voornaam" id="voornaam">
                                        </div>
                                        <div class="form-item">
                                            <label for="achternaam" class="label form-label">Achternaam</label>
                                            <input type="text" class="text-field" maxlength="256" name="achternaam" data-name="Achternaam" id="achternaam">
                                        </div>
                                    </div>
                                    <div class="form-flex">
                                        <div class="form-item">
                                            <label for="email" class="label form-label">E-mailadres</label>
                                            <input type="email" class="text-field" maxlength="256" name="email" data-name="Email" id="email" required="">
                                        </div>
                                        <div class="form-item">
                                            <label for="telefoon" class="label form-label">Telefoonnummer</label>
                                            <input type="text" class="text-field" maxlength="256" name="telefoon" data-name="Telefoon" id="telefoon">
                                        </div>
                                    </div>
                                    <div class="form-flex">
                                        <div class="form-item">
                                            <label for="datum-in-dienst" class="label form-label">Adres</label>
                                            <input type="text" class="text-field" maxlength="256" name="datum-in-dienst" data-name="Datum In Dienst" id="datum-in-dienst" required="">
                                        </div>
                                        <div class="form-item">
                                            <label for="datum-in-dienst-2" class="label form-label">Plaats</label>
                                            <input type="text" class="text-field" maxlength="256" name="datum-in-dienst-2" data-name="Datum In Dienst 2" id="datum-in-dienst-2" required="">
                                        </div>
                                    </div>
                                </div>
                                <div class="popup-form-buton-wrapper">
                                    <input type="submit" value="Wijzigen" data-wait="Please wait..." class="button accent-1">
                                </div>
                            </form>
                            <div class="form-done">
                                <div>Bedankt jouw gegevens zijn aangepast!</div>
                            </div>
                            <div class="form-fail">
                                <div></div>
                            </div>
                            <div onclick="closeGebruikerPopup()" class="close-button"></div>
                        </div>
                    </div>

                </div>
            </div>

            <!-- SIDE RECHTS -->
            <div class="side-content-wrapper">
                <div class="side-section">
                    <div class="welcome-flex">
                        <div class="welcome-text">Hello,<span class="bold-span"> Michiel</span></div>
                        <div class="welcome-img-circle"></div>
                    </div>
                </div>
                <div class="side-section">
                    <div class="side-info-flex">
                        <div class="side-info-item">
                            <div class="label label-large">Uren Mei</div>
                            <div class="info-amount-wrapper">
                                <div>75</div>
                            </div>
                        </div>
                        <div class="side-info-item">
                            <div class="label label-large">Uren April</div>
                            <div class="info-amount-wrapper accent-1">
                                <div>31</div>
                            </div>
                        </div>
                        <div class="side-info-item no-margin">
                            <div class="label label-large">Aantal Urendeclaraties</div>
                            <div class="info-amount-wrapper accent-2">
                                <div>1230</div>
                            </div>
                        </div>
                        <div class="side-info-item no-margin">
                            <div class="label label-large">Totaal uren</div>
                            <div class="info-amount-wrapper accent-3">
                                <div>81%</div>
                            </div>
                        </div>
                    </div>
                </div>
                <div class="side-section">
                    <h1 class="h1 side-h1">Activiteiten<br><span class="bold-span">feed</span></h1>
                </div>
            </div>

        </div>
    </div>
        `;
    document.getElementById("medewerker-app-wrapper").innerHTML = string1;
    laadUrendeclaratiesKort(inhoudDB.id);
    laadUrendeclaratiesAlles(inhoudDB.id);
    laadSingleMedewerkerWijzigen(inhoudDB.id);

    if (inhoudDB.afbeelding == null) {
        console.log(inhoudDB.afbeelding);
        document.getElementById("gebruiker-single-img-circle-dashboard").style.backgroundImage = "url('../img/qien-logo-purple.svg')";
    } else {
        console.log(inhoudDB.afbeelding );
        document.getElementById("gebruiker-single-img-circle-dashboard").style.backgroundImage = "url('../img/medewerkers/" + inhoudDB.afbeelding + "'";
    }

    }
xhr.open("GET", "https://api.qienurenapp.privatedns.org:9100/api/gebruikers/me/", true);
xhr.setRequestHeader("Authorization", "Basic " + btoa(username + ":" + password));
xhr.send();

}

function laadUrendeclaratiesKort(id) {
    var xhr = new XMLHttpRequest();
    xhr.onreadystatechange = function(){
        var inhoudDB = JSON.parse(this.responseText);
        var string1 = "";

        for (x=0; x < inhoudDB.length && x < 3; x++) {
            let totaalAantalUrenOpdracht = 0;
            let totaalAantalUrenOverwerk = 0;
            let totaalAantalUrenVerlof = 0;
            let totaalAantalUrenZiek = 0;
            let totaalAantalUrenTraining = 0;
            let totaalAantalUrenOverig = 0;
            let totaalAantalUren = 0;

            for (y=0; y < inhoudDB[x].gewerkteDagen.length; y++) {
                totaalAantalUrenOpdracht += inhoudDB[x].gewerkteDagen[y].aantalUrenOpdracht;
                totaalAantalUrenOverwerk += inhoudDB[x].gewerkteDagen[y].aantalUrenOverwerk;
                totaalAantalUrenVerlof += inhoudDB[x].gewerkteDagen[y].aantalUrenVerlof;
                totaalAantalUrenZiek += inhoudDB[x].gewerkteDagen[y].aantalUrenZiek;
                totaalAantalUrenTraining += inhoudDB[x].gewerkteDagen[y].aantalUrenTraining;
                totaalAantalUrenOverig += inhoudDB[x].gewerkteDagen[y].aantalUrenOverig;
            }
            totaalAantalUren = totaalAantalUrenOpdracht + totaalAantalUrenOverwerk + totaalAantalUrenVerlof + totaalAantalUrenZiek + totaalAantalUrenTraining + totaalAantalUrenOverig;

            string1 += `
            <div class="medewerkers-inner">
            <div class="medewerkers-item-flex" onclick="laadSingleUrendeclaratie(${inhoudDB[x].id}); openGebruikerTab('uren-single-content')">
                <div class="medewerkers-content-wrapper maand-wrapper">
                    <div class="paragraph-content">${inhoudDB[x].maandNaam}</div>
                </div>
                <div class="medewerkers-content-wrapper medewerker-name-wrapper">
                    <div class="paragraph-content">${inhoudDB[x].medewerker.opdrachtgever.bedrijfsnaam}</div>
                </div>
                <div class="medewerkers-content-wrapper medewerker-uren-wrapper">
                    <div class="paragraph-content">${totaalAantalUren}</div>
                </div>
                <div class="medewerkers-content-wrapper medewerker-uren-wrapper">
                    <div class="paragraph-content">${totaalAantalUrenOpdracht}</div>
                </div>
                <div class="medewerkers-content-wrapper medewerker-uren-wrapper">
                    <div class="paragraph-content">${totaalAantalUrenVerlof}</div>
                </div>
                <div class="medewerkers-content-wrapper medewerker-uren-wrapper">
                    <div class="paragraph-content">${totaalAantalUrenZiek}</div>
                </div>
                <div class="medewerkers-content-wrapper medewerker-uren-wrapper">
                    <div class="paragraph-content">${totaalAantalUrenTraining}</div>
                </div>
                <div class="medewerkers-content-wrapper medewerker-uren-wrapper">
                    <div class="paragraph-content">${totaalAantalUrenOverig}</div>
                </div>
                <div class="medewerkers-content-wrapper status-wrapper">
                    <div class="paragraph-content">${inhoudDB[x].status}</div>
                </div>
            </div>
            </div>
            `;
        }
        document.getElementById("urendeclaraties-short-outer").innerHTML = string1;

    }
    xhr.open("GET", "https://api.qienurenapp.privatedns.org:9100/api/urendeclaraties/metmedewerkerid/" + id, true);
    xhr.setRequestHeader("Authorization", "Basic " + btoa(username + ":" + password));
    xhr.send();
}

function laadUrendeclaratiesAlles(id) {
    var xhr = new XMLHttpRequest();
    xhr.onreadystatechange = function(){
        var inhoudDB = JSON.parse(this.responseText);
        var string1 = "";

        for (x=0; x < inhoudDB.length; x++) {
            let totaalAantalUrenOpdracht = 0;
            let totaalAantalUrenOverwerk = 0;
            let totaalAantalUrenVerlof = 0;
            let totaalAantalUrenZiek = 0;
            let totaalAantalUrenTraining = 0;
            let totaalAantalUrenOverig = 0;
            let totaalAantalUren = 0;

            for (y=0; y < inhoudDB[x].gewerkteDagen.length; y++) {
                totaalAantalUrenOpdracht += inhoudDB[x].gewerkteDagen[y].aantalUrenOpdracht;
                totaalAantalUrenOverwerk += inhoudDB[x].gewerkteDagen[y].aantalUrenOverwerk;
                totaalAantalUrenVerlof += inhoudDB[x].gewerkteDagen[y].aantalUrenVerlof;
                totaalAantalUrenZiek += inhoudDB[x].gewerkteDagen[y].aantalUrenZiek;
                totaalAantalUrenTraining += inhoudDB[x].gewerkteDagen[y].aantalUrenTraining;
                totaalAantalUrenOverig += inhoudDB[x].gewerkteDagen[y].aantalUrenOverig;
            }
            totaalAantalUren = totaalAantalUrenOpdracht + totaalAantalUrenOverwerk + totaalAantalUrenVerlof + totaalAantalUrenZiek + totaalAantalUrenTraining + totaalAantalUrenOverig;

            string1 += `
            <div class="medewerkers-item-flex" onclick="laadSingleUrendeclaratie(${inhoudDB[x].id}); openGebruikerTab('uren-single-content')"">
                <div class="medewerkers-content-wrapper maand-wrapper">
                    <div class="paragraph-content">${inhoudDB[x].maandNaam}</div>
                </div>
                <div class="medewerkers-content-wrapper medewerker-name-wrapper">
                    <div class="paragraph-content">${inhoudDB[x].medewerker.opdrachtgever.bedrijfsnaam}</div>
                </div>
                <div class="medewerkers-content-wrapper medewerker-uren-wrapper">
                    <div class="paragraph-content">${totaalAantalUren}</div>
                </div>
                <div class="medewerkers-content-wrapper medewerker-uren-wrapper">
                    <div class="paragraph-content">${totaalAantalUrenOpdracht}</div>
                </div>
                <div class="medewerkers-content-wrapper medewerker-uren-wrapper">
                    <div class="paragraph-content">${totaalAantalUrenVerlof}</div>
                </div>
                <div class="medewerkers-content-wrapper medewerker-uren-wrapper">
                    <div class="paragraph-content">${totaalAantalUrenZiek}</div>
                </div>
                <div class="medewerkers-content-wrapper medewerker-uren-wrapper">
                    <div class="paragraph-content">${totaalAantalUrenTraining}</div>
                </div>
                <div class="medewerkers-content-wrapper medewerker-uren-wrapper">
                    <div class="paragraph-content">${totaalAantalUrenOverig}</div>
                </div>
                <div class="medewerkers-content-wrapper status-wrapper">
                    <div class="paragraph-content">${inhoudDB[x].status}</div>
                </div>
            </div>
            `;
        }
        document.getElementById("alle-uren-declaraties").innerHTML = string1;
    }
    xhr.open("GET", "https://api.qienurenapp.privatedns.org:9100/api/urendeclaraties/metmedewerkerid/" + id, true);
    xhr.setRequestHeader("Authorization", "Basic " + btoa(username + ":" + password));
    xhr.send();
}

var mijnUrendeclaratie;
function laadSingleUrendeclaratie(id) {
    var xhr = new XMLHttpRequest();
    xhr.onreadystatechange = function(){
        var inhoudDB = JSON.parse(this.responseText);
        mijnUrendeclaratie = inhoudDB;
        console.table(inhoudDB);
        var string1 = 
            `<div class="main-header-flex">
                <div class="gebruiker-header">
                    <h1 class="h1 no-margin">Urendeclaraties / ${inhoudDB.maandNaam}</h1>
                </div>
                <div class="medewerker-header-tools">
                    <h3>Status: ${inhoudDB.status}</h3>
                </div>
                </div>
                    <div class="content-sections-wrapper">
                         <div class="urendeclaratie-flex">
                            <div class="urendeclaratie-inhoud-wrapper">
                                <div class="rows-wrapper">
                                    <div class="labels-wrapper">
                                        <div class="uren-declaraties-flex">
                                            <div class="medewerkers-content-wrapper datum-small-wrapper">
                                                <div class="label label-small">Datum</div>
                                            </div>
                                            <div class="medewerkers-content-wrapper medewerker-uren-wrapper">
                                                <div class="label label-small">Opdracht</div>
                                            </div>
                                            <div class="medewerkers-content-wrapper medewerker-uren-wrapper">
                                                <div class="label label-small">Overwerk</div>
                                            </div>
                                            <div class="medewerkers-content-wrapper medewerker-uren-wrapper">
                                                <div class="label label-small">Verlof</div>
                                            </div>
                                            <div class="medewerkers-content-wrapper medewerker-uren-wrapper">
                                                <div class="label label-small">Ziek</div>
                                            </div>
                                            <div class="medewerkers-content-wrapper medewerker-uren-wrapper">
                                                <div class="label label-small">Training</div>
                                            </div>
                                            <div class="medewerkers-content-wrapper medewerker-uren-wrapper">
                                                <div class="label label-small">Overig</div>
                                            </div>
                                            <div class="medewerkers-content-wrapper medewerker-verklaring-wrapper">
                                                <div class="label label-small">Verklaring overig</div>
                                            </div>
                                        </div>
                                    </div>
                                    <div class="medewerkers-outer">`;
            for (y = 0; y < inhoudDB.gewerkteDagen.length; y++) {
                var verklaringText = "";
                if (inhoudDB.gewerkteDagen[y].verklaringOverig == null) {
                    verklaringText = "";
                } else {
                    verklaringText = inhoudDB.gewerkteDagen[y].verklaringOverig;
                }
                string1 +=          `<form class ="medewerkers-inner">
                                        <div class="medewerkers-item-flex">
                                        <div class="medewerkers-content-wrapper datum-small-wrapper">
                                            <div class="paragraph-content">${inhoudDB.gewerkteDagen[y].dagnr} ${inhoudDB.maandNaam.substring(0,4)}</div>
                                        </div>
                                        <div class="medewerkers-content-wrapper medewerker-uren-wrapper">
                                            <input class="urenform-input" type="number" id="aantalUrenOpdracht${inhoudDB.gewerkteDagen[y].id}" name="aantalUrenOpdracht${inhoudDB.gewerkteDagen[y].id}" 
                                            value="${inhoudDB.gewerkteDagen[y].aantalUrenOpdracht}" onchange="changeUren(${inhoudDB.gewerkteDagen[y].id})">
                                        </div>
                                        <div class="medewerkers-content-wrapper medewerker-uren-wrapper">
                                            <input class="urenform-input" type="number" id="aantalUrenOverwerk${inhoudDB.gewerkteDagen[y].id}" name="aantalUrenOverwerk${inhoudDB.gewerkteDagen[y].id}" 
                                            value="${inhoudDB.gewerkteDagen[y].aantalUrenOverwerk}" onchange="changeUren(${inhoudDB.gewerkteDagen[y].id})"> 
                                        </div>
                                        <div class="medewerkers-content-wrapper medewerker-uren-wrapper">
                                            <input class="urenform-input" type="number" id="aantalUrenVerlof${inhoudDB.gewerkteDagen[y].id}" name="aantalUrenVerlof${inhoudDB.gewerkteDagen[y].id}" 
                                            value="${inhoudDB.gewerkteDagen[y].aantalUrenVerlof}" onchange="changeUren(${inhoudDB.gewerkteDagen[y].id})"> 
                                        </div>
                                        <div class="medewerkers-content-wrapper medewerker-uren-wrapper">
                                            <input class="urenform-input" type="number" id="aantalUrenZiek${inhoudDB.gewerkteDagen[y].id}" name="aantalUrenZiek${inhoudDB.gewerkteDagen[y].id}" 
                                            value="${inhoudDB.gewerkteDagen[y].aantalUrenZiek}" onchange="changeUren(${inhoudDB.gewerkteDagen[y].id})"> 
                                        </div>
                                        <div class="medewerkers-content-wrapper medewerker-uren-wrapper">
                                            <input class="urenform-input" type="number" id="aantalUrenTraining${inhoudDB.gewerkteDagen[y].id}" name="aantalUrenTraining${inhoudDB.gewerkteDagen[y].id}" 
                                            value="${inhoudDB.gewerkteDagen[y].aantalUrenTraining}" onchange="changeUren(${inhoudDB.gewerkteDagen[y].id})"> 
                                        </div>
                                        <div class="medewerkers-content-wrapper medewerker-uren-wrapper">
                                            <input class="urenform-input" type="number" id="aantalUrenOverig${inhoudDB.gewerkteDagen[y].id}" name="aantalUrenOverig${inhoudDB.gewerkteDagen[y].id}" 
                                            value="${inhoudDB.gewerkteDagen[y].aantalUrenOverig}" onchange="changeUren(${inhoudDB.gewerkteDagen[y].id})"> 
                                        </div>
                                        <div class="medewerkers-content-wrapper medewerker-verklaring-wrapper">
                                            <input class="text-field" type="text" id="verklaringOverig${inhoudDB.gewerkteDagen[y].id}" name="verklaringOverig${inhoudDB.gewerkteDagen[y].id}" 
                                            value="${verklaringText}" onchange="changeUren(${inhoudDB.gewerkteDagen[y].id})"> 
                                    </div>
                                        </div>
                                    </form>`;
            }
            string1 += `
                                </div>
                            </div>
                        </div>
                        <div class="uren-declaratie-side-info-wrapper">
                            <div class="uren-declaratie-side-info-item">
                                <div class="label">Mogelijke acties</div>
                                <div class="acties-link-text" onclick="stuurTerGoedkeuring(${inhoudDB.id})">Versturen</div>
                            </div>
                            <div class="uren-declaratie-side-info-item">
                                <div class="label">Berichten bij deze urendeclaratie</div>
                                <div class="acties-link-text">functie nog bouwen</div>
                            </div>
                            <div class="uren-declaratie-side-info-item">
                                <div class="label margin-bottom">Contactpersoon:</div>
                                <div class="medewerkers-item-flex">
                                    <div class="medewerkers-content-wrapper">
                                        <div class="gebruiker-img-circle"></div>
                                    </div>
                                    <div class="medewerkers-content-wrapper medewerker-name-wrapper">
                                        <div class="paragraph-content">Naam contactpersoon</div>
                                    </div>
                                </div>
                            </div>
                        </div>`;
        document.getElementById("uren-single-content").innerHTML = string1;
        inputActive();
    }
    xhr.open("GET","https://api.qienurenapp.privatedns.org:9100/api/urendeclaraties/" + id, true);
    xhr.setRequestHeader("Authorization", "Basic " + btoa(username + ":" + password));
    xhr.send();
}

function inputActive() {
    $('.urenform-input').each(function(i, obj) {
        if(this.value > 0){
            this.classList.add('filled');
        } else {
            this.classList.remove('filled');
        }
     });
}



// CHANGE FUNCTIES
function changeUren(id) {
    var url = "https://api.qienurenapp.privatedns.org:9100/api/urendeclaraties/gewerktedag/";
    var gewerkteDag = {
        aantalUrenOpdracht : document.getElementById(`aantalUrenOpdracht${id}`).value,
        aantalUrenOverwerk : document.getElementById(`aantalUrenOverwerk${id}`).value,
        aantalUrenVerlof : document.getElementById(`aantalUrenVerlof${id}`).value,
        aantalUrenZiek : document.getElementById(`aantalUrenZiek${id}`).value,
        aantalUrenTraining : document.getElementById(`aantalUrenTraining${id}`).value,
        aantalUrenOverig : document.getElementById(`aantalUrenOverig${id}`).value,
        verklaringOverig : document.getElementById(`verklaringOverig${id}`).value,
    };
    var json = JSON.stringify(gewerkteDag);

    var xhr = new XMLHttpRequest();
    xhr.open("PUT", url+id, true);
    xhr.setRequestHeader('Content-type','application/json; charset=utf-8');
    xhr.setRequestHeader("Authorization", "Basic " + btoa(username + ":" + password));
    // xhr.onload = function () {}
    xhr.onreadystatechange = function() {
        inputActive();
        laadUrendeclaratiesAlles();
        laadUrendeclaratiesKort();
    }
    xhr.send(json);
}


function laadSingleMedewerkerWijzigen(id) {
    var xhr = new XMLHttpRequest();
    xhr.onreadystatechange = function(){
        var inhoudDB = JSON.parse(this.responseText);
        var string1 = `
        <div class="popup-wrapper">
        <h2>Aanpassen: ${inhoudDB.voornaam} ${inhoudDB.achternaam}</h2>
        <form id="medewerker-wijzigen" name="medewerker-wijzigen" class="popup-form">
            <div class="form-rows-wrapper">
                <div class="form-flex">
                    <div class="form-item small">
                        <label for="aanhef" class="label form-label">Aanhef</label>
                        <select id="aanhef" name="aanhef" data-name="Aanhef" required="" class="text-field select-field">
                            <option value="dhr" selected="selected">dhr.</option>
                            <option value="mvr">mvr.</option>
                        </select>
                    </div>
                    <div class="form-item">
                        <label for="voornaam-change" class="label form-label">Voornaam</label>
                        <input type="text" class="text-field" maxlength="256" name="voornaam-change" data-name="Voornaam-change" id="voornaam-change" value=${inhoudDB.voornaam}>
                    </div>
                    <div class="form-item">
                        <label for="achternaam-change" class="label form-label">Achternaam</label>
                        <input type="text" class="text-field" maxlength="256" name="achternaam-change" data-name="Achternaam-change" id="achternaam-change" value=${inhoudDB.achternaam}>
                    </div>
                </div>
                <div class="form-flex">
                    <div class="form-item">
                        <label for="email-change" class="label form-label">E-mailadres</label>
                        <input type="email" class="text-field" maxlength="256" name="email-change" data-name="Email-change" id="email-change" required="" value=${inhoudDB.email}>
                    </div>
                    <div class="form-item">
                        <label for="telefoon-change" class="label form-label">Telefoonnummer</label>
                        <input type="text" class="text-field" maxlength="256" name="telefoon-change" data-name="Telefoon-change" id="telefoon-change" value=${inhoudDB.telefoonNummer}>
                    </div>
                </div>
                <div class="form-flex">
                    <div class="form-item">
                        <label for="adres-change" class="label form-label">Adres</label>
                        <input type="text" class="text-field" maxlength="256" name="adres-change" data-name="Adres-change" id="adres-change" required="" value=${inhoudDB.adres}>
                    </div>
                    <div class="form-item">
                        <label for="plaats-change" class="label form-label">Plaats</label>
                        <input type="text" class="text-field" maxlength="256" name="plaats" data-name="Plaats-change" id="plaats-change" required="" value=${inhoudDB.plaats}>
                    </div>
                </div>
            </div>
            <div class="popup-form-buton-wrapper">
                <input type="button" value="Wijzigen" data-wait="Please wait..." class="button accent-1" onclick="changeMedewerker(${inhoudDB.id})">
            </div>
        </form>
        <div onclick="closeGebruikerPopup()" class="close-button"></div>
    </div>
        `;
        
        document.getElementById("gebruiker-zichzelf-aanpassen").innerHTML = string1;
    }

    xhr.open("GET","https://api.qienurenapp.privatedns.org:9100/api/medewerkers/" + id, true);
    xhr.setRequestHeader("Authorization", "Basic " + btoa(username + ":" + password));
    xhr.send();
}

function changeMedewerker(id) {
    var url = "https://api.qienurenapp.privatedns.org:9100/api/medewerkers/me";
    var persoon = {
        voornaam : document.getElementById('voornaam-change').value,
        achternaam : document.getElementById('achternaam-change').value,
        email : document.getElementById('email-change').value,
        adres : document.getElementById('adres-change').value,
        plaats : document.getElementById('plaats-change').value,
        telefoonNummer : document.getElementById('telefoon-change').value,
     // wachtwoordHash : 
    };
    var json = JSON.stringify(persoon);

    var xhr = new XMLHttpRequest();
    xhr.open("PUT", url, true);
    xhr.setRequestHeader('Content-type','application/json; charset=utf-8');
    xhr.setRequestHeader("Authorization", "Basic " + btoa(username + ":" + password));
    
    xhr.onload = function () {
        var users = JSON.parse(xhr.responseText);
        if (xhr.readyState == 4 && xhr.status == "200") {
            console.table(users);
        } else {
            console.error(users);
        }
    }
    xhr.onreadystatechange = function() {
        closeGebruikerPopup();
    }
    xhr.send(json);
}



//MICHIEL
function stuurTerGoedkeuring ( id ){
    var xhr = new XMLHttpRequest();
   
        xhr.onreadystatechange = function () {
            if (xhr.readyState == 4 && xhr.status == "200") {
           statusWijzigen(mijnUrendeclaratie);
            }
        }
    xhr.open("GET", "https://api.qienurenapp.privatedns.org:9100/api/email/" + id + "/", true);
    xhr.setRequestHeader('Content-type','application/json; charset=utf-8');
    //xhr.setRequestHeader("Authorization", "Basic " + btoa(username + ":" + password));
    xhr.send();
}

function statusWijzigen ( mijnUrendeclaratie ){
    mijnUrendeclaratie.status = "TER_GOEDKEURING";
    var udec = JSON.stringify(mijnUrendeclaratie);
    var xhr = new XMLHttpRequest();
    xhr.onreadystatechange = function () {
        if (xhr.readyState == 4 && xhr.status == "200") {

        } 
        laadUrendeclaratiesAlles();
        laadUrendeclaratiesKort();
        laadSingleUrendeclaratie();
    }
    xhr.open("PUT", "https://api.qienurenapp.privatedns.org:9100/api/urendeclaraties/", true);
    xhr.setRequestHeader('Content-type','application/json; charset=utf-8');
    xhr.setRequestHeader("Authorization", "Basic " + btoa(username + ":" + password));
    xhr.send(udec);
}
