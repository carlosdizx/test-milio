import {
  BaseEntity,
  Column,
  Entity,
  JoinColumn,
  OneToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import UserEntityProfile from './user.profile.entity';

@Entity({ name: 'users' })
export default class User extends BaseEntity {
  @PrimaryGeneratedColumn('uuid')
  readonly id: string;

  @Column({ name: 'email', type: 'varchar', unique: true })
  email: string;

  @Column({ name: 'password', type: 'varchar' })
  password: string;

  @OneToOne(() => UserEntityProfile)
  @JoinColumn({ name: 'profile_id' })
  profile: UserEntityProfile;
}
