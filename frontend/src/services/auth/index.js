import firebase from "firebase/app";

const firebaseConfig = {
  apiKey: "AIzaSyAaBPn-M_5S70oKQ0JRNrd5rFYT1DFEH1A",
  authDomain: "async-press.firebaseapp.com",
  databaseURL: "https://async-press.firebaseio.com",
  projectId: "async-press",
  storageBucket: "async-press.appspot.com",
  messagingSenderId: "562877451451",
  appId: "1:562877451451:web:8f2d96dd96d7f31ce16d9e",
  measurementId: "G-KZQRP0EN9J",
};

export const fbInit = () => {
  if (!firebase.apps.length) {
    firebase.initializeApp(firebaseConfig);
  }
};

export const isAuthenticated = () => firebase.auth().currentUser;
