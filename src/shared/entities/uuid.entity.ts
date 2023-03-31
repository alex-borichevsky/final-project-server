import { Column, PrimaryColumn, PrimaryGeneratedColumn, UpdateDateColumn } from 'typeorm';

export class UUIDEntity {
  @PrimaryGeneratedColumn('uuid')
  @PrimaryColumn({ name: 'id', type: 'uuid' })
  id!: string;

  @UpdateDateColumn({ name: 'created', type: 'timestamp', default: () => 'CURRENT_TIMESTAMP(6)' })
  created!: Date;

  @Column({ name: 'updated', default: () => 'CURRENT_TIMESTAMP(6)', onUpdate: 'CURRENT_TIMESTAMP(6)' })
  updated!: Date;
}