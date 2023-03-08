//Prise en mémoiremoisEn de la date d'aujourd'hui
var today

//Prise en mémoire de la div avec l'id days-countainer
const display = document.getElementById("display")
var daysContainer = document.createElement("div");


var moisEnCours

//Récupération de l'URL en string
const currentUrl = window.location.href;

//Comparaison du URL pour déterminer les variables numDays et numCount
/*
if (currentUrl.includes('3jours')) {
    numDays = 3;
}
else if (currentUrl.includes('7jours')) {
    numDays = 7;
}
else if (currentUrl.includes('14jours')) {
    numDays = 7;
    numCount = 2;
}*/

let liste

//Récupération du fichier JSON et exécution de la fonction
function main(nbJour){
    fetch('temperatures_2023.json')
        .then(response => { return response.json() })
        .then(data => {
            liste = data.temperatures
            afficherJours(nbJour)
        })
}
let numCount = 1
var days = [];
let newDate = today

function carou()
{
    display.innerHTML = `<div id="carouselExampleIndicators" class="carousel carousel-dark slide">
    <div class="carousel-indicators">
    <button
        type="button"
        data-bs-target="#carouselExampleIndicators"
        data-bs-slide-to="0"
        class="active"
        aria-current="true"
        aria-label="Slide 1"
    ></button>
    <button
        type="button"
        data-bs-target="#carouselExampleIndicators"
        data-bs-slide-to="1"
        aria-label="Slide 2"
    ></button>
    </div>

    <div class="carousel-inner mt-4" id="carousel"></div>

    <button
    class="carousel-control-prev"
    type="button"
    data-bs-target="#carouselExampleIndicators"
    data-bs-slide="prev"
    >
    <span class="carousel-control-prev-icon" aria-hidden="true"></span>
    <span class="visually-hidden">Previous</span>
    </button>
    <button
    class="carousel-control-next"
    type="button"
    data-bs-target="#carouselExampleIndicators"
    data-bs-slide="next"
    >
    <span class="carousel-control-next-icon" aria-hidden="true"></span>
    <span class="visually-hidden">Next</span>
    </button>
    </div>`
}


//Fonction Principale
function afficherJours(numDays)
{
    //Nombre de répétition (1 pour les normaux, 2 pour le carroussel)
    numCount = 1

    //Création du Array 
    days = [];
    
    //Répète une fois pour normal, 2 fois pour carroussel
    if(numDays == 14)
    {
        numDays = 7
        numCount = 2
        carou()
        var carousel = document.getElementById("carousel")
        daysContainer.classList.add("carousel-item")
        daysContainer.classList.add("active")
        carousel.appendChild(daysContainer)
        console.log(carousel)
    }
    else
    {
        daysContainer.setAttribute("class", "")
        display.appendChild(daysContainer)
    }

    //Remplissage du Array avec le nombre de jours nécéssaires
    for (let i = 1; i <= numDays; i++) {
        days.push(i);
    }
    newDate = today
    
    creerHTML()
}

function creerHTML()
{
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
            verticalElement.appendChild(tempsMin); //Ajouter tempsmin à verticalElement
            verticalElement.appendChild(tempsMax); //Ajouter tempsMax à verticalElement
            
            center.appendChild(col) //Ajouter col au center
            col.appendChild(verticalElement); //Ajouter verticalElement au col

            remplirDonnee(jour, date, tempAjourdhui, tempsMin, tempsMax, icone1)
        })
    }
}

function remplirDonnee(jour, date, tempAjourdhui, tempsMin, tempsMax, icone1)
{
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

             //Pour l'icône niege, pluie, etc
            icone1.src = chooseIcon(temp.TempDuJour)
            icone1.width = "100" //Taille de l'icône

            index = liste.length //Fin de la boucle
            newDate.setDate(newDate.getDate() + 1) //Avancement de la date
        }
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
    loadFooter();
    today = new Date();
    today.setHours(0, 0, 0, 0);
    main(1)
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
function chooseIcon(temperature) {
    if (temperature <= 0) {
      return "images/neige.png";
    } else if (temperature >= 20) {
      return "images/soleil.png";
    } else if (temperature <= 10) {
      return "images/pluie.png";
    } else if (temperature < 20) {
      return "images/nuage.png";
    }
  }

/*const navLinks = document.querySelectorAll('.dropdown-item');

console.log(navLinks)

navLinks.forEach(link => {
    link.addEventListener('click', e => {
        //e.preventDefault();
        console.log("allolink")
        const target = e.target.getAttribute('value')
        main(target)
    })
})*/

const dropdown = document.getElementsByName('choice');
console.log(dropdown)

// Add an event listener for the 'click' event
dropdown.forEach((element, index) => {
    element.addEventListener('click', function() {
        console.log(index)
        reset()
        if(index == 0)
        {
            main(3)
        }
        else if(index == 1)
        {
            main(7)
        }
        else if(index == 2)
        {
            main(14)
        }
    })
})

const aujLink = document.querySelector('#auj');

aujLink.addEventListener('click', function(event) {
    reset()
    main(1)
})

const mensuelLink = document.querySelector('#mens')

function mensuelHtml()
{
    display.innerHTML = `<select id="ListeMois"
    class="form-select form-select"
    aria-label=".form-select-sm example"
  >
    <option value ="0">Janvier</option>
    <option value="1">Février</option>
    <option value="2">Mars</option>
    <option value="3">Avril</option>
    <option value="4">Mai</option>
    <option value="5">Juin</option>
    <option value="6">Juillet</option>
    <option value="7">Août</option>
    <option value="8">Septembre</option>
    <option value="9">Octobre</option>
    <option value="10">Novembre</option>
    <option value="11">Décembre</option>

  </select>
  <p>valeur min <span id="min"></span></p>
  <p>valeur max <span id="max"></span></p>
  <p>valeur moyenne <span id="moy" ></span></p>
            <table class="table">
                <thead>
                    <th>Dimanche</th>
                    <th>lundi</th>
                    <th>mardi</th>
                    <th>mercredi</th>
                    <th>jeudi</th>
                    <th>vendredi</th>
                    <th>Samedi</th>
                    </thead>
                <tbody id="tableCalendrier">
                </tbody>
            </table>`

    setListener()
}

