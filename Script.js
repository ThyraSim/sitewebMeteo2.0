/*var icone
var jour = document.getElementById("jour")
var date = document.getElementById("date")
var tempAjourdhui = document.getElementById("temps")
var tempMin = document.getElementById("tempsMin")
var tempMax = document.getElementById("tempsMax")
let jourSemaine
let moisChoisi
*/
var today = new Date();
today.setHours(0, 0, 0, 0);

const daysContainer = document.getElementById("days-container");
const currentUrl = window.location.href;
let numDays = 1
if (currentUrl.includes('3jours')) {
    numDays = 3;
}
if (currentUrl.includes('7jours')) {
    numDays = 7;
}
else if (currentUrl.includes('14jours')) {
    numDays = 14;
}
console.log(numDays)
const days = [];

for (let i = 1; i <= numDays; i++) {
    days.push(i);
}

let nombreJour = document.getElementById("jour1")
fetch('temperatures_2023.json')
    .then(response => { return response.json() })
    .then(data => {
        
        /* unJour(data.temperatures) */

        let newDate = today
        troisJour(data.temperatures, newDate)
        
        /* let newDate2 = new Date()
        Septjour1(data.temperatures, newDate2)
        
        let newDate3 = new Date()
        QuatJour(data.temperatures, newDate3) */
    })

function troisJour(liste, newDate)
{
    days.forEach(day => {
        const col = document.createElement("div");
        col.classList.add("col");

        const verticalElement = document.createElement("div");
        verticalElement.classList.add("vertical-element");

        var jour = document.createElement("div");
        jour.id = `jour${day}`;
        verticalElement.appendChild(jour);

        var icone1 = document.createElement("img");
        icone1.id = `icone${day}`;
        verticalElement.appendChild(icone1);

        var date = document.createElement("div");
        date.id = `date${day}`;
        verticalElement.appendChild(date);

        const tempAjourdhui = document.createElement("div");
        tempAjourdhui.id = `temps${day}`;
        verticalElement.appendChild(tempAjourdhui);

        const tempsMax = document.createElement("div");
        tempsMax.id = `tempsMax${day}`;
        verticalElement.appendChild(tempsMax);

        const tempsMin = document.createElement("div");
        tempsMin.id = `tempsMin${day}`;
        verticalElement.appendChild(tempsMin);

        col.appendChild(verticalElement);
        daysContainer.appendChild(col);

        console.log(day)
                for (let index = 0; index < liste.length; index++) {
                    let temp = liste[index]
                    var dateJSON = new Date(temp.DateDuJour)
                    dateJSON.setDate(dateJSON.getDate() + 1)
                    dateJSON.setHours(0, 0, 0, 0)
                    newDate.setHours(0, 0, 0, 0)
                    if(dateJSON.getTime() === newDate.getTime())
                    {
                        dayOfWeek(dateJSON)
                        jour.innerHTML = jourSemaine
                        mois(dateJSON)
                        date.innerHTML = moisChoisi
                        tempAjourdhui.innerHTML = temp.TempDuJour + "&deg;C"
                        tempsMin.innerHTML = "MIN\n" + temp.TempMin + "&deg;C"
                        tempsMax.innerHTML = "MAX\n" + temp.TempMax + "&deg;C"
                        chooseIcon(temp.TempDuJour)
                        icone1.src = icone
                        icone1.width = "100"

                        index = liste.length
                        newDate.setDate(newDate.getDate() + 1)
                    }
                }
    })
}

function dayOfWeek(dateJSON)
{
    if(dateJSON.getDay() == 0)
    {
        jourSemaine = "Dimanche"
    }
    else if(dateJSON.getDay() == 1)
    {
        jourSemaine = "Lundi"
    }
    else if(dateJSON.getDay() == 2)
    {
        jourSemaine = "Mardi"
    }
    else if(dateJSON.getDay() == 3)
    {
        jourSemaine = "Mercredi"
    }
    else if(dateJSON.getDay() == 4)
    {
        jourSemaine = "Jeudi"
    }
    else if(dateJSON.getDay() == 5)
    {
        jourSemaine = "Vendredi"
    }
    else if(dateJSON.getDay() == 6)
    {
        jourSemaine = "Samedi"
    }
}

function mois(dateJSON)
{
    if(dateJSON.getMonth() == 0)
    {
        moisChoisi = dateJSON.getDate() + " janvier"
    }
    else if(dateJSON.getMonth() == 1)
    {
        moisChoisi = dateJSON.getDate() + " février"
    }
    else if(dateJSON.getMonth() == 2)
    {
        moisChoisi = dateJSON.getDate() + " mars"
    }
    else if(dateJSON.getMonth() == 3)
    {
        moisChoisi = dateJSON.getDate() + " avril"
    }
    else if(dateJSON.getMonth() == 4)
    {
        moisChoisi = dateJSON.getDate() + " mai"
    }
    else if(dateJSON.getMonth() == 5)
    {
        moisChoisi = dateJSON.getDate() + " juin"
    }
    else if(dateJSON.getMonth() == 6)
    {
        moisChoisi = dateJSON.getDate() + " juillet"
    }
    else if(dateJSON.getMonth() == 7)
    {
        moisChoisi = dateJSON.getDate() + " août"
    }
    else if(dateJSON.getMonth() == 8)
    {
        moisChoisi = dateJSON.getDate() + " septembre"
    }
    else if(dateJSON.getMonth() == 9)
    {
        moisChoisi = dateJSON.getDate() + " octobre"
    }
    else if(dateJSON.getMonth() == 10)
    {
        moisChoisi = dateJSON.getDate() + " novembre"
    }
    else if(dateJSON.getMonth() == 11)
    {
        moisChoisi = dateJSON.getDate() + " décembre"
    }
}

function chooseIcon(temperature)
{
    if(temperature <= 0)
    {
        icone = "images/neige.png"
    }
    else if(temperature >= 20)
    {
        icone = "images/soleil.png"
    }
    else if(temperature <= 10)
    {
        icone = "images/pluie.png"
    }
    else if(temperature < 20)
    {
        icone = "images/nuage.png"
    }
}