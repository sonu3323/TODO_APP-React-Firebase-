  import firebase from 'firebase';

  const firebaseApp = firebase.initializeApp({
    apiKey: "AIzaSyA9ctK53_vqMMEM4d2L71sGQIc338mvTcw",
    authDomain: "todo-app-react-2ec73.firebaseapp.com",
    databaseURL: "https://todo-app-react-2ec73.firebaseio.com",
    projectId: "todo-app-react-2ec73",
    storageBucket: "todo-app-react-2ec73.appspot.com",
    messagingSenderId: "521341313858",
    appId: "1:521341313858:web:e846ec88411018062e1edb",
    measurementId: "G-18TP9QXC56"
  });

  const db = firebaseApp.firestore();

  export {db};