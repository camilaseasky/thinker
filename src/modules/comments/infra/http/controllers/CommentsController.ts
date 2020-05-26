import { Request, Response } from 'express';

import { container } from 'tsyringe';

import CreateCommentService from '@modules/comments/services/CreateCommentService';
import ShowCommentService from '@modules/comments/services/ShowCommentService';
import UpdateCommentService from '@modules/comments/services/UpdateCommentService';
import DeleteCommentService from '@modules/comments/services/DeleteCommentService';

export default class CommentsController {


  public async create(request: Request, response: Response): Promise<Response> {
      const { content, date, post_id } = request.body;
      const user_id = request.user.id;

      const createComment = container.resolve(CreateCommentService);

      const comment = await createComment.execute({
        content,
        date,
        user_id,
        post_id,
      });

      
      return response.json(comment);
  }

  public async show(request: Request, response: Response): Promise<Response> {
    const { comment_id } = request.params;

    const showComment = container.resolve(ShowCommentService);

    const comment = await showComment.execute(comment_id);

    delete comment.user.password;

    return response.json(comment);
  }

  public async update(request: Request, response: Response): Promise<Response> {
    const user_id = request.user.id;
    const { comment_id } = request.params;
    const { content, date } = request.body;

    const updateComment = container.resolve(UpdateCommentService);

    const comment = await updateComment.execute({
      comment_id,
      content,
      date,
      user_id,
    });


    return response.json(comment);
  }

  public async delete(request: Request, response: Response): Promise<Response> {
    const user_id = request.user.id;
    const { comment_id } = request.params;
    
      const deletecomment = container.resolve(DeleteCommentService);
      await deletecomment.execute(comment_id, user_id);
      
      return response.status(204).send()
        
  }
 
}


