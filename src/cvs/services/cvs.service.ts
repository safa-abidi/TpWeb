import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CvEntity } from '../entities/cv.entity';
import { CreateCvDto } from '../dto/create-cv.dto';
import { UpdateCvDto } from '../dto/update-cv.dto';

@Injectable()
export class CvsService {
  constructor(
    @InjectRepository(CvEntity)
    private readonly cvRepository: Repository<CvEntity>,
  ) {}
  async create(createCvDto: CreateCvDto) {
    return await this.cvRepository.save(createCvDto);
  }

  async findAll() {
    return await this.cvRepository.find();
  }

  async findOne(id: number) {
    return await this.cvRepository.find({ id: id });
  }

  async update(id: number, updateCvDto: UpdateCvDto) {
    return await this.cvRepository.update(id, updateCvDto);
  }

  async remove(id) {
    return await this.cvRepository.delete(id);
  }
}
