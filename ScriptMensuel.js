//Prise en mémoire de la date d'aujourd'hui
var today = new Date();
today.setHours(0, 0, 0, 0);

// cible dans le html

var tabCalendrier = document.getElementById("tabCalendrier"); // table calendrier
var ListeMois = document.getElementById("ListeMois"); //  dropdown menu

//cible html pour  afficher statistique
var min = document.getElementById("min");
var max = document.getElementById("max");
var moy = document.getElementById("moy");

// récupère le mois en cours et défini la valeur du dropbox par defaut
var moisEnCours = today.getMonth();
ListeMois.value = moisEnCours;

// Affiche le mois en cours avec la fonction fetch
fetchDataForMonth(moisEnCours);

// lorsque change de valeur dans le dropdown menu la value ( 0,1,2 ...) est saisi en paramètre
ListeMois.addEventListener("change", () => {
  // vider le tableau
  tabCalendrier.innerHTML = "";

  fetchDataForMonth(ListeMois.value);
});

// Fonction pour sortir exploiter les données JSON, calculer statistique et générer le calendrier selon le mois choisi
function fetchDataForMonth(mois) {
  fetch("temperatures_2023.json")
    .then((response) => response.json())
    .then((data) => {
      temp = data.temperatures;

      // récupère les données juste pour le mois dans tabTempMois
      CreerTabTempMois(mois,temp)

      // CALCUL STATISTIQUE ET AFFICHAGE pour le mois en cours ( MIN, MAX , MOY)
      afficherStatistique(tabTempMois);

      // //GÉNÉRER CALENDRIER selon le mois choisi
      genereCalendrier(today.getFullYear(), mois, temp)

    });
}

function CreerTabTempMois(mois,temp){

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


}

function afficherStatistique(tabTempMois) {
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

function genereCalendrier(annee, mois, temp) {
  

    // Get a reference to the calendar body
  const tabCalendrier = document.getElementById("tabCalendrier");

  // Clear the previous contents of the calendar
  tabCalendrier.innerHTML = "";

  // Get the first day of the month
  var firstDay = new Date(annee, mois, 1).getDay();
  // Get the number of days in the month
  const lastDay = new Date(annee, mois + 1, 0).getDate();

  // Loop through each row of the calendar
  for (let i = 0; i < 6; i++) {
    // Create a new row
    const row = document.createElement("tr");

    // Loop through each column of the row
    for (let j = 0; j < 7; j++) {
      // Calculate the day number for this cell
      const day = i * 7 + j - firstDay + 1; 

      // Create a new cell
      const cell = document.createElement("td");

      // Add the day number to the cell
      if (day > 0 && day <= lastDay) {
        // Find the temperature for this day
        let temperature = "";
        for (let k = 0; k < temp.length; k++) {
          // parcours le tableau "temp" avec toute les données du JSON "temp = data.temperatures;"" si date match on récupère la temperature
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

        cell.innerText = "" + day + "\n" + temperature;
        var icone1 = document.createElement("img");
        chooseIcon(temperature); //Pour l'icône niege, pluie, etc
        icone1.src = icone;
        icone1.width = "10"; //Taille de l'icône
        cell.appendChild(icone1);
      }

      // Add the cell to the row
      row.appendChild(cell);
    }

    // Add the row to the calendar body
    tabCalendrier.appendChild(row);
  }
}

//fonction reprise du code de simon


//Choix de l'icône
function chooseIcon(temperature) {
  if (temperature <= 0) {
    icone = "images/neige.png";
  } else if (temperature >= 20) {
    icone = "images/soleil.png";
  } else if (temperature <= 10) {
    icone = "images/pluie.png";
  } else if (temperature < 20) {
    icone = "images/nuage.png";
  }
}
