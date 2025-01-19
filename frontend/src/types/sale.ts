
export interface ISaleRequest {
    clientId: number; 
    vehicleId: number; 
    totalPrice: number;
    paymentMethod: string;
    installments: number | null; 
}

export interface IUpdateSaleRequest {
    totalPrice: number; 
    paymentMethod: string; 
    installments: number | null; 
}

// sale-dto.ts

export interface ISale {
    id: number;
    date: string; 
    totalPrice: number;
    paymentMethod: PaymentMethod; 
    installments?: number; 
    clientId: number;
    clientName: string;
    userId: number;
    username: string;
    vehicleId: number;
    vehicleModel: string;
    vehicleColor: string;
    vehicleYear: number;
    vehiclePrice: number;
}

export enum PaymentMethod {
    FULL = 'FULL',
    INSTALLMENTS = 'INSTALLMENTS',
}
