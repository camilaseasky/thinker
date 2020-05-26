import { getRepository, Repository } from 'typeorm';

import ICreateCommentDTO from '@modules/comments/dtos/ICreateCommentDTO';
import ICommentsRepository from '@modules/comments/repositories/ICommentsRepository';
import Comment from '../entities/Comment';
import User from '@modules/users/infra/typeorm/entities/User';

class CommentsRepository implements ICommentsRepository {
  private ormRepository: Repository<Comment>;

  constructor() {
    this.ormRepository = getRepository(Comment);
  }

  public async findAllByPostId(post_id: string): Promise<Comment[] | undefined> {
    const comments = await this.ormRepository.find({
      where: {post_id},
      relations: ['user'],
    });

    return comments;

  }

  public async findById(comment_id: string): Promise<Comment | undefined> {
    const comment = await this.ormRepository.findOne({
      where: { id: comment_id },
      relations: ['user']
    });

    return comment;
  }

    
  public async create(commentData: ICreateCommentDTO): Promise<Comment> {
    const comment =  this.ormRepository.create(commentData);

    await this.ormRepository.save(comment);

    return comment;
  }

  public async save(comment: Comment): Promise<Comment> {
    return await this.ormRepository.save(comment);
  }

  public async delete(comment_id: string): Promise<void> {
    const comment = await this.ormRepository.findOne({
      where: {id: comment_id}
    })

    if(comment){
      await this.ormRepository.remove(comment);
    }
   
  }
}

export default CommentsRepository;