mensuelLink.addEventListener('click', function() {
    reset()
    mensuelHtml()
    var ListeMois = document.getElementById("ListeMois"); //  dropdown menu
    moisEnCours = today.getMonth();
    setListener()
    ListeMois.value = moisEnCours;
    fetchDataForMonth(moisEnCours)
    console.log(mensuelLink)
})

function setListener()
{
    var ListeMois = document.getElementById("ListeMois"); //  dropdown menu
    ListeMois.addEventListener("change", () => {
        reset()
        mensuelHtml()
        fetchDataForMonth(ListeMois.value);
    });
}

function fetchDataForMonth(mois) {
    fetch("temperatures_2023.json")
      .then((response) => response.json())
      .then((data) => {
        temp = data.temperatures;
        
        // RÉCUPÈRE LES DONNES JUSTE POUR LE MOIS DANS tabTempMois
        tabTempMois = CreerTabTempMois(mois,temp)
  
        // CALCUL STATISTIQUE ET AFFICHAGE pour le mois en cours ( MIN, MAX , MOY)
        afficherStatistique(tabTempMois);
        console.log(mois)
  
        // //GÉNÉRER CALENDRIER selon le mois choisi
        genereCalendrier(today.getFullYear(), mois, temp)
  
      });
}

function CreerTabTempMois(mois,temp){   //temp = data.temperatures return tabTempMois;

    // récupère les données juste pour le mois
    var tabTempMois = [];
    temp.forEach((jour) => {
      var dateJSON = new Date(jour.DateDuJour);
      dateJSON.setHours(0, 0, 0, 0);
      dateJSON.setDate(dateJSON.getDate() + 1);

      if (dateJSON.getMonth() == mois) { // mois = valeur du dropdown menu du html
        tabTempMois.push(jour.TempDuJour); // rempli la tab avec valeur de température du mois correspondant
      }
    });

    return tabTempMois
}

function afficherStatistique(tabTempMois) {
    //cible html pour  afficher statistique
  var min = document.getElementById("min");
  var max = document.getElementById("max");
  var moy = document.getElementById("moy");
    
    // CALCUL STATISTIQUE ET AFFICHAGE ( MIN, MAX , MOY)
    max.innerHTML = Math.max(...tabTempMois); // calcul de la valeur max du mois
    min.innerHTML = Math.min(...tabTempMois); // calcul de la valeur min
    let sum = 0;
    let nb = tabTempMois.length;
    tabTempMois.forEach((jour) => {
      sum += jour;
    });
  
    moy.innerHTML = Math.round(sum / nb);
}

  function genereCalendrier(annee, mois, temp) { //temp = data.temperatures;
  

    // Get a reference to the calendar body
  const tableCalendrier = document.getElementById("tableCalendrier");

  // Clear the previous contents of the calendar
  tableCalendrier.innerHTML = "";

  // Get the first day of the month
  var firstDay = new Date(annee, mois, 1).getDay();
  // Get the number of days in the month
  var lastDay = new Date(annee, mois + 1, 0).getDate();

  // Loop through each row of the calendar
  for (let i = 0; i < 6; i++) {
    // Create a new row
    const row = document.createElement("tr");

    // Loop through each column of the row
    for (let j = 0; j < 7; j++) {
      // Calcul pour quel jour on commence a remplir la table et quel case
      const day = i * 7 + j - firstDay + 1; 
      //exemple mars 2023 first day = 3
      //0*7+0-3 +1 = -2 avec le if ci-dessous (if (day > 0 && day <= lastDay) )pas d'affichage dans la première case(dimanche) jusqu'à i=3 ( quatrième case = mercredi)
      // i = 0 et j = 3 -> 0*7+3-3+1 = 1 => day = 1 donc avec cell.innerText =  day + ... => 1 ;


      // Create a new cell
      const cell = document.createElement("td");

      // Add the day number to the cell
      if (day > 0 && day <= lastDay) {
        // Find the temperature for this day
        let temperature = "";
        for (let k = 0; k < temp.length; k++) {
          // parcours le tableau "temp" avec toute les données du JSON "temp = data.temperatures;"" si date match on récupère la temperature du jour
          const dateJSON = new Date(temp[k].DateDuJour);
          dateJSON.setHours(0, 0, 0, 0);
          dateJSON.setDate(dateJSON.getDate() + 1);

          if (
            dateJSON.getFullYear() == annee &&
            dateJSON.getMonth() == mois &&
            dateJSON.getDate() == day
          ) {
            temperature = temp[k].TempDuJour;
            break;
          }
        }

        cell.innerText =  day + "\n" + temperature;
        var icone = document.createElement("img");
         //Pour l'icône niege, pluie, etc
        icone.src =  chooseIcon(temperature)
        icone.width = "10"; //Taille de l'icône
        cell.appendChild(icone);
      }

      // Add the cell to the row
      row.appendChild(cell);
    }

    // Add the row to the calendar body
    tableCalendrier.appendChild(row);
  }
}





//Vide les données affichées
function reset()
{
    daysContainer.innerHTML = null
    display.innerHTML = ``
    today = new Date();
    today.setHours(0, 0, 0, 0);
}