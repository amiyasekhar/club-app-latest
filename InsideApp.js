import React from 'react';
import {useState, useEffect} from 'react';
import {Dimensions, SafeAreaView, ImageBackground, Feather, TouchableOpacity, CheckBox, StyleSheet, Text, View, Image, TextInput, Button, Pressable, Modal, Alert } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import {useValue} from './ValueContext'
import validator from 'validator';
import isEmail from 'validator/es/lib/isEmail';
import axios from 'axios';
import useAxios from 'axios-hooks';
import * as Font from 'expo-font';
import { createIconSet } from '@expo/vector-icons';



const dimensions = Dimensions.get('window');
const InsideApp = ({navigation}) => {
  const {currentValue, setCurrentValue} = useValue();
  const [organizing, setOrganizing] = useState(false);
  const [tablePrice, setTablePrice] = useState(null);
  const [pnsl, setPNSL] = useState(false);
  const [snpl, setSNPL] = useState(false);
  const [payFirst, setPF] = useState(false);

  const updateData = () =>{
    setCurrentValue({firstName: currentValue.firstName,
                    lastName: currentValue.lastName,
                    email: currentValue.email,
                    instagram: currentValue.instaURL,
                    tableCost: tablePrice,
                    payingFirst: payFirst
                    })
                    /*profilePic: image*/
  }

  useEffect(() => {
    console.log("pnsl: ", pnsl)
  })
  let orgView = ""
  if (organizing) {
    orgView =
      <View style={{flexDirection:'column', alignItems:'center'}}>
        <View style={{justifyContent: 'center'}}>
            <View style={{backgroundColor:'#c2251d', margin: 5}}>
              <TextInput
                style={styles.input}
                placeholder={'Club Name'}
                placeholderTextColor={'black'}
                backgroundColor={'black'}
              />
            </View>
          </View>

          <View style={{justifyContent: 'center' }}>
              <View style={{backgroundColor:'#c2251d',  margin: 5}}>
                <TextInput
                  style={styles.input}
                  placeholder={'Table Cost'}
                  placeholderTextColor={'black'}
                  backgroundColor={'black'}
                  keyboardType={'numeric'}
                />
              </View>
          </View>

          <View style={{justifyContent: 'center'}}>
            <View style={{backgroundColor:'#c2251d', margin: 5}}>
              <TextInput
                style={styles.input}
                placeholder={'Current Pax'}
                placeholderTextColor={'black'}
                backgroundColor={'black'}
                keyboardType={'numeric'}
              />
            </View>
          </View>

          <View style={{justifyContent: 'center'}}>
            <View style={{backgroundColor:'#c2251d', margin: 5}}>
              <TextInput
                style={styles.input}
                placeholder={'Pax Needed'}
                placeholderTextColor={'black'}
                backgroundColor={'black'}
                keyboardType={'numeric'}
              />
            </View>
          </View>

          <View style={{flexDirection: 'row', justifyContent: 'center'}}>
            <View style={{margin: 5}}>
              <TouchableOpacity
                style={styles.tableOptionButton}
                disabled={false}
                onPress={() => setPF(true)}>
                  <Text style={{textAlign: 'center', fontSize: 11.5, color: 'white', fontWeight: 'bold'}}>Pay now split later</Text>
              </TouchableOpacity>
            </View>

            <View style={{margin: 5}}>
              <Modal
                animationType="slide"
                transparent={true}
                visible={pnsl}
                onRequestClose={() => {
                  Alert.alert("Modal has been closed.");
                  setPNSL(!pnsl);
                }}>
                <View style={styles.centeredView}>
                  <View style={styles.modalView}>
                    <Text style={styles.modalText}>Pay now and split the cost with more people as they come </Text>
                    <TouchableOpacity
                      style={[styles.button, styles.buttonClose]}
                      onPress={() => setPNSL(!pnsl)}
                      >
                      <Text style={styles.textStyle}>OK</Text>
                    </TouchableOpacity>
                  </View>
                </View>
              </Modal>
              <TouchableOpacity
                style={styles.questionButton}
                disabled={false}
                onPress={() => setPNSL(!pnsl)}>
                  <Text style={{color: 'white', fontWeight: 'bold', fontSize: 30}}> ? </Text>
              </TouchableOpacity>
            </View>

            <View style={{margin: 5}}>
              <Modal
                animationType="slide"
                transparent={true}
                visible={snpl}
                onRequestClose={() => {
                  Alert.alert("Modal has been closed.");
                  setSNPL(!snpl);
                }}>
                <View style={styles.centeredView}>
                  <View style={styles.modalView}>
                    <Text style={styles.modalText}>Split the cost among your initial party - we will refund people an ongoing basis as more people join </Text>
                    <TouchableOpacity
                      style={[styles.button, styles.buttonClose]}
                      onPress={() => setSNPL(!snpl)}
                      >
                      <Text style={styles.textStyle}>OK</Text>
                    </TouchableOpacity>
                  </View>
                </View>
              </Modal>
              <TouchableOpacity
                style={styles.tableOptionButton}
                disabled={false}
                onPress={() => setPF(false)}>
                  <Text style={{textAlign: 'center', fontSize: 11.5, color: 'white', fontWeight: 'bold'}}>Split now pay later</Text>
              </TouchableOpacity>
            </View>

            <View style={{margin: 5}}>
              <TouchableOpacity
                //style={styles.tableOptionButton}
                disabled={false}
                onPress={() => setSNPL(!snpl)}>
                  <Text style={{color: 'white', fontWeight: 'bold', fontSize: 30}}> ? </Text>
              </TouchableOpacity>
            </View>
          </View>

          <View style={{flexDirection: 'row',justifyContent: 'center'}}>
            <Text style={{color: 'white', fontWeight: 'bold', fontSize: 20}}> Prices are assumed to be in US$ </Text>
          </View>
          
        </View>
  }
  return (
    <SafeAreaView style={styles.container}>
      <ImageBackground 
        style={styles.image}
        source={require('./assets/Marquee New York.png')}
        //resizeMode='cover'
          
      >
        <Text style={{color:"white", fontWeight: 'bold', textAlign: 'center', margin: 30, fontSize: 40, justifyContent: 'center'}}> Welcome  </Text>
        <View style={{alignItems: 'center'}}>
          <TouchableOpacity
            style={styles.organizeButton}
            disabled={false}
            onPress={() => setOrganizing(!organizing)}>
              <Text style={{textAlign: 'center', fontSize: 11.5, color: 'white', fontWeight: 'bold'}}>Organize a Table</Text>
          </TouchableOpacity>
        </View>
        {orgView}

          
      </ImageBackground>
    </SafeAreaView>
  );
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
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
  modalView: {
    margin: 20,
    backgroundColor: "white",
    borderRadius: 20,
    padding: 35,
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5
  },
  input: {
    height: 40,
    margin: 1,
    borderWidth: 1,
    padding: 1,
  },
  organizeButton: {
    marginTop: 20,
    padding: 20,
    borderRadius: 10,
    height: 2,
    width: 100,
    justifyContent: 'center',
    backgroundColor: '#c2251d'
  },
  tableOptionButton: {
    backgroundColor: "#c2251d",
    padding: 10,
    borderRadius: 10
  },
  questionButton: {
    marginRight:100
  },
  centeredView: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    marginTop: 22
  },
  modalView: {
    margin: 20,
    backgroundColor: "white",
    borderRadius: 20,
    padding: 35,
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5
  },
  button: {
    borderRadius: 20,
    padding: 10,
    elevation: 2
  },
  buttonOpen: {
    backgroundColor: "#F194FF",
  },
  buttonClose: {
    backgroundColor: "#2196F3",
  },
  textStyle: {
    color: "white",
    fontWeight: "bold",
    textAlign: "center"
  },
  modalText: {
    marginBottom: 15,
    textAlign: "center"
  }
//https://reactnativeforyou.com/how-to-create-a-gradient-color-button-in-react-native/
//https://github.com/callstack/react-native-paper/issues/1164
//unable to add profile pic to context
});
export default InsideApp;