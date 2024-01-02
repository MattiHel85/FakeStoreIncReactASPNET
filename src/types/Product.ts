import { Guid } from "guid-typescript";
import { AppDispatch } from "../redux/store";
import { CartItem } from "./Cart";

export interface Product {
  ProductName: string;
  Description: string;
  Image: string[];
  Price: string;
  StockQuantity: number;
  id: Guid | number;
  CategoryId: Guid |number;  
  CreationAt: string;
  UpdatedAt: string;
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
  ProductName: string;
  Description: string;
  Image: string[];
  Price: string;
  StockQuantity: number;
  CategoryId: Guid | number;  
}

export interface ProductData {
  id: Guid | number;
  ProductName: string;
  Description: string;
  Image: string[];
  Price: string;
  StockQuantity: number;
  CategoryId: Guid | number; 
}

export interface updateProductProps {
  product: Product;
}
export interface ProductSearchProps {
  products: Product[]; 
}