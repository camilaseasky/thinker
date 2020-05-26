import { injectable, inject } from 'tsyringe';
import Post from '../infra/typeorm/entities/Post';
import IPostsRepository from '../repositories/IPostsRepository';
import AppError from '@shared/errors/AppError';


@injectable()
class DeletePostService {
  constructor(
    @inject('PostsRepository')
    private postsRepository: IPostsRepository,
  ) {}

  public async execute(post_id: string, user_id: string): Promise<void> {
    
    const post = await this.postsRepository.findById(post_id);  
    
    if(!post) {
      throw new AppError('Post not found')
    }

    if(post.user_id !== user_id){
      throw new AppError('You do not delete other user post')
    }

    await this.postsRepository.delete(post_id);

    
  }
}

export default DeletePostService;

