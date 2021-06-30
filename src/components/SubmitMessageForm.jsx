import React from 'react'

export const SubmitMessageForm = ({onChange, message, onSubmit, loading}) => {
    return (
        <div>
             <input type='text' placeholder='Enter your message...' onChange={onChange} value={message.text}/>
            <button className='sendButton' type='button' onClick={onSubmit} disabled={loading}>{loading ? 'Loading...' : 'Send'}</button>
        </div>
    )
}
