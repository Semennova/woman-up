import './App.css';
import React, {useState, useEffect} from 'react';
import { SubmitMessageForm } from './components/SubmitMessageForm';
import { Messages } from './components/Messages';
import firebase from "firebase/app";


function App() {
  const db = firebase.firestore();

  let [message, setMessage] = useState({
    text: ''
  });
  const [messages, setMessages] = useState([]);
  const [loading, setLoading] = useState(false)

  useEffect(()=>{
    (async()=> {
      const snapshot = await db.collection('messages').get();
      let messagesArr = [];
      snapshot.forEach(doc=> {
        messagesArr.push({
          id: doc.id,
          ...doc.data()
        })
      })
   
      setMessages(messagesArr)
    })()
  }, [])


  const onChange = (e)=> {
    setMessage({
      text: e.target.value
    })
  }

  const onSubmit = async () => {
    setLoading(true)
    const newMessage = await db.collection('messages').add({
      ...message
    });
   
    setMessages([...messages, message]);
    setMessage({
      text: ''
    });  

    setLoading(false)
  }

  const deleteMsgFromUI = (id) => {
    setMessages(messages.filter(message => message.id !== id))
  }



  const deleteMessage = async (id) => {
    await db.collection('messages').doc(id).delete();
    deleteMsgFromUI(id)
  }

  return (
    <div className='container'>
        <SubmitMessageForm onChange={onChange} message={message} onSubmit={onSubmit} loading={loading}/>
        <Messages messages={messages} deleteMessage={deleteMessage}/>
    </div>
  );
}

export default App;

