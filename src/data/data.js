// Funcion formatear moneda AR$
export const formatPriceARS = (price) => {
  return new Intl.NumberFormat('es-AR', {
    style: 'currency',
    currency: 'ARS',
  }).format(price);
};

export const foodItems = [
  {
    id: 1,
    name: 'Pizza Tranca',
    img: '/img/pizza1.jpg',
    section: 'Pizzas',
    description:
      'Pizza casera a la piedra, muzzarella, jamón, morrón asado, huevo.',
    price: 100,
  },
  {
    id: 2,
    name: 'Pizza Mix',
    img: '/img/pizza2.jpg',
    section: 'Pizzas',
    description:
      'Pizza casera a la piedra, muzzarella, jamón, morrón asado, huevo.',
    price: 100,
  },
  {
    id: 3,
    name: 'Vatapa Bomba',
    img: '/img/vatapa1.jpg',
    section: 'Bahiana',
    description:
      'Se elabora con pan o harina, jengibre, pimenta-malagueta, castaña de caju, leche de coco, azeite-de-dendê y cebolla.',
    price: 1000,
  },
  {
    id: 4,
    name: 'Caruru Verdão',
    img: '/img/caruru1.jpg',
    section: 'Bahiana',
    description:
      'Se prepara con quiabo, una verdura que se cree procede de África, cebolla, camarones frescos y secos, aceite de palma (azeite de dendê), castanha-de-caju tostados y molidos y cacahuetes tostados sin cáscara y molidos.',
    price: 1000,
  },
  {
    id: 5,
    name: 'Acará du Bom',
    img: '/img/acaraje1.jpg',
    section: 'Bahiana',
    description:
      'Bollo elaborado con una masa de feijão fradinho y camarones, frito en aceite de dende.',
    price: 800,
  },
  {
    id: 6,
    name: 'Burger Zarpada',
    img: '/img/burger1.jpg',
    section: 'Burgers',
    description:
      'Hamburguesa de asado de 180g, mostaza dulce, cebolla caramelizada, cheddar, aros de cebolla, papas fritas.',
    price: 100,
  },
  {
    id: 7,
    name: 'Sambuchito Verme',
    img: '/img/sanbu1.jpg',
    section: 'Sanguches',
    description:
      'Sándwich de milanesa carne o pollo lechuga, tomate, jamón, queso, huevo frito; con papas fritas.',
    price: 100,
  },
  {
    id: 8,
    name: 'Sambuchito Loucão',
    img: '/img/sanbu2.jpg',
    section: 'Sanguches',
    description:
      'Sándwich de bife de chorizo, lechuga, tomate, jamón, queso, huevo frito; con papas fritas.',
    price: 100,
  },
  {
    id: 9,
    name: 'Sambuchito Bomba',
    img: '/img/sanbu1.jpg',
    section: 'Sanguches',
    description:
      'Sándwich de entraña, lechuga, tomate, jamón, queso, 3 huevo frito; con papas fritas.',
    price: 1000,
  },
  {
    id: 10,
    name: 'Burger Zarpada Prime',
    img: '/img/burger1.jpg',
    section: 'Burgers',
    description:
      'Hamburguesa de asado de 220g, mostaza dulce, bacon, cebolla caramelizada, 3 cheddars, aros de cebolla, papas fritas.',
    price: 100,
  },
];

export const arraySections = [
  {
    section: 'Bahiana',
    imgTag: 'img/tag_bahiana.jpeg',
  },

  {
    section: 'Pizzas',
    imgTag: 'img/tag_pizza.jpeg',
  },

  {
    section: 'Burgers',
    imgTag: 'img/tag_burger.jpeg',
  },

  {
    section: 'Sambuchitos',
    imgTag: 'img/tag_sambu.jpeg',
  },
];

export const Foods = foodItems.reduce((res, food) => {
  if (!res[food.section]) {
    res[food.section] = [];
  }

  res[food.section] = [...res[food.section], food];

  return res;
}, {});
