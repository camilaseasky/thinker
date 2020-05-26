import FakeUsersRepository from '../repositories/fakes/FakeUsersRepository';
import DeleteUserService from './DeleteUserService';
import User from '../infra/typeorm/entities/User';

let fakeUsersRepository: FakeUsersRepository;

let deleteUserService: DeleteUserService;

describe('DeleteUser', () => {
  beforeEach(() => {
    fakeUsersRepository = new FakeUsersRepository();
    deleteUserService = new DeleteUserService(
      fakeUsersRepository,
    );
  });
  
  it('Should be able to delete a user', async () => {

    const user = await fakeUsersRepository.create({
      name: 'Ludmila Silva',
      email: 'camila@gmail.com',
      password: '123456',
    });


    await deleteUserService.execute(user.id);

    expect(fakeUsersRepository.findById(user.id))
          .rejects.toBeUndefined;

  });

  it('Should not be able to delete a non-existing user', async () => {
    
    await expect(deleteUserService.execute('non-existing-user'))
    .rejects.toBeInstanceOf(Error);
    
  });
});
