import { injectable, inject } from 'tsyringe';
import Post from '../infra/typeorm/entities/Post';
import IPostsRepository from '../repositories/IPostsRepository';
import AppError from '@shared/errors/AppError';

interface IRequest {
  post_id: string;
  content: string;
  date: Date;
  user_id: string;
}

@injectable()
class UpdatePostService {
  constructor(
    @inject('PostsRepository')
    private postsRepository: IPostsRepository,
  ) {}

  public async execute({ post_id, content, date, user_id}: IRequest): Promise<Post> {
    

    const post = await this.postsRepository.findById(post_id);

    if(!post){
      throw new AppError('Post not found');
    }

    if(post.user_id !== user_id){
      throw new AppError('You do not update others users posts')
    }


    post.content = content;
    post.date = date;
   

    return await this.postsRepository.save(post);
  }
}

export default UpdatePostService;



