import { uuid } from 'uuidv4';
import ICreatePostDTO from '@modules/posts/dtos/ICreatePostDTO';
import IPostRepository from '../IPostsRepository';
import Post from '@modules/posts/infra/typeorm/entities/Post';

class FakePostsRepository implements IPostRepository {
  private posts: Post[] = [];

  public async findTimeLinePosts(): Promise<Post[]> {
    const posts = this.posts;

    return posts;
  }

  public async findById(post_id: string): Promise<Post | undefined> {
    const foundPost = this.posts.find(post => post.id === post_id);

    return foundPost;
  }

  
  public async create(postData: ICreatePostDTO): Promise<Post> {
    const post = new Post();

    Object.assign(post, { id: uuid() }, postData);

    this.posts.push(post);

    return post;
  }

  public async save(post: Post): Promise<Post> {
    const indexOfPost = this.posts.findIndex(p => p.id === post.id);

    this.posts[indexOfPost] = post;

    return post;
  }

  public async delete(post_id: string): Promise<void> {
    const indexOfPost = this.posts.findIndex(p => p.id === post_id);

    this.posts.splice(indexOfPost, 1);

    
  }
}

export default FakePostsRepository;
