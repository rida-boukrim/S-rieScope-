import { remove } from "../services/serieService.js";
import { modification } from "./form.js";



const liste = document.getElementById("list-films");

const filtrerParGenre = document.getElementById("genres");
const selectLanguage = document.getElementById("selectLanguage")




const compteurSreies = document.getElementById("compteur")


export function afficher(films){
  liste.innerHTML = "";
  compteurSreies.textContent = films.length + " Series Afficher"
  films.forEach((element) => {
    const cardArticle = document.createElement("article");
    cardArticle.className = "mx-1 bg-[#191919] mb-1.5 rounded-md";
    const image = document.createElement("img");
    image.className = "rounded-md h-[75%] w-[100%]";
    image.src = element.image?.original || "assets/images/image.Webp"
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
    const btns = document.createElement("div")
    btns.className ="flex justify-between "
    const supresion = document.createElement("button")
    supresion.textContent ="Supprimer"
    supresion.type = "button"
    supresion.className ="mr-1 bg-[#292929] px-1 mt-0.5 mb-0.5 rounded-xl text-[#EEEEEE] mb-2.5 ml-1.5 ";
    supresion.addEventListener("click",() =>{
        remove(element.id)
        films = films.filter(el => el.id !=element.id)
        afficher(films)
    })

    const modifacatione = document.createElement("button")
    modifacatione.textContent ="Modifier"
    modifacatione.type ="button"
    modifacatione.className ="mr-1 bg-[#292929] px-1 mt-0.5 mb-0.5 rounded-xl text-[#EEEEEE] mb-2.5 mr-1.5 ";
    modifacatione.addEventListener("click",()=>{
      modification(element.id)
      modifacatione.textContent="zef"
    })
btns.append(supresion,modifacatione)
    cardArticle.append(image, titre, divGenre, descrption,btns);
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

  films.forEach(element => {
    element.language
      const optt = document.createElement("option")   
      optt.textContent= element.language
      
      optt.className= "text-black";

            let bool = true;
      document.querySelectorAll("option").forEach((elm) => {
        if (element.language == elm.value) {
          
          
          bool = false;
        }
      });
      if (bool) {
              
        selectLanguage.append(optt);
        
      }
    
    

  });
}