//Prise en mémoiremoisEn de la date d'aujourd'hui
var today;

//Prise en mémoire de la div avec l'id days-countainer
const display = document.getElementById("display") //Node html utilisée comme zone d'affichage
const degChoose = document.getElementById("degree") //Bouton de conversion C/F
var daysContainer; //Variable correspondant à un div contenant maximalement 7 jours. Utilisé dans tous les affichages excepté le mensuel
var daysContainer2; //Variable servant de deuxieme panel pour le carousel
var carousel; //
var carouselMain;//
var mensuMain;//
var ListeMois;//
var mainSetter = 1; //Variable du nombre de jours sur la fonction Main

//permet que le aujourdhui et l'image remet la page avec les donnees d'aujourdhui
const aujLink = document.querySelector("#auj");
const mensuelLink = document.querySelector("#mens");
const dropdown = document.getElementsByName("choice");

var tDJ; //Temperature du jour
var tMin;//Temperature minimum
var tMax;//Temperature Maximum
var tMoy;//Temperature Moyenne

var mensOrDay = 0 //Variable d'état 0=affichage de journées, 1=affichage mensuel

let numCount = 1; //Nombre de jour a afficher initialement = 1
var days = [];
let newDate = today; //Date d'aujourd'hui

var moisEnCours; //Variable du mois en cours

let liste;

//Récupération du fichier JSON et exécution du module de gestion d'affichage
function main(nbJour) {
  fetch("temperatures_2023.json")
    .then((response) => {
      return response.json();
    })
    .then((data) => {
      liste = data.temperatures;
      afficherJours(nbJour);
    });
}

//Module de Gestion d'Affichage
function afficherJours(numDays) {
  //Nombre de répétition (1 pour les normaux, 2 pour le carroussel)
  numCount = 1;
  days = [];

  if (numDays == 14) {
    numDays = 7;
    numCount = 2;
    if (carouselMain != null) {
      carouselMain.innerHTML = null;
    }
    //Creation de la structure carousel
    carou();
  }
  //Remplissage du Array avec le nombre de jours nécessaires
  for (let i = 1; i <= numDays; i++) {
    days.push(i);
  }
  //Creation du HTML avant, et remplissage lorsqu'il est prêt à être injecté pour éviter les comportement non-voulus dans l'affichage (latence, sursaut, etc)
  newDate = today;
  creerHTML(); //Creation du HTML
  reset();     //Vider le display en operation
  if (numCount == 2) { //Injection du HTML en fonction de l'état de l'application
    carousel.appendChild(daysContainer);
    carousel.appendChild(daysContainer2);
    display.appendChild(carouselMain);
  } else {
    daysContainer.setAttribute("class", "");
    display.appendChild(daysContainer);
  }
}

//Generation dynamique du HTML en fonction du nombres de jour à afficher
function creerHTML() {
  for (let count = 0; count < numCount; count++) {
    //Création du container (pour carroussel)
    const container = document.createElement("div");
    container.classList.add("container-fluid"); //Contenir les éléments

    //Création de la classe qui centre les éléments
    const center = document.createElement("div");
    center.classList.add("row"); //Row du grid layout bootstrap
    center.classList.add("text-center"); //centrer
    container.appendChild(center); //ajouter center à container

    if (count == 0) {
      //première partie du carroussel
      if (numCount == 1) {
        daysContainer = document.createElement("div");
      } else {
        daysContainer = document.getElementById("daysContainer");
      }
      daysContainer.appendChild(container);
    } else if (count == 1) {
      //deuxième partie du carroussel
      daysContainer2 = document.getElementById("daysContainer2");
      daysContainer2.appendChild(container);
    }
    //Pour chaque jour
    days.forEach((day) => {
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

      center.appendChild(col); //Ajouter col au center
      col.appendChild(verticalElement); //Ajouter verticalElement au col
      //Remplissage des données dans l'élément jour
      remplirDonnee(jour, date, tempAjourdhui, tempsMin, tempsMax, icone1, verticalElement);
    });
    if (count == 1) {
      console.log(count);
    }
  }
}


