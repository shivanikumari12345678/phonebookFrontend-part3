import axios from "axios";
const URL="http://localhost:3001/persons"
const deleteDetail=(id)=>{
    const response=axios.delete(`${URL}/${id}`)
    return response.then(res=>res.data)    
}

const replaceDetails=(updatedDetails)=>{
    const id=updatedDetails.id
    const response=axios.put(`${URL}/${id}`,updatedDetails)
    return response.then(res=>res.data)
}

const create=(newObject)=>{
    const response=axios.post(`${URL}`,newObject)
    return response.then(res=>res.data)
}

export default {deleteDetail,replaceDetails,create}   