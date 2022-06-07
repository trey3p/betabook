import React, {useState} from 'react';
import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, Image, TextInput, TouchableOpacity, Modal, Button} from 'react-native';
import {AuthContext} from '../../App';

export default function LoginPage() {
  const [email, setEmail ] = useState('')
  const [password, setPassword] = useState('')
  const [username, setUsername] = useState('')
  const [signUpModalVisible, setSignUpModalVisible] = useState(false)
  const {signIn, signUp}  = React.useContext(AuthContext);
  

  return (
    <View style={styles.container}>
      <Image style = {styles.image} source = {require("../../assets/betabook-logo.png")}/>
      <StatusBar style="auto"/>

      <View style={styles.inputView}>
        <TextInput
          style = {styles.TextInput}
          placeholder = "Email"
          placeholderTextColor="#003f5c"
          onChangeText = {(email) => setEmail(email)}
          autoCapitalize = 'none'
          autoCorrect = {false}
        />
      </View>
      <View style={styles.inputView}>
      <TextInput
          style = {styles.TextInput}
          placeholder = "Password"
          placeholderTextColor="#003f5c"
          onChangeText = {(password) => setPassword(password)}
          autoCapitalize = 'none'
          autoCorrect = {false}
        />
      </View>
      <TouchableOpacity>
        <Text style={styles.forgotText}>Forgot Password?</Text>
      </TouchableOpacity>
      <TouchableOpacity 
        style={styles.loginButton}
        onPress={() => signIn({email, password})}
      >
        <Text style={styles.loginText}>LOGIN</Text>
      </TouchableOpacity>

      <Modal
        animationType = 'slide'
        visible = {signUpModalVisible}
        onRequestClose = {() => setSignUpModalVisible(!signUpModalVisible)}
      >
        <View style={styles.container}>
          <View style = {styles.inputView}>
            <TextInput
              style = {styles.TextInput}
              placeholder = "Email"
              placeholderTextColor="#003f5c"
              onChangeText = {(email) => setEmail(email)}
              autoCapitalize = 'none'
              autoCorrect = {false}
            />
          </View>
          <View style={styles.inputView}>
            <TextInput
                style = {styles.TextInput}
                placeholder = "Password"
                placeholderTextColor="#003f5c"
                onChangeText = {(password) => setPassword(password)}
                autoCapitalize = 'none'
                autoCorrect = {false}
              />
          </View>
          <View style={styles.inputView}>
            <TextInput
                style = {styles.TextInput}
                placeholder = "Username"
                placeholderTextColor="#003f5c"
                onChangeText = {(username) => setUsername(username)}
                autoCapitalize = 'none'
                autoCorrect = {false}
              />
          </View>
          <Button
            onPress={() => signUp({email, password, username})}
            title="Submit"
            color = "#841584"
          />
          <Button
            onPress={() => setSignUpModalVisible(!signUpModalVisible)}
            title="Back"
            color = "#841584"
          />
        </View>
      </Modal>
      <TouchableOpacity 
        style={styles.signUpButton}
        onPress={() => setSignUpModalVisible(!signUpModalVisible)}
      >
        <Text style={styles.loginText}>SIGN UP</Text>
      </TouchableOpacity>
    </View>
  );
};


const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: '#fff',
      alignItems: 'center',
      justifyContent: 'center',
    },
    image: {
      marginBottom: 40,
    },
    inputView: {
      backgroundColor: "#4D5749",
      borderRadius: 30,
      width: "70%",
      height: 45,
      marginBottom: 20,
      alignItems: "center",
    },
    TextInput: {
      height: 50,
      flex:1,
      padding: 10,
      
    },
    forgotText: {
      height: 30,
      marginBottom: 30,
    },
    loginButton: {
      width: "80%",
      borderRadius: 25,
      height: 50,
      alignItems: "center",
      justifyContent: "center",
      marginTop: 200,
      backgroundColor: "#1A410C",
    },
    signUpButton: {
      width: "80%",
      borderRadius: 25,
      height: 50,
      alignItems: "center",
      justifyContent: "center",
      backgroundColor: "#1A410C",
      marginTop: 10,
    },
   
  });
  