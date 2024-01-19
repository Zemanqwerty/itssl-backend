import { Records } from 'src/records/records.entity';
import { Users } from 'src/users/users.entity';
import { JoinTable, ManyToMany, Entity, Column, PrimaryGeneratedColumn, Generated, OneToMany, CreateDateColumn, UpdateDateColumn } from 'typeorm';

@Entity()
export class Lessons {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  type: string;

  @Column()
  title: string;

  @Column()
  isOnline: boolean;

  @Column({type: "timestamp"})
  dateTime: Date;

  @OneToMany(() => Records, (record) => record.user)
  records: Records[]
}