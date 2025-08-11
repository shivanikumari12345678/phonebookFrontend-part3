import React from 'react'
import { useState } from 'react';
import SelectedCountry from './SelectedCountry';

const MatchedCountry=({filterData})=> {
    const size=filterData.length;
    const [choosenCountry,setChoosenCountry]=useState(null)
    
    if(size === 0){
        return null
    }
    if(size > 10){
        return <p>{"Too many matches, specify another filter"}</p>
    }
    if(size===1){
        const Languages=filterData[0].languages
        const flagurl=filterData[0].flags.png
    
        return (
        <>
            <SelectedCountry filterData={filterData} languages={Languages} flagurl={flagurl}/>
        </>
        )
    }
    else{
        if(choosenCountry){
            return(
                <SelectedCountry
                    filterData={[choosenCountry]}
                    languages={choosenCountry.languages}
                    flagurl={choosenCountry.flags.png}
                />
            )
        }

        return (
            <>
            {     
                filterData.map((filter) => {
                return (
                    <React.Fragment key={filter.cca3}>
                        <li>{filter.name.common}</li>
                        <button onClick={()=>setChoosenCountry(filter)}>show</button>   
                    </React.Fragment>            
                )
                })

                
            }
            
                
            </>
        )
    }
}

export default MatchedCountry
