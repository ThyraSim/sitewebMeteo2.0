var icone
var jour = document.getElementById("jour")
var date = document.getElementById("date")
var tempAjourdhui = document.getElementById("temps")
var tempMin = document.getElementById("tempsMin")
var tempMax = document.getElementById("tempsMax")
let jourSemaine
let moisChoisi
var today = new Date();
today.setHours(0, 0, 0, 0);

let nombreJour = document.getElementById("jour1")
fetch('temperatures_2023.json')
    .then(response => { return response.json() })
    .then(data => {
        
        /* unJour(data.temperatures) 
        let newDate2 = new Date()
        Septjour1(data.temperatures, newDate2)
        let newDate = today
        troisJour(data.temperatures, newDate) */
        let newDate3 = new Date()
        QuatJour(data.temperatures, newDate3)
    })



    function QuatJour(liste, newDate)
{
    for (var i = 1; i <= 14; i++) {
        var Quaticone = document.createElement("img");
        var Quatjour = document.getElementById("Quatjour" + i);
        var Quatdate = document.getElementById("Quatdate" + i);
        var QuattempAjourdhui = document.getElementById("Quattemps" + i);
        var QuattempMin = document.getElementById("QuattempsMin" + i);
        var QuattempMax = document.getElementById("QuattempsMax" + i);
        
        for (let index = 0; index < liste.length; index++) {
            let temp = liste[index]
            var dateJSON = new Date(temp.DateDuJour)
            dateJSON.setDate(dateJSON.getDate() + 1)
            dateJSON.setHours(0, 0, 0, 0)
            newDate.setHours(0, 0, 0, 0)
            if(dateJSON.getTime() === newDate.getTime())
            {
                dayOfWeek(dateJSON)
                Quatjour.innerHTML = jourSemaine
                mois(dateJSON)
                Quatdate.innerHTML = moisChoisi
                QuattempAjourdhui.innerHTML = temp.TempDuJour + "&deg;C"
                QuattempMin.innerHTML       = "MIN\n" + temp.TempMin + "&deg;C"
                QuattempMax.innerHTML       = "MAX\n" + temp.TempMax + "&deg;C"
                chooseIcon(temp.TempDuJour)
                Quaticone = document.getElementById("Quaticone"+i)
                Quaticone.src = icone
                Quaticone.width = "100"

                index = liste.length
                newDate.setDate(newDate.getDate() + 1)
            }
        }
    }
}



function afficherMeteo(liste, newDate, numDays) {
    for (var i = 1; i <= numDays; i++) {
        var icone1 = document.createElement("img");
        var jour = document.getElementById("jour" + i);
        var date = document.getElementById("date" + i);
        var tempAjourdhui = document.getElementById("temps" + i);
        var tempMin = document.getElementById("tempsMin" + i);
        var tempMax = document.getElementById("tempsMax" + i);

        for (let index = 0; index < liste.length; index++) {
            let temp = liste[index]
            var dateJSON = new Date(temp.DateDuJour)
            dateJSON.setDate(dateJSON.getDate() + 1)
            dateJSON.setHours(0, 0, 0, 0)
            newDate.setHours(0, 0, 0, 0)

            if(dateJSON.getTime() === newDate.getTime()) {
                dayOfWeek(dateJSON)
                jour.innerHTML = jourSemaine
                mois(dateJSON)
                date.innerHTML = moisChoisi
                tempAjourdhui.innerHTML = "Temperature du jour : "+temp.TempDuJour
                tempMin.innerHTML = "Temperature minimale : "+temp.TempMin
                tempMax.innerHTML = "Temperature maximale : "+temp.TempMax
                chooseIcon(temp.TempDuJour)
                icone1 = document.getElementById("icone"+i)
                icone1.src = icone
                icone1.width = "100"

                index = liste.length
                newDate.setDate(newDate.getDate() + 1)
            }
        }
    }
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