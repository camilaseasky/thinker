import { uuid } from 'uuidv4';
import ICreateUserDTO from '../../dtos/ICreateUserDTO';
import IUserRepository from '../IUsersRepository';
import User from '../../infra/typeorm/entities/User';

class FakeUsersRepository implements IUserRepository {
  private users: User[] = [];

  public async findById(id: string): Promise<User | undefined> {
    const foundUser = this.users.find(user => user.id === id);

    return foundUser;
  }

  public async findByEmail(email: string): Promise<User | undefined> {
    const foundUser = this.users.find(user => user.email === email);

    return foundUser;
  }

  public async create(userData: ICreateUserDTO): Promise<User> {
    const user = new User();

    Object.assign(user, { id: uuid() }, userData);

    this.users.push(user);

    return user;
  }

  public async save(user: User): Promise<User> {
    const indexOfUser = this.users.findIndex(u => u.id === user.id);

    this.users[indexOfUser] = user;

    return user;
  }

  public async delete(user_id: string): Promise<void> {
    const indexOfUser = this.users.findIndex(u => u.id === user_id);

    this.users.splice(indexOfUser, 1);

    
  }
}

export default FakeUsersRepository;
