import React from 'react';
import {useState, useEffect} from 'react';
import {Dimensions, SafeAreaView, ImageBackground, Feather, TouchableOpacity, CheckBox, StyleSheet, Text, View, Image, TextInput, Button, ActivityIndicator} from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
// const App = () => {...}
import HomepageScreen from './Homepage'
import {MyStack} from './Homepage'
import {useValue} from './ValueContext'
import validator from 'validator';
import isEmail from 'validator/es/lib/isEmail';
import axios from 'axios'
import useAxios from 'axios-hooks';

const dimensions = Dimensions.get('window');
const Login = ({navigation}) => {
  const [message, setMessage] = useState();
  const [messageType, setMessageType] = useState();
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState(null);
  const [canContinue, setCanContinue] = useState(false);
  const [validFields, setValidFields] = useState("");

  const handleLogin = (credentials, canContinue) => {
    /*
    takes in credentials (email and password), checks them with backend, logs us in accordingly
    */
    handleMessage(null)
    const url = 'https://salty-lowlands-01278.herokuapp.com/user/signin'

    axios
      .post(url, credentials)
      .then((response) => {
        const result = response.data;
        const{message, status, data} = result;

        if (status != "SUCCESS"){
          handleMessage(message, status)
          navigation.navigate("Failed Log in")

        }
        else{
          navigation.navigate("Inside App")
        }

      })
      .catch(error => {
        canContinue(false)
        handleMessage("An error occured. Check your network and try again.")
        console.log(error.JSON());
        
      })
  }

  const handleMessage = (message, type = '') => {
    setMessage(message);
    setMessageType(type);
  }

  const handleSubmit = (e) => {
    /*
    after completion of each field, we check the fields
    */
    e.preventDefault();
    checkFields();
  }

  const checkFields = () => {
    /*
    making sure email is valid and filled in, and password isnt empty. if these conditions are met, we can continue onto the next page
    */
    if (email != "" && password != "" && validator.isEmail(email)){
      setCanContinue(true)
    }
    else{
      setValidFields("make sure your email is valid, and the password fields match")
      setCanContinue(false)
    }
    return canContinue
  }

  const nav = () => {
    if (message == 'FAILED'){
      return "Failed Log in"
    }
    else{
      return "Inside App"
    }
  }

  return (
    <SafeAreaView style={styles.container}>
      <ImageBackground 
        style={styles.image}
        source={require('./assets/Liv Miami.png')}
      >
          <View style={{flexDirection:'column', alignItems:'center'}}>
            <View style={{flexDirection: 'row', justifyContent: 'center'}}>
              <Text style={{fontSize:20, color: 'white', fontWeight: 'bold'}}>Email:</Text>
              <View style={{backgroundColor:'#77a1b7'}}>
                <TextInput
                  style={styles.input}
                  onChangeText={(value) => setEmail(value)}
                  onSubmitEditing={handleSubmit}
                />
              </View>
              <TouchableOpacity
                style={{backgroundColor: '#77a1b7', justifyContent: 'center', width: 100,borderRadius: 10,}}
                disabled={checkFields}
                onPress={() => {navigation.navigate('Profile')}}>
                <Text style={{textAlign: 'center', fontSize: 11.5, color: 'white', fontWeight: 'bold'}}>Forgot Email</Text>
              </TouchableOpacity>
            </View>
            <View style={{flexDirection: 'row',justifyContent: 'center'}}>
              <Text style={{fontSize:20, color: 'white', fontWeight: 'bold'}}>Password:</Text>
              <View style={{backgroundColor:'#77a1b7', justifyContent: 'center', }}>
                <TextInput
                  style={styles.input}
                  secureTextEntry={true}
                  onChangeText={(value) => setPassword(value)}
                  onSubmitEditing={handleSubmit}
                />
              </View>
              <TouchableOpacity
                style={{backgroundColor: '#77a1b7', justifyContent: 'center', width: 100, borderRadius: 10, }}
                disabled={checkFields}
                onPress={() => {navigation.navigate('Profile')}}>
                <Text style={{textAlign: 'center', fontSize: 11.5, color: 'white', fontWeight: 'bold',}}>Forgot Password</Text>
              </TouchableOpacity>
            </View>
            <View style={{flexDirection: 'row',justifyContent: 'center'}}>
              <View>
                <TouchableOpacity
                  style={styles.continueButton}
                  disabled={checkFields}
                  onPress={() => {handleLogin({email, password}, canContinue)}}>
                  <Text style={{textAlign: 'center', fontSize: 11.5, color: 'white', fontWeight: 'bold'}}>Continue</Text>
                </TouchableOpacity>
              </View>
            </View>
          </View>
      </ImageBackground>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    //lex: 1,
    //backgroundColor: 'transparent',
    alignItems: 'stretch',
    justifyContent: 'stretch',
    flexDirection:'column',
    margin:'5px'
  },
  input: {
    margin: 2,
    borderWidth: 1,
    //padding: 10,
    //height: 40,
  },
  image: {
    justifyContent: "center",
    width: dimensions.width,
    height: 900,
  },
  continueButton: {
    marginTop: 20,
    padding: 20,
    borderRadius: 10,
    height: 2,
    width: 100,
    justifyContent: 'center',
    backgroundColor: '#77a1b7'
  },
//https://reactnativeforyou.com/how-to-create-a-gradient-color-button-in-react-native/
//https://github.com/callstack/react-native-paper/issues/1164
//https://aboutreact.com/react-native-global-scope-variables/#Global-Scope-Variables
//fix the views a little bit
});
export default Login;