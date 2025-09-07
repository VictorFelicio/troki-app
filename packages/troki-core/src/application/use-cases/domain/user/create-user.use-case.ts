import { IUser } from '../../../../domain/entity/User/user.entity';
import { IUserRepository } from '../../../repositories/interface/user.repository';
import { IUseCase } from '../../common/use-case';
import { IHashService } from '../../utils/hash-service';

type CreateUserInputDTO = Omit<IUser, 'id' | 'createdAt' | 'updatedAt'>;
type CreateUserOutputDTO = Omit<IUser, 'password'>;

export class CreateUserUseCase implements IUseCase<CreateUserInputDTO, CreateUserOutputDTO> {
    constructor(private readonly userRepository: IUserRepository, private hashService: IHashService) {}

    async execute(input: CreateUserInputDTO): Promise<CreateUserOutputDTO> {
        //
        const user = await this.userRepository.getByEmail(input.email);

        if (user) {
            throw new Error('E-mail já cadastrado');
        }

        const hashedPassword = await this.hashService.hash(input.password);

        const createdUser: IUser = await this.userRepository.create({ ...input, password: hashedPassword });

        const { password, ...restUser } = createdUser;

        return restUser;
    }
}
