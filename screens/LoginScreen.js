import { useEffect, useState } from 'react';
import { ALERT_TYPE, Dialog, AlertNotificationRoot, Toast } from 'react-native-alert-notification';
import { authenticationHandle } from '../http/http';


import LoadingOverlay from '../components/ui/LoadingOverlay';
import AuthContent from '../components/Auth/AuthContent';


function LoginScreen() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [error, setError] = useState(null)

  async function loginHandler({email, password}){
    try{
      setIsAuthenticated(true)
      const response = await authenticationHandle("signin",email,password)
      setIsAuthenticated(false)

    }catch(error){

      if (error.response) {

        setError(error.response.data.error.message)

        // console.log('Status Code:', error.response.status);
        // console.log('Response Data:', error.response.data);
        // console.log('Headers:', error.response.headers);


      } else if (error.request) {
        // The request was made, but no response was received
        console.log('Request Data:', error.request);
      } else {
        // Something happened in setting up the request that triggered an Error
        console.log('Error Message:', error.message);
      }
      setIsAuthenticated(false)
    }
    setIsAuthenticated(false)
  }

  console.log(error);

useEffect(() => {
  if(error === "INVALID_LOGIN_CREDENTIALS" && !isAuthenticated){
    Toast.show({
      type: ALERT_TYPE.DANGER,
      title: 'Error',
      textBody: 'Invalid credintials, Please check your details',
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
