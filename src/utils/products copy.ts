const products = [
  {
    id: 1,
    serialNumber: 1234,
    isNew: 1,
    photo: 'monitor-example.jpg',
    title: 'Product 1',
    type: 'Мониторы',
    specification: 'Specification 1',
    guarantee: {
      start: '2017-06-29 12:09:33',
      end: '2017-06-29 12:09:33'
    },
    price: [
      {value: 100, symbol: 'USD', isDefault: 0},
      {value: 4200, symbol: 'UAH', isDefault: 1}
    ],
    order: 1,
    date: '2017-06-29 12:09:33'
  },
  {
    id: 2,
    serialNumber: 3321,
    isNew: 0,
    photo: '/pathToFile.jpg',
    title: 'Product 2',
    type: 'Планшеты',
    specification: 'Specification 1',
    guarantee: {
      start: '2017-06-29 12:09:33',
      end: '2017-06-29 12:09:33'
    },
    price: [
      {value: 600, symbol: 'USD', isDefault: 0},
      {value: 25200, symbol: 'UAH', isDefault: 1}
    ],
    order: 1,
    date: '2017-06-29 12:09:33'
  },
  {
    id: 3,
    serialNumber: 4132,
    isNew: 1,
    photo: '/pathToFile.jpg',
    title: 'Product 3',
    type: 'Ноутбуки',
    specification: 'Specification 1',
    guarantee: {
      start: '2017-06-29 12:09:33',
      end: '2017-06-29 12:09:33'
    },
    price: [
      {value: 1100, symbol: 'USD', isDefault: 0},
      {value: 46200, symbol: 'UAH', isDefault: 1}
    ],
    order: 2,
    date: '2017-06-29 12:09:33'
  },
  {
    id: 4,
    serialNumber: 3312,
    isNew: 0,
    photo: '/pathToFile.jpg',
    title: 'Product 4',
    type: 'Планшеты',
    specification: 'Specification 1',
    guarantee: {
      start: '2017-06-29 12:09:33',
      end: '2017-06-29 12:09:33'
    },
    price: [
      {value: 500, symbol: 'USD', isDefault: 0},
      {value: 21000, symbol: 'UAH', isDefault: 1}
    ],
    order: 2,
    date: '2017-06-29 12:09:33'
  },
  {
    id: 5,
    serialNumber: 5422,
    isNew: 1,
    photo: '/pathToFile.jpg',
    title: 'Product 5',
    type: 'Мониторы',
    specification: 'Specification 1',
    guarantee: {
      start: '2017-06-29 12:09:33',
      end: '2017-06-29 12:09:33'
    },
    price: [
      {value: 150, symbol: 'USD', isDefault: 0},
      {value: 6300, symbol: 'UAH', isDefault: 1}
    ],
    order: 3,
    date: '2017-06-29 12:09:33'
  },
  {
    id: 6,
    serialNumber: 7454,
    isNew: 1,
    photo: '/pathToFile.jpg',
    title: 'Product 6',
    type: 'Ноутбуки',
    specification: 'Specification 1',
    guarantee: {
      start: '2017-06-29 12:09:33',
      end: '2017-06-29 12:09:33'
    },
    price: [
      {value: 800, symbol: 'USD', isDefault: 0},
      {value: 33600, symbol: 'UAH', isDefault: 1}
    ],
    order: 3,
    date: '2017-06-29 12:09:33'
  },
  {
    id: 7,
    serialNumber: 4311,
    isNew: 0,
    photo: '/pathToFile.jpg',
    title: 'Product 7',
    type: 'Ноутбуки',
    specification: 'Specification 1',
    guarantee: {
      start: '2017-06-29 12:09:33',
      end: '2017-06-29 12:09:33'
    },
    price: [
      {value: 920, symbol: 'USD', isDefault: 0},
      {value: 38640, symbol: 'UAH', isDefault: 1}
    ],
    order: 3,
    date: '2017-06-29 12:09:33'
  }
]

export default products;
