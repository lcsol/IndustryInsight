import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import 'react-native-gesture-handler'
// import { createSwitchNavigator, createAppContainer } from 'react-navigation';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import LoadingScreen from './screens/LoadingScreen'
import RegisterScreen from './screens/RegisterScreen'
import LoginScreen from './screens/LoginScreen'
import HomeScreen from './screens/HomeScreen'
import IndexScreen from './components/Index';

import * as firebase from 'firebase'

var firebaseConfig = {
  apiKey: "AIzaSyA_Qq01jVGZsKkUapBqY69JDtMGaD5RwRE",
  authDomain: "industryinsight-42a3b.firebaseapp.com",
  databaseURL: "https://industryinsight-42a3b.firebaseio.com",
  projectId: "industryinsight-42a3b",
  storageBucket: "industryinsight-42a3b.appspot.com",
  messagingSenderId: "488958617767",
  appId: "1:488958617767:web:64a0ef004e66b09d735382",
  measurementId: "G-46RE2FLM3H"
};

// firebase.initializeApp(firebaseConfig);
// firebase.analytics();
if (!firebase.apps.length) {
  firebase.initializeApp(firebaseConfig);
}

const Stack = createStackNavigator();

// const appStack = createStackNavigator({
//   home: HomeScreen
// })

// const authStack = createStackNavigator({
//   login: LoginScreen,
//   register: RegisterScreen
// })

// export default createAppContainer(
//   createSwitchNavigator(
//     {
//       Loading: LoadingScreen,
//       App: appStack,
//       Auth: authStack
//     },
//     {
//       initialRouteName: 'Loading'
//     }
//   )
// )

export default function App() {
  return (
    // <View style={styles.container}>
    //   <Text>Open up App.js to start working on your app!</Text>
    // </View>
    <NavigationContainer>
       <Stack.Navigator initialRouteName="Loading">
         <Stack.Screen name="Loading" component={LoadingScreen} />
         <Stack.Screen name="Login" component={LoginScreen} options={{headerLeft: null}}/>
         <Stack.Screen name="Register" component={RegisterScreen} options={{headerLeft: null}}/>
         <Stack.Screen name="Industry Insight" component={IndexScreen} options={{headerLeft: null}}/>
       </Stack.Navigator>
    </NavigationContainer>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
