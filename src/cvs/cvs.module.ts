import { Module } from '@nestjs/common';
import { CvsService } from './services/cvs.service';
import { CvsController } from './controllers/cvs.controller';

@Module({
  controllers: [CvsController],
  providers: [CvsService]
})
export class CvsModule {}
