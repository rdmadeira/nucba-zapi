/* import { initializeApp } from 'firebase/app';
import { getFirestore, collection, getDocs } from 'firebase/firestore/lite'; */
import firebase from 'firebase';

/* ERROR in ./src/firebase/firebase-utils.js 5:0-32
Module not found: Error: Package path . is not exported from package C:\Users\Administrador\Desktop\WebDesigner\Nucba-zapi\nucba-zapi\node_modules\firebase (see exports field in C:\Users\Administrador\Desktop\WebDesigner\Nucba-zapi\nucba-zapi\node_modules\firebase\package.json) */
import 'firebase/firestore'; // revisar documentacion nueva
import 'firebase/auth'; // revisar documentacion nueva

const firebaseConfig = {
  apiKey: 'AIzaSyBfxqdmuOZgoHjXyZktUL0RDKWwTHgifHo',
  authDomain: 'nucba-zapi-rdmadeira.firebaseapp.com',
  projectId: 'nucba-zapi-rdmadeira',
  storageBucket: 'nucba-zapi-rdmadeira.appspot.com',
  messagingSenderId: '506080692779',
  appId: '1:506080692779:web:e3b110d34bab43f03df86e',
};

/* const app = initializeApp(firebaseConfig);
const db = getFirestore(app); */

export const createUserProfileDocument = async (userAuth, additionalData) => {
  if (!userAuth) return;
  const userBase = firebase.get();
  const userSnapshot = await userBase.get();

  if (!userSnapshot.exists) {
    const { displayname, email } = userAuth;
    const createdAt = new Date();

    try {
      userBase.set({
        displayname,
        email,
        createdAt,
        ...additionalData,
      });
    } catch (error) {
      console.log('Error al crear usuario', error.message);
    }
    return userBase;
  }
};

export const auth = firebase.auth();
const firestore = firebase.firestore();
const provider = new firebase.auth.GoogleAuthProvider();

export const signInWithGoogle = () => auth.signInWithPopUp(provider);
