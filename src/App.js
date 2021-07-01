import './App.css';
import React, {useState, useEffect} from 'react';
import { SubmitMessageForm } from './components/SubmitMessageForm';
import { Messages } from './components/Messages';
import firebase from "firebase/app";


function App() {

  const db = firebase.firestore();

  let [message, setMessage] = useState({
    date: '',
    text: ''
  });
  const [messages, setMessages] = useState([]);
  const [loading, setLoading] = useState(false);
  /**
   * Функция получает объект документов (snapshot) из firestore. Преобразует объект snapshot в массив, сортирует его в порядке убывания, устанавливает массив messages.
   */

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
      messagesArr.sort((a,b) => {
        return b.date - a.date
      })
      setMessages(messagesArr)
    })()
  }, [])

  /**
   * Функция устанавливет ключ объекта message (message = {date:'', text:'вводимые в input данные'}) 
   * @param {string} e  параметр event
   * @returns {string} возвращает значение ключа text объекта message
   */


  const onChange = (e)=> {
    setMessage({
      ...message,
      text: e.target.value
    })
  }
  /**
   * Функция добавляет сообщение в UI и в firestore; устанавливет ключ date объекта message, для сортировки объектов в порядке их добавления в дальнейшем; зачищает input.
   */

  const addMessage = async () => {
    setLoading(true)
    const newMessage = await db.collection('messages').add({
      ...message,
        date: new Date().getTime()
    });
 
    setMessages([message, ...messages]);
    setMessage({
      text: ''
    });  

    setLoading(false)
  }
  /**
   * Функция удаляет сообщение из UI и из firestore.
   * @param {string} id параметр берется из объекта doc, коллекции firestore.
   * 
   */

  const deleteMessage = async (id) => {
    await db.collection('messages').doc(id).delete();
    setMessages(messages.filter(message => message.id !== id))
  }

  return (
    <div className='container'>
        <SubmitMessageForm onChange={onChange} message={message} addMessage={addMessage} loading={loading}/>
        <Messages messages={messages} deleteMessage={deleteMessage}/>
    </div>
  );
}

export default App;

