import { Router } from 'express';
import PostsController from '../controllers/PostsController';
import PostCommentsController from '@modules/comments/infra/http/controllers/PostCommentsController';
import ensureAuthenticated from '@modules/users/infra/http/middlewares/ensureAuthenticated';

const postsRouter = Router();
const postsController = new PostsController();
const postCommentsController = new PostCommentsController();

postsRouter.use(ensureAuthenticated);


postsRouter.post('/',postsController.create);
postsRouter.get('/timeline', postsController.index);
postsRouter.get('/:post_id', postsController.show);
postsRouter.put('/:post_id',  postsController.update);
postsRouter.delete('/:post_id', postsController.delete);
postsRouter.get('/:post_id/comments', postCommentsController.index);

export default postsRouter;
