import { Users } from 'src/users/users.entity';
import { Role } from 'src/roles/roles.enum';
import { ManyToOne, JoinTable, Entity, Column, PrimaryGeneratedColumn, Generated, OneToMany, CreateDateColumn, UpdateDateColumn } from 'typeorm';

@Entity()
export class UsersCourse {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  courseTitle: string;

  @Column({
    default: true
  })
  isActive: boolean;

  @ManyToOne(() => Users, (user) => user.usersCourse)
    user: Users
}