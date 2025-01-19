/* eslint-disable @typescript-eslint/no-explicit-any */
export interface MyResponse {
    data: any;
    meta: any;
    message: string;
    status: string;
}

export interface MyErrorResponse {
    message: string;
    errors: MyError[];
}

export interface MyError {
    key: string;
    message: string;
}

export interface ILoading {
    table: boolean;
    form: boolean;
    filter: boolean;
    delete: boolean;
}

export interface IFetching {
    normal: boolean;
    search: boolean;
    filter: boolean;
}

export interface IDialog {
    form: boolean;
    delete: boolean;
    filter: boolean;
}


export interface IPagination {
    currentPage: number;
    totalPages: number;
    totalElements: number;
    size: number;
    initPagination: () => void;
}

export interface IID {
    delete: number | null;
    update: number | null;
    fetch: number | null;
}


export interface IMessage {
    message: string;
    type: MessageType;
}

export enum MessageType {
    INIT = "init",
    INFO = "info",
    ERROR = "error",
    WARNING = "warning",
}

