import * as React from 'react';
import { Text, View, StyleSheet, Button } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

import { RectButton, ScrollView } from 'react-native-gesture-handler';

import firebase from 'firebase';


function ProfileScreen({ navigation }) {
  return (
    <ScrollView style={styles.container} contentContainerStyle={styles.contentContainer}>
      <Text></Text>
      <Button title="Logout" onPress={() => 
        firebase.auth().signOut().then(function() {
          // Sign-out successful.
          console.log('logging out')
          navigation.popToTop();
        }).catch(function() {
          // An error happened.
          console.log("Couldn't log out!")
        })
        }/>
    </ScrollView>
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