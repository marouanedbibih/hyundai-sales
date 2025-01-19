export enum VehicleStatus {
    AVAILABLE = "AVAILABLE",
    ORDERED = "ORDERED",
    SOLD = "SOLD"
}

export interface IVehicle {
    id: number;
    createdAt?: string;
    updatedAt?: string;
    model: string;
    year: number ;
    price: number;
    color: string;
    status: VehicleStatus;
    isPromotion: boolean;
    discount?: number; 
}

export interface IVehicleRequest {
    model: string;
    year: number | undefined;
    price: number | undefined
    color: string;
    status: VehicleStatus;
    isPromotion: boolean;
    discount?: number; 
}
