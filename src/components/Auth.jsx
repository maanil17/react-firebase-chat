import {auth,provider} from "../firebase"
import {signInWithPopup} from "firebase/auth"
import "../styles/Login.css"
import chatImage from "../images/img2.jpg"

import Cookies from "universal-cookie"

const cookies= new Cookies()


export const Auth = (props) => {

    const {setIsAuth} = props

     const signInWithGoogle = async (e) => {

        e.preventDefault()
        

          try {
          const result = await signInWithPopup(auth,provider)

          cookies.set("auth-token", result.user.refreshToken);

          setIsAuth(true)
          }

          catch(err) {
            console.error(err)

          }
    
     

     }


    return ( 

      <div className="container">
      <div className="form-container">
        <h2 className="form-title">Chatter Box</h2>
        <img src={chatImage} alt="" srcset=""  className="chatImage"/>
        <p>A private group chat app</p>
        <form>
         
          <button type="submit" className="btn btn-secondary" onClick={signInWithGoogle}>Sign In with Google</button>
        </form>
     
      </div>
    </div>
      
    )

}