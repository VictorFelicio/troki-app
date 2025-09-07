import { IUserRepository } from '../../../repositories/interface/user.repository';
import { IUseCase } from '../../common/use-case';
import { IHashService } from '../../utils/hash-service';

interface AuthUserInputDTO {
    email: string;
    password: string;
}

interface AuthUserOutputDTO {
    token: string;
}

export class AuthUserUseCase implements IUseCase<AuthUserInputDTO, AuthUserOutputDTO> {
    constructor(private readonly userRepository: IUserRepository, private hashService: IHashService) {}

    execute(input: AuthUserInputDTO): Promise<AuthUserOutputDTO> {
        throw new Error('Method not implemented.');
    }
}
