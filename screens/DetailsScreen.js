import React from 'react';
import {
    View,
    Text,
    StyleSheet
} from 'react-native';
import { Button } from 'react-native-elements'
import Fire from '../API/Fire';
import UserPermissions from '../utilities/UserPermissions';



export default class DetailsScreen extends React.Component {
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


    render() {
        return (
            <View style={styles.container}>
                <View style={styles.inputContainer}>
                    <Text>
                        Want to post something?'
                    </Text>
                    <Text>
                        Want to post something?'
                    </Text>
                    <Text>
                        Want to post something?'
                    </Text>
                </View>
                <View style={styles.footer}>
                    {/* <TouchableOpacity onPress={this.handlePost.bind(this)}>
                        <Text style={{ height: 100, fontWeight: "500", color: 'blue' }}>Post</Text>
                    </TouchableOpacity> */}
                    <Button title="Accept Mock Interview"/>
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
