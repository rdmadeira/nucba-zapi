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

  const userRef = firestore.doc(`users/${userAuth.uid}`);
  const snapshot = await userRef.get();
  console.log(snapshot);

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
  const orderRef = firestore.doc(`orders/${order.id}`); // se no existe el documento en datos de firebase, la crea
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
  const orderRef = await firestore // crea una promesa
    .collection('orders')
    .where('userId', '==', userId) // funcion que crea una condicion para los collections pedidos, en este caso, un filtro de ordenes de este user
    .orderBy('createdAt', 'desc'); // funcion que ordena por el parametro pasado, y por crescente o decrescente. Hay que crear indice en firebase para esto funcionar.
  // El createdAt, pasado a este metodo debe estar especificado en el indice y habilitado. La habilitacion lleva un tiempo.

  let orders = await orderRef // como es una promesa, pone el await.
    .get() // Crea otra promesa, con el then retornando la respuesta - https://firebase.google.com/docs/firestore/query-data/get-data?hl=es-419#web-version-8_6
    // Habria que actualizar los metodos a la version modular v9 de firebase. Estoy usando todavía la version compat de v9
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
