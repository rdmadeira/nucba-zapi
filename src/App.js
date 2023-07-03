import React, { useEffect } from 'react';
// React-Query - new version (tan-stack):
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';

import { GlobalStyle } from './styles/GlobalStyle';
import { Navbar } from './components/navbar/Navbar';

// Custom hook:
import { useOpenFood } from './hooks/useOpenFood';

import { Order } from './components/orders/Order';
import { useDispatch } from 'react-redux';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import Checkout from './pages/Checkout';
import Login from './pages/Login';
import Resume from './pages/Resume';
import Orders from './pages/Orders';
import { auth, createUserProfileDocument } from './firebase/firebase-utils';
import * as userActions from './redux/user/user-actions';
import * as ordersActions from './redux/orders/ordersActions';

// Tanstack/ React-query:
const queryClient = new QueryClient();

function onAuthStateChange(callback, action, action2) {
  auth.onAuthStateChanged(async (userAuth) => {
    if (userAuth) {
      const userRef = await createUserProfileDocument(userAuth);
      userRef.onSnapshot((snapshot) => {
        callback(action({ id: snapshot.id, ...snapshot.data() }));
      });

      callback(action2(userAuth.auth.currentUser?.uid));
    } else {
      callback(action(null));
      callback(ordersActions.ordersInit());
    }
  });
}

function App() {
  const openedFood = useOpenFood();
  // const currentUser = useSelector((store) => store.user.currentUser);
  const dispatch = useDispatch();

  useEffect(() => {
    const unsubscribe = onAuthStateChange(
      dispatch,
      userActions.setCurrentuser,
      ordersActions.fetchOrders
    );

    return () => {
      unsubscribe();
    };
  }, [dispatch]);

  return (
    <QueryClientProvider client={queryClient}>
      <Router>
        <GlobalStyle />
        <Navbar />
        <Order />
        <Routes>
          <Route exact path="/" element={<Home openedFood={openedFood} />} />
          <Route path="/checkout" element={<Checkout />} />
          <Route path="/login" element={<Login />} />
          <Route exact path="/mis-ordenes" element={<Orders />} />
          <Route exact path="/mis-ordenes/:orderId" element={<Resume />} />
        </Routes>
      </Router>
      <ReactQueryDevtools initialIsOpen={false} panelPosition="right" />
    </QueryClientProvider>
  );
}

export default App;
