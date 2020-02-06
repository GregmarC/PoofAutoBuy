import firebase from "firebase";

// Initialize Firebase
const firebaseConfig = {
    apiKey: "AIzaSyBt38C3g9Nq__uDZwrZ9_6rkADY0gWwDos",
    authDomain: "auto-purchaser.firebaseapp.com",
    databaseURL: "https://auto-purchaser.firebaseio.com",
    projectId: "auto-purchaser",
    storageBucket: "auto-purchaser.appspot.com",
    messagingSenderId: "228259051758",
    appId: "1:228259051758:web:a3acfea59c9d75b1e61bff",
    measurementId: "G-KGEN43H5FF"
  };
firebase.initializeApp(firebaseConfig);
const auth = firebase.auth();
const db = firebase.firestore();

//updates firestore settings
db.settings({ timestampsInSnapshots: true});


auth.onAuthStateChanged(user => {
    console.log("This is the current state of the user!: ", user)
});

const googleAuthProvider = new firebase.auth.GoogleAuthProvider();
const facebookAuthProvider = new firebase.auth.FacebookAuthProvider();
const githubAuthProvider = new firebase.auth.GithubAuthProvider();
const twitterAuthProvider = new firebase.auth.TwitterAuthProvider();

const database = firebase.database();

export {
  database,
  auth,
  googleAuthProvider,
  githubAuthProvider,
  facebookAuthProvider,
  twitterAuthProvider,
  db
};
