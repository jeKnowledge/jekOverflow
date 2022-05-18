import axios from 'axios';
import React from 'react';
import { GoogleLogin } from 'react-google-login';

const clientId =
  '707788443358-u05p46nssla3l8tmn58tpo9r5sommgks.apps.googleusercontent.com';

function Login() {
  const onSuccess = (res) => {
    if(window.sessionStorage.getItem("id_token") == null){
    const idToken = res.tokenObj.id_token;
    axios.post('http://127.0.0.1:8000/login/', {token: idToken }).then((server_res)=>{
      let { status, refresh_token } = server_res.data;

      if (status === "found") {
        alert(
          `Logged in successfully welcome ${res.profileObj.name}.`
        );
        console.log(refresh_token)
        window.sessionStorage.setItem("id_token", refresh_token);
      } 
      
      else {
        alert("User not found"); 
      } 
    })
    
    .catch(error => {console.log(error.response)});
  }
  else{
    alert('Logout before trying to sign in with other user');
  }
};

  const onFailure = (res) => {
    
    console.log('Login failed: res:', res);

    alert(
      `Failed to login.`
    );
  };

  return (
    <div>
      <GoogleLogin
        clientId={clientId}
        buttonText="Login"
        onSuccess={onSuccess}
        onFailure={onFailure}
        cookiePolicy={'single_host_origin'}
        style={{ marginTop: '100px' }}
        isSignedIn={true}
      />
    </div>
  );
}

export default Login;
