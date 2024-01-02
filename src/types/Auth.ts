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
    id?: Guid;
    role: string;
    firstName: string;
    lastName: string;
    email: string;
    password?: string;
    phoneNumber: string;
    addresses?: Address[];
}