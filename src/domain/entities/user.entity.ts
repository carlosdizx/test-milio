import { Entity, PrimaryGeneratedColumn, BaseEntity, Column } from 'typeorm';

@Entity({ name: 'users' })
export default class User extends BaseEntity {
  @PrimaryGeneratedColumn('uuid')
  readonly id: string;

  @Column({ name: 'email', type: 'varchar', unique: true })
  email: string;

  @Column({ name: 'password', type: 'varchar' })
  password: string;
}
