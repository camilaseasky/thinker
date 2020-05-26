import AppError from '../../../shared/errors/AppError';
import FakeUsersRepository from '../repositories/fakes/FakeUsersRepository';

import AuthenticateUserService from './AuthenticateUserService';

let fakeUsersRepository: FakeUsersRepository;
let authenticateUserService: AuthenticateUserService;

describe('AuthenticateUser', () => {
  beforeEach(() => {
    fakeUsersRepository = new FakeUsersRepository();

    authenticateUserService = new AuthenticateUserService(
      fakeUsersRepository,
    );
  });

  it('Should be able to authenticate a user', async () => {
    await fakeUsersRepository.create({
      name: 'Camila Barbosa',
      email: 'camila.seasky@gmail.com',
      password: '123456',
    });

    const response = await authenticateUserService.execute({
      email: 'camila.seasky@gmail.com',
      password: '123456',
    });

    expect(response).toHaveProperty('token');
  });

  it('Should not be able to authenticate a non existing user', async () => {
    await expect(
      authenticateUserService.execute({
        email: 'camila.seasky@gmail.com',
        password: '123456',
      }),
    ).rejects.toBeInstanceOf(AppError);
  });

  it('Should not be able to authenticate with a incorrect password', async () => {
    await fakeUsersRepository.create({
      name: 'Camila Barbosa',
      email: 'camila.seasky@gmail.com',
      password: '123456',
    });

    await expect(
      authenticateUserService.execute({
        email: 'camila.seasky@gmail.com',
        password: '124321',
      }),
    ).rejects.toBeInstanceOf(AppError);
  });
});
