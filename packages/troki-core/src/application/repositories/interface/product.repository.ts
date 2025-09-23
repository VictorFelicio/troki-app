import { IProduct } from '../../../domain/entity/Product/product.entity';

export interface IProductRepository {
    create(product: Omit<IProduct, 'id' | 'createdAt' | 'updatedAt'>): Promise<IProduct>;
    countByOwnerId(ownerId: string): Promise<number>;
}
