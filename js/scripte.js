const search = document.getElementById("Recherche");

let films = [];
let filmsOriginal = [...films];

async function recuperation() {
  try {
    const response = await fetch("https://api.tvmaze.com/shows?page=0");
    if (!response.ok) {
      throw new Error("somthing went wrong");
    }
    const data = await response.json();
    films = data.slice(0, 20);
    filmsOriginal = [...films];

    afficher(films);
  } catch (error) {
    console.log("Error", error.message);
  }
}
recuperation();

//    function afficher
const liste = document.getElementById("list-films");

function afficher(films) {
  liste.innerHTML = ""
  films.forEach((element) => {
    const cardArticle = document.createElement("article");
    cardArticle.className = "mx-1 bg-[#393939] mb-1.5 rounded-md";
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
      genre1.className = "mr-1 bg-[#292929] px-1 mt-0.5 mb-0.5 rounded-xl ";
      genre1.textContent = genre;

      divGenre.append(genre1);
    });
    const descrption = document.createElement("p");
    descrption.innerHTML = element.summary.slice(0, 110) + " ...";
    descrption.className = " text-[#BABABA] text-xs font-normal pb-2.5 ml-1.5";

    cardArticle.append(image, titre, divGenre, descrption);
    liste.append(cardArticle);
  });
}

search.addEventListener("input", () => {
  films = filmsOriginal.filter((elem) => {
    return elem.name.toLowerCase().includes(search.value.toLowerCase());
  });
  afficher(films);
});
