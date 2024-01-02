import {Guid} from 'guid-typescript';
import { UserProfile } from './Auth';

export interface User {
  id?: Guid | number;
  role: string;
  firstName: string;
  lastName: string;
  email: string;
  password: string;
  phoneNumber: string;
  addresses: Address[];
}

export interface Address {
  houseNumber: number;
  street?: string | null;  
  postCode: string;
  userId?: Guid | null;    
}



export interface UserState {
  users: User[]
  loading: boolean
  error: string | null
}

export interface UserCardProps {
    user?: UserProfile | null
}

export interface UpdateUserProps {
  user?: UserProfile | null | undefined
  setUser?: (userData: User) => void; 
}