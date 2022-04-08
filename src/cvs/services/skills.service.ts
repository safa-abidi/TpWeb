import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { SkillEntity } from '../entities/skill.entity';
import { CreateSkillDto } from '../dto/create-skill.dto';
import { UpdateSkillDto } from '../dto/update-skill.dto';

@Injectable()
export class SkillsService {
  constructor(
    @InjectRepository(SkillEntity)
    private readonly skillRepository: Repository<SkillEntity>,
  ) {}
  async create(createSkillDto: CreateSkillDto) {
    return await this.skillRepository.save(createSkillDto);
  }

  async findAll() {
    return await this.skillRepository.find();
  }

  async findOne(id: number) {
    return await this.skillRepository.find({ id: id });
  }

  async update(id: number, updateSkillDto: UpdateSkillDto) {
    return await this.skillRepository.update(id, updateSkillDto);
  }

  async remove(id) {
    return await this.skillRepository.delete(id);
  }
}
