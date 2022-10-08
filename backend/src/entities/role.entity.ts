import { IRole } from 'seed/role/role.interface';
import { ERoleSeed } from 'seed/seed.type';
import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class Role implements IRole {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: ERoleSeed;

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
