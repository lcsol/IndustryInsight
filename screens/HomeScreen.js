import React from 'react';
import { View, Text, StyleSheet, ScrollView, FlatList, ActivityIndicator, Image } from 'react-native';
import { Avatar } from 'react-native-elements'
import { Ionicons } from '@expo/vector-icons';
import * as firebase from 'firebase'
import Fire from '../API/Fire'

export default class HomeScreen extends React.Component {
	constructor(props) {
		super(props);
		this.ref = firebase.firestore().collection('globalPosts');
		this.unsubscribe = null;
		this.state = {
			user: {},
			loading: true,
			posts: []
		};
	}

	data = null;

	componentDidMount() {
		this.unsubscribe = this.ref.onSnapshot(this.onCollectionUpdate);
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

	onCollectionUpdate = (querySnapshot) => {
		let cur = [];
		querySnapshot.forEach((doc) => {
			cur.push({
				id: doc.id,
				name: this.state.user.name,
				text: doc.data().text,
				timestamp: doc.data().timestamp,
				avatar: require('../images/IILogo.png'),
				// image: doc.data().image
			});
		});
		this.setState({
			loading: false,
			posts: cur
		});
	}


	renderPost = post => {
		return (
			<View style={styles.feedItem}>
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
				<View style={{ flex: 1 }}>
					{/* <Text>{post.name}</Text> */}
					<View
						style={{
							flexDirection: 'row',
							justifyContent: 'space-between',
							alignItems: 'center'
						}}
					>
					</View>

					<Text style={styles.post}>{post.text}</Text>
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
	feed: {
		marginHorizontal: 16
	},
	feedItem: {
		backgroundColor: 'whitesmoke',
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
		marginTop: 3,
		fontSize: 14,
		color: 'black'
	},
	postImage: {
		width: undefined,
		height: 150,
		borderRadius: 5,
		marginVertical: 16
	}
});

