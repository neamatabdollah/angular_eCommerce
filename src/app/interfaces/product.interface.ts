// Product Interface
export interface Product {
  id: number;
  title: string;
  description: string;
  price: number;
  discountPercentage: number;
  rating: number;
  stock: number;
  brand: string;
  category: string;
  thumbnail: string;
  images: string[];
}
//ProductResponse interface
export interface ProductResponse {
  products: Product[];
  total: number;
  skip: number;
  limit: number;
}
//cartItem interface
export interface CartItem {
  product: Product;
  quantity: number;
}