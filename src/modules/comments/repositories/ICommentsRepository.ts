import Comment from '../infra/typeorm/entities/Comment';
import ICreateCommentDTO from '../dtos/ICreateCommentDTO';

export default interface ICommentsRepository {
  findAllByPostId(post_id: string): Promise<Comment[] | undefined>;
  findById(comment_id: string): Promise<Comment | undefined>;
  create(data: ICreateCommentDTO): Promise<Comment>;
  save(comment: Comment): Promise<Comment>;
  delete(comment_id: string): Promise<void>;
}