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
        <Card style={styles.exploreCard}>
          <Card.Image source={{uri: 'https://www.climbing.com/wp-content/uploads/2018/05/cred-ken-etzel.jpg'}} height={200} width={150}/>
          <Card.Section
            content={[{text: 'Explore Climbs!', text70: true, grey10: true}]}
            contentStyle={{alignItems: 'center'}}
            
          />
        </Card>
        <Card style={styles.geoCard}>
          <Card.Image source={{uri: 'https://www.climbing.com/wp-content/uploads/2018/05/cred-ken-etzel.jpg'}} height={200} width={150}/>
          <Card.Section
            content={[{text: 'Climbs near you!', text70: true, grey10: true}]}
            contentStyle={{alignItems: 'center'}}
            
          />
        </Card>
      
    </View>
    

  )
};


const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
    flexDirection: 'row'
  },
  image: {
    position: 'absolute',
    top: 60,
    
    
  },
  exploreCard: {
    marginRight: 10,
    bottom: 70
    
    
  },
  geoCard: {
   marginLeft: 10,
   bottom: 70
  }
});

