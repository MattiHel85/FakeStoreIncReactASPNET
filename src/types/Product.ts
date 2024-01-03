import { Guid } from "guid-typescript";
import { AppDispatch } from "../redux/store";
import { CartItem } from "./Cart";

export interface Product {
  productName: string;
  description: string;
  image: string[];
  price: string;
  stockQuantity: number;
  id: Guid | number;
  categoryId: Guid |number;  
  creationAt: string;
  updatedAt: string;
}

export interface ProductState {
  products: Product[]
  loading: boolean
  error: string | null
}
export interface ProductOfTheMonthState {
  productOfTheMonth: Product | null
  loading: boolean
  error: string | null
}

export interface ProductCardProps {
  product: Product; 
  items?: CartItem[];
  dispatch?: AppDispatch; 
  onAddToCart?: (product: Product, items?: CartItem[], dispatch?: AppDispatch) => void; 
}

export interface AddProductData {
  productName: string;
  description: string;
  image: string[];
  price: string;
  stockQuantity: number;
  categoryId: Guid | number;  
}

export interface ProductData {
  id: Guid | number;
  productName: string;
  description: string;
  image: string[];
  price: string;
  stockQuantity: number;
  categoryId: Guid | number;
}

export interface updateProductProps {
  product: Product;
}
export interface ProductSearchProps {
  products: Product[]; 
}