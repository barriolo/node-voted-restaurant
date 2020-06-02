import { Router } from 'express';
import { getCustomRepository } from 'typeorm';
import RestaurantRepository from '../repositories/RestaurantsRepository';
import CreateRestaurantService from '../services/CreateRestaurant';

const restaurantRouter = Router();

restaurantRouter.post('/', async (request, response) => {
  try {
    const { name } = request.body;
    const createRestaurant = new CreateRestaurantService();
    const restaurant = await createRestaurant.excute({ name });
    return response.json(restaurant);
  } catch (err) {
    return response.status(400).json({ error: err.message });
  }
});

restaurantRouter.get('/', async (request, response) => {
  const restaurantRepository = getCustomRepository(RestaurantRepository);
  const votes = await restaurantRepository.find();

  return response.json(votes);
});
export default restaurantRouter;
