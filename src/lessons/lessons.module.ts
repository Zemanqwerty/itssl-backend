import { Module } from '@nestjs/common';
import { Lessons } from './lessons.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { LessonsService } from './lessons.service';
import { LessonsController } from './lessons.controller';

@Module({
    imports: [TypeOrmModule.forFeature([Lessons]),],
    providers: [LessonsService],
    controllers: [LessonsController],
    exports: [LessonsService]
})
export class LessonsModule {}
