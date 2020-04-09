function start() {
    showMedewerkerInfo();
    showUrendeclaratie();
}
window.onload = start;

// VAR UIT URL PLUKKEN
function GetUrlValue(VarSearch) {
    var SearchString = window.location.search.substring(1);
    var VariableArray = SearchString.split('&');
    for (var i = 0; i < VariableArray.length; i++) {
        var KeyValuePair = VariableArray[i].split('=');
        if (KeyValuePair[0] == VarSearch) {
            return KeyValuePair[1];
        }
    }
}
alert("werkt het wel?");
alert(GetUrlValue('uno'));
alert(GetUrlValue('dos'));

// function showMedewerkerInfo() {
//     const uid = GetUrlValue('uno');
//     var xhr = new XMLHttpRequest();
//     xhr.onreadystatechange = function () {
//         console.log(this.responseText),
//             document.getElementById("medewerkerinfodiv").innerHTML = this.responseText;
//     }
//     xhr.open("GET", "https://api.qienurenapp.privatedns.org:9100/api/urendeclaraties/medewerkerinfo/" + uid, true);
//     xhr.setRequestHeader("Authorization", "Basic " + btoa(username + ":" + password));
//     xhr.send();
// }


function showUrendeclaratie() {
    const uid = GetUrlValue('uno');
    var xhr = new XMLHttpRequest();
    xhr.onreadystatechange = function(){
        var inhoudDB = JSON.parse(this.responseText);
        var string1 = 
            `<div class="main-header-flex">
                <div class="gebruiker-header">
                    <h1 class="h1 no-margin">Urendeclaraties / ${inhoudDB.maandNaam}, ${inhoudDB.medewerker.voornaam} ${inhoudDB.medewerker.achternaam}</h1>
                </div>
                <div class="medewerker-header-tools">
                    <div>Status afgekeurd</div>
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
                                        </div>
                                    </div>
                                    <div class="medewerkers-outer">`;
            for (y = 0; y < inhoudDB.gewerkteDagen.length; y++) {
                string1 +=          `<div class ="medewerkers-inner">
                                        <div class="medewerkers-item-flex">
                                        <div class="medewerkers-content-wrapper datum-small-wrapper">
                                            <div class="paragraph-content">${inhoudDB.gewerkteDagen[y].dagnr} ${inhoudDB.maandNaam}</div>
                                        </div>
                                        <div class="medewerkers-content-wrapper medewerker-uren-wrapper">
                                            <div class="paragraph-content">${inhoudDB.gewerkteDagen[y].aantalUrenOpdracht}</div>
                                        </div>
                                        <div class="medewerkers-content-wrapper medewerker-uren-wrapper">
                                            <div class="paragraph-content">${inhoudDB.gewerkteDagen[y].aantalUrenOverwerk}</div>
                                        </div>
                                        <div class="medewerkers-content-wrapper medewerker-uren-wrapper">
                                            <div class="paragraph-content">${inhoudDB.gewerkteDagen[y].aantalUrenVerlof}</div>
                                        </div>
                                        <div class="medewerkers-content-wrapper medewerker-uren-wrapper">
                                            <div class="paragraph-content">${inhoudDB.gewerkteDagen[y].aantalUrenZiek}</div>
                                        </div>
                                        <div class="medewerkers-content-wrapper medewerker-uren-wrapper">
                                            <div class="paragraph-content">${inhoudDB.gewerkteDagen[y].aantalUrenTraining}</div>
                                        </div>
                                        <div class="medewerkers-content-wrapper medewerker-uren-wrapper">
                                            <div class="paragraph-content">${inhoudDB.gewerkteDagen[y].aantalUrenOverig}</div>
                                        </div>
                                        </div>
                                    </div>`;
            }
            string1 += `
                                </div>
                            </div>
                        </div>
                        <div class="uren-declaratie-side-info-wrapper">
                            <div class="uren-declaratie-side-info-item">
                                <div class="label">Mogelijke acties</div>
                                <div class="acties-link-text">Openzetten</div>
                                <div class="acties-link-text">Andere acties?</div>
                            </div>
                            <div class="uren-declaratie-side-info-item">
                                <div class="label">Berichten bij deze urendeclaratie</div>
                                <div class="acties-link-text">2 gekoppelde berichten</div>
                            </div>
                            <div class="uren-declaratie-side-info-item">
                                <div class="label margin-bottom">Medewerker:</div>
                                <div class="medewerkers-item-flex">
                                    <div class="medewerkers-content-wrapper">
                                        <div class="gebruiker-img-circle"></div>
                                    </div>
                                    <div class="medewerkers-content-wrapper medewerker-name-wrapper">
                                        <div class="paragraph-content">Karlijn de Jonge</div>
                                    </div>
                                </div>
                            </div>
                            <div class="uren-declaratie-side-info-item">
                                <div class="label margin-bottom">Contactpersoon:</div>
                                <div class="medewerkers-item-flex">
                                    <div class="medewerkers-content-wrapper">
                                        <div class="gebruiker-img-circle"></div>
                                    </div>
                                    <div class="medewerkers-content-wrapper medewerker-name-wrapper">
                                        <div class="paragraph-content">Karlijn de Jonge</div>
                                    </div>
                                </div>
                            </div>
                        </div>`;
        document.getElementById("contactpersoon-urenformulier-single").innerHTML = string1;
    }
    xhr.open("GET","https://api.qienurenapp.privatedns.org:9100/api/urendeclaraties/" + uid, true);
    xhr.setRequestHeader("Authorization", "Basic " + btoa(username + ":" + password));
    xhr.send();
}