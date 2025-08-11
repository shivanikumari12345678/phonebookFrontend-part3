import React from 'react'

const MessageNotification=({message})=> {
    
    if(message===null){
        return null
    }
     return (
        <div className='notifications'>
            {message}
        </div>
    )    
  
}
export default MessageNotification
