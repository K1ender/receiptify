export interface ReceiptResponse {
  error: boolean;
  store: Store;
  items: Item[];
  total: number;
  currency: string;
}

export interface Item {
  id: number;
  name: string;
  quantity: number;
  price: number;
  total: number;
}

export interface Store {
  name: string;
  address: string;
  date: string;
  time: string;
  category: string;
}
