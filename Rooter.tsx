import * as React from 'react';
import { View, Text } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import Home from './src/screens/Home';
import FormDataSekolah from './src/screens/FormDataSekolah';
import Report from './src/screens/Report';

const Rooter = () => {
  const Stack = createNativeStackNavigator();
  return (
    <NavigationContainer>
      <Stack.Navigator
      screenOptions={{ headerShown: false, statusBarHidden: false }}>
        <Stack.Screen name="Home" component={Home} />
        <Stack.Screen name="form" component={FormDataSekolah} />
        <Stack.Screen name="report" component={Report} />
      </Stack.Navigator>
    </NavigationContainer>
  )
}

export default Rooter