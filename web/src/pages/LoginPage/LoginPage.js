import { useState, useEffect } from 'react'
import login from './../../assets/img/login.png'
import loginText from './../../assets/img/loginText.png'
import jklogoB from './../../assets/img/jklogoB.png'
import { useNavigate } from 'react-router-dom'
import jwt_decode from 'jwt-decode'
import axios from 'axios'
import './LoginPage.css'

function Login() {
  let [users, setUsers] = useState([]);
  const navigate = useNavigate()

  function handleCallbackResponse(response) {
    let exists = false
    const usersAPI = `http://127.0.0.1:8000/api/users/`    
    const getUsers = axios.get(usersAPI)
    axios.all([getUsers]).then(
      axios.spread((...allData) => {
        const allDataUsers = allData[0].data
        setUsers(allDataUsers)
      })
    )

    let userObject = jwt_decode(response.credential);
    if (userObject.hd === 'jeknowledge.com' && userObject.email_verified) {
      if (users.map((user) => { return user.id_token === userObject.sub}) !== []) {
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
        )
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
        )
      }
      navigate('/home/', {state: userObject.sub})
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
      { theme:"outline", size:"large", shape:"circle", logo_alignment: "center"},
    )
  }, [])// eslint-disable-line react-hooks/exhaustive-deps

  return (
    <div className='login-page'>
      <div className='jek-container' >
        <img className='jek-logo' src={jklogoB} alt="jklogoB"/>
        <img className='jek-text' src={loginText} alt="loginText"/>
      </div>
      <div className='login-container'>
        <img className='login-button' src={login} alt="login"/>
        <div className='signIn' id="signInDiv"></div>
      </div>
    </div>
  );
}

export default Login;