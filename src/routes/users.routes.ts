import { Router } from 'express';
import { getCustomRepository } from 'typeorm';
import CreateUserService from '../services/CreateUserService';
import UsersRepository from '../repositories/UsersRepository';

const usersRouter = Router();

usersRouter.get('/', async (request, response) => {
  const usersRepository = getCustomRepository(UsersRepository);
  const users = await usersRepository.find();

  return response.json(users);
});
usersRouter.post('/', async (request, response) => {
  const { name, email, password } = request.body;

  const createUser = new CreateUserService();
  const user = await createUser.execute({
    name,
    email,
    password,
  });
  delete user.password;
  return response.json(user);
});

export default usersRouter;
