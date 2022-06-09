import React, {useEffect, useState} from 'react';
import {Text, ScrollView, StyleSheet, View, Dimensions} from 'react-native';

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
    <View style = {styles.container}>
      <Text>Home</Text>
      <Video
        ref={video}
        source={{uri: videoString + '.mp4'}}
        resizeMode="contain"
        style={{ width, height: 300 }}
        shouldPlay = {true}
        volume = {.5}
        

      />
    </View>

  )
}


const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
})