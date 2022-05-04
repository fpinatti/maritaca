// import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator, NativeStackNavigationProp } from '@react-navigation/native-stack';
import { Feeds } from './screens/Feeds';
import { Signin } from './screens/Signin';
import { Viewer } from './screens/Viewer';

export function Main() {

  const Stack = createNativeStackNavigator();
  
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Signin">
        <Stack.Screen 
          name="Signin"
          component={Signin}
          options={
            {
              headerTransparent: true,
              title: '',
            }
          }
        />
        <Stack.Screen name="Feeds" component={Feeds} />
        <Stack.Screen name="Viewer" component={Viewer} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}