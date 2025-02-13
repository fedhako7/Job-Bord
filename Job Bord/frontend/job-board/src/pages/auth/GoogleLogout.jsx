import { GoogleLogout } from 'react-google-login'

function GoogleSignOut() {
  const CLIENT_ID = import.meta.env.VITE_CLIENT_ID

  // functions
  const onSuccess = () => {
    console.log('Logout successfull')
  }
  //Return 
  return (
    <div id='SignOutButton'>
      <GoogleLogout
        clientId={CLIENT_ID}
        buttonText={"Logout"}
        onLogoutSuccess={onSuccess}
      />
    </div>
  )
}

export default GoogleSignOut