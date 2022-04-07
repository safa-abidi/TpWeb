import { TodoStatusEnum } from '../enums/todo-status.enum';
import { IsEnum, IsOptional } from 'class-validator';
import { CreateDateColumn } from 'typeorm';
import { Type } from 'class-transformer';

export class StatsTodoDto {
  @Type(() => Date)
  @IsOptional()
  date_debut: Date;

  @Type(() => Date)
  @IsOptional()
  date_fin: Date;
}
