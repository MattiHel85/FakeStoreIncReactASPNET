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
  Street?: string | null;  // Use string | null to represent C#'s string?
  PostCode: string;
  UserId?: Guid | null;    // Use Guid | null to represent C#'s Guid?
}



export interface UserState {
  users: User[]
  loading: boolean
  error: string | null
}

export interface UserCardProps {
    user?: User | null
}

export interface UpdateUserProps {
  user?: User | null 
  setUser?: (userData: User) => void; 
}