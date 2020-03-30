// import React from 'react';
// import { View, Text, StyleSheet, FlatList, Image, TouchableOpacity, ScrollView, SafeAreaView  } from 'react-native';
// import * as firebase from 'firebase';
// import Fire from '../API/Fire';

// export default class HomeScreen extends React.Component {
//     state = {
//         email: '',
//         displayName: ''
//     }
//     componentDidMount() {
//         const {email, displayName} = firebase.auth().currentUser
//         this.setState({email, displayName})
//     }
//     renderPost = post => {
//         return (
//           <View style={styles.feedItem}>
//             <Image source={post.avatar} style={styles.avatar} />
//             <View style={{ flex: 1 }}>
//               <View
//                 style={{
//                   flexDirection: 'row',
//                   justifyContent: 'space-between',
//                   alignItems: 'center'
//                 }}
//               >
//                 <View>
//                   <Text style={styles.name}>{post.name}</Text>
//                   {/* <Text style={styles.timestamp}>
//                     {moment(post.timestamp).fromNow()}
//                   </Text> */}
//                 </View>
    
//                 <Ionicons name='ios-more' size={24} color='#73788b' />
//               </View>
    
//               <Text style={styles.post}>{post.text}</Text>
    
//               <Image
//                 source={post.image}
//                 style={styles.postImage}
//                 resizeMode='cover'
//               />
    
//               <View style={{ flexDirection: 'row' }}>
//                 <Ionicons
//                   name='ios-heart-empty'
//                   size={24}
//                   color='#73788b'
//                   style={{ marginRight: 16 }}
//                 />
//                 <Ionicons name='ios-chatboxes' size={24} color='#73788b' />
//               </View>
//             </View>
//           </View>
//         );
//       };

//     render() {
//         return (
//             <View style={styles.container}>
//                 {/* <Text>Hi {this.state.displayName}</Text>
//                 <Text>HomeScreen</Text> */}

//                 {/* <SafeAreaView style={styles.container}>
//                     <ScrollView>
//                       Add card item with user news feed.
//                     </ScrollView>
//                     <TouchableOpacity style={styles.button} onPress={this.signOut}>
//                     <Text style={styles.buttonText}>Log Out</Text>
//                 </TouchableOpacity>
//                 </SafeAreaView> */}
//                 {/* <TouchableOpacity style={styles.button} onPress={() => this.props.navigation.navigate('PostScreen')}>
//                     <Text style={styles.buttonText}>Post</Text>
//                 </TouchableOpacity> */}

//                 <FlatList
//                     style={styles.feed}
//                     data={posts}
//                     renderItem={({ item }) => this.renderPost(item)}
//                     keyExtractor={item => item.id}
//                     showsVerticalScrollIndicator={false}
//                 />
//             </View>
//         )
//     }
// }

// const styles = StyleSheet.create({
//     container: {
//         flex: 1,
//         backgroundColor: '#F5FCFF',
//         justifyContent: 'center',
//         alignItems: 'center'
//     },
//     button: {
//         backgroundColor: '#2980b9',
//         paddingVertical: 15,
//         marginBottom: 100,
//         marginHorizontal: 30,
//         borderRadius: 4,
//         width: 200,
//         height: 50,
//         alignItems: 'center',
//         justifyContent: 'center'
//     },
//     buttonText: {
//         textAlign: 'center',
//         color: '#FFFFFF',
//         fontWeight: '700'
//     },
//     feed: {
//         marginHorizontal: 16
//     },
//     feedItem: {
//         backgroundColor: '#fff',
//         borderRadius: 5,
//         padding: 8,
//         flexDirection: 'row',
//         marginVertical: 8
//       },
//       avatar: {
//         width: 36,
//         height: 36,
//         borderRadius: 18,
//         marginRight: 16
//       },
//       name: {
//         fontSize: 15,
//         fontWeight: '500',
//         color: '#454d65'
//       },
//       post: {
//         marginTop: 16,
//         fontSize: 14,
//         color: '#838899'
//       },
//       postImage: {
//         width: undefined,
//         height: 150,
//         borderRadius: 5,
//         marginVertical: 16
//       }
// })

import React from 'react';
import { View, Text, StyleSheet, FlatList, Image } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
// import moment from 'moment';
import Fire from '../API/Fire';
import * as firebase from 'firebase'

// temporary data until we pull from Firebase
// posts = [
//   {
//     id: '1',
//     name: 'Joe McKay',
//     text:
//       'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.',
//     timestamp: 1569109273726,
//     avatar: require('../assets/tempAvatar.jpg'),
//     image: require('../assets/tempImage1.jpg')
//   }
// ];

// const admin = require('firebase-admin');

// admin.initializeApp({
//   credential: admin.credential.applicationDefault()
// });

const db = firebase.firestore();

let record = db.collection('cities');
let posts = record.get()
  .then(snapshot => {
    snapshot.forEach(doc => {
      console.log(doc.id, '=>', doc.data());
    });
  })
  .catch(err => {
    console.log('Error getting documents', err);
  });

export default class HomeScreen extends React.Component {
  renderPost = post => {
    return (
      <View style={styles.feedItem}>
        <Image source={post.avatar} style={styles.avatar} />
        <View style={{ flex: 1 }}>
          <View
            style={{
              flexDirection: 'row',
              justifyContent: 'space-between',
              alignItems: 'center'
            }}
          >
            <View>
              <Text style={styles.name}>{post.name}</Text>
              {/* <Text style={styles.timestamp}>
                {moment(post.timestamp).fromNow()}
              </Text> */}
            </View>

            <Ionicons name='ios-more' size={24} color='#73788b' />
          </View>

          <Text style={styles.post}>{post.text}</Text>

          <Image
            source={post.image}
            style={styles.postImage}
            resizeMode='cover'
          />

          <View style={{ flexDirection: 'row' }}>
            <Ionicons
              name='ios-heart-empty'
              size={24}
              color='#73788b'
              style={{ marginRight: 16 }}
            />
            <Ionicons name='ios-chatboxes' size={24} color='#73788b' />
          </View>
        </View>
      </View>
    );
  };

  render() {
    return (
      <View style={styles.container}>
        <View style={styles.header}>
          <Text style={styles.headerTitle}>Feed</Text>
        </View>

        <FlatList
          style={styles.feed}
          data={posts}
          renderItem={({ item }) => this.renderPost(item)}
          keyExtractor={item => item.id}
          showsVerticalScrollIndicator={false}
        />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#efecf4'
  },
  header: {
    paddingTop: 64,
    paddingBottom: 16,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
    borderBottomWidth: 1,
    borderBottomColor: '#ebecf4',
    shadowColor: '#454d65',
    shadowOffset: { height: 5 },
    shadowRadius: 15,
    shadowOpacity: 0.2,
    zIndex: 10
  },
  headerTitle: {
    fontSize: 20,
    fontWeight: '500'
  },
  feed: {
    marginHorizontal: 16
  },
  feedItem: {
    backgroundColor: '#fff',
    borderRadius: 5,
    padding: 8,
    flexDirection: 'row',
    marginVertical: 8
  },
  avatar: {
    width: 36,
    height: 36,
    borderRadius: 18,
    marginRight: 16
  },
  name: {
    fontSize: 15,
    fontWeight: '500',
    color: '#454d65'
  },
  timestamp: {
    fontSize: 11,
    color: '#c4c6ce',
    marginTop: 4
  },
  post: {
    marginTop: 16,
    fontSize: 14,
    color: '#838899'
  },
  postImage: {
    width: undefined,
    height: 150,
    borderRadius: 5,
    marginVertical: 16
  }
});
