import { IUserRepository } from '../../../repositories/interface/user.repository';
import { IUseCase } from '../../common/use-case';
import { IHashService } from '../../utils/hash-service';
import { ITokenService } from '../../utils/token-service';

interface AuthUserInputDTO {
    email: string;
    password: string;
}

interface AuthUserOutputDTO {
    token: string;
}

export class AuthUserUseCase implements IUseCase<AuthUserInputDTO, AuthUserOutputDTO> {
    constructor(
        private readonly userRepository: IUserRepository,
        private readonly hashService: IHashService,
        private readonly tokenService: ITokenService
    ) {}

    async execute(input: AuthUserInputDTO): Promise<AuthUserOutputDTO> {
        const user = await this.userRepository.getByEmail(input.email);

        if (!user) {
            throw new Error('E-mail ou senha incorretos');
        }

        const isValidPassword = await this.hashService.compare(input.password, user.password);

        if (!isValidPassword) {
            throw new Error('E-mail ou senha incorretos');
        }

        const token = await this.tokenService.generateToken({ id: user.id, email: user.email, name: user.name }, '1d');

        return { token };
    }
}
