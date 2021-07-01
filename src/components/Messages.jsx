import React from 'react'

export const Messages = ({messages, deleteMessage}) => {
    return (
        <div>
             <h3>Messages:</h3>
                <div>
                    <div>{messages.map(m => (
                        <div key={m.id}>
                        <div className='messageItem'><strong></strong><i>{m.text}</i></div>
                        <button onClick={()=>deleteMessage(m.id)} className='deleteBtn'>X</button>
                           
                    </div>
                ))}</div>
                </div>
                
      
        </div>
    )
}

