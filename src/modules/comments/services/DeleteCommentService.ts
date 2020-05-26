import { injectable, inject } from 'tsyringe';
import Comment from '../infra/typeorm/entities/Comment';
import ICommentsRepository from '../repositories/ICommentsRepository';
import AppError from '@shared/errors/AppError';


@injectable()
class DeleteCommentService {
  constructor(
    @inject('CommentsRepository')
    private commentsRepository: ICommentsRepository,
  ) {}

  public async execute(comment_id: string, user_id: string): Promise<void> {
    
    const comment = await this.commentsRepository.findById(comment_id);

    if(!comment){
      throw new AppError('Comment not found')
    }

    if(comment.user_id !== user_id){
      throw new AppError('You do not delete other users comment')
    }

    return await this.commentsRepository.delete(comment_id);
  }
}

export default DeleteCommentService;

