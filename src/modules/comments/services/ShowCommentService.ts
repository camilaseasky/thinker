import { injectable, inject } from 'tsyringe';
import Comment from '../infra/typeorm/entities/Comment';
import ICommentsRepository from '../repositories/ICommentsRepository';
import AppError from '@shared/errors/AppError';


@injectable()
class ShowCommentService {
  constructor(
    @inject('CommentsRepository')
    private commentsRepository: ICommentsRepository,
  ) {}

  public async execute(comment_id: string): Promise<Comment> {
    
    const comment = await this.commentsRepository.findById(comment_id);

    if(!comment){
      throw new AppError('Comment not found')
    }

    return comment;
  }
}

export default ShowCommentService;

