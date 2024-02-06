import { Lessons } from 'src/lessons/lessons.entity';
import { Records } from 'src/records/records.entity';
import { Role } from 'src/roles/roles.enum';
import { ManyToMany, JoinTable, Entity, Column, PrimaryGeneratedColumn, Generated, OneToMany, CreateDateColumn, UpdateDateColumn } from 'typeorm';

@Entity()
export class Users {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  childrenFIO: string;

  @Column({
    type: String,
    nullable: true,
  })
  parrentFIO!: string | null;

  @Column()
  age: number;

  @Column()
  contractNumber: string;

  @Column({type: 'date'})
  conclusionDate: string;

  @Column()
  phoneNumber: string;

  @Column({
    unique: true
  })
  email: string;

  @Column()
  password: string;

  @Column()
  course: string;

  @Column({
    default: Role.Client
  })
  role: Role;

  @OneToMany(() => Records, (record) => record.user)
  records: Records[]
}