import { GoogleLogin } from 'react-google-login'

//Client Id
const CLIENT_ID = import.meta.env.VITE_CLIENT_ID
function GoogleSignIn() {
  
  //functions
  const onSuccess = (res) => {
    console.log("Login success, current user:", res.profileObj, "res ob=", res)

  }
  const onFailure = (res) => {
    console.log("Login failed, res: ", res)
  }

  //Return
  return (
    <div className=' flex justify-center '>
      <GoogleLogin
        clientId={CLIENT_ID}
        buttonText='Login With Google'
        onSuccess={onSuccess}
        onFailure={onFailure}
        cookiePolicy={'single_host_origin'}
        isSignedIn={true}
        className=" h-10 w-full max-w-[250px] truncate md:max-w-[300px] "
      />
    </div>
  )
}

export default GoogleSignIn