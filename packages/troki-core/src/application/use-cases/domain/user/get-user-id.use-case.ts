import { User } from '../../../..';
import { IUserRepository } from '../../../repositories/interface/user.repository';
import { IUseCase } from '../../common/use-case';

interface Input {
    id: string;
}

interface Output {
    user: Omit<User, 'password'> | null;
}

export class GetUserByIdUseCase implements IUseCase<Input, Output> {
    constructor(private readonly userRepository: IUserRepository) {}
    async execute(input: Input): Promise<Output> {
        const userFound = await this.userRepository.getById(input.id);

        if (!userFound) {
            throw new Error('Usuário não encontrado');
        }

        const { password, ...user } = userFound;

        return { user };
    }
}
