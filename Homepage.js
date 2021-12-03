import * as React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { LinearGradient } from 'expo-linear-gradient';
import { ImageBackground, SafeAreaView, TouchableOpacity, Image, StyleSheet, Text, View, Button, } from 'react-native';
import ShowProfile from './ShowProfile'
import Login from './Login'
import SignUp from './SignUp'
import ProfileSetUpScreen from './ProfileSetUp';
import FailedSignIn from './FailedSignIn'
import InsideApp from './InsideApp';

const Stack = createNativeStackNavigator();

const MyStack = () => {
  
  return (
    <NavigationContainer>
      <Stack.Navigator>

        <Stack.Screen
          name="Home"
          component={HomeScreen}
          //options={{ title: 'Welcome' }}
        />
        
        <Stack.Screen 
          name="Sign Up"
          component={SignUp} 
        />

        <Stack.Screen
          name="Profile"
          component={ProfileSetUpScreen}
          //options={{ title: 'Welcome' }}
        />

        <Stack.Screen
          name="Login"
          component={Login}
          //options={{ title: 'Welcome' }}
        />
        <Stack.Screen
          name="Failed Log in"
          component={FailedSignIn}
          //options={{ title: 'Welcome' }}
        />
        <Stack.Screen
          name="Inside App"
          component={InsideApp}
          //options={{ title: 'Welcome' }}
        />

      </Stack.Navigator>
    </NavigationContainer>
  );
};


const HomeScreen = ({ navigation }) => {
  return (
    <SafeAreaView style={styles.container}>
      <ImageBackground style={styles.backgroundImage} source={require('./assets/Reign 1.png')}>
        <Text style={styles.textStyle1} > Party with new people </Text>
          <View style={{alignItems: 'center'}}>
            <TouchableOpacity
              style={styles.continueButton}
              disabled={false}>
              <Text style={{textAlign: 'center'}}>Sign in</Text>
            </TouchableOpacity>
          </View>
      </ImageBackground>
      <ImageBackground style={styles.backgroundImage} source={require('./assets/Reign 2.png')}>
        <Text style={styles.textStyle2} > Skip the line and get easy access to table spots</Text>
          <View style={{alignItems: 'center'}}>
            <TouchableOpacity
              style={styles.continueButton}
              disabled={false}
              onPress={() => navigation.navigate('Sign Up')
              }>
              <Text style={{textAlign: 'center'}}>Sign Up</Text>
            </TouchableOpacity>
          </View>
      </ImageBackground> 
      <ImageBackground style={styles.backgroundImage} source={require('./assets/Reign 3.png')}>
        <Text style={styles.textStyle3} > A night that you won't remember with the people you won't forget</Text>
          <View style={{alignItems: 'center'}}>
            <TouchableOpacity
              style={styles.fbButton}
              disabled={false}>
              <Text style={{textAlign: 'center', fontSize: 11.5, color: 'white'}}>Log in with Facebook</Text>
            </TouchableOpacity>
          </View>
      </ImageBackground>
        <View style={{flexDirection: 'row', justifyContent: 'center'}}>



        </View>   
    </SafeAreaView>
  );
};
const styles = StyleSheet.create({
  container:{
    flex: 1,
    backgroundColor: 'transparent',
    alignItems: 'stretch',
    justifyContent: 'stretch',
    flexDirection:'row',
    margin:'5px',
  },
  continueButton: {
    //marginTop: 20,
    padding: 20,
    borderRadius: 10,
    height: 2,
    width: 100,
    justifyContent: 'center',
    backgroundColor: '#c2251d'
  },
  fbButton: {
    padding: 20,
    borderRadius: 10,
    height: 2,
    width: 100,
    justifyContent: 'center',
    backgroundColor: 'blue'
  },
  backgroundImage: {
    flex: 1
  },
  textStyle1 :{
    fontFamily: 'Times New Roman',
    textAlign: 'Center',
    fontWeight: 'bold',
    fontSize: 35,
    color: '#bd4098'
  },
  textStyle2 :{
    fontFamily: 'Times New Roman',
    textAlign: 'Center',
    fontWeight: 'bold',
    fontSize: 35,
    color: '#c2251d'
  },
  textStyle3 :{
    fontFamily: 'Times New Roman',
    textAlign: 'Center',
    fontWeight: 'bold',
    fontSize: 35,
    color: 'black'
  }
//change buttons to gradient, make them lineup, make the font type nicer

});
export default MyStack;