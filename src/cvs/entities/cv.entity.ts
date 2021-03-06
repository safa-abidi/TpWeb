import {
  Column,
  CreateDateColumn,
  DeleteDateColumn,
  Entity,
  JoinTable,
  ManyToMany,
  ManyToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
  VersionColumn,
} from 'typeorm';
import { UserEntity } from './user.entity';
import { SkillEntity } from './skill.entity';

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
  @ManyToMany(() => SkillEntity, (skill) => skill.cv)
  @JoinTable({
    name: 'cv_skills',
    joinColumn: { name: 'cvId', referencedColumnName: 'id' },
    inverseJoinColumn: { name: 'skillId' },
  })
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
