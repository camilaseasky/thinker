import { injectable, inject } from 'tsyringe';
import Comment from '../infra/typeorm/entities/Comment';
import ICommentsRepository from '../repositories/ICommentsRepository';

interface IRequest {
  content: string;
  date: Date;
  user_id: string;
  post_id: string;
}

@injectable()
class CreateCommentService {
  constructor(
    @inject('CommentsRepository')
    private commentsRepository: ICommentsRepository,
  ) {}

  public async execute({ content, date, user_id, post_id}: IRequest): Promise<Comment> {
    

    const comment = await this.commentsRepository.create({
      content,
      date,
      user_id,
      post_id,
    });

    return comment;
  }
}

export default CreateCommentService;

