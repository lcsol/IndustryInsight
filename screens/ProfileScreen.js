import * as React from 'react';
import { View, Image, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { Button } from 'react-native-elements'
// import { ScrollView } from 'react-native-gesture-handler';

import * as firebase from 'firebase';
import config from '../config'

if (!firebase.app.length) {
  firebase.initializeApp(config.firebaseConfig);
}

function ProfileScreen({ navigation }) {
  return (
    <View style={styles.container}>
      <View style={styles.header}> 
        <Image style={styles.avatar}
          source={{ uri: 'https://bootdey.com/img/Content/avatar/avatar6.png' }} />
      </View>
      <View style={styles.body}>
        {/* <View style={styles.bodyContent}> */}
          <Text style={styles.name}>John Doe </Text>
          <Text style={styles.userInfo}>UX Designer / Mobile developer</Text>
          <Text style={styles.userInfo}>jhonnydoe@mail.com </Text>
          <Text style={styles.userInfo}>50 Tokens</Text>
          <Button style={styles.button}
            title="Logout" onPress={() =>
              firebase.auth().signOut().then(function () {
                // Sign-out successful.
                console.log('logging out')
                navigation.popToTop();
              }).catch(function () {
                // An error happened.
                console.log("Couldn't log out!")
              })
            } />
          {/* </View> */}
      </View>
    </View>

  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "whitesmoke"
  },
  header: {
    backgroundColor: "#a8d3da",
    height: 200
  },
  headerContent: {
    padding: 30,
    alignItems: 'center',
  },
  avatar: {
    width: 130,
    height: 130,
    borderRadius: 63,
    borderWidth: 4,
    borderColor: "white",
    marginBottom: 10,
    alignSelf: 'center',
    position: 'absolute',
    marginTop: 130
  },
  name: {
    fontSize: 22,
    color: "#000000",
    fontWeight: '600',
  },
  userInfo: {
    fontSize: 16,
    color: "black",
    fontWeight: '600',
  },

  body: {
    marginTop: 70,
    alignItems: 'center'
  },
  bodyContent: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    padding: 30,
  },
  item: {
    flexDirection: 'row',
  },
  infoContent: {
    flex: 1,
    alignItems: 'flex-start',
    paddingLeft: 5
  },
  iconContent: {
    flex: 1,
    alignItems: 'flex-end',
    paddingRight: 5,
  },
  icon: {
    width: 30,
    height: 30,
    marginTop: 20,
  },
  info: {
    fontSize: 18,
    marginTop: 20,
    color: "#FFFFFF",
  },
  button: {
    borderRadius: 0,
    paddingTop: 20,
    paddingLeft: 40,
    paddingRight: 40,
    marginLeft: 0,
    marginRight: 0,
    marginBottom: 0
  }
});

export default ProfileScreen;