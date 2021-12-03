import React from 'react';
import {useState, useEffect} from 'react';
import {Linking, Alert, Platform, Pressable, Modal, Dimensions, SafeAreaView, ImageBackground, Feather, TouchableOpacity, CheckBox, StyleSheet, Text, View, Image, TextInput, Button } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import {useValue} from './ValueContext'
import * as ImagePicker from 'expo-image-picker';
import { SocialIcon } from 'react-native-elements';


const dimensions = Dimensions.get('window');
const ProfileSetUp = ({navigation}) => {

  const {currentValue, setCurrentValue} = useValue();
  const [image, setImage] = useState(null);
  const [instaHandle, setInstaHandle] = useState(null);
  const [modalVisible, setModalVisible] = useState(false);
  const [number, onChangeNumber] = useState(null);
  const [instaURL, setInstaURL] = useState('www.instagram.com');

  useEffect(() => {
    (async () => {
      if (Platform.OS !== 'web') {
        const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();
        if (status !== 'granted') {
          alert('Sorry, we need camera roll permissions to make this work!');
        }
      }
    })();
  }, []);

  const updateData = () =>{
    setCurrentValue({firstName: currentValue.firstName,
                    lastName: currentValue.lastName,
                    email: currentValue.email,
                    instagram: instaURL
                    })
                    /*profilePic: image*/
  }

  const pickImage = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.All,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });
    
    console.log(result);

    if (!result.cancelled) {
      setImage(result.uri);
    }
  };

  const openUrl = async (url) => {
    const isSupported = await Linking.canOpenURL(url);
    if (isSupported){
      await Linking.openURL(url);
    } else{
      Alert.alert("Invalid insta page");
      console.log(instaURL);
    }
  }

  return (
    <SafeAreaView>
      <View style={styles.container}>
        <ImageBackground 
          style={styles.image}
          source={require('./assets/Marquee New York.png')} //background image
        >
          <View style={{flexDirection:'column', alignItems:'center'}}>
            <TouchableOpacity
              disabled={false}
              onPress={pickImage}>
              <Text style={{textAlign: 'center', fontSize: 20, color: 'white', fontWeight: 'bold'}}   >Choose Profile Photo</Text>
            </TouchableOpacity>
            {image && <Image source={{ uri: image }} style={{ width: 250, height: 250 }} />}

            <Image 
              style={{flex:1, width: 250, height: 250}}
              source={require('./assets/Default Profile Photo.png')} /> 
              <Text style={{fontWeight: 'bold', color: 'white', fontSize: 24}}> {currentValue.firstName} {currentValue.lastName} </Text>
              <Text style={{fontWeight: 'bold', color: 'white', fontSize: 24}}> {currentValue.email} </Text>
              <View style={{flexDirection: 'row', alignItems: 'center'}}>
                <TouchableOpacity
                  onPress={() => openUrl(instaURL)}
                >
                  <Image
                    style={{width: 50, height: 50}}
                    source={require('./assets/Instagram Logo.png')}/>
                </TouchableOpacity>
                <View style={styles.centeredView}>
                  <Modal
                    animationType="none"
                    transparent={true}
                    visible={modalVisible}
                    onRequestClose={() => {
                      
                      setModalVisible(!modalVisible);
                    }}
                  >
                    <View style={styles.centeredView}>
                      <View style={styles.modalView}>
                        <View style={{flexDirection: 'row', justifyContent: 'stretch'}}>
                          <Text style={{fontSize: 50}}>@</Text>
                          <TextInput
                            style={styles.input}
                            onChangeText={setInstaHandle}
                            value={instaHandle}
                            placeholder="instahandle"
                          />
                        </View>

                        <Pressable
                          style={[styles.button, styles.buttonClose]}
                          onPress={() => {setModalVisible(!modalVisible); 
                          setInstaURL('https://www.instagram.com/' + instaHandle);updateData()}}
                        >
                          <Text style={styles.textStyle}>Submit insta handle</Text>
                        </Pressable>
                      </View>
                    </View>
                  </Modal>
                  <Pressable
                    style={[styles.button, styles.buttonOpen]}
                    onPress={() => setModalVisible(true)}
                  >
                    <Text style={styles.textStyle}>Enter insta handle</Text>
                  </Pressable>   
                </View>   
              </View>
          </View>
        </ImageBackground>
      </View>
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
  button: {
    borderRadius: 20,
    padding: 10,
    elevation: 2
  },
  buttonOpen: {
    backgroundColor: "#c2251d",
  },
  buttonClose: {
    backgroundColor: "#c2251d",
  },
  textStyle: {
    color: "white",
    fontWeight: "bold",
    textAlign: "center"
  },
  input: {
    height: 40,
    margin: 12,
    borderWidth: 1,
    padding: 10,
  },
//https://reactnativeforyou.com/how-to-create-a-gradient-color-button-in-react-native/
//https://github.com/callstack/react-native-paper/issues/1164
//unable to add profile pic to context
});
export default ProfileSetUp;