import Post from '../infra/typeorm/entities/Post';
import ICreatePostDTO from '../dtos/ICreatePostDTO';

export default interface IPostsRepository {
  findTimeLinePosts(): Promise<Post[]>;
  findById(post_id: string): Promise<Post | undefined>;
  create(data: ICreatePostDTO): Promise<Post>;
  save(post: Post): Promise<Post>;
  delete(post_id: string): Promise<void>;
}