import firebase from 'firebase/compat/app';
import 'firebase/compat/auth';
import 'firebase/compat/firestore';

const firebaseConfig = {
  apiKey: 'AIzaSyBfxqdmuOZgoHjXyZktUL0RDKWwTHgifHo',
  authDomain: 'nucba-zapi-rdmadeira.firebaseapp.com',
  projectId: 'nucba-zapi-rdmadeira',
  storageBucket: 'nucba-zapi-rdmadeira.appspot.com',
  messagingSenderId: '506080692779',
  appId: '1:506080692779:web:e3b110d34bab43f03df86e',
};

export const createUserProfileDocument = async (userAuth, additionalData) => {
  if (!userAuth) return;

  const userRef = firestore.doc(`users/${userAuth.id}`);
  const snapshot = await userRef.get();
  console.log(additionalData);

  if (!snapshot.exists) {
    const { displayName, email } = userAuth;
    const createdAt = new Date();

    try {
      await userRef.set({
        displayName,
        email,
        createdAt,
        ...additionalData,
      });
    } catch (error) {
      console.log('Error creating user', error.message);
    }
  }
  return userRef;
};

export const createOrderDocument = async (order) => {
  if (!order) return;
  const orderRef = firestore.doc(`orders/${order.id}`);
  const snapshot = await orderRef.get();
  if (!snapshot.exists) {
    const createdAt = new Date();

    try {
      await orderRef.set({
        userId: order.userId,
        shippingDetails: {
          ...order.shippingDetails,
        },
        items: [...order.items],
        shippingPrice: order.shippingPrice,
        subtotal: order.subtotal,
        total: order.total,
        status: 'pendiente',
        createdAt,
      });
    } catch (error) {
      console.log('Error creating order', error.message);
    }
  }
  return orderRef;
};

export const getOrders = async (userId) => {
  const orderRef = await firestore
    .collection('orders')
    .where('userId', '==', userId)
    .orderBy('createdAt', 'desc');

  let orders = await orderRef
    .get()
    .then(function (querySnapshot) {
      let orders = [];
      querySnapshot.forEach(function (doc) {
        orders = [...orders, { id: doc.id, ...doc.data() }];
      });
      return orders;
    })
    .catch(function (error) {
      console.log('Error getting documents: ', error);
    });

  return orders;
};

firebase.initializeApp(firebaseConfig);

export const auth = firebase.auth();
export const firestore = firebase.firestore();

const provider = new firebase.auth.GoogleAuthProvider();

export const signInWithGoogle = () => auth.signInWithPopup(provider);
