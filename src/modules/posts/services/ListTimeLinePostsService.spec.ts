import FakePostsRepository from '../repositories/fakes/FakePostsRepository';
import ListTimeLinePostService from './ListTimeLinePostsService';

let fakePostsRepository: FakePostsRepository;

let listTimeLinePostService: ListTimeLinePostService;

describe('ShowPost', () => {
  beforeEach(() => {
    fakePostsRepository = new FakePostsRepository();
    listTimeLinePostService = new ListTimeLinePostService(
      fakePostsRepository,
    );
  });
  
  it('Should be able to show a timeline posts', async () => {
    await fakePostsRepository.create({
      content: 'Hoje é o dia de brincar!',
      date: new Date(2020, 5, 22, 7),
      user_id: 'user01',
    });

    await fakePostsRepository.create({
      content: 'Hoje é o dia que não será esquecido!',
      date: new Date(2020, 5, 26, 7),
      user_id: 'user02',
    });

    await fakePostsRepository.create({
      content: 'Hoje é o dia de realizar!',
      date: new Date(2020, 5, 25, 7),
      user_id: 'user01',
    });

    const timeLine = await listTimeLinePostService.execute();

    expect(timeLine[0].content).toBe('Hoje é o dia que não será esquecido!')

    
  });

  
});
