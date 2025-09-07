import { IUser } from '../User/user.entity';
import { Condition } from './enum/condition.enum';

export interface IProduct {
    id: string;
    ownerId: IUser['id'];
    title: string;
    description?: string;
    condition: Condition;
    category?: string;
    createdAt: Date;
    updatedAt: Date;
}
