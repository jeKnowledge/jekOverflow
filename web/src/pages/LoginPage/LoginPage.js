import { useState, useEffect } from 'react'
import login from './../../assets/img/login.png'
import loginText from './../../assets/img/loginText.png'
import jklogoB from './../../assets/img/jklogoB.png'
import { useNavigate } from 'react-router-dom'
import jwt_decode from 'jwt-decode'
import axios from 'axios'
import './LoginPage.css'
import { fetchData } from '../../utility/utils'
import { AuthContext } from '../../components/AuthContext'
function Login() {
  const authcontext = React.useContext(AuthContext);

  const [users, setUsers] = useState(null);
  const navigate = useNavigate()

  useEffect(() => {
    fetchData(setUsers)
  }, [])

  function handleCallbackResponse(response) {
    let exists = false
    let userObject = jwt_decode(response.credential);

    console.log(response)

    if (userObject.email_verified) {
      if ((users.filter((user) => { return user.id_token === userObject.sub })).length !== 0) {
        exists = true
      }

      if (!exists) {
        axios.post(`http://127.0.0.1:8000/api/users/`, {
          'id_token': userObject.sub,
          'username': userObject.name,
          'email': userObject.email,
          'image': userObject.picture,
          'is_active': true
        },
          {
            headers: {
              "Authorization": `AUTHORIZATION_KEY`,
              "Content-Type": 'application/json'
            }
          }
        ).then((response) => {
          console.log(response)

          if (response.statusText === "OK") {

            localStorage.setItem('Authorization', response.data.token)
            localStorage.setItem('user', JSON.stringify(userObject.sub))

            authcontext.dispatch({ type: "LOGIN" });

            navigate('/home/')
          } else {
            console.error(response)
          }

        })
      }
      else {
        axios.put(`http://127.0.0.1:8000/api/users/${userObject.sub}/`, {
          'id_token': userObject.sub,
          'username': userObject.name,
          'email': userObject.email,
          'image': userObject.picture,
          'is_active': true
        },
          {
            headers: {
              "Authorization": `AUTHORIZATION_KEY`,
              "Content-Type": 'application/json'
            }
          }
        ).then((response) => {
          console.log(response)
          if (response.statusText === "OK") {
            localStorage.setItem('Authorization', response.data.token)

            localStorage.setItem('user', JSON.stringify(userObject.sub))

            authcontext.dispatch({ type: "LOGIN" });

            navigate('/home/')
          } else {
            console.error(response)
          }
        })
      }
    }
  }

  useEffect(() => {
    /* global google */
    google.accounts.id.initialize({
      client_id: "352573950698-j507onfr86l7f57t812mdli2vpngnpdu.apps.googleusercontent.com",
      callback: handleCallbackResponse
    })

    google.accounts.id.renderButton(
      document.getElementById("signInDiv"),
      { theme: "outline", size: "large", shape: "circle", logo_alignment: "center" },
    )
  }, [users])// eslint-disable-line react-hooks/exhaustive-deps

  return (
    <div className='login-page'>
      <div className='jek-container' >
        <img className='jek-logo' src={jklogoB} alt="jklogoB" />
        <img className='jek-text' src={loginText} alt="loginText" />
      </div>
      <div className='login-container'>
        <img className='login-button' src={login} alt="login" />
        <div className='signIn' id="signInDiv"></div>
      </div>
    </div>
  );
}

export default Login;