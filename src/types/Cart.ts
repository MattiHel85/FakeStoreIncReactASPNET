import {Guid} from 'guid-typescript'

export interface CartItem {
    id: Guid;
    name: string;
    price: string;
    quantity: number;
}

export interface CartState {
    items: CartItem[];
    loading: boolean;
    error: string | null;
}