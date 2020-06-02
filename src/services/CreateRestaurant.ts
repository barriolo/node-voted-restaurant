import { getCustomRepository } from 'typeorm';
import Restaurant from '../models/Restaurant';
import RestaurantsRepository from '../repositories/RestaurantsRepository';

interface Request {
  name: string;
}

class CreateRestaurant {
  public async excute({ name }: Request): Promise<Restaurant> {
    const restaurantRepository = getCustomRepository(RestaurantsRepository);
    const nameAlreadyExists = await restaurantRepository.findOne({
      where: {
        name,
      },
    });
    if (nameAlreadyExists) {
      throw new Error('The restaurant name already exists!');
    }
    const restaurant = restaurantRepository.create({ name });
    await restaurantRepository.save(restaurant);
    return restaurant;
  }
}

export default CreateRestaurant;
