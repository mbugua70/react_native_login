import { useState } from 'react';
import AuthContent from '../components/Auth/AuthContent';
import { authenticationHandle } from '../http/http';
import LoadingOverlay from '../components/ui/LoadingOverlay';

function SignupScreen() {
  const [isAuthenticated, setIsAuthenticated] = useState(false)

  async function handleSignUp({email, password}){
    setIsAuthenticated(true)
    const response = await authenticationHandle("signup",email,password)
    console.log(response);
    setIsAuthenticated(false)
  }


  // loading
  if(isAuthenticated){
    return <LoadingOverlay message="Creating user...." />
  }


  return (
    <>
     <AuthContent  onAuthenticate={handleSignUp} />
    </>
  );
}

export default SignupScreen;
