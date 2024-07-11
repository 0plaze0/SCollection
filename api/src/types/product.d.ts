export interface Product {
  name: string;
  price: string;
  description: string;
  category: string;
  quantity: string;
  image: { id: string; url: string };
  shipping: string;
}
