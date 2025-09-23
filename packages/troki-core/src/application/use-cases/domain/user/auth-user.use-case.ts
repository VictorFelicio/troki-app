import { IUserRepository } from '../../../repositories/interface/user.repository';
import { IUseCase } from '../../common/use-case';
import { IHashService } from '../../utils/hash-service';
import { ITokenService } from '../../utils/token-service';

interface Input {
    email: string;
    password: string;
}

interface Output {
    token: string;
}

export class AuthUserUseCase implements IUseCase<Input, Output> {
    constructor(
        private readonly userRepository: IUserRepository,
        private readonly hashService: IHashService,
        private readonly tokenService: ITokenService
    ) {}

    async execute(data: Input): Promise<Output> {
        const user = await this.userRepository.getByEmail(data.email);

        if (!user) {
            throw new Error('E-mail ou senha incorretos');
        }

        const isValidPassword = await this.hashService.compare(data.password, user.password);

        if (!isValidPassword) {
            throw new Error('E-mail ou senha incorretos');
        }

        const token = await this.tokenService.generateToken({ id: user.id, email: user.email, name: user.name }, '1d');

        return { token };
    }
}
