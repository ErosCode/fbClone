import firebase from 'firebase'

const firebaseConfig = {
    apiKey: "AIzaSyDTUldi4J1d4B3Od8zE8CDafyAGvMnnrKM",
    authDomain: "fb-clone-c13c8.firebaseapp.com",
    databaseURL: "https://fb-clone-c13c8.firebaseio.com",
    projectId: "fb-clone-c13c8",
    storageBucket: "fb-clone-c13c8.appspot.com",
    messagingSenderId: "431932635681",
    appId: "1:431932635681:web:f74bc6a646a25f57d54160"
  };

const firebaseApp = firebase.initializeApp(firebaseConfig)

const auth = firebase.auth()
const provider = new firebase.auth.GoogleAuthProvider()
const db = firebase.firestore()

export { auth, provider }
export default db