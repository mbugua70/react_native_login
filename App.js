import {useContext} from "react";
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { StatusBar } from 'expo-status-bar';
import { Colors } from './constants/styles';
import { AuthContextProvider } from './store/store';
import { AuthContext } from "./store/store";


import LoginScreen from './screens/LoginScreen';
import SignupScreen from './screens/SignupScreen';
import WelcomeScreen from './screens/WelcomeScreen';
import IconButton from "./components/ui/IconButton";

const Stack = createNativeStackNavigator();

function AuthStack() {
  return (
    <Stack.Navigator
      screenOptions={{
        headerStyle: { backgroundColor: Colors.primary500 },
        headerTintColor: 'white',
        contentStyle: { backgroundColor: Colors.primary100 },
      }}
    >
      <Stack.Screen name="Login" component={LoginScreen} />
      <Stack.Screen name="Signup" component={SignupScreen} />
    </Stack.Navigator>
  );
}

function AuthenticatedStack() {
  const authctx = useContext(AuthContext)
  function handlelogout(){
    authctx.logout();
  }
  return (
    <Stack.Navigator
      screenOptions={{
        headerStyle: { backgroundColor: Colors.primary500 },
        headerTintColor: 'white',
        contentStyle: { backgroundColor: Colors.primary100 },
      }}
    >
      <Stack.Screen name="Welcome" component={WelcomeScreen} options={{
      headerRight: ({tintColor}) =>{
          return <IconButton icon="exit" color={tintColor} size="24" onPress={handlelogout}/>
        }
      }}/>
    </Stack.Navigator>
  );
}

function Navigation() {
  const authctx = useContext(AuthContext)


  return (

    <NavigationContainer>
      {authctx.isAuthenticate ? <AuthenticatedStack/> : <AuthStack/> }
    </NavigationContainer>

  );
}

export default function App() {
  return (
    <>
      <StatusBar style="light" />
      <AuthContextProvider>
      <Navigation />
      </AuthContextProvider>
    </>
  );
}
