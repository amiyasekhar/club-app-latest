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
const SignUp = ({navigation}) => {
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

  const handleSignUp = (credentials) => {
    const url = 'https://salty-lowlands-01278.herokuapp.com/user/signup'

    axios
      .post(url, credentials)
      .then((response) => {
        const result = response.data;
        const{message, status, data} = result;

        if (status != "SUCCESS"){
          handleMessage(message, status)
        }
        else{
          navigation.navigate("Profile")
        }

      })
      .catch(error => {
        console.log(error.JSON());
        handleMessage("An error occured. Check your network and try again.")
        console.log(error.toJSON());
      })
  };

  const handleMessage = (message, type = '') => {
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
        source={require('./assets/Marquee New York.png')}
        //resizeMode='cover'
          
      >
          <View style={{flexDirection:'column', alignItems:'center'}}>
            <View style={{flexDirection: 'row', justifyContent: 'center'}}>
              <Text style={{fontSize:20, color: 'white', fontWeight: 'bold'}}>First Name:</Text>
              <View style={{backgroundColor:'#c2251d'}}>
                <TextInput
                  style={styles.input}
                  onChangeText={(value) => setName({lastName: name.lastName, firstName: value, email: name.email, password: name.password})}
                  onSubmitEditing={handleSubmit}
                />
              </View>
            </View>
            <View style={{flexDirection: 'row',justifyContent: 'center' }}>
              <Text style={{fontSize:20, color: 'white', fontWeight: 'bold'}}>Last Name:</Text>
              <View style={{backgroundColor:'#c2251d'}}>
                <TextInput
                  style={styles.input}
                  onChangeText={(value) => setName({firstName: name.firstName, lastName: value, email: name.email, password: name.password})}
                  onSubmitEditing={handleSubmit}
                />
              </View>
            </View>
            <View style={{flexDirection: 'row', justifyContent: 'center'}}>
              <Text style={{fontSize:20, color: 'white', fontWeight: 'bold'}}>Email:</Text>
              <View style={{backgroundColor:'#c2251d'}}>
                <TextInput
                  style={styles.input}
                  onChangeText={(value) => setName({lastName: name.lastName, firstName: name.firstName, email: value, password: name.password})}
                  onSubmitEditing={handleSubmit}
                />
              </View>
            </View>
            <View style={{flexDirection: 'row',justifyContent: 'center'}}>
              <Text style={{fontSize:20, color: 'white', fontWeight: 'bold'}}>Password:</Text>
              <View style={{backgroundColor:'#c2251d'}}>
                <TextInput
                  style={styles.input}
                  secureTextEntry={true}
                  onChangeText={(value) => setPassword(value)}
                  onSubmitEditing={handleSubmit}
                />
                
              </View>

            </View>
            <View style={{flexDirection: 'row',justifyContent: 'center'}}>
              <Text style={{fontSize:20, color: 'white', fontWeight: 'bold'}}>Re-Enter Password:</Text>
              <View style={{backgroundColor:'#c2251d'}}>
                <TextInput
                  style={styles.input}
                  secureTextEntry={true}
                  onChangeText={(value) => verifyPass(value)}
                  onSubmitEditing={handleSubmit}/>
                  
              </View>
            </View>
            <View style={{flexDirection: 'row',justifyContent: 'center'}}>
              <Text style={{fontSize:20, color: 'white', fontWeight: 'bold', }}> {passMatch} </Text>
            </View>
            <View style={{flexDirection: 'row',justifyContent: 'center'}}>
              <Text style={{fontSize:20, color: 'white', fontWeight: 'bold', }}> {validFields} </Text>
            </View>
            <View style={{flexDirection: 'row',justifyContent: 'center'}}>
              <View>
                <TouchableOpacity
                  style={styles.continueButton}
                  disabled={checkFields}
                  onPress={() => {updateData(); navigation.navigate('Profile')}}>
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
    backgroundColor: '#c2251d'
  },
//https://reactnativeforyou.com/how-to-create-a-gradient-color-button-in-react-native/
//https://github.com/callstack/react-native-paper/issues/1164
//https://aboutreact.com/react-native-global-scope-variables/#Global-Scope-Variables
//fix the views a little bit
// add existing data to postman like insta stuff
});
export default SignUp;