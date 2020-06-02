import { EntityRepository, Repository } from 'typeorm';
import Restaurant from '../models/Restaurant';

@EntityRepository(Restaurant)
class RestaurantRepository extends Repository<Restaurant> {}

export default RestaurantRepository;
