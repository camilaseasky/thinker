import { injectable, inject } from 'tsyringe';
import Post from '../infra/typeorm/entities/Post';
import IPostsRepository from '../repositories/IPostsRepository';

interface IRequest {
  content: string;
  date: Date;
  user_id: string;
}

@injectable()
class CreatePostService {
  constructor(
    @inject('PostsRepository')
    private postsRepository: IPostsRepository,
  ) {}

  public async execute({ content, date, user_id}: IRequest): Promise<Post> {
    

    const post = await this.postsRepository.create({
      content,
      date,
      user_id,
    });

    return post;
  }
}

export default CreatePostService;

