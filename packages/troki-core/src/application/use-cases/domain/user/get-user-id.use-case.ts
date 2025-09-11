import { User } from '../../../..';
import { IUserRepository } from '../../../repositories/interface/user.repository';
import { IUseCase } from '../../common/use-case';

interface getUserInputDTO {
    id: string;
}

interface getUserOutputDTO {
    user: Omit<User, 'password'> | null;
}

export class GetUserByIdUseCase implements IUseCase<getUserInputDTO, getUserOutputDTO> {
    constructor(private readonly userRepository: IUserRepository) {}
    async execute(input: getUserInputDTO): Promise<getUserOutputDTO> {
        const userFound = await this.userRepository.getById(input.id);

        if (!userFound) {
            throw new Error('Usuário não encontrado');
        }

        const { password, ...user } = userFound;

        return { user };
    }
}