//Remplissage des donnes pour une journée
function remplirDonnee(jour, date, tempAjourdhui, tempsMin, tempsMax, icone1, verticalElement) {
  for (let index = 0; index < liste.length; index++) {
    let temp = liste[index]; //Contient les données
    var dateJSON = new Date(temp.DateDuJour); //Création d'un objet date avec la date d'aujourd'hui
    dateJSON.setDate(dateJSON.getDate() + 1); //
    dateJSON.setHours(0, 0, 0, 0);
    newDate.setHours(0, 0, 0, 0);
    if (dateJSON.getTime() === newDate.getTime()) {
      dayOfWeek(dateJSON); //Pour Lundi, Mardi, etc
      jour.innerHTML = jourSemaine;

      mois(dateJSON); //Pour Janvier, Février, etc
      date.innerHTML = moisChoisi;

      tDJ = temp.TempDuJour
      tMin = temp.TempMin
      tMax = temp.TempMax

      changeFahrenheit()

      tempAjourdhui.innerHTML = tDJ + "&deg;" + degChoice; //Formatter Température d'aujourd'hui
      tempsMin.innerHTML = "MIN\n" + tMin + "&deg;" + degChoice; //Formatter Température minimale
      tempsMax.innerHTML = "MAX\n" + tMax + "&deg;" + degChoice; //Formatter Température maximale

      //Pour l'icône niege, pluie, etc
      icone1.src = chooseIcon(temp.TempDuJour, verticalElement);
      icone1.width = "100"; //Taille de l'icône

      index = liste.length; //Fin de la boucle
      newDate.setDate(newDate.getDate() + 1); //Avancement de la date
    }
  }
}



//====================Fonction de types "Event Listener"=======================//
//Attaché "onclick" sur le lien Aujourd'hui
function aujOnClick() {
  mainSetter = 1;
  main(mainSetter);
  mensOrDay = 0;
}

// Add an event listener for the 'click' event
dropdown.forEach((element, index) => {
  element.addEventListener("click", function () {
    if (index == 0) {
      mainSetter = 3
    } else if (index == 1) {
      mainSetter = 7
    } else if (index == 2) {
      mainSetter = 14
    }
    mensOrDay = 0;
    main(mainSetter)
  });
});

//event listener sur la navigation pour le mensuel
mensuelLink.addEventListener("click", function () {
  if (mensuMain != null) {
    mensuMain.innerHTML = null;
  }
  mensuelHtml(0);
  moisEnCours = today.getMonth();
  ListeMois.value = moisEnCours;
  fetchDataForMonth(moisEnCours); //HTML pret pour l'injection
  reset();                        //Vider le display en operation
  display.appendChild(mensuMain); //Injection du HTML préparé auparavant
  mensOrDay = 1
});

//Event listener sur le selecteur de mois du module mensuel
function setListener() {
  ListeMois.addEventListener("change", () => {
    var selectedMonth = ListeMois.value;
    if (mensuMain != null) {
      mensuMain.innerHTML = null;
    }
    mensuelHtml(selectedMonth);
    fetchDataForMonth(ListeMois.value); //HTML pret pour l'injection
    reset();                            //Vider le display en operation
    display.appendChild(mensuMain);     //Injection du HTML préparé auparavant
  });
}

//Event Listener sur le bouton de conversion
degChoose.addEventListener("click", function(){
  if(degChoice == "C")
  {
    degChoose.innerHTML = "&deg;C"
    localStorage.setItem("elChoice", "F")
  }
  else
  {
    degChoose.innerHTML = "&deg;F"
    localStorage.setItem("elChoice", "C")
  }
  if(mensOrDay == 0)
  {
    main(mainSetter)
  }
  else
  {
    var selectedMonth = ListeMois.value;
    if (mensuMain != null) {
      mensuMain.innerHTML = null;
    }
    mensuelHtml(selectedMonth);
    fetchDataForMonth(ListeMois.value);
    reset();
    display.appendChild(mensuMain);
  }
})

//Load la fonction de header et footer quand ouvre la page
window.onload = function () {
  today = new Date();
  today.setHours(0, 0, 0, 0);
  main(mainSetter);
};



