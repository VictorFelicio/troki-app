import { IUser } from '../../../../domain/entity/User/user.entity';
import { IUserRepository } from '../../../repositories/interface/user.repository';
import { IUseCase } from '../../common/use-case';
import { IHashService } from '../../utils/hash-service';

type Input = Omit<IUser, 'id' | 'createdAt' | 'updatedAt'>;
type Output = Omit<IUser, 'password'>;

export class CreateUserUseCase implements IUseCase<Input, Output> {
    constructor(private readonly userRepository: IUserRepository, private hashService: IHashService) {}

    async execute(data: Input): Promise<Output> {
        //
        const user = await this.userRepository.getByEmail(data.email);

        if (user) {
            throw new Error('E-mail já cadastrado');
        }

        const hashedPassword = await this.hashService.hash(data.password);

        const createdUser: IUser = await this.userRepository.create({ ...data, password: hashedPassword });

        const { password, ...restUser } = createdUser;

        return restUser;
    }
}
