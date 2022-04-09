import {
  IsArray,
  IsDefined,
  IsInt,
  IsString,
  Length,
  Max,
  Min,
  MinLength,
} from 'class-validator';
import { UserEntity } from '../entities/user.entity';
import { SkillEntity } from '../entities/skill.entity';

export class CreateCvDto {
  @IsDefined({ message: 'A necessary field $property' })
  @Length(3, 10)
  name: string;
  @IsDefined()
  @MinLength(3)
  firstname: string;
  @IsInt()
  age: number;
  @IsInt()
  @Min(10000000)
  @Max(99999999)
  cin: number;
  @IsString()
  job: string;
  @IsString()
  path: string;
  @IsInt()
  user: UserEntity;
  @IsArray()
  skills: SkillEntity[];
}
