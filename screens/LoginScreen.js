import { useEffect, useState, useContext } from 'react';
import { ALERT_TYPE, Dialog, AlertNotificationRoot, Toast } from 'react-native-alert-notification';
import { authenticationHandle } from '../http/http';


import LoadingOverlay from '../components/ui/LoadingOverlay';
import AuthContent from '../components/Auth/AuthContent';
import { AuthContext } from '../store/store';


function LoginScreen() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [error, setError] = useState(null)
  const {authenticate} = useContext(AuthContext);

  async function loginHandler({email, password}){
    try{
      setIsAuthenticated(true)
      const response = await authenticationHandle("signin",email,password)
      setIsAuthenticated(false)
      authenticate(response)

    }catch(error){

      if (error.response) {

        // setError(error.response.data.error.message)
        setError("Invalid credintials, Please check your details");

        // console.log('Status Code:', error.response.status);
        // console.log('Response Data:', error.response.data);
        // console.log('Headers:', error.response.headers);


      } else if (error.request) {
        // The request was made, but no response was received
        setError("Please check your network")
      } else {
        // Something happened in setting up the request that triggered an Error
        // console.log('Error Message:', error.message);
      }
      setIsAuthenticated(false)
    }
    setIsAuthenticated(false)
  }

  console.log(error);

useEffect(() => {
  if(error && !isAuthenticated){
    Toast.show({
      type: ALERT_TYPE.DANGER,
      title: 'Error',
      textBody: error,
    })

  }else if(error === "TOO_MANY_ATTEMPTS_TRY-LATER" && !isAuthenticated){
    Toast.show({
      type: ALERT_TYPE.DANGER,
      title: 'Error',
      textBody: 'Too many attempts try later',
    })
  }
}, [error, isAuthenticated])


  // loading
  // if(isAuthenticated && !error){
  //   return <LoadingOverlay message="Logging you in...." />
  // }
  return (
    <>
     <AlertNotificationRoot>
      {isAuthenticated ? <LoadingOverlay message="Logging you in...."/> :  <AuthContent isLogin onAuthenticate={loginHandler}/>}
     </AlertNotificationRoot>
    </>
  );
}

export default LoginScreen;
