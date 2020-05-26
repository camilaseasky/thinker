import { injectable, inject } from 'tsyringe';
import Comment from '../infra/typeorm/entities/Comment';
import ICommentsRepository from '../repositories/ICommentsRepository';
import AppError from '@shared/errors/AppError';

interface IRequest {
  comment_id: string;
  content: string;
  date: Date;
  user_id: string;
}

@injectable()
class UpdateCommentService {
  constructor(
    @inject('CommentsRepository')
    private commentsRepository: ICommentsRepository,
  ) {}

  public async execute({ comment_id, content, date, user_id}: IRequest): Promise<Comment> {
    

    const comment = await this.commentsRepository.findById(comment_id);

    if(!comment){
      throw new AppError('Comment not found');
    }

    if(comment.user_id !== user_id){
      throw new AppError('you do not update other users comments')
    }

    comment.content = content;
    comment.date= date;

    return await this.commentsRepository.save(comment);

  }
}

export default UpdateCommentService;