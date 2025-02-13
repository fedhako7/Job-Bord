import React, { useEffect } from 'react'
import {gapi } from "gapi-script"
import GoogleSignIn from './GoogleSignIn'
import GoogleSignOut from './GoogleLogout'

 
const CLIENT_ID = import.meta.env.VITE_CLIENT_ID

function GLogin() {
  useEffect(() => {
    function start () {
      gapi.client.init({
        clientId: CLIENT_ID,
        scope: ""
      })
    };

    gapi.load("client: auth2", start);
  })

  //Return
  return (
    <div>
      <GoogleSignIn />
      <GoogleSignOut />
    </div>
  )
}

export default GLogin