import FakeUsersRepository from '../repositories/fakes/FakeUsersRepository';
import CreateUserService from './CreateUserService';
import AppError from '@shared/errors/AppError';

let fakeUsersRepository: FakeUsersRepository;

let createUserService: CreateUserService;

describe('CreateUser', () => {
  beforeEach(() => {
    fakeUsersRepository = new FakeUsersRepository();
    createUserService = new CreateUserService(
      fakeUsersRepository,
    );
  });
  
  it('Should be able to create a new user', async () => {
    const user = await createUserService.execute({
      name: 'Camila Barbosa',
      email: 'camila@gmail.com',
      password: '123456',
    });

    await expect(user).toHaveProperty('id');
  });

  it('Should not be able to create a two users with the same email', async () => {
    await createUserService.execute({
      name: 'Ludmila Silva',
      email: 'camila@gmail.com',
      password: '123456',
    });

    await expect(
      createUserService.execute({
        name: 'Ludmila Silva',
        email: 'camila@gmail.com',
        password: '123456',
      }),
    ).rejects.toBeInstanceOf(AppError);
  });
});
