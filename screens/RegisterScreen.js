import React from 'react'
import { View, Text, StyleSheet, TouchableOpacity, TextInput } from 'react-native'
import * as firebase from 'firebase'

export default class RegisterScreen extends React.Component {
    state = {
        username: '', 
        password: '', 
        email: '', 
        phone_number: ''
    }
    handleSignUp = () => {
        firebase.auth()
        .createUserWithEmailAndPassword(this.state.email, this.state.password)
        .then(userCredentials => {
            return userCredentials.user.updateProfile({
                displayName: this.state.username
                // phone_number: this.state.phone_number
            })
        })
        .catch(error => this.setState({errorMessage: error.message}))
    }

    render() {
        return (
            <View style={styles.container}>
                <View style={styles.errorMessage}>
        {this.state.errorMessage && <Text style={styles.error}>{this.state.errorMessage}</Text>}
                </View>
                <Text style={styles.logoTitle}>Industry Insight</Text>
                <TextInput
                    style={styles.input}
                    placeholder='Username'
                    autoCapitalize="none"
                    placeholderTextColor='rgba(255, 255, 255, 0.7)'
                    returnKeyType="next"
                    onChangeText={username => this.setState({username})}
                    value = {this.state.username}
                />
                <TextInput
                    style={styles.input}
                    placeholder='Password'
                    secureTextEntry={true}
                    autoCapitalize="none"
                    returnKeyType="next"
                    placeholderTextColor='rgba(255, 255, 255, 0.7)'
                    onChangeText={password => this.setState({password})}
                    value = {this.state.password}
                />
                <TextInput
                    style={styles.input}
                    placeholder='Email'
                    autoCapitalize="none"
                    keyboardType='email-address'
                    returnKeyType="next"
                    placeholderTextColor='rgba(255, 255, 255, 0.7)'
                    onChangeText={email => this.setState({email})}
                    value = {this.state.email}
                />
                <TextInput
                    style={styles.input}
                    placeholder='Phone Number'
                    autoCapitalize="none"
                    keyboardType='number-pad'
                    returnKeyType="go"
                    placeholderTextColor='rgba(255, 255, 255, 0.7)'
                    onChangeText={phone_number => this.setState({phone_number})}
                    value = {this.state.phone_number}
                />
                <TouchableOpacity style={styles.buttonContainer} onPress={this.handleSignUp}>
                    <Text style={styles.buttonText}>Sign Up</Text>
                </TouchableOpacity>
                <TouchableOpacity onPress={() => this.props.navigation.navigate('Login')}>
                    <Text style={styles.loginLink}>
                        Already have an account? <Text style={styles.loginText}>Login!</Text>
                    </Text>
                </TouchableOpacity>
            </View>
        )
    }
}

const styles = StyleSheet.create({
    input: {
      height: 40,
      width: 350,
      backgroundColor: 'rgba(255, 255, 255, 0.2)',
      marginBottom: 15,
      paddingHorizontal: 10,
      color: 'white',
      fontSize: 18,
      fontWeight: '500',
    },
    container: {
      flex: 1,
      backgroundColor: '#3498db',
      justifyContent: 'center',
      alignItems: 'center'
    },
    buttonContainer: {
        backgroundColor: '#2980b9',
        paddingVertical: 15,
        width: 300,
        marginTop: 20,
        marginHorizontal: 30,
        borderRadius: 4,
        height: 50,
        alignItems: 'center',
        justifyContent: 'center'
    },
    buttonText: {
      textAlign: 'center',
      color: '#FFFFFF',
      fontWeight: '700'
    },
    logoTitle: {
        color: '#FFF',
        marginTop: 40,
        fontSize: 20,
        width: 200,
        height: 40,
        textAlign: "center",
        justifyContent: 'center'
    },
    loginLink: {
        color: '#FFF',
        marginTop: 20,
        alignSelf: 'center'
    },
    loginText: {
        fontWeight: '500', 
        color: '#eb1543'
    }
})