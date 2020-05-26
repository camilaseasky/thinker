import { container } from 'tsyringe';


import IUsersRepository from '@modules/users/repositories/IUsersRepository';
import UsersRepository from '@modules/users/infra/typeorm/repositories/UsersRepository';

import IPostsRepository from '@modules/posts/repositories/IPostsRepository';
import PostsRepository from '@modules/posts/infra/typeorm/repositories/PostsRepository';


import ICommentsRepository from '@modules/comments/repositories/ICommentsRepository';
import CommentsRepository from '@modules/comments/infra/typeorm/repositories/CommentsRepository';



container.registerSingleton<IUsersRepository>(
  'UsersRepository',
  UsersRepository,
);

container.registerSingleton<IPostsRepository>(
  'PostsRepository',
  PostsRepository,
);

container.registerSingleton<ICommentsRepository>(
  'CommentsRepository',
  CommentsRepository,
);