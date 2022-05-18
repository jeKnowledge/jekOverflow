import React from 'react';
import { GoogleLogout } from 'react-google-login';
const clientId =
  '707788443358-u05p46nssla3l8tmn58tpo9r5sommgks.apps.googleusercontent.com';

function Logout() {
  const onSuccess = () => {
    if(window.sessionStorage.getItem("id_token") == null){
      alert('You are not logged in');
    }
    else{
      window.sessionStorage.removeItem("id_token");
      alert('Logout made successfully');
    }
  };

  return (
    <div>
      <GoogleLogout
        clientId={clientId}
        buttonText="Logout"
        onLogoutSuccess={onSuccess}
      ></GoogleLogout>
    </div>
  );
}

export default Logout;
