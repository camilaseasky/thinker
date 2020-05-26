import { Request, Response } from 'express';

import { container } from 'tsyringe';

import CreateUserService from '@modules/users/services/CreateUserService';
import ShowUserService from '@modules/users/services/ShowUserService';
import UpdateUserService from '@modules/users/services/UpdateUserService';
import DeleteUserService from '@modules/users/services/DeleteUserService';

export default class UsersController {
  public async create(request: Request, response: Response): Promise<Response> {
      const { name, email, password } = request.body;

      const createUser = container.resolve(CreateUserService);

      const user = await createUser.execute({
        name,
        email,
        password,
      });

      delete user.password;

      return response.json(user);
  }

  public async show(request: Request, response: Response): Promise<Response> {
    const { user_id } = request.params;

    const showUser = container.resolve(ShowUserService);

    const user = await showUser.execute(user_id);

    delete user.password;

    return response.json(user);
  }

  public async update(request: Request, response: Response): Promise<Response> {
    const user_id = request.user.id;

    const { name, email, password } = request.body;

    const updateUser = container.resolve(UpdateUserService);

    const user = await updateUser.execute({
      user_id,
      name,
      email,
      password,
    });

    delete user.password;

    return response.json(user);
  }

  public async delete(request: Request, response: Response): Promise<Response> {
    const user_id = request.user.id;

    
      const deleteUser = container.resolve(DeleteUserService);
      await deleteUser.execute(user_id);
    return response.status(200);
        
  }
 
}


