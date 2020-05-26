import FakeCommentsRepository from '../repositories/fakes/FakeCommentsRepository';
import DeleteCommentService from './DeleteCommentService';
import AppError from '@shared/errors/AppError';


let fakeCommentsRepository: FakeCommentsRepository;

let deleteCommentService: DeleteCommentService;

describe('DeleteComment', () => {
  beforeEach(() => {
    fakeCommentsRepository = new FakeCommentsRepository();
    deleteCommentService = new DeleteCommentService(
      fakeCommentsRepository,
    );
  });
  
  it('Should be able to delete a comment', async () => {
    
    const comment = await fakeCommentsRepository.create({
      content: 'Comentário bla bla bla!',
      date: new Date(),
      user_id: 'user02',
      post_id: 'post01',
    });

    await deleteCommentService.execute(comment.id, 'user02');

    await expect(fakeCommentsRepository.findById(comment.id))
      .rejects.toBeUndefined;
  });

  it('Should not be able to delete a other user comment', async () => {
    
    const comment = await fakeCommentsRepository.create({
      content: 'Comentário bla bla bla!',
      date: new Date(),
      user_id: 'user02',
      post_id: 'post01',
    });

    await expect(deleteCommentService.execute(comment.id, 'user03'))
      .rejects.toBeInstanceOf(AppError);
  });


  
});