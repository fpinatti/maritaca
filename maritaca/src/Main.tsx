// import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator, NativeStackNavigationProp } from '@react-navigation/native-stack';
import { Feeds } from './screens/Feeds';
import { Signin } from './screens/Signin';
import { Viewer } from './screens/Viewer';
import { initializeApp } from 'firebase/app';
// import { getDatabase } from 'firebase/database';
import Constants from 'expo-constants';
import { getDatabase, ref, onValue, set } from 'firebase/database';

export function Main() {

  const Stack = createNativeStackNavigator();
  const firebaseConfig = {
    apiKey: Constants.manifest?.extra?.firebaseApiKey,
    authDomain: Constants.manifest?.extra?.firebaseAuthDomain,
    projectId: Constants.manifest?.extra?.firebaseProjectId,
    storageBucket: Constants.manifest?.extra?.firebaseStorageBucket,
    messagingSenderId: Constants.manifest?.extra?.firebaseMessagingSenderId,
    appId: Constants.manifest?.extra?.firebaseAppId,
    measurementId: Constants.manifest?.extra?.firebaseMeasurementId,
  };
  initializeApp(firebaseConfig)

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