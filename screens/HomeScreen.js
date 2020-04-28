import React from 'react';
import { View, Text, StyleSheet, ScrollView, FlatList, TouchableWithoutFeedback, ActivityIndicator, Image } from 'react-native';
import { Avatar } from 'react-native-elements'
import { Ionicons } from '@expo/vector-icons';
import * as firebase from 'firebase'
import Fire from '../API/Fire'
// import DetailsScreen from '../screens/DetailsScreen';

export default class HomeScreen extends React.Component {
	constructor(props) {
		super(props);
		this.ref = firebase.firestore().collection('posts');
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
				timestamp: doc.data().timestamp,
        avatar: this.state.user.avatar,
        type: doc.data().type,
        date: doc.data().date,
        time: doc.data().time,
        groupSize: doc.data().groupSize,
        location: doc.data().location,
        description: doc.data().description,
			});
		});
		this.setState({
			loading: false,
			posts: cur
		});
	}


	renderPost = post => {
		return (
			<TouchableWithoutFeedback onPress={() => {this.props.navigation.navigate('Details')}}>
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
				{/* <Image source={post.avatar} style={styles.avatar} /> */}
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

					<Text style={styles.post}>{post.type}</Text>
          <Text style={styles.post}>{post.date}</Text>
          <Text style={styles.post}>{post.time}</Text>

					{/* <View style={{ flexDirection: 'row' }}>
						<Ionicons name='ios-chatboxes' size={24} color='#73788b' />
					</View> */}
				</View>
			</View>
			</TouchableWithoutFeedback>

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
		// width: undefined,
		height: 150,
		borderRadius: 5,
		marginVertical: 16
	}
});

