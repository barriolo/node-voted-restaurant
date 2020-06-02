import { Router } from 'express';
import { parseISO } from 'date-fns';
import { getCustomRepository } from 'typeorm';
import VotesRepository from '../repositories/VotesRepository';
import CreateVoteService from '../services/CreateVoteService';

const votesRouter = Router();

votesRouter.post('/', async (request, response) => {
  try {
    const { provider, date, restaurant } = request.body;

    const parsedDate = parseISO(date);

    const createVote = new CreateVoteService();
    const vote = await createVote.excute({
      provider,
      date: parsedDate,
      restaurant,
    });
    return response.json(vote);
  } catch (err) {
    return response.status(400).json({ error: err.message });
  }
});

votesRouter.get('/', async (request, response) => {
  const votesRepository = getCustomRepository(VotesRepository);
  const votes = await votesRepository.find();

  return response.json(votes);
});

votesRouter.get('/day', async (request, response) => {
  const votesRepository = getCustomRepository(VotesRepository);
  const contVotes = await votesRepository.findAndCountVotes();

  return response.json(contVotes);
});
export default votesRouter;
