import React from 'react'
import { View, Text, StyleSheet, TouchableOpacity, TextInput, ActivityIndicator } from 'react-native'
import * as firebase from 'firebase'

export default class RegisterScreen extends React.Component {
    constructor(props) {
        super(props);
        this.state = { name: '', email: '', password: '', error: '', loading: false };
    }

    // sends user data to firebase and saves it
    handleSignUp = async () => {
        this.setState({ error: '', loading: true });
        const { name, email, password } = this.state;
        this.setState({ name: '', email: '', password: '' })
        firebase.auth().createUserWithEmailAndPassword(email, password)
            .then(userCredentials => {
                userCredentials.user.updateProfile({ displayName: this.state.name });
                this.setState({ error: '', loading: true });
                this.props.navigation.navigate('Login');
                console.log('user successfully signed up!');
            })
            .catch(() => {
                this.setState({ name: name, email: email, password: password, error: 'Authentication failed!', loading: false });
            })
    }

    // method to display either buttons or activity indicator
    renderButtonOrLoading() {
        if (this.state.loading) {
            return <ActivityIndicator size="large" color="#0000ff" />
        } else if (this.state.error === 'Authentication failed!') {
            this.state.error = '';
            this.state.loading = false;
            Alert.alert(
                'Sign Up Failure',
                'Sign up failed due to invalid fields',
                [
                    { text: 'OK', onPress: () => console.log('OK Pressed') },
                ],
                { cancelable: false },
            );
        }
        return <View>
            <TouchableOpacity style={styles.buttonContainer} onPress={this.handleSignUp.bind(this)}>
                <Text style={styles.buttonText}>Sign Up</Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={() => this.props.navigation.navigate('Login')}>
                <Text style={styles.loginLink}>
                    Already have an account? <Text style={styles.loginText}>Login!</Text>
                </Text>
            </TouchableOpacity>
        </View>
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
                    placeholder='Name'
                    autoCapitalize="none"
                    placeholderTextColor='rgba(255, 255, 255, 0.7)'
                    returnKeyType="next"
                    onChangeText={name => this.setState({ name })}
                    value={this.state.name}
                />
                <TextInput
                    style={styles.input}
                    placeholder='Email'
                    autoCapitalize="none"
                    keyboardType='email-address'
                    returnKeyType="next"
                    placeholderTextColor='rgba(255, 255, 255, 0.7)'
                    onChangeText={email => this.setState({ email })}
                    value={this.state.email}
                />
                <TextInput
                    style={styles.input}
                    placeholder='Password'
                    secureTextEntry={true}
                    autoCapitalize="none"
                    returnKeyType="next"
                    placeholderTextColor='rgba(255, 255, 255, 0.7)'
                    onChangeText={password => this.setState({ password })}
                    value={this.state.password}
                />
                {this.renderButtonOrLoading()}
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