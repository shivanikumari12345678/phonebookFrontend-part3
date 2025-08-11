import { useEffect, useState } from "react"
import axios from 'axios'
import MatchedCountry from "./components/MatchedCountry"

function App() {
  const [countries,setCountries]=useState([])
  const [value,setValue]=useState('')
  const [filterData,setFilterData]=useState([])

  useEffect(()=>{
    axios.get("https://studies.cs.helsinki.fi/restcountries/api/all")
      .then(response=>{
        setCountries(response.data)
      })
      .catch(
        ()=>alert(`error in fetching data`)
      )
  },[])
  const handleChange=(e)=>{
    const inputVal=e.target.value;
    setValue(inputVal)
    if(countries.length > 0){
      const matchedCountries=countries.filter(country=>
      country.name.common.toLowerCase().includes(value.toLowerCase())
    )
    setFilterData(matchedCountries)
    } 
  } 
  
  return (
    <>
      find countries<input value={value} onChange={handleChange}/>
      <MatchedCountry filterData={filterData} />      
    </>
  )
}

export default App
