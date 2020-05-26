import FakeCommentsRepository from '../repositories/fakes/FakeCommentsRepository';
import UpdateCommentService from './UpdateCommentService';
import AppError from '@shared/errors/AppError';

let fakeCommentsRepository: FakeCommentsRepository;

let updateCommentService: UpdateCommentService;

describe('UpdateComment', () => {
  beforeEach(() => {
    fakeCommentsRepository = new FakeCommentsRepository();
    updateCommentService = new UpdateCommentService(
      fakeCommentsRepository,
    );
  });
  
  it('Should be able to update a comment', async () => {
    
    const comment = await fakeCommentsRepository.create({
      content: 'Comentário bla bla bla!',
      date: new Date(),
      user_id: 'user02',
      post_id: 'post01',
    });

    const commentUpdated = await updateCommentService.execute({
      comment_id: comment.id,
      content: 'Comentário Alterado',
      date: new Date(),
      user_id: 'user02',
    });

    expect(commentUpdated.content).toBe('Comentário Alterado');
  });

  it('Should not to be able to update a other user comment', async () => {
    
    const comment = await fakeCommentsRepository.create({
      content: 'Comentário bla bla bla!',
      date: new Date(),
      user_id: 'user02',
      post_id: 'post01',
    });

   
    await expect(updateCommentService.execute({
      comment_id: comment.id,
      content: 'Comentário Alterado',
      date: new Date(),
      user_id: 'user03',
    })).rejects.toBeInstanceOf(AppError);
  });

  
});
