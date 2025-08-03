import { useState } from "react"
import Display from './components/Display'
import Button from "./components/Button";
function App() {
  const [counter,setCounter]=useState(0);
  const increaseByOne=()=>setCounter(counter+1)
  const setToZero=()=>setCounter(0);
  const decreaseByOne=()=>setCounter(counter-1)
  return (
    <>
      <Display counter={counter}/>
      <Button onClick={increaseByOne} text='Plus'/>
      <Button onClick={setToZero} text='Zero'/>
      <Button onClick={decreaseByOne} text='minus'/>
    </>
  )
}

export default App
