import FakePostsRepository from '../repositories/fakes/FakePostsRepository';
import UpdatePostService from './UpdatePostService';
import AppError from '@shared/errors/AppError';

let fakePostsRepository: FakePostsRepository;

let updatePostService: UpdatePostService;

describe('UpdatePost', () => {
  beforeEach(() => {
    fakePostsRepository = new FakePostsRepository();
    updatePostService = new UpdatePostService(
      fakePostsRepository,
    );
  });
  
  it('Should be able to update a post', async () => {
    const post = await fakePostsRepository.create({
      content: 'Hoje é o dia que não será esquecido!',
      date: new Date(),
      user_id: 'user01',
    });

    const postUpdated = await updatePostService.execute({
      post_id: post.id,
      content: 'Vamos esquecer esse dia',
      date: post.date,
      user_id: 'user01',
    });

    expect(postUpdated.content).toBe('Vamos esquecer esse dia');
  });

  it('Should not be able to update a other user post', async () => {
    const post = await fakePostsRepository.create({
      content: 'Hoje é o dia que não será esquecido!',
      date: new Date(),
      user_id: 'user01',
    });


    await expect(
      updatePostService.execute({
        post_id: post.id,
        content: 'Vamos esquecer esse dia',
        date: post.date,
        user_id: 'user02',
      }),
    ).rejects.toBeInstanceOf(AppError);

    
  });

  
});
