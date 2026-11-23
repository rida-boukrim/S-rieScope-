import api from "../services/api.js";
import { getById} from "../services/serieService.js";





    const titleField = document.getElementById("titre");
    const genreField = document.getElementById("genre");
const description = document.getElementById("summary");
function getInputValue () {
    let valid = true
    if(titleField.value || genreField.value || description.value == ""){
        valid = false
        if(!valid){

            console.log("ach tma khliti lform khawi ");
        }
        
        
    }else { titleField.value && genreField.value && description.value
        valid = true
    }
}


export   async function ajouter() {
  
    getInputValue()
    const filme = {name: titleField.value, genres:genreField.value.split(","), summary:description.value,language:"reda"}
    const response = await api.post("/series" , filme )
    
    return response.data

}


export async function modification (id){
    const serieModifier = await getById(id)
    titleField.value = serieModifier.name
    genreField.value = serieModifier.genres.join()
     description.value = serieModifier.summary

}
 




