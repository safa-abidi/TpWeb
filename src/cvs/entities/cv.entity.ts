import {
  Column,
  CreateDateColumn,
  DeleteDateColumn,
  Entity,
  ManyToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
  VersionColumn,
} from 'typeorm';
import { UserEntity } from './user.entity';

@Entity()
export class CvEntity {
  @PrimaryGeneratedColumn({
    type: 'int',
  })
  id: number;
  @Column()
  name: string;
  @Column()
  firstname: string;
  @Column({
    type: 'int',
  })
  age: number;
  @Column({
    type: 'int',
  })
  cin: number;
  @Column()
  job: string;
  @Column()
  path: string;
  @ManyToOne(() => UserEntity, (user) => user.cv)
  user: UserEntity;
  @CreateDateColumn()
  createdAt: Date;
  @UpdateDateColumn()
  updatedAt: Date;
  @DeleteDateColumn()
  deletedAt: Date;
  @VersionColumn()
  version: number;
}
