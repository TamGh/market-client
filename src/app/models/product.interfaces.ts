export interface IProductListItem {
    id: number;
    name: string;
    available: boolean;
    price: number;
}

export interface IProduct {
    id?: number;
    name: string;
    available: boolean;
    price: number;
    description: string;
    dateCreated?: Date;
}

export interface IResponseModel<T> {
    data: T,
    message? : string;
    responseType?: ResponseType;
}

export enum ResponseType {
    Success = 1,
    Info = 2,
    Warning = 3,
    Error = 4
}

