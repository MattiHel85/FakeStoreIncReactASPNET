import { Guid } from 'guid-typescript';
import { Address } from './User';

export interface AuthState {
    isAuthenticated: boolean;
    accessToken: string |null;
    user: UserProfile | null,
    loading: boolean;
    error: string | null;
}

export interface LoginPayload {
    email: string;
    password: string;
}

export interface UserProfile {
    id?: Guid | number;
    Role: string;
    FirstName: string;
    LastName: string;
    Email: string;
    Password: string;
    PhoneNumber: string;
    Addresses: Address[];
}