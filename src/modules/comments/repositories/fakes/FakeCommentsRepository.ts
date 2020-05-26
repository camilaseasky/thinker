import { uuid } from 'uuidv4';
import ICreateCommentDTO from '@modules/comments/dtos/ICreateCommentDTO';
import ICommentsRepository from '../ICommentsRepository';
import Comment from '@modules/comments/infra/typeorm/entities/Comment';

class FakeCommentsRepository implements ICommentsRepository {
  private comments: Comment[] = [];

  public async findAllByPostId(post_id: string): Promise<Comment[] | undefined> {
    const comments = this.comments.filter(comment => comment.post_id === post_id);
    
    return comments;

  }

  public async findById(comment_id: string): Promise<Comment | undefined> {
    const foundComment = this.comments.find(comment => comment.id === comment_id);

    return foundComment;
  }

  
  public async create(commentData: ICreateCommentDTO): Promise<Comment> {
    const comment = new Comment();

    Object.assign(comment, { id: uuid() }, commentData);

    this.comments.push(comment);

    return comment;
  }

  public async save(comment: Comment): Promise<Comment> {
    const indexOfComment = this.comments.findIndex(c => c.id === comment.id);

    this.comments[indexOfComment] = comment;

    return comment;
  }

  public async delete(comment_id: string): Promise<void> {
    const indexOfComment = this.comments.findIndex(c => c.id === comment_id);

    this.comments.splice(indexOfComment, 1);

    
  }
}

export default FakeCommentsRepository;
