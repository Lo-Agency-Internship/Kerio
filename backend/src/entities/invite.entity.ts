import {
    Column,
    CreateDateColumn,
    DeleteDateColumn,
    Entity,
    PrimaryGeneratedColumn,
    UpdateDateColumn,
  } from 'typeorm';
  
  @Entity()
  export class Invite {
    @PrimaryGeneratedColumn()
    id: number;
  
    @Column()
    orgId: number;
  
    @Column()
    email: string;
  
    @Column()
    token: string;
  
    @Column()
    accepted: boolean;
  
    @CreateDateColumn()
    createdAt: Date;
  
    @UpdateDateColumn()
    updatedAt: Date;
  
    @DeleteDateColumn()
    deletedAt: Date;
  }
  