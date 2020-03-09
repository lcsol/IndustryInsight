import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, ScrollView, SafeAreaView  } from 'react-native';
import * as firebase from 'firebase';

export default class HomeScreen extends React.Component {
    state = {
        email: '',
        displayName: ''
    }
    componentDidMount() {
        const {email, displayName} = firebase.auth().currentUser
        this.setState({email, displayName})
    }

    render() {
        return (
            <View style={styles.container}>
                <Text>Hi {this.state.displayName}</Text>
                {/* <SafeAreaView style={styles.container}>
                    <ScrollView>
                      Add card item with user news feed.
                    </ScrollView>
                    <TouchableOpacity style={styles.button} onPress={this.signOut}>
                    <Text style={styles.buttonText}>Log Out</Text>
                </TouchableOpacity>
                </SafeAreaView> */}

            </View>
        )
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#F5FCFF',
        justifyContent: 'center',
        alignItems: 'center'
    },
    button: {
        backgroundColor: '#2980b9',
        paddingVertical: 15,
        marginBottom: 100,
        marginHorizontal: 30,
        borderRadius: 4,
        width: 200,
        height: 50,
        alignItems: 'center',
        justifyContent: 'center'
    },
    buttonText: {
        textAlign: 'center',
        color: '#FFFFFF',
        fontWeight: '700'
    }
})
