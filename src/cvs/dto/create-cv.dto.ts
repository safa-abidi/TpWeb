import { IsDefined, IsInt, IsString, Length, MinLength } from 'class-validator';
import { UserEntity } from '../entities/user.entity';

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
  @Length(8)
  cin: number;
  @IsString()
  job: string;
  @IsString()
  path: string;
  @IsInt()
  user: UserEntity;
}
