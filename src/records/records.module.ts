import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { LessonsModule } from 'src/lessons/lessons.module';
import { RecordsService } from './records.service';
import { UsersModule } from 'src/users/users.module';
import { Lessons } from 'src/lessons/lessons.entity';
import { RecordsController } from './records.controller';
import { Records } from './records.entity';

@Module({
    imports: [TypeOrmModule.forFeature([Records]),
            LessonsModule, UsersModule],
    providers: [RecordsService],
    controllers: [RecordsController],
    exports: []
})
export class RecordsModule {}
