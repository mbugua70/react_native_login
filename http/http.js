import {API_KEY} from "@env";
import axios from "axios";
const BACKEND_URL = "https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=";

const  signin = "signInWithPassword";
const signup = "signUp"


export async function authenticationHandle(mode, email, password){
   const keyOne = mode === "signin" ? signin : signup;

   const response = await axios.post(`https://identitytoolkit.googleapis.com/v1/accounts:${keyOne}?key=${API_KEY}`,{
      email,
      password,
      returnSecureToken: true,
   })

   console.log(response);
   return response.data;
}

// export async function createUser(email, password){
//    const response = await axios.post(`${BACKEND_URL}${API_KEY}`, {
//       email,
//       password,
//       returnSecureToken: true
//     })
//     return response;
// }