import FakePostsRepository from '../repositories/fakes/FakePostsRepository';
import DeletePostService from './DeletePostService';
import Post from '@modules/posts/infra/typeorm/entities/Post'

let fakePostsRepository: FakePostsRepository;

let deletePostService: DeletePostService;

describe('DeletePost', () => {
  beforeEach(() => {
    fakePostsRepository = new FakePostsRepository();
    deletePostService = new DeletePostService(
      fakePostsRepository,
    );
  });
  
  it('Should be able to delete a post', async () => {
    const post = await fakePostsRepository.create({
      content: 'Hoje é o dia que não será esquecido!',
      date: new Date(),
      user_id: 'user01',
    });

    await deletePostService.execute(post.id, post.user_id);

    expect(fakePostsRepository.findById(post.id))
          .rejects.toBeUndefined;
  });

  
});