//========================Fonctions pour Mensuel========================================//

//Fonction composée pour la récupération du JSON, creation de la structure et l'affichage du module Mensuel
function fetchDataForMonth(mois) {
  fetch("temperatures_2023.json")
    .then((response) => response.json())
    .then((data) => {
      temp = data.temperatures;

      // RÉCUPÈRE LES DONNES JUSTE POUR LE MOIS DANS tabTempMois
      tabTempMois = CreerTabTempMois(mois, temp);

      // CALCUL STATISTIQUE ET AFFICHAGE pour le mois en cours ( MIN, MAX , MOY)
      afficherStatistique(tabTempMois);

      // //GÉNÉRER CALENDRIER selon le mois choisi
      genereCalendrier(today.getFullYear(), mois, temp);
    });
}

//Creation et remplissage d'un tableau avec les temperature d'un mois donné
function CreerTabTempMois(mois, temp) {
  //temp = data.temperatures return tabTempMois;
  // récupère les données juste pour le mois
  var tabTempMois = [];
  temp.forEach((jour) => {
    var dateJSON = new Date(jour.DateDuJour);
    dateJSON.setHours(0, 0, 0, 0);
    dateJSON.setDate(dateJSON.getDate() + 1);

    if (dateJSON.getMonth() == mois) {
      // mois = valeur du dropdown menu du html
      tabTempMois.push(jour.TempDuJour); // rempli la tab avec valeur de température du mois correspondant
    }
  });
  return tabTempMois;
}

//temp = data.temperatures;
function genereCalendrier(annee, mois, temp) {

  // Get la references
  const tableCalendrier = document.getElementById("tableCalendrier");

  // Clear le calendrier
  tableCalendrier.innerHTML = "";

  // get premier jour du mois
  var firstDay = new Date(annee, mois, 1).getDay();

  // Get le nb de jours du mois
  var prochainMois = parseInt(mois) + 1;
  var tempDate = new Date(annee, prochainMois, 0);
  var lastDay = tempDate.getDate();

  // Loop a travers chaque ligne
  for (let i = 0; i < 6; i++) {
    // Create a new row
    const row = document.createElement("tr");

    // Loop a travers chaque colonnes
    for (let j = 0; j < 7; j++) {
      // Calcul pour quel jour on commence a remplir la table et quel case
      const day = i * 7 + j - firstDay + 1;
      //exemple mars 2023 first day = 3
      //0*7+0-3 +1 = -2 avec le if ci-dessous (if (day > 0 && day <= lastDay) )pas d'affichage dans la première case(dimanche) jusqu'à i=3 ( quatrième case = mercredi)
      // i = 0 et j = 3 -> 0*7+3-3+1 = 1 => day = 1 donc avec cell.innerText =  day + ... => 1 ;

      // Create a new cell
      const cell = document.createElement("td");

      // Add la date de la journee
      if (day > 0 && day <= lastDay) {
        
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
        //Creation des divs pour les sous-elements des journees
        const dayDiv = document.createElement("div");
        dayDiv.classList.add("dayDiv")
        dayDiv.innerText = day;
    
        

        const tempDiv = document.createElement("div");
        tempDiv.classList.add("tempDiv")
        

        const icone = document.createElement("img");
        icone.src = chooseIcon(temperature, cell);
        
        tempDiv.appendChild(icone);

        const tempSpan = document.createElement("span");
        tempSpan.classList.add("tempSpan")
       
        tDJ = temperature

        changeFahrenheit()

        tempSpan.innerHTML = tDJ + "&deg;" + degChoice;
       
        tempDiv.appendChild(tempSpan);

        // Ajout des divs aux cellules
        cell.appendChild(dayDiv);
        cell.appendChild(tempDiv);
      }

      // Ajout des cellules a la ligne
      if (cell.innerHTML != "" || day < 28 || j > 0) {
        row.appendChild(cell);
      } else {
        j = 7;
      }
    }

    // Ajout des ligne au calendrier
    tableCalendrier.appendChild(row);
  }
}


//==================================Fonctions de structure=====================================//

