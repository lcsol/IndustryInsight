import React from 'react'
import { View, Text, StyleSheet, SafeAreaView, TouchableOpacity, TextInput, TouchableOpacityBase, Button } from 'react-native'
import fbKey from '../API/Fire'
// import { addPost } from '../API/PostServiceAPI'
import * as firebase from 'firebase'
import 'firebase/firestore';
import config from '../config'

if (!firebase.app.length) {
    firebase.initializeApp(config.firebaseConfig)
}

// const docRef = firebase.firestore().collection('posts')
export default class PostScreen extends React.Component {
    constructor(props) {
        super(props);
        this.state = ({
            text: '',
            loading: false
        });
        // this.docRef = firebase.firestore.collection('posts');
        this.userId = firebase.auth().currentUser.uid;

    }
    // addPost = async ({ text }) => {
    //         return new Promise((res, rej) => {
    //             this.firestore
    //                 .collection("posts")
    //                 .add({
    //                     text,
    //                     uid: this.uid,
    //                     timestamp: this.timestamp
    //                 })
    //                 .then(ref => {
    //                     res(ref)
    //                 })
    //                 .catch(error => {
    //                     rej(error)
    //                 });
    //         });
    //     };


    handlePost = () => {
        const db = firebase.firestore();
        return new Promise((res, rej) => {
            console.log("before");
            // firebase.firestore().collection('posts').add({
            //     request: this.state.text,
            //     timestamp: firebase.firestore.FieldValue.serverTimestamp()

            // }).then(() => {console.log("success");})
            // .catch((error) => { 
            //     console.log(error);
            //     console.log("failed");
            // })
            // ;

            db.collection("posts").doc("zZhczLYP3DyPtX0DJCkf").set({
                request: this.state.text,
                timestamp: firebase.firestore.FieldValue.serverTimestamp()

            })
            console.log("after");
        })
    }





    render() {
        return (
            <SafeAreaView>
                <View style={styles.container}>
                    <View style={styles.inputContainer}>
                        <TextInput
                            autoFocus={true}
                            multiline={true}
                            numberOfLines={4}
                            placeholder="What's on your mind?"
                            style={{ flex: 1, backgroundColor: 'white' }}
                            onChangeText={text => this.setState({ text })}
                            value={this.state.text}
                        />
                    </View>
                    <View style={styles.footer}>
                        <TouchableOpacity onPress={this.handlePost.bind(this)}>
                            <Text style={{ height: 100, fontWeight: "500", color: 'blue' }}>Post</Text>
                        </TouchableOpacity>
                    </View>
                </View>
            </SafeAreaView>
        )
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center'

    },
    inputContainer: {
        margin: 5,
        flexDirection: 'row',
        height: 300
    },
    footer: {
        flexDirection: 'row',
        justifyContent: "space-between",
        paddingHorizontal: 32,
        paddingVertical: 12
    }
})
