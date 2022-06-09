import React from 'react';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs'
const Tab = createBottomTabNavigator()
import Home from '../Explore/Home';
import Profile from '../Profile/Profile';

export default function Navbar() {
  return (
    <Tab.Navigator initialRouteName='Home'>
        <Tab.Screen name='Home' component={Home}/>
        <Tab.Screen name = 'Profile' component={Profile}/>
    </Tab.Navigator>
  )
}
