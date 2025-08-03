import { useState } from "react";
import Display from "./Display";
import History from "./History";
import Button from "./Button";
import Statistics from "./Statistics";
function App() {
  const heading="give feedback";
  const heading2="statistics";
  
  const [good,setGood]=useState(0);
  const [natural,setNatural]=useState(0);
  const [bad,setBad]=useState(0);
  const [totalFeedback,setTotalFeedback]=useState(0);
  
  const feedback={
    good:good,
    natural:natural,
    bad:bad
  }

  

  
  const handleGoodClick=()=>{
    const updatedGood=good+1
    setGood(updatedGood)
    
    setTotalFeedback(good+bad+natural)
  }

  const handleNaturalClick=()=>{
    const updatedNatural=natural+1
    setNatural(updatedNatural)
    setTotalFeedback(good+bad+natural)
  }

  const handleBadClick=()=>{
    const updatedBad=bad+1
    setBad(updatedBad)
    
    setTotalFeedback(good+bad+natural)
  }

  return (
    <>
      <Display name={heading}/>
      <Button onClick={handleGoodClick} text='good' />
      <Button onClick={handleNaturalClick} text='natural' />
      <Button onClick={handleBadClick} text='bad'/>
      <Display name={heading2}/>
      <Statistics feedback={feedback}/>
    </>
  )
}

export default App
