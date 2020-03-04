import * as React from 'react';
import { Platform, StatusBar, StyleSheet, View } from 'react-native';
import { SplashScreen } from 'expo';
import * as Font from 'expo-font';
import { Ionicons } from '@expo/vector-icons';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';

import BottomTabNavigator from './navigation/BottomTabNavigator';
import LoginScreen from './screens/LoginScreen';
import useLinking from './navigation/useLinking';
import RegisterScreen from './screens/RegisterScreen';

const Stack = createStackNavigator();

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

export default function App(props) {
  const [isLoadingComplete, setLoadingComplete] = React.useState(false);
  const [initialNavigationState, setInitialNavigationState] = React.useState();
  const containerRef = React.useRef();
  const { getInitialState } = useLinking(containerRef);

  // Load any resources or data that we need prior to rendering the app
  React.useEffect(() => {
    async function loadResourcesAndDataAsync() {
      try {
        SplashScreen.preventAutoHide();

        // Load our initial navigation state
        setInitialNavigationState(await getInitialState());

        // Load fonts
        await Font.loadAsync({
          ...Ionicons.font,
          'space-mono': require('./assets/fonts/SpaceMono-Regular.ttf'),
        });
      } catch (e) {
        // We might want to provide this error information to an error reporting service
        console.warn(e);
      } finally {
        setLoadingComplete(true);
        SplashScreen.hide();
      }
    }
    loadResourcesAndDataAsync();
  }, []);

  if (!isLoadingComplete && !props.skipLoadingScreen) {
    return null;
  } else {
    return (
      <View style={styles.container}>
        {Platform.OS === 'ios' && <StatusBar barStyle="default" />}
        <NavigationContainer ref={containerRef} initialState={initialNavigationState}>
          <Stack.Navigator>
            <Stack.Screen name="Login" component={LoginScreen} />
            <Stack.Screen name="Register" component={RegisterScreen} options={{headerLeft: null}}/>
            <Stack.Screen name="Home" component={BottomTabNavigator} options={{headerLeft: null}}/>
          </Stack.Navigator>
        </NavigationContainer>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
});
