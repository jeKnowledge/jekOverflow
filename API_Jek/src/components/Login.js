import axios from 'axios';
import React from 'react';
import { GoogleLogin } from 'react-google-login';
import { refreshTokenSetup } from '../utils/refreshToken';

const clientId =
  '707788443358-u05p46nssla3l8tmn58tpo9r5sommgks.apps.googleusercontent.com';

function Login() {
  const onSuccess = (res) => {
    const idToken = res.tokenObj.id_token;
    axios.post('http://127.0.0.1:8000/login/', {token: idToken }).then((server_res)=>{
      let { status, token } = server_res.data;

      if (status === "found") {
        alert(
          `Logged in successfully welcome ${res.profileObj.name}.`
        );

        refreshTokenSetup(res);
      } 
      
      else {
        alert("User not found"); 
      } 
    })
    
    .catch(error => {console.log(error.response)});
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
