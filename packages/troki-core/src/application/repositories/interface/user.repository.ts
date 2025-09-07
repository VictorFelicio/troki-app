import { IUser } from '../../../domain/entity/User/user.entity';

export interface IUserRepository {
    create(user: Omit<IUser, 'id' | 'createdAt' | 'updatedAt'>): Promise<IUser>;
    update(user: IUser): Promise<IUser>;
    delete(id: string): Promise<void>;
    getById(id: string): Promise<IUser | null>;
    getByEmail(email: string): Promise<IUser | null>;
}
