import 'react-native-reanimated';
import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import PeaksScreen from './screens/PeaksScreen';
import TrackHikeScreen from './screens/TrackHikeScreen';
import HomeScreen from './screens/HomeScreen';  // <-- This must match the filename exactly

const Tab = createBottomTabNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Tab.Navigator>
        <Tab.Screen name="Home" component={HomeScreen} />
        <Tab.Screen name="Track Hike" component={TrackHikeScreen} />
        <Tab.Screen name="Peaks" component={PeaksScreen} />
      </Tab.Navigator>
    </NavigationContainer>
  );
}
