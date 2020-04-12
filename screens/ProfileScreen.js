import * as React from 'react';
import { Text, SafeAreaView, StyleSheet, Button } from 'react-native';
import { ScrollView } from 'react-native-gesture-handler';

import * as firebase from 'firebase';
import fbKey from '../API/Fire'

if (!firebase.app.length) {
  firebase.initializeApp(fbKey);
}

function ProfileScreen({ navigation }) {
  return (
    <SafeAreaView style={styles.container}>

      <ScrollView contentContainerStyle={styles.contentContainer}>
        <Text>Logout</Text>
        <Button title="Logout" onPress={() =>
          firebase.auth().signOut().then(function () {
            // Sign-out successful.
            console.log('logging out')
            navigation.popToTop();
          }).catch(function () {
            // An error happened.
            console.log("Couldn't log out!")
          })
        } />
      </ScrollView>
    </SafeAreaView>
  );
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fafafa',
  },
  contentContainer: {
    paddingTop: 15,
  },
  optionIconContainer: {
    marginRight: 12,
  },
  option: {
    backgroundColor: '#fdfdfd',
    paddingHorizontal: 15,
    paddingVertical: 15,
    borderWidth: StyleSheet.hairlineWidth,
    borderBottomWidth: 0,
    borderColor: '#ededed',
  },
  lastOption: {
    borderBottomWidth: StyleSheet.hairlineWidth,
  },
  optionText: {
    fontSize: 15,
    alignSelf: 'flex-start',
    marginTop: 1,
  },
});

export default ProfileScreen;