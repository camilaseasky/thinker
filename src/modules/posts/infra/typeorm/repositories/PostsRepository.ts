import { getRepository, Repository} from 'typeorm';

import ICreatePostDTO from '@modules/posts/dtos/ICreatePostDTO';
import IPostsRepository from '@modules/posts/repositories/IPostsRepository';
import Post from '../entities/Post';

class PostsRepository implements IPostsRepository {
  private ormRepository: Repository<Post>;

  constructor() {
    this.ormRepository = getRepository(Post);
  }

  public async findTimeLinePosts(): Promise<Post[]> {
    const posts = await this.ormRepository.find({
        order: {
          date: "DESC",
      },
      relations: ['user'],
      
    })

    return posts;
  }

  public async findById(post_id: string): Promise<Post | undefined> {
    const post = await this.ormRepository.findOne({
      where: { id: post_id },
      relations: ['user']
    });

    return post;
  }

    
  public async create(postData: ICreatePostDTO): Promise<Post> {
    const post =  this.ormRepository.create(postData);

    await this.ormRepository.save(post);

    return post;
  }

  public async save(post: Post): Promise<Post> {
    return await this.ormRepository.save(post);
  }

  public async delete(post_id: string): Promise<void> {
    const post = await this.ormRepository.findOne({
      where: {id: post_id}
    })

    if(post){
      await this.ormRepository.remove(post);
    }
   
  }
}

export default PostsRepository;
