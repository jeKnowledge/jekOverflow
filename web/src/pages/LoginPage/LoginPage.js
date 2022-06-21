import { useEffect } from 'react'
import login from './../../assets/img/login.png'
import loginText from './../../assets/img/loginText.png'
import jklogoB from './../../assets/img/jklogoB.png'
import jwt_decode from 'jwt-decode'
import Button from 'react-bootstrap/Button';
import './LoginPage.css'

function Login() {

  function handleCallbackResponse(response) {
    var userObject = jwt_decode(response.credential);
    if (userObject.hd === 'jeknowledge.com' && userObject.email_verified) {
      console.log(userObject.name)
      console.log(userObject.email)
      console.log(userObject.sub)
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
      { theme:"outline", size:"large", shape:"circle"},
    )
  }, []);

  return (
    <div className='login-page'>
      <div className='jek-container' >
        <img className='jek-logo' src={jklogoB} alt="jklogoB"/>
        <img className='jek-text' src={loginText} alt="loginText"/>
      </div>
      <div className='login-container'>
        <Button variant="btn btn-default" size="sm" style={{padding: '0px',  border: 'none'}}><img className='login-button' src={login} alt="login"/></Button>
        <div id="signInDiv"></div>
      </div>
      <script src="https://apis.google.com/js/platform.js?onload=onLoadGoogleCallback" async defer></script>
    </div>
  );
}

export default Login;