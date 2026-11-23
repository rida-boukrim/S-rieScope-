// src/main.js
import { displayData } from "./services/serieService.js";
import { afficher } from "./ui/cards.js";
import { filtrerEtRechercher } from "./ui/filters.js";
import { ajouter } from "./ui/form.js";
let series = []
async function init() {

  try {
     series = await displayData();
    const reset = document.getElementById("resete");
    const search = document.getElementById("Recherche");
    const genreField = document.getElementById("genres");

    // afficher(series);

    function reda() {
      const resultat = filtrerEtRechercher(
        series,
        search.value,
        genreField.value,
      );

      afficher(resultat);
    }

    search.addEventListener("input", reda);
    genreField.addEventListener("change", reda);

    reset.addEventListener("click", () => {
      search.value = "";
      genreField.value = "Tous les genre";
      reda();
    });

    reda();
  } catch (error) {
    console.log("somthing wrong", error);
  }


}

init();


const form = document.getElementById("ajouteForm");
form.addEventListener("submit", async (e) => {
  e.preventDefault()
  const nouvelle = await ajouter()
  series.push(nouvelle)
  afficher(series)
  form.reset()
})

