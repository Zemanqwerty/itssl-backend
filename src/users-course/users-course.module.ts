import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UsersCourse } from './users-course.entity';
import { UsersCourseService } from './users-course.service';

@Module({
    imports: [
        TypeOrmModule.forFeature([UsersCourse]),
    ],
    providers: [UsersCourseService],
    exports: [UsersCourseService]
})
export class UsersCourseModule {}
