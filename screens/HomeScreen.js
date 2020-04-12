// import React from 'react';
// import { View, StyleSheet, TouchableOpacity, ScrollView, SafeAreaView } from 'react-native';
// import { Card, Text, ListItem, SocialIcon } from 'react-native-elements'

// import * as firebase from 'firebase';

// // Dummy data
// const users = [
//     {
//         name: 'brynn',
//         avatar: 'https://s3.amazonaws.com/uifaces/faces/twitter/brynn/128.jpg',
//         subtitle: 'Student',
//         request: 'Resume Review'
//     },
//     {
//         name: 'Amy Farha',
//         avatar: 'https://s3.amazonaws.com/uifaces/faces/twitter/ladylexy/128.jpg',
//         subtitle: 'Student',
//         request: 'Amazon interview practice'
//     },
//     {
//         name: 'Chris Jackson',
//         avatar: 'https://s3.amazonaws.com/uifaces/faces/twitter/adhamdannaway/128.jpg',
//         subtitle: 'Student',
//         request: 'Facebook interview practice'
//     },
// ]

// export default class HomeScreen extends React.Component {
//     state = {
//         email: '',
//         displayName: ''
//     }
//     componentDidMount() {
//         const { email, displayName } = firebase.auth().currentUser
//         this.setState({ email, displayName })
//     }


//     render() {
//         return (
//             <SafeAreaView style={styles.container}>
//                 <View style={styles.header}>
//                     <Text h3>Alerts</Text>
//                 </View>
//                 <View style={styles.alertContent}>
//                     <ScrollView style={styles.alertContent}>
//                         {
//                             users.map((l, i) => (
//                                 <Card containerStyle={{ padding: 0 }}>
//                                     <ListItem
//                                         key={i}
//                                         leftAvatar={{ source: { uri: l.avatar } }}
//                                         title={l.name}
//                                         subtitle={l.request}
//                                         bottomDivider
//                                     />
//                                 </Card>
//                             ))
//                         }
//                     </ScrollView>
//                 </View>
//                 <View style={styles.header}>
//                     <Text h3>Channels you may like ...</Text>
//                 </View>
//                 <View style={styles.channelIcon}>
//                     <SocialIcon
//                         type='facebook'
//                     />
//                     <SocialIcon
//                         type='google'
//                     />
//                     <SocialIcon
//                         type='twitch'
//                     />
//                     <SocialIcon
//                         type='medium'
//                     />
//                 </View>

//             </SafeAreaView>
//         )
//     }
// }

// const styles = StyleSheet.create({
//     container: {
//         flex: 1,
//         backgroundColor: '#2a7886',
//         // justifyContent: 'center',
//         // alignItems: 'center'
//     },
//     header: {
//         padding: 10,
//         marginTop: 10,
//         alignItems: 'center',
//         borderWidth: 2,

//     },
//     alertContent: {
//         marginBottom: 0,
//     },
//     channelIcon: {
//         flexDirection: 'row'
//     }
//     // button: {
//     //     backgroundColor: '#2980b9',
//     //     paddingVertical: 15,
//     //     marginBottom: 100,
//     //     marginHorizontal: 30,
//     //     borderRadius: 4,
//     //     width: 200,
//     //     height: 50,
//     //     alignItems: 'center',
//     //     justifyContent: 'center'
//     // },
//     // buttonText: {
//     //     textAlign: 'center',
//     //     color: '#FFFFFF',
//     //     fontWeight: '700'
//     // }
// })


import React from 'react';
import { View, Text, StyleSheet, ScrollView, FlatList, ActivityIndicator, Image } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import * as firebase from 'firebase'

export default class HomeScreen extends React.Component {
    constructor(props) {
        super(props);
        this.ref = firebase.firestore().collection('posts');
        this.unsubscribe = null;
        this.state = {
          loading: true,
          posts: []
        };
    }
    onCollectionUpdate = (querySnapshot) => {
        let cur = [];
        querySnapshot.forEach((doc) => {
            cur.push({
                id: doc.id,
                name: 'Joe Green',
                text: doc.data().text,
                timestamp: doc.data().timestamp,
                avatar: require('../assets/images/robot-dev.png'),
                // image: doc.data().image
            });            
        });
        this.setState({
            loading: false,
            posts: cur
        });
    }

    componentDidMount() {
        this.unsubscribe = this.ref.onSnapshot(this.onCollectionUpdate);
    }

      
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
      

          </View>

          <Text style={styles.post}>{post.text}</Text>

          {/* <Image
            source={post.image}
            style={styles.postImage}
            resizeMode='cover'
          /> */}

          <View style={{ flexDirection: 'row' }}>
            <Ionicons name='ios-chatboxes' size={24} color='#73788b' />
          </View>
        </View>
      </View>
    );
  };

  render() {
    return (
      <View style={styles.container}>
        <FlatList
          style={styles.feed}
          data={this.state.posts}
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
    backgroundColor: '#413c69'
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

