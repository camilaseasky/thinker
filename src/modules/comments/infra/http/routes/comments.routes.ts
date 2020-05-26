import { Router } from 'express';
import CommentsController from '../controllers/CommentsController';
import ensureAuthenticated from '@modules/users/infra/http/middlewares/ensureAuthenticated';

const commentsRouter = Router();
const commentsController = new CommentsController();

commentsRouter.use(ensureAuthenticated);

commentsRouter.post('/',commentsController.create);
commentsRouter.get('/:comment_id', commentsController.show);
commentsRouter.put('/:comment_id',  commentsController.update);
commentsRouter.delete('/:comment_id', commentsController.delete);

export default commentsRouter;