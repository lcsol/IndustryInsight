// import React from 'react'
// import { View, Text, StyleSheet, SafeAreaView, TouchableOpacity, TextInput, TouchableOpacityBase, Button } from 'react-native'
// import fbKey from '../API/Fire'
// // import { addPost } from '../API/PostServiceAPI'
// import * as firebase from 'firebase'
// import 'firebase/firestore';
// import config from '../config'
//
// if (!firebase.app.length) {
//     firebase.initializeApp(config.firebaseConfig)
// }
//
// // const docRef = firebase.firestore().collection('posts')
// export default class PostScreen extends React.Component {
//     constructor(props) {
//         super(props);
//         this.state = ({
//             text: '',
//             loading: false
//         });
//         // this.docRef = firebase.firestore.collection('posts');
//         this.userId = firebase.auth().currentUser.uid;
//
//     }
//     // addPost = async ({ text }) => {
//     //         return new Promise((res, rej) => {
//     //             this.firestore
//     //                 .collection("posts")
//     //                 .add({
//     //                     text,
//     //                     uid: this.uid,
//     //                     timestamp: this.timestamp
//     //                 })
//     //                 .then(ref => {
//     //                     res(ref)
//     //                 })
//     //                 .catch(error => {
//     //                     rej(error)
//     //                 });
//     //         });
//     //     };
//
//
//     handlePost = () => {
//         const db = firebase.firestore();
//         return new Promise((res, rej) => {
//             console.log("before");
//             // firebase.firestore().collection('posts').add({
//             //     request: this.state.text,
//             //     timestamp: firebase.firestore.FieldValue.serverTimestamp()
//
//             // }).then(() => {console.log("success");})
//             // .catch((error) => {
//             //     console.log(error);
//             //     console.log("failed");
//             // })
//             // ;
//
//             db.collection("posts").doc("zZhczLYP3DyPtX0DJCkf").set({
//                 request: this.state.text,
//                 timestamp: firebase.firestore.FieldValue.serverTimestamp()
//
//             })
//             console.log("after");
//         })
//     }
//
//
//
//
//
//     render() {
//         return (
//             <SafeAreaView>
//                 <View style={styles.container}>
//                     <View style={styles.inputContainer}>
//                         <TextInput
//                             autoFocus={true}
//                             multiline={true}
//                             numberOfLines={4}
//                             placeholder="What's on your mind?"
//                             style={{ flex: 1, backgroundColor: 'white' }}
//                             onChangeText={text => this.setState({ text })}
//                             value={this.state.text}
//                         />
//                     </View>
//                     <View style={styles.footer}>
//                         <TouchableOpacity onPress={this.handlePost.bind(this)}>
//                             <Text style={{ height: 100, fontWeight: "500", color: 'blue' }}>Post</Text>
//                         </TouchableOpacity>
//                     </View>
//                 </View>
//             </SafeAreaView>
//         )
//     }
// }
//
// const styles = StyleSheet.create({
//     container: {
//         flex: 1,
//         alignItems: 'center'
//
//     },
//     inputContainer: {
//         margin: 5,
//         flexDirection: 'row',
//         height: 300
//     },
//     footer: {
//         flexDirection: 'row',
//         justifyContent: "space-between",
//         paddingHorizontal: 32,
//         paddingVertical: 12
//     }
// })











import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  SafeAreaView,
  TextInput,
  Image
} from 'react-native';
import Constants from 'expo-constants';
import * as Permissions from 'expo-permissions';
import { Ionicons } from '@expo/vector-icons';
import Fire from '../API/Fire';
import * as ImagePicker from 'expo-image-picker';
import UserPermissions from '../utilities/UserPermissions';

export default class PostScreen extends React.Component {
  state = {
    text: '',
    image: null
  };

  componentDidMount() {
    UserPermissions.getCameraPermission();
  }

  handlePost = () => {
    Fire.shared
      .addPost({ text: this.state.text.trim(), localUri: this.state.image })
      .then(ref => {
        this.setState({ text: '', image: null });
        this.props.navigation.goBack();
      })
      .catch(error => {
        alert(error);
      });
  };

  pickImage = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [4, 3]
    });

    if (!result.cancelled) {
      this.setState({ image: result.uri });
    }
  };

  render() {
    return (
      <SafeAreaView style={styles.container}>
        <View style={styles.header}>
          <TouchableOpacity onPress={() => this.props.navigation.goBack()}>
            <Ionicons name='md-arrow-back' size={24} color='#D8D9DB'/>
          </TouchableOpacity>
          <TouchableOpacity onPress={this.handlePost}>
            <Text style={{ fontWeight: '500' }}>Post</Text>
          </TouchableOpacity>
        </View>

        <View style={styles.inputContainer}>
          <Image
    source={require('../assets/images/tempAvatar.jpg')}
    style={styles.avatar}
    />
          <TextInput
    autoFocus={true}
    multiline={true}
    numberOfLines={4}
    style={{flex: 1}}
    placeholder='Want to post something?'
    onChangeText={text => this.setState({text})}
    value={this.state.text}
    />
        </View>
        <TouchableOpacity style={styles.photo} onPress={this.pickImage}>
          <Ionicons name='md-camera' size={32} color='#D8D9DB'/>
        </TouchableOpacity>
        <View style={{ marginHorizontal: 32, marginTop: 32, height: 150 }}>
          <Image
    source={{uri: this.state.image}}
    style={{width: '100%', height: '100%'}}
    />
        </View>
      </SafeAreaView>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingHorizontal: 32,
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: '#D8D9DB'
  },
  inputContainer: {
    margin: 32,
    flexDirection: 'row'
  },
  avatar: {
    width: 48,
    height: 48,
    borderRadius: 24,
    marginRight: 16
  },
  photo: {
    alignItems: 'flex-end',
    marginHorizontal: 32
  }
});
