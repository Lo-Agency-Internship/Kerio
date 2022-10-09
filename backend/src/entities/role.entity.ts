import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';
import { ERole } from '../utils/types';
import { IRole } from '../interfaces/role.entity.interface';

@Entity()
export class Role implements IRole {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({
    type: 'enum',
    enum: ERole,
    default: ERole.Owner,
    unique: true,
  })
  name: ERole;

  @Column({
    type: 'timestamp',
    default: () => 'CURRENT_TIMESTAMP',
  })
  createdAt: string;
  @Column({
    type: 'timestamp',
    default: () => 'CURRENT_TIMESTAMP',
  })
  updatedAt: string;
}
