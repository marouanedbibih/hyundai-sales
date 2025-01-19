export interface IClient {
    id: number;
    firstName: string;
    lastName: string;
    email: string;
    phone: string;
    address: string;
}

export interface IClientRequest {
    firstName: string;
    lastName: string;
    email: string;
    phone: string;
    address: string;
}
