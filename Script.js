//Prise en mémoire de la date d'aujourd'hui
var today = new Date();
today.setHours(0, 0, 0, 0);

//Prise en mémoire de la div avec l'id days-countainer
const daysContainer = document.getElementById("days-container");

//Prise en mémoire du carousel
const carousel = document.getElementById("carousel")

//Récupération de l'URL en string
const currentUrl = window.location.href;

//Nombre de répétition (1 pour les normaux, 2 pour le carroussel)
let numCount = 1

//Nombre de jours
let numDays = 1

//Comparaison du URL pour déterminer les variables numDays et numCount
if (currentUrl.includes('3jours')) {
    numDays = 3;
}
else if (currentUrl.includes('7jours')) {
    numDays = 7;
}
else if (currentUrl.includes('14jours')) {
    numDays = 7;
    numCount = 2;
}

//Création du Array 
const days = [];

//Remplissage du Array avec le nombre de jours nécéssaires
for (let i = 1; i <= numDays; i++) {
    days.push(i);
}

//Récupération du fichier JSON et exécution de la fonction
fetch('temperatures_2023.json')
    .then(response => { return response.json() })
    .then(data => {
        let newDate = today
        afficherJours(data.temperatures, newDate)
    })

//Fonction Principale
function afficherJours(liste, newDate)
{
    //Répète une fois pour normal, 2 fois pour carroussel
    for(let count = 0; count < numCount; count++)
    {
        //Création du container (pour carroussel)
        const container = document.createElement("div")
        container.classList.add("container") //Contenir les éléments

        //Création de la classe qui centre les éléments
        const center = document.createElement("div")
        center.classList.add("row") //Row du grid layout bootstrap
        center.classList.add("text-center") //centrer
        container.appendChild(center) //ajouter center à container

        if(count == 0) //première partie du carroussel
        {
            daysContainer.appendChild(container)
        }
        else if(count == 1) //deuxième partie du carroussel
        {
            const daysContainer2 = document.createElement("div")
            daysContainer2.classList.add("carousel-item")//Objet du carroussel
            carousel.appendChild(daysContainer2)
            daysContainer2.appendChild(container)
        }

        //Pour chaque jour
        days.forEach(day => {
            //Création du div col
            const col = document.createElement("div");
            col.classList.add("col"); //Col du grid layout bootstrap

            //Création du div vertical
            const verticalElement = document.createElement("div");
            verticalElement.classList.add("vertical-element"); //séparation en éléments individuels

            //Jour de la semaine
            var jour = document.createElement("div");
            jour.id = `jour${day}`;

            //Icone de météo
            var icone1 = document.createElement("img");
            icone1.id = `icone${day}`;

            //Date du jour
            var date = document.createElement("div");
            date.id = `date${day}`;

            //Température du jour
            const tempAjourdhui = document.createElement("div");
            tempAjourdhui.id = `temps${day}`;

            //Température maximale
            const tempsMax = document.createElement("div");
            tempsMax.id = `tempsMax${day}`;

            //Température minimale
            const tempsMin = document.createElement("div");
            tempsMin.id = `tempsMin${day}`;

            verticalElement.appendChild(jour); //Ajouter jour à verticalElement
            verticalElement.appendChild(icone1); //Ajouter icone1 à verticalElement
            verticalElement.appendChild(date); //Ajouter date à verticalElement
            verticalElement.appendChild(tempAjourdhui); //Ajouter tempAujourd'hui à verticalElement
            verticalElement.appendChild(tempsMax); //Ajouter tempsMax à verticalElement
            verticalElement.appendChild(tempsMin); //Ajouter tempsmin à verticalElement
            
            center.appendChild(col) //Ajouter col au center
            col.appendChild(verticalElement); //Ajouter verticalElement au col

            for (let index = 0; index < liste.length; index++) {
                let temp = liste[index] //Contient les données
                var dateJSON = new Date(temp.DateDuJour) //Création d'un objet date avec la date d'aujourd'hui
                dateJSON.setDate(dateJSON.getDate() + 1) //
                dateJSON.setHours(0, 0, 0, 0)
                newDate.setHours(0, 0, 0, 0)
                if(dateJSON.getTime() === newDate.getTime())
                {
                    dayOfWeek(dateJSON) //Pour Lundi, Mardi, etc
                    jour.innerHTML = jourSemaine

                    mois(dateJSON) //Pour Janvier, Février, etc
                    date.innerHTML = moisChoisi

                    tempAjourdhui.innerHTML = temp.TempDuJour + "&deg;C" //Formatter Température d'aujourd'hui
                    tempsMin.innerHTML = "MIN\n" + temp.TempMin + "&deg;C" //Formatter Température minimale
                    tempsMax.innerHTML = "MAX\n" + temp.TempMax + "&deg;C" //Formatter Température maximale

                    chooseIcon(temp.TempDuJour) //Pour l'icône niege, pluie, etc
                    icone1.src = icone
                    icone1.width = "100" //Taille de l'icône

                    index = liste.length //Fin de la boucle
                    newDate.setDate(newDate.getDate() + 1) //Avancement de la date
                }
            }
        })
    }
}

//Loader le footer dans la div
function loadFooter() {
    var xhttp = new XMLHttpRequest();
    xhttp.onreadystatechange = function() {
      if (this.readyState == 4 && this.status == 200) {
        document.getElementById("footer").innerHTML = this.responseText;
      }
    };
    xhttp.open("GET", "footer.html", true);
    xhttp.send();
  }

//Loader le header dans le div
function loadHeader() {
    var xhttp = new XMLHttpRequest();
    xhttp.onreadystatechange = function() {
      if (this.readyState == 4 && this.status == 200) {
        document.getElementById("header").innerHTML = this.responseText;
      }
    };
    xhttp.open("GET", "header.html", true);
    xhttp.send();
  }

//Load la fonction de header et footer quand ouvre la page
window.onload = function() {
    loadHeader();
    loadFooter();
};

//Choix de la journée de la semaine
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

//Choix du mois
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

//Choix de l'icône
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