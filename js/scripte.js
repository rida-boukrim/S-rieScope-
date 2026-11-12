const search = document.getElementById("Recherche");
const filtrerParGenre = document.getElementById("genres");
const Reinitialiser = document.getElementById("resete");
const ajouter = document.getElementById("Ajouter");
const titleField = document.getElementById("titre");
const genreField = document.getElementById("genre");
const description = document.getElementById("summary");
const fomrAjouter = document.getElementById("ajouteForm");
const voidee = document.getElementById("vide");
const compteurSreies = document.getElementById("compteur")

const nameError = document.getElementById("erroreNom");
const typeErrore = document.getElementById("errorGenre");


let films = [];
let filmsOriginal = [...films];


async function recuperation() {
  try {
    const response = await fetch("https://api.tvmaze.com/shows?page=0");
    if (!response.ok) {
      throw new Error("somthing went wrong");

    }
        
    const data = await response.json();

      const dataStorage = localStorage.getItem("films");

    if (dataStorage !== null) {
  
      filmsOriginal = JSON.parse(dataStorage);
    } else {
      
      filmsOriginal = data.slice(0, 20);

    
      localStorage.setItem("films", JSON.stringify(filmsOriginal));
    }
films = [...filmsOriginal];

afficher(filmsOriginal);
    
  } catch (error) {
    console.log("Error", error.message);
  }
}
recuperation();

//    function afficher
const liste = document.getElementById("list-films");

function afficher(films) {
  liste.innerHTML = "";
  compteurSreies.textContent = films.length + " Series Afficher"
  films.forEach((element) => {
    const cardArticle = document.createElement("article");
    cardArticle.className = "mx-1 bg-[#191919] mb-1.5 rounded-md";
    const image = document.createElement("img");
    image.className = "rounded-md h-[75%] w-[100%]";
    image.src = element.image.original;
    const titre = document.createElement("p");
    titre.className = "ml-1.5 text-[#FAFAFA] text-sm font-bold mt-1.5 mb-1";
    titre.textContent = element.name;
    const divGenre = document.createElement("div");
    divGenre.className = "flex ml-1.5 mb-1 ";
    element.genres.forEach((genre) => {
      const genre1 = document.createElement("p");
      genre1.className =
        "mr-1 bg-[#292929] px-1 mt-0.5 mb-0.5 rounded-xl text-[#EEEEEE] ";
      genre1.textContent = genre;

      divGenre.append(genre1);
    });
    const descrption = document.createElement("p");
    descrption.innerHTML = element.summary.slice(0, 110) + " ...";
    descrption.className = " text-[#BABABA] text-xs font-normal pb-2.5 ml-1.5";

    cardArticle.append(image, titre, divGenre, descrption);
    liste.append(cardArticle);
    
  });
  films.forEach((elemente) => {
    elemente.genres.forEach((genree) => {
      const opt = document.createElement("option");
      opt.textContent = genree;
      opt.className = "text-black";
      let bool = true;
      document.querySelectorAll("option").forEach((elm) => {
        if (genree == elm.value) {
          bool = false;
        }
      });
      if (bool) {
        filtrerParGenre.append(opt);
      }
    });
  });
}

function filtrerEtRechercher() {
  const searchValue = search.value.toLowerCase().trim();
  const genreValue = filtrerParGenre.value;

  const resultat = filmsOriginal.filter((elem) => {
    const matchName = elem.name.toLowerCase().includes(searchValue);
    const matchGenre = genreValue.includes("Tous les genre") || elem.genres.includes(genreValue);

    return matchName && matchGenre;
  });

  afficher(resultat);
   voidee.toggleAttribute("hidden", resultat.length > 0);
}

search.addEventListener("input", filtrerEtRechercher);
filtrerParGenre.addEventListener("change", filtrerEtRechercher);

Reinitialiser.addEventListener("click", () => {
  search.value = "";
  filtrerParGenre.value = "Tous les genre";
  afficher(filmsOriginal);
});

// function ajouter
ajouter.addEventListener("click", (e) => {
  e.preventDefault();
  nameError.textContent = "";
  typeErrore.textContent = "";

  if (titleField.value == "") {
    nameError.className = "text-red-500 ";
    nameError.textContent = "champ required";
  }
  if (genreField.value == 0) {
    typeErrore.className = "text-red-500";
    typeErrore.textContent = "champ required";
    return;
  }

  const namee = titleField.value;
  const leGenre = genreField.value;
  const sum = description.value;
  const photo = { original: "assets/images/image.Webp" };


  const nouvelle = {
    name: namee,
    summary: sum,
    image: photo,
    genres: leGenre.split(","),
  };
  filmsOriginal.push(nouvelle);
  localStorage.setItem("films",JSON.stringify(filmsOriginal))
   compteurSreies.textContent = filmsOriginal.length
  fomrAjouter.reset();
  
  

  afficher(filmsOriginal);
});
