import { injectable, inject } from 'tsyringe';
import Post from '../infra/typeorm/entities/Post';
import IPostsRepository from '../repositories/IPostsRepository';


@injectable()
class ShowPostService {
  constructor(
    @inject('PostsRepository')
    private postsRepository: IPostsRepository,
  ) {}

  public async execute(post_id: string): Promise<Post | undefined> {
    
    const post = await this.postsRepository.findById(post_id);  
    
    if(!post) {
      throw('Post not found')
    }

    return post;
  }
}

export default ShowPostService;

