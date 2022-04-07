import {
  IsString,
  Length,
} from 'class-validator';

export class CreateSkillDto {
  @IsString()
  @Length(3, 10)
  designation: string;
}
