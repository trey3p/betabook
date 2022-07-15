

import React, { useState } from 'react';
import {Text, View, StatusBar, ScrollView, SafeAreaView, TextInput, StyleSheet, Modal, FlatList} from 'react-native';

import { Picker } from '@react-native-picker/picker';
import {climbTypeOptions, climbGradeOptions, boulderGradeOptions} from '../Utilities/gradeTypeList';
import SearchBar from "react-native-dynamic-search-bar";
import { ScreenWidth } from "@freakycoder/react-native-helpers";
import { Avatar, Button, Card, Title, Paragraph } from 'react-native-paper';
import {
  useFonts,
  Roboto_100Thin,
  Roboto_100Thin_Italic,
  Roboto_300Light,
  Roboto_300Light_Italic,
  Roboto_400Regular,
  Roboto_400Regular_Italic,
  Roboto_500Medium,
  Roboto_500Medium_Italic,
  Roboto_700Bold,
  Roboto_700Bold_Italic,
  Roboto_900Black,
  Roboto_900Black_Italic,
} from '@expo-google-fonts/roboto';
import SplashScreen from "../SplashScreen";
import { MaterialIcons } from '@expo/vector-icons';
import { Ionicons } from '@expo/vector-icons';
//import { Searchbar } from "react-native-paper";
import { fetchRoutes } from "../Utilities/fetchRoutes";



export default function Post({route, navigation}) {
  /*
  * Page for users to post their beta.
  *
  *
  */
  const {userToken} = route.params;
  const climbRoutes = fetchRoutes(userToken);
  

  const [searchQuery, setSearchQuery] = useState('');

  const onChangeSearch = query => setSearchQuery(query);
  const [spinnerVisibility, setSpinnerVisibility] = useState(false)
  const [searchResults, setSearchResults] = useState(climbRoutes);
  const [grade, setGrade] = useState('')
  const [climbType, setClimbType] = useState('')
  const [numMoves, setNumMoves] = useState(0)
  const [rockStyle, setRockStyle] = useState('')
  const [conditions, setConditions] = useState('')
  const [gear, setGear] = useState('')
  const [type, setType] = useState('')
  const [user, setUser] = useState('')
  const [video, setVideo] = useState('')
  const [photos, setPhotos] = useState([])
  const [postModalVisible, setPostModalVisible] = useState(false)
  const [routeSelected, setRouteSelected] = useState("")


  let [fontsLoaded] = useFonts({
    Roboto_100Thin,
    Roboto_100Thin_Italic,
    Roboto_300Light,
    Roboto_300Light_Italic,
    Roboto_400Regular,
    Roboto_400Regular_Italic,
    Roboto_500Medium,
    Roboto_500Medium_Italic,
    Roboto_700Bold,
    Roboto_700Bold_Italic,
    Roboto_900Black,
    Roboto_900Black_Italic,
  });


  async function filterList(text) {
    var newData = await fetchRoutes(userToken);
    console.log(newData);
    newData = await newData.filter((item) => {
      
      const itemData = item.name.toLowerCase();
      const textData = text.toLowerCase();
      return itemData.indexOf(textData) > -1;
    });
    setSearchQuery(text);
    setSearchResults(newData);
  };

  function handleRouteSelection(item) {
    setClimbType(item.climbType);
    setRouteSelected(item.routeID);
    setPostModalVisible(!postModalVisible)
  }

  function renderItem(item) {
    return (
      <Card style={styles.cardStyle}>
      <Card.Title title={item.name} subtitle="AREA NAME" />
      <Card.Content>
        <Paragraph>{item.description}</Paragraph>
      </Card.Content>
      <Card.Cover source={{ uri: 'https://picsum.photos/700' }} />
      <Card.Actions>
        <Button >Cancel</Button>
        <Button onPress={(item) => handleRouteSelection(item)}>Ok</Button>
      </Card.Actions>
    </Card>
    );
    };


  function renderGrades() {
    if (climbType === 'Boulder'){
              
            return(  boulderGradeOptions.map( (option, i) => (
                  <Picker.Item key={option.value} value={option.value} label={option.label} disabled={option.disabled}/>
                )))
    }
    else
    {
      return(  climbGradeOptions.map( (option, i) => (
        <Picker.Item key={option.value} value={option.value} label={option.label} disabled={option.disabled}/>
      )))
    }
  }

  if (!fontsLoaded){ return <SplashScreen/>}
  else { 
    return (
      <SafeAreaView style = {styles.container}>
        <View contentContainerStyle={styles.container}>
        <StatusBar barStyle={"light-content"} />
            <SearchBar
              placeholder= "Search for a route to post on..."
              spinnerVisibility={spinnerVisibility}
              onChangeText={(text) => {
                if (text.length === 0)
                  setSpinnerVisibility(false);
                else setSpinnerVisibility(true)
                filterList(text);
              }}
              onClearPress={() => {
                setSearchResults([]);
                setSpinnerVisibility(false);
              }}
            />
            <View style={styles.flatListStyle}>
                <FlatList
                  data={searchResults}
                  renderItem={({ item }) => renderItem(item)}
                />
            </View>
            <MaterialIcons style={styles.next} name="navigate-next" size={72} color="forestgreen" onPress={() => setPostModalVisible(!postModalVisible)}/>
        </View>
        <Modal
          animationType= 'slide'
          visible = {postModalVisible}
          onRequestClose = {() => setPostModalVisible(!postModalVisible)}
        >
          <ScrollView style={styles.scrollView}>
            <Ionicons style={styles.closeModal} name="close" size={32} color="black" onPress={() => setPostModalVisible(!postModalVisible)}/>
            <TextInput
                placeholder="Add a title!"
                style = {styles.titleInput}
            >

            </TextInput>
            <TextInput
              placeholder="Add your beta!"
              style = {styles.bodyInput}
              multiline={true}
            >

            </TextInput>
            <Text style={styles.pickerTitle}>Grade</Text>
            <Picker
            style={{marginTop: 0}}
            selectedValue = {grade}
            
            
            onValueChange={(value, index) => setGrade(value)}
            
            >
              {
                renderGrades()
              }
            </Picker>
            
              <View style = {styles.buttonContainer}>
                <MaterialIcons style = {styles.photoIcon} name="add-a-photo" size={27} color="black" />
                <Ionicons style = {styles.videoIcon} name="videocam" size={32} color="black" />
                <Ionicons style = {styles.linkIcon} name="link" size={32} color="black" />
              </View>
            
            
          </ScrollView>
          <Button style={{bottom: 10, position: "absolute", alignSelf: "center"}}>POST</Button>
        </Modal>

      </SafeAreaView>
    )
  }
  
}


