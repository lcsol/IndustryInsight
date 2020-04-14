import React from 'react';
import {
    View,
    Text,
    StyleSheet,
    TouchableOpacity,
    SafeAreaView,
    TextInput,
    Image,
    Button
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import Fire from '../API/Fire';
import * as ImagePicker from 'expo-image-picker';
import UserPermissions from '../utilities/UserPermissions';

export default class PostScreen extends React.Component {
    state = {
        text: ''
        // image: ''
    };

    componentDidMount() {
        UserPermissions.getCameraPermission();
    }

    // handlePost = () => {
    //   Fire.shared
    //     .addPost({ text: this.state.text.trim(), localUri: this.state.image})
    //     .then(ref => {
    //       this.setState({ text: '', image: '' });
    //       this.props.navigation.goBack();
    //     })
    //     .catch(error => {
    //       alert(error);
    //     });
    // };
    handlePost = () => {
        Fire.shared
            .addPost({ text: this.state.text.trim() })
            .then(ref => {
                this.setState({ text: '' });
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
                <View style={styles.inputContainer}>
                    <Image
                        source={require('../assets/images/robot-dev.png')}
                        style={styles.avatar}
                    />
                    <TextInput
                        autoFocus={true}
                        multiline={true}
                        numberOfLines={4}
                        style={{ flex: 1 }}
                        placeholder='Want to post something?'
                        onChangeText={text => this.setState({ text })}
                        value={this.state.text}
                    />
                </View>
                {/* <TouchableOpacity style={styles.photo} onPress={this.pickImage}>
                    <Ionicons name='md-camera' size={32} color='#D8D9DB' />
                </TouchableOpacity> */}
                {/* <View style={{ marginHorizontal: 32, marginTop: 32, height: 150 }}>
                    <Image
                        source={{ uri: this.state.image }}
                        style={{ width: '100%', height: '100%' }}
                    />
                </View> */}
                <View style={styles.footer}>
                    <TouchableOpacity onPress={this.handlePost.bind(this)}>
                        <Text style={{ height: 100, fontWeight: "500", color: 'blue' }}>Post</Text>
                    </TouchableOpacity>
                </View>
                <View>
                    <Button
                        buttonStyle={{backgroundColor:'red'}}
                        // onPress={this.handlePost.bind(this)}
                        title="Post"
                        // color="#3b9fff"
                        // accessibilityLabel="Learn more about this purple button"
                    />
                </View>
                
            </SafeAreaView>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#413c69'
    },
    header: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        paddingHorizontal: 32,
        paddingVertical: 12,
        borderBottomWidth: 1,
        borderBottomColor: '#D8D9DB'
    },
    footer: {
        flexDirection: 'row',
        justifyContent: "center",
        paddingHorizontal: 32,
        paddingVertical: 12
    },
    inputContainer: {
        margin: 10,
        height: 200,
        flexDirection: 'row',
        backgroundColor: "whitesmoke"
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
    },
    Button:{
        marginRight:40,
        marginLeft:40,
        marginTop:10,
        paddingTop:10,
        paddingBottom:10,
        backgroundColor:'#3b9fff',
        borderRadius:10,
        borderWidth: 1,
        borderColor: '#fff'
    }
});
