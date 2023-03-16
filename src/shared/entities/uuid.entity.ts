import { ApiProperty } from '@nestjs/swagger';
import { Column, PrimaryColumn, PrimaryGeneratedColumn, UpdateDateColumn } from 'typeorm';

export class UUIDEntity {
  @ApiProperty()
  @PrimaryGeneratedColumn('uuid')
  @PrimaryColumn({ name: 'id', type: 'uuid' })
  id!: string;

  @ApiProperty()
  @UpdateDateColumn({ name: 'created', type: 'timestamp', default: () => 'CURRENT_TIMESTAMP(6)' })
  created!: Date;

  @ApiProperty()
  @Column({ name: 'updated', default: () => 'CURRENT_TIMESTAMP(6)', onUpdate: 'CURRENT_TIMESTAMP(6)' })
  updated!: Date;
}