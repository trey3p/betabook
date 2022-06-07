
import { StyleSheet, Text, View, Image, TextInput, TouchableOpacity, Alert} from 'react-native';
import React, {useState} from 'react'

import 'react-native-gesture-handler'
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
const Stack = createStackNavigator();

export const AuthContext = React.createContext();

import SecureStore from 'expo-secure-store';
import SplashScreen from './components/SplashScreen';
import LoginPage from './components/Login/loginPage';
import Home from './components/Explore/Home';
import { useEffect } from 'react/cjs/react.production.min';

export default function App({navigation}) {

  const [state, dispatch] = React.useReducer(
    (prevState, action) => {

      switch(action.type) {
        case 'RESTORE_TOKEN':
          return{
            ...prevState,
            userToken: action.token,
            isLoading: false,
          };
        case 'SIGN_IN':
          return{
            ...prevState,
            isSignout: false,
            userToken: action.token,
          };
        case 'SIGN_OUT':
          return{
            ...prevState,
            isSignout: true,
            userToken:null,
          };
      }
    },
    {
      isLoading: true,
      isSignout: false,
      userToken: null,
    }
  );
  
  React.useEffect(() => {
    // Fetch the token from storage then navigate to our appropriate place
    const bootstrapAsync = async () => {
      let userToken;

      try {
        // Restore token stored in `SecureStore` or any other encrypted storage
        userToken = await SecureStore.getItemAsync('userToken');
      } catch (e) {
        // Restoring token failed
        console.log("RESTORE TOKEN FAILED")
      }

      // After restoring token, we may need to validate it in production apps

      // This will switch to the App screen or Auth screen and this loading
      // screen will be unmounted and thrown away.
      dispatch({ type: 'RESTORE_TOKEN', token: userToken });
    };

    bootstrapAsync();
  }, []);
  
  const authContext = React.useMemo(
    () => ({ 
      signIn: async (data) => {
        let email= data.email;
        let password = data.password;

        fetch('http://127.0.0.1:8000/api/token/login',{
          method: "POST",
          headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
            },
          body: JSON.stringify({
            email: email,
            password: password,
          }),
          }
        ).then(res => res.json())
        .then((json) => 
          {
            let errorData = json['non_field_errors'];
            if (errorData){
              errorData = errorData[0]
              if (errorData == 'Unable to log in with provided credentials.'){
                Alert.alert('Invalid login credentials', '', [{text:'Ok'}])
                
                console.log('Unable to log in with provided credentials');

              }
              else if(errorData == 'user is not active'){
                Alert.alert("You must confirm your account via email before you are able to login!",'', [{text: 'Ok'}])
                console.log('Please confirm your account via email.ß')

              }

              let authToken = json['auth'];

              if(authToken) 
              {
                authToken = authToken[0]
                SecureStore.setItemAsync('userToken', authData)
                dispatch({type: 'SIGN_IN', token: authToken})
              }
            }
          }
        )
    },
    signOut: () => dispatch({type: 'SIGN_OUT'})
    ,
    signUp: async (data) => {
      
      let email = data.email;
      let username = data.username;
      let password = data.password;

      fetch('http://127.0.0.1:8000/api/users/',{
          method: "POST",
          headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
            },
          body: JSON.stringify({
            email: email,
            password: password,
            username: username,
          }),
          }
        ).then(res => res.json())
        .then((json) => 
          {
            let usernameErrorData = json['username'];
            let emailErrorData = json['email'];
            

            if(usernameErrorData)
            {
              usernameErrorData = usernameErrorData[0]
              Alert.alert(usernameErrorData,
              '', [{text: 'Ok'}]);
              
            }
            else if(emailErrorData)
            {
              //console.log(emailErrorData);
              emailErrorData = emailErrorData[0];
              Alert.alert(emailErrorData, '', [{text: 'Ok'}]);
              
            }

            let authToken = json['auth']
            
            if(authToken)
            {
              authToken = authToken[0]
              Alert.alert("Account created! PLease confirm your account via email, then sign in!",
              '', [{text: 'Ok'}]);
              dispatch({type: 'SIGN_OUT'})
            }

            
          })
    }
  }),
  [state]
  );

  return (

    <AuthContext.Provider value = {authContext}>
     <NavigationContainer>
       <Stack.Navigator
         screenOptions={{
           headerShown: false
         }}
       >
        {
        state.isLoading ? (
           <Stack.Screen name="SplashScreen" component={SplashScreen}/>
         ) :
         state.userToken == null ? (
            <Stack.Screen
            name="LoginPage"
            component={LoginPage}
            options = {{
              title: 'Login',
              animationTypeForReplace: state.isSignout ? 'pop' : 'push',
            }}
            />
         ) : 
         (
            <Stack.Screen
            name="Home"
            component={Home}
            />
         )
        }
       </Stack.Navigator>
      </NavigationContainer>
    </AuthContext.Provider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },

  
});
