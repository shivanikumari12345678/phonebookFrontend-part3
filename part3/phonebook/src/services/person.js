import axios from "axios";
const URL="http://localhost:3001"
const deleteDetail=(id)=>{
    const response=axios.delete(`${URL}/api/persons/${id}`)
    return response.then(res=>res.data)    
}

const replaceDetails=(editDetailObj)=>{
    const id=editDetailObj.id
    const response=axios.put(`${URL}/api/persons/${id}`,editDetailObj)
    return response.then(res=>res.data)
}

const create=(newObject)=>{
    const response=axios.post(`${URL}/api/persons`,newObject)
    return response.then(res=>res.data)
}

export default {deleteDetail,replaceDetails,create}   