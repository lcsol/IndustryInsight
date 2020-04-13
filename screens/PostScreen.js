import React from 'react';
import {
    View,
    Text,
    StyleSheet,
    TouchableOpacity,
    TextInput,
    Image
} from 'react-native';
import { Avatar, Button } from 'react-native-elements'
import { Ionicons } from '@expo/vector-icons';
import Fire from '../API/Fire';
import * as ImagePicker from 'expo-image-picker';
import UserPermissions from '../utilities/UserPermissions';

export default class PostScreen extends React.Component {
    state = {
        user: {},
        text: '',
        // image: ''
    };
    
    data = null;

    componentDidMount() {
        UserPermissions.getCameraPermission();
        const user = this.props.uid || Fire.shared.uid;

        this.data = Fire.shared.firestore
			.collection('users')
			.doc(user)
			.onSnapshot(doc => {
				this.setState({ user: doc.data() })

			});
    }

    componentWillUnmount() {
        this.data();
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

    // pickImage = async () => {
    //     let result = await ImagePicker.launchImageLibraryAsync({
    //         mediaTypes: ImagePicker.MediaTypeOptions.Images,
    //         allowsEditing: true,
    //         aspect: [4, 3]
    //     });

    //     if (!result.cancelled) {
    //         this.setState({ image: result.uri });
    //     }
    // };


    render() {
        return (
            <View style={styles.container}>
                <View style={styles.inputContainer}>
                    <Avatar
                        size="medium"
                        rounded
                        style={styles.avatar}
                        source={
                            this.state.user.avatar
                                ? { uri: this.state.user.avatar }
                                : require("../assets/images/robot-dev.png")
                        }
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
                {/* attching picture with post */}
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
                    {/* <TouchableOpacity onPress={this.handlePost.bind(this)}>
                        <Text style={{ height: 100, fontWeight: "500", color: 'blue' }}>Post</Text>
                    </TouchableOpacity> */}
                    <Button title="Post" onPress={this.handlePost.bind(this)}/>
                </View>
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
        flexDirection: 'row',
        justifyContent: 'space-between',
        paddingHorizontal: 32,
        paddingVertical: 12,
        borderBottomWidth: 1,
        borderBottomColor: '#D8D9DB'
    },
    footer: {
        // flexDirection: 'row',
        // justifyContent: "center",
        paddingHorizontal: 175,
        // paddingVertical: 0
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
        marginRight: 15,
        marginLeft: 5,
        marginTop: 5
    },
    photo: {
        alignItems: 'flex-end',
        marginHorizontal: 32
    }
});
