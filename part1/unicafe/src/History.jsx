import React from 'react'

const History=(props)=> {
    if(props.allClicks.length == 0){
        return(
            <div>
                <p>the app is used by pressing the buttons</p>
            </div>
        )
    }
  return (
    <div>
        <p>total no of clicks:  {props.allClicks.join(' ')}</p>
    </div>
   
  )
}

export default History
