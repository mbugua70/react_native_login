import {createContext, useState} from "react";

export const AuthContext = createContext({
    token: "",
    authenticate: (token)=>{},
    isAuthenticate: false,
    logout: () =>{}
})


export function AuthContextProvider({children}){
    const [authToken, setAuthToken] = useState()

    function authenticate(token){
     setAuthToken(token);
    }


    function logout(){
        setAuthToken(null)
    }


    const value = {
        token: authToken,
        isAuthenticate: !!authToken,
        authenticate: authenticate,
        logout: logout,

    }


    return (
        <AuthContext.Provider value={value}>{children}</AuthContext.Provider>
    );
}