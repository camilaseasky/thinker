import { Request, Response } from 'express';

import { container } from 'tsyringe';

import PostListCommentsService from '@modules/comments/services/PostListCommentsService';

export default class PostCommentsController {

  public async index(request: Request, response: Response): Promise<Response> {
    const { post_id } = request.params;

    const postListComments = container.resolve(PostListCommentsService);

    const comments = await postListComments.execute(post_id);


    return response.json(comments);
  }
   
 
}


