import { Module } from '@nestjs/common';
import { CvsService } from './services/cvs.service';
import { CvsController } from './controllers/cvs.controller';
import { SkillsController } from './controllers/skills.controller';
import { UsersController } from './controllers/users.controller';
import { UsersService } from './services/users.service';
import { SkillsService } from './services/skills.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CvEntity } from './entities/cv.entity';
import { UserEntity } from './entities/user.entity';
import { SkillEntity } from './entities/skill.entity';

@Module({
  imports: [TypeOrmModule.forFeature([CvEntity, UserEntity, SkillEntity])],
  controllers: [CvsController, UsersController, SkillsController],
  providers: [CvsService, UsersService, SkillsService],
})
export class CvsModule {}
