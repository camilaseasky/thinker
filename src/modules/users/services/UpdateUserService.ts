import { injectable, inject } from 'tsyringe';
import User from '../infra/typeorm/entities/User';
import IUsersRepository from '../repositories/IUsersRepository';
import AppError from '@shared/errors/AppError';

interface IRequest {
  user_id: string;
  name: string;
  email: string;
  password: string;
}

@injectable()
class UpdateUserService {
  constructor(
    @inject('UsersRepository')
    private usersRepository: IUsersRepository,
  ) {}

  public async execute({ user_id, name, email, password }: IRequest): Promise<User> {
    const userFounded = await this.usersRepository.findById(user_id);

    if (!userFounded) {
      throw new AppError('User not found');
    }

    const sameEmailUser = await this.usersRepository.findByEmail(email);

    if(sameEmailUser && user_id !== sameEmailUser.id  ){
      throw new AppError('E-mail is used for other user')
    }

    userFounded.name = name;
    userFounded.email = email;
    userFounded.password = password;

    const user = await this.usersRepository.save(userFounded);

    return user;
  }
}

export default UpdateUserService;

