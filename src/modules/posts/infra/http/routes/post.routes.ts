import { Router } from 'express';
import PostsController from '../controllers/PostsController';
import ensureAuthenticated from '@modules/users/infra/http/middlewares/ensureAuthenticated';

const postsRouter = Router();
const postsController = new PostsController();

postsRouter.use(ensureAuthenticated);

postsRouter.post('/',postsController.create);
postsRouter.get('/:post_id', postsController.show);
postsRouter.put('/:post_id',  postsController.update);
postsRouter.delete('/:post_id', postsController.delete);

export default postsRouter;
