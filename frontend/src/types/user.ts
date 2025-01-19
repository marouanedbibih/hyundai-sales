export enum UserRole {
    ADMIN = 'ADMIN',
    SELLER = 'SELLER',
    AFFTER_SALES_MANAGER = 'AFFTER_SALES_MANAGER',
}



export interface IUser {
    id: number;
    username: string;
    name: string;
    role: UserRole;
    createdAt: string;
    updatedAt: string;
}

export interface IUserRequest {
    username: string;
    password: string;
    name: string;
    role: string;
}
