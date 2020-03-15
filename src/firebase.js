import firebase from "firebase"

const firebaseConfig = {
    apiKey: "AIzaSyC9b2ljxk-omeIWR3bDOFvkRsLuYnxzoNk",
    authDomain: "minesweeper-7c394.firebaseapp.com",
    databaseURL: "https://minesweeper-7c394.firebaseio.com",
    projectId: "minesweeper-7c394",
    storageBucket: "minesweeper-7c394.appspot.com",
    messagingSenderId: "168745128025",
    appId: "1:168745128025:web:91b428db1db811585be148"
};

// Initialize Firebase
firebase.initializeApp(firebaseConfig);
export default firebase