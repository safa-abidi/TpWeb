import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { PremierModule } from './premier/premier.module';
import { TodoModule } from './todo/todo.module';
import { ConfigModule } from '@nestjs/config';
import { devConfig } from './config/dev.config';
import { prodConfig } from './config/prod.config';
import { TypeOrmModule } from '@nestjs/typeorm';
<<<<<<< HEAD
=======
import { CvsModule } from './cvs/cvs.module';
import { CvEntity } from './cvs/entities/cv.entity';
import { SkillEntity } from './cvs/entities/skill.entity';
import { UserEntity } from './cvs/entities/user.entity';
import { TodoEntity } from './todo/Entity/todo.entity';
>>>>>>> 1f2ddeee6289213206791e737a2f4920aa6ec221

@Module({
  imports: [
    PremierModule,
    TodoModule,
    CvsModule,
    ConfigModule.forRoot({
      isGlobal: true,
      load: [process.env.NODE_ENV == 'development' ? devConfig : prodConfig],
    }),
    TypeOrmModule.forRoot({
      type: 'mysql',
      host: process.env.DB_HOST,
      port: 3306,
      username: process.env.DB_USER,
      password: process.env.DB_PASSWORD,
      database: process.env.DB_NAME,
      autoLoadEntities: true,
      synchronize: true,
    }),
  ],
  controllers: [AppController],
  providers: [],
})
export class AppModule {}
