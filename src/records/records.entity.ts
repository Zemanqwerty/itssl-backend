import { Lessons } from 'src/lessons/lessons.entity';
import { Users } from 'src/users/users.entity';
import { ManyToOne, JoinTable, Entity, Column, PrimaryGeneratedColumn, Generated, OneToMany, CreateDateColumn, UpdateDateColumn } from 'typeorm';

@Entity()
export class Records {
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne(() => Users, (user) => user.records)
  user: Users;

  @ManyToOne(() => Lessons, (lesson) => lesson.records)
  lesson: Lessons;
}