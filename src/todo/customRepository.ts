import { Repository } from 'typeorm';

export class CustomRepository<Entity> extends Repository<Entity> {
  getPaginatedData(limit: number, offset: number) {
    const data = this.find({
      take: limit,
      skip: offset,
    });

    return data;
  }
}
