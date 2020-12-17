// Initialize Firebase
// Your web app's Firebase configuration

const firebaseConfig = {
  apiKey: "AIzaSyCTcd-6_9VTMGjTVkrEKmNEaD86B9KC_bY",
  authDomain: "oneline-20c22.firebaseapp.com",
  databaseURL: "https://oneline-20c22-default-rtdb.europe-west1.firebasedatabase.app",
  projectId: "oneline-20c22",
  storageBucket: "oneline-20c22.appspot.com",
  messagingSenderId: "28929948729",
  appId: "1:28929948729:web:848e0b83010aa1945c21e8"
};
// Initialize Firebase
firebase.initializeApp(firebaseConfig);

// NE PAS OUBLIER DE CONFIGURER FIREBASE AUTH TO ANONYMOUS !!!

// SIGN ANONYMOUS USER ----
firebase.auth().onAuthStateChanged((user) => {
  console.log("onAuthStateChanged");
  if (user) {
    // console.log(user);
    // User is signed in.
    let isAnonymous = user.isAnonymous;
    let uid = user.uid;
    // console.log(uid);
  } else {
    // No user is signed in.
  }
});

firebase
  .auth()
  .signInAnonymously()
  .catch((error) => {
    // Handle Errors here.
    let errorCode = error.code;
    let errorMessage = error.message;
    console.log("anonymously auth error ----- " + errorCode);
    console.log(errorCode);
  });

const DATABASE = firebase.database();

//les deux choses en majuscule c'est important de savoir
//SEND_MESSAGE("Soso_Pong", {"x":234,"sx":343,"xy":-8:})