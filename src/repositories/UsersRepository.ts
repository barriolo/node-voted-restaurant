import { EntityRepository, Repository } from 'typeorm';
import User from '../models/User';

@EntityRepository(User)
class VotesRepository extends Repository<User> {}

export default VotesRepository;
