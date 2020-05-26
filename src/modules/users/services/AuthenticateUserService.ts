import { injectable, inject } from 'tsyringe';
import { sign } from 'jsonwebtoken';

import AppError from '@shared/errors/AppError';
import User from '../infra/typeorm/entities/User';
import IUsersRepository from '../repositories/IUsersRepository';

interface IRequest {
  email: string;
  password: string;
}

interface IResponse {
  user: User;
  token: string;
}

@injectable()
class AuthenticateUserService {
  constructor(
    @inject('UsersRepository')
    private usersRepository: IUsersRepository,

  ) {}

  public async execute({ email, password }: IRequest): Promise<IResponse> {
    const user = await this.usersRepository.findByEmail(email);

    if (!user) {
      throw new AppError('Incorrect email/password combination.', 401);
    }

    
    if (password !== user.password) {
      throw new AppError('Incorrect email/password combination.', 401);
    }

    const secret = '9cf1aca67d1a6234e753e6d407d049e7';
    const expiresIn = '1d';

    let token = '';

    if (secret) {
      token = sign({}, secret, {
        subject: user.id,
        expiresIn,
      });
    } else {
      throw new AppError('Secret is not valid');
    }

    return {
      user,
      token,
    };
  }
}

export default AuthenticateUserService;
