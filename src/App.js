
import { useState, useRef } from 'react';
import './App.css';
import { Auth } from './components/Auth';


import Cookies from "universal-cookie"
import Chat from './components/Chat';

import {signOut} from "firebase/auth"
import {auth} from "./firebase"

const cookies= new Cookies()

function App() {




  const [isAuth, setIsAuth] = useState(cookies.get("auth-token"))
  const [room, setRoom] = useState(null)
  const [titleName,setTitleName]= useState('')

  const roomInputRef= useRef(null)

  const signUserOut = async () => {
    await signOut(auth)
    cookies.remove("auth-token")
    setIsAuth(false)
    setRoom(null)

  }

  if(!isAuth)
  {
    return (
      <div className="App">
      <Auth setIsAuth={setIsAuth}/>
        
      </div>
    );

    }

    return (
      <>


        { room ? (
          <Chat room={room} signUserout={signUserOut} />
        ) : (
          <div className='wrapper'>
             <h1 className='welcome'>Welcome {auth.currentUser?.displayName.toLocaleUpperCase()}</h1>
          <div className='room'>
           
            <label>
              Enter Room Name
            </label>
            <input ref={roomInputRef}/>
            <button onClick={() => setRoom(roomInputRef.current.value)} className="new-button">Enter Chat</button>

            <div className='signout'>

<button onClick={signUserOut}>Sign Out</button>

</div>
          </div>
          </div>
        )}

       

        
      </>
    );

  }

 



  


export default App;
