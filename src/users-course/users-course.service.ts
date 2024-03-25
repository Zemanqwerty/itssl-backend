import { HttpException, HttpStatus, Injectable, UnauthorizedException } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { Users } from "src/users/users.entity";
import { UsersCourse } from "./users-course.entity";

@Injectable()
export class UsersCourseService {
    constructor(
        @InjectRepository(UsersCourse)
        private usersCourseRepository: Repository<UsersCourse>,
    ) {};

    async create(courseTitle: string, user: Users) {
        const newUsersCourse = new UsersCourse();
        newUsersCourse.courseTitle = courseTitle;
        newUsersCourse.user = user;
        return await this.usersCourseRepository.save(newUsersCourse);
    }

    async update(courseTitle: string, user: Users) {
        const usersCourse = await this.usersCourseRepository.findOne({
            relations: {
                user: true
            },
            where: {
                user: {
                    id: user.id
                },
                courseTitle: courseTitle
            }
        })

        if (usersCourse) {
            return 
        }

        const newUsersCourse = new UsersCourse();
        newUsersCourse.courseTitle = courseTitle;
        newUsersCourse.user = user;
        return await this.usersCourseRepository.save(newUsersCourse);
    }
}