import FakeUsersRepository from '../repositories/fakes/FakeUsersRepository';
import ShowUserService from './ShowUserService';
import User from '../infra/typeorm/entities/User';
import AppError from '@shared/errors/AppError';

let fakeUsersRepository: FakeUsersRepository;

let showUserService: ShowUserService;

describe('ShowUser', () => {
  beforeEach(() => {
    fakeUsersRepository = new FakeUsersRepository();
    showUserService = new ShowUserService(
      fakeUsersRepository,
    );
  });
  
  it('Should be able to show user', async () => {

    const user = await fakeUsersRepository.create({
      name: 'Ludmila Silva',
      email: 'camila@gmail.com',
      password: '123456',
    });


    const userShow = await showUserService.execute(user.id);

    expect(userShow).toBeInstanceOf(User);

  });

  it('Should not be able to show a non-existing user', async () => {
    
    await expect(
      showUserService.execute('non-existing-user')
    ).rejects.toBeInstanceOf(AppError);
    
  });
});
