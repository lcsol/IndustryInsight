import * as React from 'react';
import { View, StyleSheet, Image } from 'react-native';
import { Avatar, Text, Button } from 'react-native-elements'
// import { ScrollView } from 'react-native-gesture-handler';
import Fire from '../API/Fire'
import UserPermissions from '../utilities/UserPermissions'
import * as ImagePicker from 'expo-image-picker'



export default class ProfileScreen extends React.Component {
	state = {
		user: {}

	};

	unsubscribe = null;

	componentDidMount() {
		const user = this.props.uid || Fire.shared.uid;
		// console.log(user);

		this.unsubscribe = Fire.shared.firestore
			.collection('users')
			.doc(user)
			.onSnapshot(doc => {
				this.setState({ user: doc.data() })

			});

	}

	componentWillUnmount() {
		this.unsubscribe();
	}

	handlePickAvatar = async () => {
        UserPermissions.getCameraPermission();

        let result = await ImagePicker.launchImageLibraryAsync({
            mediaTypes: ImagePicker.MediaTypeOptions.Images,
            allowsEditing: true,
            aspect: [4, 3]
        });

        if (!result.cancelled) {
			// this.setState({ user : { ...this.state.user, avatar: result.uri } });
			Fire.shared.updateProfilePicture(result.uri);
			console.log("updated profile");
        }
	};
	
	render() {
		return (
			<View style={styles.container}>
				<View style={{ marginTop: 64, alignItems: "center" }}>
					<View style={styles.avatarContainer}>
						<Avatar
							// style={styles.avatar}
							size="xlarge"
							rounded
							source={
								this.state.user.avatar
									? { uri: this.state.user.avatar }
									: require("../assets/images/robot-dev.png")
							}
							showEditButton
							onEditPress={this.handlePickAvatar}
						/>
					</View>
					<Text style={styles.info}>{this.state.user.name}</Text>
					<Text style={styles.text}>{this.state.user.email}</Text>
					<Text style={styles.text}>Token: 50</Text>

				</View>
				<Button style={{marginTop: 10}} title="Logout" onPress={() => {
					Fire.shared.signOut();
					this.props.navigation.popToTop();
				}} />

				<View style={styles.bodyContent}>
					<Text style={styles.text}>Users Posts</Text>
				</View>

			</View>

		);
	}

}

const styles = StyleSheet.create({
	container: {
		flex: 1,
		backgroundColor: "#413c69"
	},
	avatarContainer: {
		shadowColor: "#151734",
		shadowRadius: 15,
		shadowOpacity: 0.4,
		justifyContent: "center"
	},
	avatar: {
		width: 136,
		height: 136,
		borderRadius: 50,
	},
	info: {
		marginTop: 10,
		fontSize: 16,
		fontWeight: "600",
		color: "white"
	},
	text: {
		color: "white",
	},
	bodyContent: {
		marginTop: 12,
		borderColor: "black",
		borderWidth: 2,
		height: "53%",
	}

});


// if (!firebase.app.length) {
//   firebase.initializeApp(config.firebaseConfig);
// }

// function ProfileScreen({ navigation }) {
//   return (
//     <View style={styles.container}>
//       <View style={styles.header}> 
//         <Image style={styles.avatar}
//           source={{ uri: 'https://bootdey.com/img/Content/avatar/avatar6.png' }} />
//       </View>
//       <View style={styles.body}>
//         {/* <View style={styles.bodyContent}> */}
//           <Text style={styles.name}>John Doe </Text>
//           <Text style={styles.userInfo}>UX Designer / Mobile developer</Text>
//           <Text style={styles.userInfo}>jhonnydoe@mail.com </Text>
//           <Text style={styles.userInfo}>50 Tokens</Text>
//           <Button style={styles.button}
// 			title="Logout" onPress={() => {
// 				if (firebase.auth().signOut()) {
// 					console.log("signed out!");
// 					navigation.navigate("Login");
// 				}
// 			} } />
//           {/* </View> */}
//       </View>
//     </View>

//   );
// }

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     backgroundColor: "whitesmoke"
//   },
//   header: {
//     backgroundColor: "#a8d3da",
//     height: 200
//   },
//   headerContent: {
//     padding: 30,
//     alignItems: 'center',
//   },
//   avatar: {
//     width: 130,
//     height: 130,
//     borderRadius: 63,
//     borderWidth: 4,
//     borderColor: "white",
//     marginBottom: 10,
//     alignSelf: 'center',
//     position: 'absolute',
//     marginTop: 130
//   },
//   name: {
//     fontSize: 22,
//     color: "#000000",
//     fontWeight: '600',
//   },
//   userInfo: {
//     fontSize: 16,
//     color: "black",
//     fontWeight: '600',
//   },

//   body: {
//     marginTop: 70,
//     alignItems: 'center'
//   },
//   bodyContent: {
//     flex: 1,
//     alignItems: 'center',
//     justifyContent: 'center',
//     padding: 30,
//   },
//   item: {
//     flexDirection: 'row',
//   },
//   infoContent: {
//     flex: 1,
//     alignItems: 'flex-start',
//     paddingLeft: 5
//   },
//   iconContent: {
//     flex: 1,
//     alignItems: 'flex-end',
//     paddingRight: 5,
//   },
//   icon: {
//     width: 30,
//     height: 30,
//     marginTop: 20,
//   },
//   info: {
//     fontSize: 18,
//     marginTop: 20,
//     color: "#FFFFFF",
//   },
//   button: {
//     borderRadius: 0,
//     paddingTop: 20,
//     paddingLeft: 40,
//     paddingRight: 40,
//     marginLeft: 0,
//     marginRight: 0,
//     marginBottom: 0
//   }
// });

// export default ProfileScreen;