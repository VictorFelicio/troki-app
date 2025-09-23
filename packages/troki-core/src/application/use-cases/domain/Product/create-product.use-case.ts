import { IProduct } from '../../../../domain/entity/Product/product.entity';
import { IProductRepository } from '../../../repositories/interface/product.repository';
import { IUserRepository } from '../../../repositories/interface/user.repository';
import { IUseCase } from '../../common/use-case';

interface Input {
    product: Omit<IProduct, 'id' | 'createdAt' | 'updatedAt'>;
    authenticatedUserId: string;
}

interface Output {
    product: IProduct;
}

export class CreateProductUseCase implements IUseCase<Input, Output> {
    constructor(
        private readonly productRepository: IProductRepository,
        private readonly userRepository: IUserRepository
    ) {}

    async execute(data: Input): Promise<Output> {
        const userFound = await this.userRepository.getById(data.authenticatedUserId);

        if (!userFound) {
            throw new Error('É necessário um usuário cadastrado para criar um produto');
        }

        const quantityProducts = await this.productRepository.countByOwnerId(data.authenticatedUserId);

        if (quantityProducts >= 3) {
            throw new Error('Limite de produtos atingido');
        }

        const newProduct = { ...data.product, ownerId: userFound.id };

        const product = await this.productRepository.create(newProduct);

        return { product };
    }
}
