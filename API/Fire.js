import config from '../config';
import firebase from 'firebase';
require('firebase/firestore');

class Fire {
  constructor() {
    firebase.initializeApp(config.firebaseConfig);
  }

  addPost = async ({ text, localUri }) => {
    const remoteUri = await this.uploadPhotoAsync(
      localUri,
      `photos/${this.uid}/${Date.now()}`
    );

    return new Promise((res, rej) => {
      this.firestore
        .collection('posts')
        .add({
          text,
          uid: this.uid,
          timestamp: this.timestamp,
          image: remoteUri
        })
        .then(ref => {
          res(ref);
        })
        .catch(error => {
          rej(error);
        });
    });
  };

  uploadPhotoAsync = async (uri, filename) => {
    return new Promise(async (res, rej) => {
      const response = await fetch(uri);
      const file = await response.blob();

      let upload = firebase
        .storage()
        .ref(filename)
        .put(file);

      upload.on(
        'state_changed',
        snapshot => {},
        err => {
          rej(err);
        },
        async () => {
          const url = await upload.snapshot.ref.getDownloadURL();
          res(url);
        }
      );
    });
  };

  // getPosts = async (postRetreived) => {
  //   var posts = []
  //   var snapshot = await firebase.firestore().collection('posts').get()
  //   snapshot.forEach((doc) => {
  //     // posts.push(doc.data())
  //     const { cur_image, cur_text, cur_timestamp, cur_uid  } = doc.data();
  //         posts.push({
  //           id: doc.id,
  //           name: 'Joe McKay',
  //           text: cur_text,
  //           timestamp: cur_timestamp,
  //           avatar: require('../assets/tempAvatar.jpg'),
  //           image: cur_image
  //         });
  //   })
  //   postRetreived(posts)
  // }

  // createUser = async user => {
  //   let remoteUri = null;
  //
  //   try {
  //     await firebase
  //       .auth()
  //       .createUserWithEmailAndPassword(user.email, user.password);
  //
  //     let db = this.firestore.collection('users').doc(this.uid);
  //
  //     db.set({
  //       name: user.name,
  //       email: user.email,
  //       avatar: null
  //     });
  //
  //     if (user.avatar) {
  //       remoteUri = await this.uploadPhotoAsync(
  //         user.avatar,
  //         `avatars/${this.uid}`
  //       );
  //
  //       db.set({ avatar: remoteUri }, { merge: true });
  //     }
  //   } catch (error) {
  //     alert('Error: ', error);
  //   }
  // };

  signOut = () => {
    firebase.auth().signOut();
  };

  get firestore() {
    return firebase.firestore();
  }

  get uid() {
    return (firebase.auth().currentUser || {}).uid;
  }

  get timestamp() {
    return Date.now();
  }
}

Fire.shared = new Fire();
export default Fire;
