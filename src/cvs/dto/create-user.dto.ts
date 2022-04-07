import {
  IsDefined,
  IsEmail,
  IsNotEmpty,
  IsString,
  Length,
} from 'class-validator';

export class CreateUserDto {
  @IsDefined({ message: 'A necessary field $property' })
  @Length(3, 10)
  username: string;
  @IsDefined()
  @IsEmail()
  email: string;
  @IsString()
  @IsNotEmpty()
  password: string;
}
