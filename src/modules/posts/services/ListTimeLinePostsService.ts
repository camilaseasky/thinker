import { injectable, inject } from 'tsyringe';
import { getDaysInMonth, getDate, isAfter } from 'date-fns';
import IPostsRepository from '../repositories/IPostsRepository';
import Post from '@modules/posts/infra/typeorm/entities/Post';



@injectable()
class ListTimeLinePostsService {
  constructor(
    @inject('PostsRepository')
    private postsRepository: IPostsRepository,
  ) {}

  public async execute(): Promise<Post[]> {
    const timeLinePosts = await this.postsRepository.findTimeLinePosts();

    return timeLinePosts;
  }
}

export default ListTimeLinePostsService;
