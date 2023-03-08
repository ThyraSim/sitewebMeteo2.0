//Prise en mémoire de la date d'aujourd'hui
var today = new Date();
today.setHours(0, 0, 0, 0);

// cible dans le html

var tabCalendrier = document.getElementById("tabCalendrier"); // table calendrier
var ListeMois = document.getElementById("ListeMois"); //  dropdown menu

//pour statistique
var min = document.getElementById("min");
var max = document.getElementById("max");
var moy = document.getElementById("moy");

var moisEnCours = today.getMonth();
ListeMois.value = moisEnCours;

// Affiche le mois en cours avec la fonction fetch
fetchDataForMonth(moisEnCours);

// Fonction pour sortir exploiter les données JSON, calculer statistique et générer le calendrier
function fetchDataForMonth(mois) {
  fetch("temperatures_2023.json")
    .then((response) => response.json())
    .then((data) => {
       temp = data.temperatures;

      // récupère les données juste pour le mois
      var tabTempMois = [];
      temp.forEach((jour) => {
        var dateJSON = new Date(jour.DateDuJour);
        dateJSON.setHours(0, 0, 0, 0);
        dateJSON.setDate(dateJSON.getDate() + 1);

        if (dateJSON.getMonth() == mois)  {  // si 
          // pour calculer statistique
          tabTempMois.push(jour.TempDuJour);
        }
      });

      // calcul statistique
      max.innerHTML = Math.max(...tabTempMois); // calcul de la valeur max du mois
      min.innerHTML = Math.min(...tabTempMois); // calcul de la valeur min
      moy.innerHTML = CalcultempMoyenneMois(tabTempMois); // avec fonction retourne la moyenne

      //générer calendrier
      let annee = today.getFullYear();
      // Get the first day of the month
      var firstDay = new Date(annee, mois, 1).getDay();
      // Get the number of days in the month
      const lastDay = new Date(annee, mois + 1, 0).getDate();

      // Get a reference to the calendar body
      const tabCalendrier = document.getElementById("tabCalendrier");
      // Clear the previous contents of the calendar
      tabCalendrier.innerHTML = "";

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
    });
}



// lorsque change de valeur dans le dropdown menu
ListeMois.addEventListener("change", () => {
  // vider le tableau
  tabCalendrier.innerHTML = "";

  fetchDataForMonth(ListeMois.value);
});

// fonction pour calculer la moyenne du mois
function CalcultempMoyenneMois(tabTempMois) {
  let sum = 0;
  let nb = tabTempMois.length;
  tabTempMois.forEach((jour) => {
    sum += jour;
  });
  return Math.round(sum / nb);
}

function afficherStatistique(liste){


}



//fonction reprise du code de simon

function mois(dateJSON) {
  if (dateJSON.getMonth() == 0) {
    moisChoisi = dateJSON.getDate() + " janvier";
  } else if (dateJSON.getMonth() == 1) {
    moisChoisi = dateJSON.getDate() + " février";
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
    moisChoisi = dateJSON.getDate() + " décembre";
  }
}



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
