import {
  Column,
  CreateDateColumn,
  DeleteDateColumn,
  Entity,
  JoinTable,
  ManyToMany,
  OneToMany,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
  VersionColumn,
} from 'typeorm';
import { CvEntity } from './cv.entity';
import { SkillEntity } from './skill.entity';

@Entity()
export class UserEntity {
  @PrimaryGeneratedColumn({
    type: 'int',
  })
  id: number;
  @Column()
  username: string;
  @Column()
  email: string;
  @Column()
  password: string;
  @OneToMany(() => CvEntity, (cv) => cv.user)
  cv: CvEntity[];
  @ManyToMany(() => SkillEntity)
  @JoinTable()
  skills: SkillEntity[];
  @CreateDateColumn()
  createdAt: Date;
  @UpdateDateColumn()
  updatedAt: Date;
  @DeleteDateColumn()
  deletedAt: Date;
  @VersionColumn()
  version: number;
}
