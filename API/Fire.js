// import cloudFirebase from '../config'
// firebase.initializeApp(firebaseConfig);
// firebase.analytics();


// //   // Initialize Firebase
// //   firebase.initializeApp(firebaseConfig);
// //   firebase.analytics();

// var firebaseKey = {
//     apiKey: "AIzaSyA_Qq01jVGZsKkUapBqY69JDtMGaD5RwRE",
//     authDomain: "industryinsight-42a3b.firebaseapp.com",
//     databaseURL: "https://industryinsight-42a3b.firebaseio.com",
//     projectId: "industryinsight-42a3b",
//     storageBucket: "industryinsight-42a3b.appspot.com",
//     messagingSenderId: "488958617767",
//     appId: "1:488958617767:web:64a0ef004e66b09d735382",
//     measurementId: "G-46RE2FLM3H"
// };

// class Fire {
//     constructor() {
//         if (!firebase.app.length) {
//             firebase.initializeApp(firebaseConfig)
//         }
//     }
// }


// class Fire {
//     constructor() {
//         if (!firebase.apps.length) {
//             firebase.initializeApp(firebaseKey);
//         }
//     }

//     addPost = async ({ text }) => {
//         return new Promise((res, rej) => {
//             this.firestore
//                 .collection("posts")
//                 .add({
//                     text,
//                     uid: this.uid,
//                     timestamp: this.timestamp
//                 })
//                 .then(ref => {
//                     res(ref)
//                 })
//                 .catch(error => {
//                     rej(error)
//                 });
//         });
//     };

//     get firestore() {
//         return firebase.firestore()
//     }

//     get uid() {
//         return (firebase.auth().currentUser || {}).uid
//     }

//     get timestamp() {
//         return Date.now()
//     }

// }

// Fire.shared = new Fire();
// export default Fire;

