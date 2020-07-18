  import firebase from 'firebase';

  const firebaseApp = firebase.initializeApp({
   //Your firebase config files
  });

  const db = firebaseApp.firestore();

  export {db};
