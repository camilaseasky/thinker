import FakeCommentsRepository from '../repositories/fakes/FakeCommentsRepository';
import CreateCommentService from './CreateCommentService';

let fakeCommentsRepository: FakeCommentsRepository;

let createCommentService: CreateCommentService;

describe('CreateComment', () => {
  beforeEach(() => {
    fakeCommentsRepository = new FakeCommentsRepository();
    createCommentService = new CreateCommentService(
      fakeCommentsRepository,
    );
  });
  
  it('Should be able to create a new comment in a post', async () => {
    const comment = await createCommentService.execute({
      content: 'Comentário bla bla bla!',
      date: new Date(),
      user_id: 'user02',
      post_id: 'post01',
    });

    expect(comment).toHaveProperty('id');
  });

  
});
