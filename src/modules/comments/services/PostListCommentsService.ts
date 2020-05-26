import { injectable, inject } from 'tsyringe';
import Comment from '../infra/typeorm/entities/Comment';
import ICommentsRepository from '../repositories/ICommentsRepository';
import AppError from '@shared/errors/AppError';


@injectable()
class PostListCommentsService {
  constructor(
    @inject('CommentsRepository')
    private commentsRepository: ICommentsRepository,
  ) {}

  public async execute(post_id: string): Promise<Comment[]> {
    
    const comments = await this.commentsRepository.findAllByPostId(post_id);

    if(!comments){
      throw new AppError('There are not comments for this post')
    }

    return comments;
  }
}

export default PostListCommentsService;

