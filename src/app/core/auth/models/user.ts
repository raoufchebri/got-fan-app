import { Role } from './role';

export interface User {
    uid: string;
    email: string;
    displayName: string;
    refreshToken: string;
    photoUrl: string;
    phoneNumber: string;
    role?: Role;
}
