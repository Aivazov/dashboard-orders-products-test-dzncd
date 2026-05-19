export interface Price {
  symbol: string;
  value: number;
}

export interface Product {
  _id: string;
  id: number;
  serialNumber: string;
  photo: string;
  title: string;
  type: string;
  specification: string;
  guarantee: {
    start: string;
    end: string;
  };
  price: Price[];
  order: number;
  date: string;
  isNewProduct: boolean;
}
