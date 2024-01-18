import { Entity, Column, PrimaryGeneratedColumn, Generated, OneToMany, CreateDateColumn, UpdateDateColumn } from 'typeorm';

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

  @Column()
  conclusionDate: Date;

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
}