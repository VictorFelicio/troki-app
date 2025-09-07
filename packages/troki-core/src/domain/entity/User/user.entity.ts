import { IAddress } from '../../interfaces/address.interface';

export interface IUser {
    id: string;
    name: string;
    email: string;
    password: string;
    phone?: string;
    address?: IAddress;
    createdAt: Date;
    updatedAt: Date;
}
