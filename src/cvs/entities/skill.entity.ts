import {
  Column,
  CreateDateColumn,
  DeleteDateColumn,
  Entity,
  ManyToMany,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
  VersionColumn,
} from 'typeorm';
import { CvEntity } from './cv.entity';

@Entity()
export class SkillEntity {
  @PrimaryGeneratedColumn({
    type: 'int',
  })
  id: number;
  @Column()
  designation: string;
  @ManyToMany(() => CvEntity, (cv) => cv.skills)
  cv: CvEntity[];
  @CreateDateColumn()
  createdAt: Date;
  @UpdateDateColumn()
  updatedAt: Date;
  @DeleteDateColumn()
  deletedAt: Date;
  @VersionColumn()
  version: number;
}
