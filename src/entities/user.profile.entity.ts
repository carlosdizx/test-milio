import {
  Entity,
  PrimaryGeneratedColumn,
  BaseEntity,
  Column,
  OneToOne,
  JoinColumn,
} from 'typeorm';
import UserEntity from './user.entity';
@Entity({ name: 'user_profiles' })
export default class UserEntityProfile extends BaseEntity {
  @PrimaryGeneratedColumn('uuid')
  readonly id: string;

  @Column({ name: 'first_name', type: 'varchar' })
  firstName: string;

  @Column({ name: 'last_name', type: 'varchar' })
  lastName: string;

  @Column({ name: 'document_number', type: 'varchar' })
  documentNumber: string;

  @OneToOne(() => UserEntity)
  @JoinColumn({ name: 'user_id' })
  user: UserEntity;
}
