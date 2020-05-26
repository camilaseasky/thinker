import FakeUsersRepository from '../repositories/fakes/FakeUsersRepository';
import UpdateUserService from './UpdateUserService';
import AppError from '@shared/errors/AppError';

let fakeUsersRepository: FakeUsersRepository;

let updateUserService: UpdateUserService;

describe('UpdateUser', () => {
  beforeEach(() => {
    fakeUsersRepository = new FakeUsersRepository();
    updateUserService = new UpdateUserService(
      fakeUsersRepository,
    );
  });
  
  it('Should be able to update a user', async () => {

    const user = await fakeUsersRepository.create({
      name: 'Ludmila',
      email: 'ludimila@gmail.com',
      password: '123456',
    });


    const userUpdated = await updateUserService.execute({
      user_id: user.id,
      name: 'Camila',
      email: 'ludimila@gmail.com',
      password: '123456',
    });

    expect(userUpdated.name).toBe('Camila');

  });

  it('Should not be able to update a non-existing user', async () => {
    
    await expect(
      updateUserService.execute({
        user_id: 'non-existing-user-id',
        name: 'Paula Marisa',
        email: 'paulam.seasky@gmail.com',
        password: '123456'
      }),
    ).rejects.toBeInstanceOf(AppError);
    
  });

  it('Should not be able to update email with a already used email', async () => {
    
    await fakeUsersRepository.create({
      name: 'Camila Barbosa',
      email: 'camila@gmail.com',
      password: '123456',
    });

    const user = await fakeUsersRepository.create({
      name: 'Paula Bernardes',
      email: 'paula@gmail.com',
      password: '123456',
    });

    await expect(
      updateUserService.execute({
        user_id: user.id,
        name: 'Paula Bernardes',
        email: 'camila@gmail.com',
        password: '123456'
      }),
    ).rejects.toBeInstanceOf(AppError);

    
    
  });

});