const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    paddingTop: StatusBar.currentHeight,
   
    
  },
  buttonContainer: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
    flexDirection: 'row',
    bottom: 30
  },
  scrollView: {
   centerContent: true,
   height: "100%",
  },
  inputView: {
    backgroundColor: "#4D5749",
    borderRadius: 30,
    height: 45,
    marginBottom: 20,
    marginLeft: 50,
    marginRight: 50,
   
  },
  TextInput: {
    height: 50,
    flex:1,
    padding: 10,
    
  },
  title: {
    textAlign: "center",
    fontFamily: 'Roboto_700Bold',
    paddingBottom: 20,
    fontSize: 72,
  },
  next: {
    alignSelf: "center"
  },
  closeModal: {
    paddingTop: 50,
    marginLeft: 10,
  },
  titleInput:{
    fontFamily: "Roboto_700Bold",
    fontSize: 32,
    marginLeft: 15,
    marginTop: 20,
  },
  bodyInput: {
    marginTop: 10,
    fontFamily: "Roboto_400Regular",
    marginLeft: 15,
    marginBottom: 100,
  },
  photoIcon:{
    marginRight: 10,
    top: 30
  },
  videoIcon: {
    marginLeft: 10,
    top: 30
    
  },
  linkIcon: {
    top:30,
    marginLeft: 10

    
  },
  cardStyle: {
    marginTop: 16,
    width: ScreenWidth,
    alignItems: "center",
    justifyContent: "center",
  },
  flatListStyle: {
    marginTop: 12,
  },
  pickerTitle: {
    marginBottom: 0,
    bottom: 0,
    alignSelf: "center",

  }
 
 
});

// Old
/*{ <Text style={styles.title}>
Route
</Text>
<Searchbar
placeholder="Search"
onChangeText={onChangeSearch}
value={searchQuery}
/>
<View style = {styles.inputView}>

<TextInput style = {styles.TextInput}
  placeholder = "Grading"
/>

</View>
<Picker
 selectedValue = {climbType}
 prompt={'Climb Type'}
 
 onValueChange={(value, index) => setClimbType(value)}
 
>
   {climbTypeOptions.map( (option, i) => (
    <Picker.Item key = {option.value} value={option.value} label={option.label} />
  ))}
</Picker>
<Picker
 selectedValue = {grade}
 prompt={'Climb Type'}
 
 onValueChange={(value, index) => setGrade(value)}
 
>

   {
    renderGrades()
  }
</Picker> }*/