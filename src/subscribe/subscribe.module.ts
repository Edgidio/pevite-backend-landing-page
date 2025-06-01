import { Module } from '@nestjs/common';
import { SubscribesService } from './subscribe.service';
import { SubscribesController } from './subscribe.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Subscribe } from './entities/subscribe.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Subscribe])],
  controllers: [SubscribesController],
  providers: [SubscribesService],
})
export class SubscribeModule {}
