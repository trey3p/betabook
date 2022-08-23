import React, {useEffect, useState} from 'react';
import {Text, ScrollView, StyleSheet, View, Dimensions, Image, FlatList} from 'react-native';
import { Card } from 'react-native-ui-lib';
import { Video } from 'expo-av';

import { getDownloadURL, getStorage, ref } from "firebase/storage";
import { firebaseApp } from '../../fireStorage/storageAPI';

// Get a reference to the storage service, which is used to create references in your storage bucket
const storage = getStorage(firebaseApp);


export default function Home() {
  const { width } = Dimensions.get('window');
  const video = React.useRef(null)
  const [videoString, setVideoString] = useState('');

  useEffect(() =>{
    if(!videoString){
      getVideoURL()
    }
  }, []);

  async function getVideoURL(path){
     //const videoURL = await  (getDownloadURL(ref(storage, path))).toString()
    const videoURL = await getDownloadURL(ref(storage, 'videos/test-video.mp4')).then(function urlData(url){
      return url;
    });
    
    setVideoString(videoURL);
  }

  
  return (
    <View style={styles.container}>
      <Image style = {styles.image} source = {require("../../assets/betabook-logo.png")}/>
    <View style={styles.upperContainer}>
       
        <Card style={styles.exploreCard}>
          <Card.Image source={{uri: 'https://www.climbing.com/wp-content/uploads/2018/05/cred-ken-etzel.jpg'}} height={200} width={150}/>
          <Card.Section
            content={[{text: 'Explore Climbs!', text70: true, grey10: true}]}
            contentStyle={{alignItems: 'center'}}
            
          />
        </Card>
        <Card style={styles.geoCard}>
          <Card.Image source={{uri: 'https://c1.wallpaperflare.com/preview/239/4/949/compass-hand-holding-hold.jpg'}} height={200} width={150}/>
          <Card.Section
            content={[{text: 'Find Climbs!', text70: true, grey10: true}]}
            contentStyle={{alignItems: 'center'}}
            
          />
        </Card>
        
      
    </View>
    <View style={styles.lowerContainer}>
      <Card style={styles.libraryCard}>
          <Card.Image source={{uri: 'https://d3byf4kaqtov0k.cloudfront.net/p/news/cfcp0nai.jpg'}} height={200} width={150}/>
          <Card.Section
            content={[{text: 'Your Library!', text70: true, grey10: true}]}
            contentStyle={{alignItems: 'center'}}
            
          />
        </Card>
        <Card style={styles.newsCard}>
          <Card.Image source={{uri: 'https://www.lasportiva.com/media/Ambassador/Adam_Ondra_Change_9b_Hanshelleren_-_Flatanger_Norway__credits_Petr_Pavlicek_2.jpg'}} height={200} width={150}/>
          <Card.Section
            content={[{text: 'News!', text70: true, grey10: true}]}
            contentStyle={{alignItems: 'center'}}
            
          />
        </Card>
    </View>
    </View>

  )
};


const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
    flexDirection: 'column',
    
  },
  upperContainer: {flex: 1, marginTop: 90},
  lowerContainer: {flex: 1},

  image: {
    position: 'absolute',
    top: 60,
    
    
  },
  exploreCard: {
    position: "absolute",
    right: 20,
    bottom: 50,
    
    
  },
  geoCard: {
    position: "absolute",
    left: 20,
    bottom: 50,
  },
  libraryCard: {
    position: "absolute",
    left: 20,
    bottom: 100,
  },
  newsCard: {
    position: "absolute",
    right: 20,
    bottom: 100,
  }
});

