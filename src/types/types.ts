export interface HeaderProps {
    title: string
}

export interface Product {
    id: number;
    title: string;
    price: number;
    description: string;
    images: string[];
    creationAt: string;
    updatedAt: string;
    category: {
      id: number;
      name: string;
      image: string;
      creationAt: string;
      updatedAt: string;
    };
  }

export interface ProductState {
    products: Product[]
    loading: boolean
    error: string | null
}

export interface RootState {
  products: ProductState
}