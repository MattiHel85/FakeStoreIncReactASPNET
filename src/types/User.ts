import {Guid} from 'guid-typescript';
import { UserProfile } from './Auth';

export interface User {
  id?: Guid;
  Role: string;
  FirstName: string;
  LastName: string;
  Email: string;
  Password: string;
  PhoneNumber: string;
  Addresses: Address[];
}

export interface Address {
  HouseNumber: number;
  Street?: string | null;  
  PostCode: string;
  UserId?: Guid | null;    
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
  user?: UserProfile | null 
  setUser?: (userData: User) => void; 
}