import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import DashBoard from './src/Screens/DashBoard';
import Login from './src/Screens/Login';
import SignUp from './src/Screens/SignUp';

const Stack = createNativeStackNavigator();

const App = () => {

  return (
      <NavigationContainer>
        <Stack.Navigator initialRouteName="Login" >
          <Stack.Screen name="DashBoard" component={DashBoard} options={{ headerShown: false }}/>
          <Stack.Screen name="Login" component={Login} options={{ headerShown: false }}/>
          <Stack.Screen name="SignUp" component={SignUp} options={{ headerShown: false }}/>
        </Stack.Navigator>
      </NavigationContainer>
  );
};

export default App;