//Genere la structure bootstrap du carousel
function carou() {
  carouselMain = document.createElement("div");
  carouselMain.setAttribute("id", "carouselExampleIndicators");
  carouselMain.setAttribute("class", "carousel slide");
  carouselMain.innerHTML = `
    <div class="carousel-inner mt-4" id="carousel">
        <div class="carousel-item active" id="daysContainer"></div>
        <div class="carousel-item" id="daysContainer2"></div>
    </div>

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
    `;
  display.appendChild(carouselMain);
  carousel = document.getElementById("carousel");
}

//Creation de la structure pour l'affichage mensuel
function mensuelHtml(selectedMonth) {
  mensuMain = document.createElement("div");
  mensuMain.classList.add("mensuMain");

  mensuMain.innerHTML = ` 
  <div class="container-fluid">
  <div class="row row-stats">
  <div class="col-2 ">
  </div>
    <div class="col-4 text-start">
      <select id="ListeMois" class="form-select form-select-lg bg-dark text-center text-uppercase" aria-label=".form-select-sm example">
        <option value="0" ${selectedMonth == 0 ? "selected" : ""}>Janvier</option>
        <option value="1" ${selectedMonth == 1 ? "selected" : ""}>F&eacute;vrier</option>
        <option value="2" ${selectedMonth == 2 ? "selected" : ""}>Mars</option>
        <option value="3" ${selectedMonth == 3 ? "selected" : ""}>Avril</option>
        <option value="4" ${selectedMonth == 4 ? "selected" : ""}>Mai</option>
        <option value="5" ${selectedMonth == 5 ? "selected" : ""}>Juin</option>
        <option value="6" ${selectedMonth == 6 ? "selected" : ""}>Juillet</option>
        <option value="7" ${selectedMonth == 7 ? "selected" : ""}>Août</option>
        <option value="8" ${selectedMonth == 8 ? "selected" : ""}>Septembre</option>
        <option value="9" ${selectedMonth == 9 ? "selected" : ""}>Octobre</option>
        <option value="10" ${selectedMonth == 10 ? "selected" : ""}>Novembre</option>
        <option value="11" ${selectedMonth == 11 ? "selected" : ""}>D&eacute;cembre</option>
      </select>
    </div>
    <div class="col-4 stats">
      <div class="d-flex align-items-start mmm">
        <h4 class="val">Valeur Minimale : </h4>
        <h4 class="text-end deg"><span id="min"></span></h4>
      </div>
      <div class="d-flex align-items-start mmm">
        <h4 class="val">Valeur Maximale : </h4>
        <h4 class="text-end deg"><span id="max"></span></h4>
      </div>
      <div class="d-flex align-items-start mmm">
        <h4 class="val">Valeur Moyenne : </h4>
        <h4 class="text-end deg"><span id="moy"></span></h4>
      </div>
    </div>
    <div class="col-2"></div>
  </div>
  </div>
        <div class="mx-auto tableContainer"> 
        <div style="marging-right: 25px"><table class="table table-bordered tableCalendrier mx-auto" style=" width:70vw;>
        <thead class="text-center ">
          <th>Dimanche</th>
          <th>Lundi</th>
          <th>Mardi</th>
          <th>Mercredi</th>
          <th>Jeudi</th>
          <th>Vendredi</th>
          <th>Samedi</th>
        </thead>
        <tbody id="tableCalendrier">
        </tbody>
      </table></div>
      </div>
        `;
  display.appendChild(mensuMain);
  ListeMois = document.getElementById("ListeMois"); //  dropdown menu
  setListener();
}

//Vide les données affichées
function reset() {
  display.innerHTML = null;
  today = new Date();
  today.setHours(0, 0, 0, 0);
}



//=========================== Fonction de conversion et/ou de calculs ==================================//

