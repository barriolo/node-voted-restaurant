import {
  startOfDay,
  startOfWeek,
  lastDayOfWeek,
  addDays,
  isPast,
  subDays,
  compareAsc,
} from 'date-fns';
import { getCustomRepository, Between } from 'typeorm';
import Vote from '../models/Vote';
import VotesRepository from '../repositories/VotesRepository';

interface Request {
  provider: string;
  date: Date;
  restaurant: string;
}
class CreateVoteService {
  public async excute({ provider, date, restaurant }: Request): Promise<Vote> {
    const votesRepository = getCustomRepository(VotesRepository);
    const voteDate = startOfDay(date);
    const findVoteisSameProviderAndDate = await votesRepository.findByDateAndProvider(
      voteDate,
      provider,
    );
    if (findVoteisSameProviderAndDate) {
      throw new Error('This provider has already voted today!');
    }

    let daysWeek = [
      {
        day: 'domingo',
        value: null,
      },
      {
        day: 'segunda',
        value: null,
      },
      {
        day: 'terca',
        value: null,
      },
      {
        day: 'quarta',
        value: null,
      },
      {
        day: 'quinta',
        value: null,
      },
      {
        day: 'sexta',
        value: null,
      },
      {
        day: 'sabado',
        value: null,
      },
    ];
    const promises = daysWeek.map(async (day, index) => {
      const nextDay = addDays(startOfWeek(date), index);
      const pastDay = subDays(new Date(), 1);
      const findVoteBetweenDate = await votesRepository
        .createQueryBuilder('votes')
        .select('votes.restaurant_id')
        .addSelect('COUNT(*) AS total')
        .innerJoinAndSelect('votes.restaurant_id', 'restaurant')
        .where('date = :date', {
          date: nextDay,
        })
        .groupBy('votes.restaurant_id')
        .addGroupBy('restaurant.id')
        .orderBy('total', 'DESC')
        .limit(1)
        .getRawMany();
      if (compareAsc(pastDay, nextDay) === 1) {
        day.value = findVoteBetweenDate[0] || null;
      }
      // eslint-disable-next-line no-param-reassign
      return day;
    });
    daysWeek = await Promise.all(promises);
    // eslint-disable-next-line camelcase
    const restaurantChamp = daysWeek.some(
      day => day?.value?.restaurant_id === restaurant,
    );

    if (restaurantChamp) {
      throw new Error('Restaurant has already been chosen this week!');
    }

    const vote = votesRepository.create({
      provider_id: provider,
      date: voteDate,
      restaurant_id: restaurant,
    });
    await votesRepository.save(vote);
    return vote;
  }
}

export default CreateVoteService;
