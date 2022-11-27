// Con el uso de Redux no hace falta este hook, se usa la orden del store Global

import { useState } from 'react';

export const useOrders = () => {
  const [orders, setOrders] = useState([]);
  return { orders, setOrders };
};
