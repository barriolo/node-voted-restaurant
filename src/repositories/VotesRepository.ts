/* eslint-disable camelcase */
import { EntityRepository, Repository } from 'typeorm';
import { startOfDay } from 'date-fns';
import Vote from '../models/Vote';

@EntityRepository(Vote)
class VotesRepository extends Repository<Vote> {
  public async findByDateAndProvider(
    date: Date,
    provider_id: string,
  ): Promise<Vote | null> {
    const findVote = await this.findOne({
      where: {
        date,
        provider_id,
      },
    });
    return findVote || null;
  }

  public async findAndCountVotes(): Promise<any> {
    const findCountVote = await this.createQueryBuilder('votes')
      .select('votes.restaurant_id')
      .addSelect('COUNT(*) AS total')
      .innerJoinAndSelect('votes.restaurant_id', 'restaurant')
      .where('date = :date', { date: startOfDay(new Date()) })
      .groupBy('votes.restaurant_id')
      .addGroupBy('restaurant.id')
      .orderBy('total', 'DESC')
      .limit(1)
      .getRawMany();
    return findCountVote;
  }
}

export default VotesRepository;
