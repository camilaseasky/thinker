import FakePostsRepository from '../repositories/fakes/FakePostsRepository';
import CreatePostService from './CreatePostService';

let fakePostsRepository: FakePostsRepository;

let createPostService: CreatePostService;

describe('CreatePost', () => {
  beforeEach(() => {
    fakePostsRepository = new FakePostsRepository();
    createPostService = new CreatePostService(
      fakePostsRepository,
    );
  });
  
  it('Should be able to create a new post', async () => {
    const post = await createPostService.execute({
      content: 'Hoje é dia que não será esquecido!',
      date: new Date(),
      user_id: 'user01',
    });

    expect(post).toHaveProperty('id');
  });

  
});
