//Prise en mémoire de la date d'aujourd'hui pour vérifier le mois en cours
var today = new Date();
today.setHours(0, 0, 0, 0);

// dropdown menu

var ListeMois = document.getElementById("ListeMois"); //  dropdown menu

// récupère le mois en cours et défini la valeur du dropdown menu par defaut
var moisEnCours = today.getMonth();
ListeMois.value = moisEnCours;

// Affiche le mois en cours avec la fonction fetch
fetchDataForMonth(moisEnCours);

// lorsque change de valeur dans le dropdown menu la value ( 0,1,2 ...) est saisi en paramètre
ListeMois.addEventListener("change", () => {
  fetchDataForMonth(ListeMois.value);
});

// Fonction pour sortir récupérer les données JSON, calculer statistique et générer le calendrier selon le mois choisi
function fetchDataForMonth(mois) {
  fetch("temperatures_2023.json")
    .then((response) => response.json())
    .then((data) => {
      temp = data.temperatures;
      
      // RÉCUPÈRE LES DONNES JUSTE POUR LE MOIS DANS tabTempMois
      tabTempMois = CreerTabTempMois(mois,temp)

      // CALCUL STATISTIQUE ET AFFICHAGE pour le mois en cours ( MIN, MAX , MOY)
      afficherStatistique(tabTempMois);

      // //GÉNÉRER CALENDRIER selon le mois choisi
      genereCalendrier(today.getFullYear(), mois, temp)

    });
}

// récupère les données juste pour le mois ( en fonction du dropdown menu) dans tabTempMois
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

 // CALCUL STATISTIQUE ET AFFICHAGE pour le mois en cours ( MIN, MAX , MOY)
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

// //GÉNÉRER CALENDRIER selon le mois choisi
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

//fonction reprise du code de simon

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
