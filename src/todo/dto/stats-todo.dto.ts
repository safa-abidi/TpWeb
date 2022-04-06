import { TodoStatusEnum } from '../enums/todo-status.enum';
import { IsEnum, IsOptional } from 'class-validator';

export class StatsTodoDto {

  @IsOptional()
  date_debut: string;

  @IsOptional()
  date_fin: string;
}
