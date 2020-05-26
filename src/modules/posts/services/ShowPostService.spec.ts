import FakePostsRepository from '../repositories/fakes/FakePostsRepository';
import ShowPostService from './ShowPostService';

let fakePostsRepository: FakePostsRepository;

let showPostService: ShowPostService;

describe('ShowPost', () => {
  beforeEach(() => {
    fakePostsRepository = new FakePostsRepository();
    showPostService = new ShowPostService(
      fakePostsRepository,
    );
  });
  
  it('Should be able to show a post', async () => {
    const post = await fakePostsRepository.create({
      content: 'Hoje é o dia que não será esquecido!',
      date: new Date(),
      user_id: 'user01',
    });

    const postShow = await showPostService.execute(post.id);

    expect(postShow).not.toBeNull();
  });

  
});
