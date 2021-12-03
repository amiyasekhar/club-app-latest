import React from 'react';
import {useState, useEffect} from 'react';
import {Dimensions, SafeAreaView, ImageBackground, Feather, TouchableOpacity, CheckBox, StyleSheet, Text, View, Image, TextInput, Button } from 'react-native';
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
const FailedSignIn = ({navigation}) => {
  const [message, setMessage] = useState();
  const [messageType, setMessageType] = useState();
  const {currentValue, setCurrentValue} = useValue();
  const [isSelected, setSelection] = useState(false);
  const [name, setName] = useState({firstName: "None", lastName: "None", email: "email@email.com", password: ""})
  const [password, setPassword] = useState(null);
  const [passMatch, setPassMatch] = useState("");
  const [canContinue, setCanContinue] = useState(false);
  const [validFields, setValidFields] = useState("")
  useEffect(() => {
     console.log(name);
  });
  const handleLogin = (credentials) => {
    const url = 'https://salty-lowlands-01278.herokuapp.com/user/signin'

    axios
      .post(url, credentials)
      .then((response) => {
        const result = response.data;
        const{message, status, data} = result;
      })
      .catch(error => {
        console.log(error.JSON());
      })
  }

  const handleMessage = (message, type = 'FAILED') => {
    setMessage(message);
    setMessageType(type);
  }

  const updateData = () =>{
    setCurrentValue({firstName: name.firstName,
                    lastName: name.lastName,
                    email: name.email})
  }

  const handleSubmit = (e) => {
    e.preventDefault();
  }

  const verifyPass = (p) =>{
    if (password == p){
      setName({lastName: name.lastName, firstName: name.firstName, email: name.email, password: p})
    }
    else{
      setPassMatch("passwords must match")
    }
  }
  const checkFields = () => {
    if (name.firstName != "None" && name.lastName != "None" && name.email != "none" && name.password != "" && validator.isEmail(name.email)){
      setCanContinue(true)
    }
    else{
      setValidFields("make sure your email is valid, and the password fields match")
      setCanContinue(false)
    }
    return canContinue
  }
  return (
    <SafeAreaView style={styles.container}>
      <ImageBackground 
        style={styles.image}
        source={require('./assets/Broken Glass.png')}
        //resizeMode='cover'
          
      >
      <View style={{flexDirection: 'row', justifyContent: 'center'}}>
        <Text style={{fontSize:20, color: 'pink', fontWeight: 'bold'}}>Login failed. Check your credentials:</Text>
        <TouchableOpacity
          style={styles.continueButton}
          disabled={false}
          onPress={() => {navigation.navigate('Login')}}>
          <Text style={{textAlign: 'center', fontSize: 11.5, color: 'white', fontWeight: 'bold'}}>Sign in</Text>
        </TouchableOpacity>
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

export default FailedSignIn;