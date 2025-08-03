import React from 'react'
import Statisticline from './Statisticline'
const Statistics=({feedback})=> {
    const {good,natural,bad}=feedback
    const totalFeedback=good+bad+natural
    const average=totalFeedback/2;
    const positives=((good-bad)/(good+bad+natural))*100
if(good===0 && bad===0 && natural===0){
    return(
        <div>No feedback given</div>
    )
}
return (
    <>
        <div>
            <table>
                <tbody>
                <tr>
                    <td><Statisticline text='good' /></td>
                    <td><Statisticline value={good}/></td>
                </tr>
                    
                <tr>
                    <td><Statisticline text='natural' /></td>
                    <td><Statisticline value={natural}/></td>
                </tr>
                    
                <tr>
                    <td><Statisticline text='bad' /></td>
                    <td><Statisticline value={bad}/></td>
                </tr>
                    
                <tr>
                    <td><p>average </p></td>
                    <td>{average}</td>
                </tr>
                
                <tr>
                    <td><p>positives </p></td>
                    <td>{positives} %</td>
                </tr>
               </tbody>     
                

            </table>
  
        </div>
    </>
  )
}

export default Statistics
