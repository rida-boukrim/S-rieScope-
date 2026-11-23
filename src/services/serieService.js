import api from './api.js'

export async function displayData (filter = {}) {

    const response = await api.get("/series",filter)
    
  
    return response.data;
}

export async function remove (id) {
    const res = await api.delete(`/series/${id}`)
    return res.data
}

export async function getById (id){
    const response = await api.get(`/series/${id}`)
    return response.data
}
export async function update() {
    const respons = await api.patch("/series")
    return respons.data
}