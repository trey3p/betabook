import React from 'react';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs'
const Tab = createBottomTabNavigator()
import Home from '../Explore/Home';
import Profile from '../Profile/Profile';
import Post from '../Post/PostPage';
import Ionicons from '@expo/vector-icons/Ionicons';

export default function Navbar() {
  return (
    <Tab.Navigator 
    initialRouteName='Home'
    screenOptions={({route}) => ({
        tabBarIcon: ({focused, color, size}) => {
            let iconName;
            let rn = route.name

            if (rn === 'Home') {
                iconName = focused ? 'home' : 'home-outline'
            }
            else if (rn == 'Profile')
            {
                iconName = focused ? 'person-circle': 'person-circle-outline'
            }
            else if (rn == 'Post')
            {
                iconName = focused ? 'add': 'add-outline'
            }

            return <Ionicons name={iconName} size={size} color={color}/>
        },
        tabBarActiveTintColor: '#1A410C',
        tabBarInactiveTintColor: '#1A410C',
        tabBarLabelStyle: {paddingBottom: 0, fontSize: 10, paddingTop: 0},
        tabBarStyle: {padding:0, height:70},
        tabBarShowLabel:false,
        headerShown:false,
    })}
    >
        <Tab.Screen name='Home' component={Home}/>
        <Tab.Screen name = 'Post' component={Post}/>
        <Tab.Screen name = 'Profile' component={Profile}/>
        
    </Tab.Navigator>
  )
}
