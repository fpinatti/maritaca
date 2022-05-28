import AsyncStorage from '@react-native-async-storage/async-storage';

const retrieveToken = async () => {
  let token
  try {
    token = await AsyncStorage.getItem('@userToken');
  } catch(err) {
    console.log('no token found in storage')
  }
  return token
}

const storeToken = async (value: string) => {
  let token
  try {
    token = await AsyncStorage.setItem('@userToken', value);
  } catch(err) {
    console.log('error storing token')
  }
  return token
}

export {
  retrieveToken,
  storeToken,
}

// import React from 'react';
// import { getAuth, onAuthStateChanged, User } from 'firebase/auth';


// export function useAuthentication() {
// const auth = getAuth();
//     // console.log(auth)
//   const [user, setUser] = React.useState<User>();

//   React.useEffect(() => {
//     const unsubscribeFromAuthStatuChanged = onAuthStateChanged(auth, (user) => {
//       if (user) {
//         // User is signed in, see docs for a list of available properties
//         // https://firebase.google.com/docs/reference/js/firebase.User
//         setUser(user);
//       } else {
//         // User is signed out
//         setUser(undefined);
//       }
//     });

//     return unsubscribeFromAuthStatuChanged;
//   }, []);

//   return {
//     user
//   };
// }