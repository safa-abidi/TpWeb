import { IsOptional } from 'class-validator';
import { Type } from 'class-transformer';

export class StatsTodoDto {
  @Type(() => Date)
  @IsOptional()
  date_debut: Date;

  @Type(() => Date)
  @IsOptional()
  date_fin: Date;
}
