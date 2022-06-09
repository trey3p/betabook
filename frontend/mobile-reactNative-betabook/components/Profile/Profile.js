import React from 'react';
import {Text, View, StyleSheet} from 'react-native';
import { Avatar, Carousel, Image } from 'react-native-ui-lib';

const IMAGES = [
  'https://images.pexels.com/photos/2529159/pexels-photo-2529159.jpeg?auto=compress&cs=tinysrgb&dpr=1&w=500',
  'https://images.pexels.com/photos/2529146/pexels-photo-2529146.jpeg?auto=compress&cs=tinysrgb&dpr=1&w=500',
  'https://images.pexels.com/photos/2529158/pexels-photo-2529158.jpeg?auto=compress&cs=tinysrgb&dpr=1&w=500'
];

export default function Profile() {
  return (
    <View style={styles.container}>
      <Avatar style={styles.profilePicture} source = {{uri: 'https://www.rockandice.com/wp-content/uploads/2017/09/Alex-Megos-Ken-Etzel-photo.jpg'}} size={150} label={'Alex'} labelColor={'black'}/>
      <Text>Alex Megos</Text>
      <Carousel style={styles.postsSlide}
            containerStyle={{
              height: 200
            }}
            loop
            pageControlPosition={Carousel.pageControlPositions.OVER}
            showCounter
          >
            {IMAGES.map((image, i) => {
              return (
                <View flex centerV key={i}>
                  <Image
                    overlayType={Image.overlayTypes.BOTTOM}
                    style={{flex: 1}}
                    source={{
                      uri: image
                    }}
                  />
                </View>
              );
            })}
          </Carousel>
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
  profilePicture: {
    
  },
  loopCarousel: {
    position: 'absolute',
    bottom: 15,
    left: 10
  },
  postsSlide: {
    marginTop: 50,
    
  }
  
});
