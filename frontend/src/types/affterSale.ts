export interface ICreateAffterSaleRequest {
    type: string;
    description: string;
    cost: number;
    appointment: string;  
    status: string;
    vehicleId: number;
    clientId: number;
  }
  
  export interface IUpdateAffterSaleRequest {
    type: string;
    description: string;
    cost: number;
    appointment: string;  
    status: string;
  }
  
  export interface IAffterSale {
    id: number;
    description: string;
    cost: number;
    appointment: string;  
    status: AffterSaleStatus;
    type: AffterSaleType;
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
  
  export enum AffterSaleStatus {
    IN_PROGRESS = "IN_PROGRESS",
    COMPLETED = "COMPLETED",
    SCHEUDLED = "SCHEUDLED",
    CANCELLED = "CANCELLED"
  }
  
  export enum AffterSaleType {
    REPAIR = "REPAIR",
    MAINTENANCE = "MAINTENANCE",
    INSPECTION = "INSPECTION"
  }
  