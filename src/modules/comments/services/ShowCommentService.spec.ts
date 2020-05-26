import FakeCommentsRepository from '../repositories/fakes/FakeCommentsRepository';
import ShowCommentService from './ShowCommentService';


let fakeCommentsRepository: FakeCommentsRepository;

let showCommentService: ShowCommentService;

describe('ShowComment', () => {
  beforeEach(() => {
    fakeCommentsRepository = new FakeCommentsRepository();
    showCommentService = new ShowCommentService(
      fakeCommentsRepository,
    );
  });
  
  it('Should be able to show a comment in a post', async () => {
    
    const comment = await fakeCommentsRepository.create({
      content: 'Comentário bla bla bla!',
      date: new Date(),
      user_id: 'user02',
      post_id: 'post01',
    });

    const commentShow = await showCommentService.execute(comment.id);

    expect(commentShow).not.toBeNull();
  });

  
});