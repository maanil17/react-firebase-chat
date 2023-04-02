import React, { useEffect, useState } from 'react'
import {addDoc, collection, onSnapshot, serverTimestamp,query,where, orderBy} from "firebase/firestore"
import { auth, db } from '../firebase'
import attach from "../images/attach.png"




import "../styles/Chat.css"



const Chat = (props) => {
const {room} = props;
const {signUserout} = props;




  const [newMessage,setNewMessage]= useState("")


  const [messages, setMessages] = useState([])

  

  const messageRef = collection(db,"messages")

  useEffect(()=> {

    const queryMessages= query(messageRef,where("room","==",room), orderBy("createdAt"));
    const unsubscribe = onSnapshot(queryMessages,(snapshot) => {
      let messages = [];

      snapshot.forEach((doc) => {
        messages.push({...doc.data(), id : doc.id})
      })

      setMessages(messages)
    })


    return () => unsubscribe()

  },[])


  
const handleSubmit = async (e) => {

  e.preventDefault()
  
  if(newMessage === "") return;

//sending message and its info to firebase db

  await addDoc(messageRef, {
    text: newMessage,
    createdAt: serverTimestamp(),
    user: auth.currentUser?.displayName,
    room,


  })

  setNewMessage("")

  
  
  }



  

  return (

    

    <div className='wrapper1'>


    <div className='chat-app'>

      <div className='header'>
        <h1 className='welcome'>Welcome to : {room.toUpperCase()}</h1>
      </div>

      <div className='messages'> 

      {messages.map((message) => 

      // <div className='message' key={message.id}>
      //   <span className='user'>{message.user}</span>
      //   {message.text}

    
  

      // </div>

   <>

   { message.user===auth?.currentUser?.displayName ? 

(
      <div class="message1" key={message.id}>
  <div class="message-content1">
  <p><strong>{message.user}</strong></p>
    <p>{message.text}</p>
    
  </div>
</div>

) : (

  <div class="message" key={message.id}>
  <div class="message-content">
    <p><strong>{message.user}</strong></p>
    <p>{message.text}</p>
 
  </div>
</div>

)
      
}

      </>

      


      )}

      </div>
        
        <form onSubmit={handleSubmit} className='new-message-form'>

          <input className='new-message-input' 
          placeholder='Type Your Message here..'
          onChange={(e)=> setNewMessage(e.target.value)}
          value={newMessage}

          
          />

          {/* <div className='imgs'>
          
          </div> */}

          <input type="file" style={{display:"none"}} id="file"  />
          <label htmlFor='file' >
          <img src={attach} alt="na" srcset="" className='attach'/>

          </label>
          
          <div className='send-button-cover'>
          <button type='submit' className='send-button' >
            Send


          </button>
          </div>




        </form>

        <div className='signout'>

<button onClick={signUserout} className="btn btn-secondary">Sign Out</button>

</div>
        
    </div>

    </div>
  )
}

export default Chat