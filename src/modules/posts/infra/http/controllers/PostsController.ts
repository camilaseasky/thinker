import { Request, Response } from 'express';

import { container } from 'tsyringe';

import CreatePostService from '@modules/posts/services/CreatePostService';
import ShowPostService from '@modules/posts/services/ShowPostService';
import UpdatePostService from '@modules/posts/services/UpdatePostService';
import DeletePostService from '@modules/posts/services/DeletePostService';

export default class PostsController {
  public async create(request: Request, response: Response): Promise<Response> {
      const { content, date } = request.body;
      const user_id = request.user.id;

      const createPost = container.resolve(CreatePostService);

      const post = await createPost.execute({
        content,
        date,
        user_id,
      });

      
      return response.json(post);
  }

  public async show(request: Request, response: Response): Promise<Response> {
    const { post_id } = request.params;

    const showPost = container.resolve(ShowPostService);

    const post = await showPost.execute(post_id);


    return response.json(post);
  }

  public async update(request: Request, response: Response): Promise<Response> {
    const user_id = request.user.id;
    const { post_id } = request.params;
    const { content, date } = request.body;

    const updatePost = container.resolve(UpdatePostService);

    const post = await updatePost.execute({
      post_id,
      content,
      date,
      user_id,
    });


    return response.json(post);
  }

  public async delete(request: Request, response: Response): Promise<Response> {
    const user_id = request.user.id;
    const { post_id } = request.params;
    
      const deletePost = container.resolve(DeletePostService);
      await deletePost.execute(post_id, user_id);
      
    return response.status(200);
        
  }
 
}