function changeFahrenheit(){ //Utilisation du localStorage pour garder la valeur sélectionner lors de la dernière utilisation de l'utilisateur
  if(localStorage.getItem("elChoice") == null)
  {
    localStorage.setItem("elChoice", "C")
  }
  if(localStorage.getItem("elChoice") == "C")
  {
    localStorage.setItem("elChoice", "C");
    degChoose.innerHTML = "&deg;F"
  }
  degChoice = localStorage.getItem("elChoice")
  if(degChoice == "F"){
    degChoose.innerHTML = "&deg;C"
    tDJ = Math.floor ((tDJ * 9/5)+32)
    tMin = Math.floor ((tMin * 9/5)+32)
    tMax = Math.floor ((tMax * 9/5)+32)

    if(mensOrDay == 1)
    {
      tMoy = Math.floor ((tMoy * 9/5)+32)
    }
  }
}

  //Calcule et affiche les statistiques mensuelles
  function afficherStatistique(tabTempMois) {
    var min = document.getElementById("min");
    var max = document.getElementById("max");
    var moy = document.getElementById("moy");
  
    tMax =  Math.max(...tabTempMois); // calcul de la valeur max du mois
    tMin = Math.min(...tabTempMois); // calcul de la valeur min
  
    let sum = 0;
    let nb = tabTempMois.length;
    tabTempMois.forEach((jour) => {
      sum += jour;
    });
    tMoy = Math.round(sum / nb);
  
    changeFahrenheit()
    max.innerHTML = tMax + "&deg;" + degChoice
    min.innerHTML = tMin + "&deg;" + degChoice
    moy.innerHTML = tMoy + "&deg;" + degChoice;
  }

//Choix de la journée de la semaine
function dayOfWeek(dateJSON) {
  if (dateJSON.getDay() == 0) {
    jourSemaine = "Dimanche";
  } else if (dateJSON.getDay() == 1) {
    jourSemaine = "Lundi";
  } else if (dateJSON.getDay() == 2) {
    jourSemaine = "Mardi";
  } else if (dateJSON.getDay() == 3) {
    jourSemaine = "Mercredi";
  } else if (dateJSON.getDay() == 4) {
    jourSemaine = "Jeudi";
  } else if (dateJSON.getDay() == 5) {
    jourSemaine = "Vendredi";
  } else if (dateJSON.getDay() == 6) {
    jourSemaine = "Samedi";
  }
}

//Choix du mois
function mois(dateJSON) {
  if (dateJSON.getMonth() == 0) {
    moisChoisi = dateJSON.getDate() + " janvier";
  } else if (dateJSON.getMonth() == 1) {
    moisChoisi = dateJSON.getDate() + " f&eacute;vrier";
  } else if (dateJSON.getMonth() == 2) {
    moisChoisi = dateJSON.getDate() + " mars";
  } else if (dateJSON.getMonth() == 3) {
    moisChoisi = dateJSON.getDate() + " avril";
  } else if (dateJSON.getMonth() == 4) {
    moisChoisi = dateJSON.getDate() + " mai";
  } else if (dateJSON.getMonth() == 5) {
    moisChoisi = dateJSON.getDate() + " juin";
  } else if (dateJSON.getMonth() == 6) {
    moisChoisi = dateJSON.getDate() + " juillet";
  } else if (dateJSON.getMonth() == 7) {
    moisChoisi = dateJSON.getDate() + " août";
  } else if (dateJSON.getMonth() == 8) {
    moisChoisi = dateJSON.getDate() + " septembre";
  } else if (dateJSON.getMonth() == 9) {
    moisChoisi = dateJSON.getDate() + " octobre";
  } else if (dateJSON.getMonth() == 10) {
    moisChoisi = dateJSON.getDate() + " novembre";
  } else if (dateJSON.getMonth() == 11) {
    moisChoisi = dateJSON.getDate() + " d&eacute;cembre";
  }
}

//Choix de l'icône
function chooseIcon(temperature, box) {
  if (temperature <= 0) {
    box.classList.add("backgroundIconeSnowy")
    return "images/neige.png";
  } else if (temperature >= 20) {
    box.classList.add("backgroundIconeSunny")
    return "images/soleil.png";
  } else if (temperature <= 10) {
    box.classList.add("backgroundIconeRainy")
    return "images/pluie.png";
  } else if (temperature < 20) {
    box.classList.add("backgroundIconeCloudy")
    return "images/nuage.png";
  }
}