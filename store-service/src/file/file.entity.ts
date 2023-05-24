import { BaseEntity } from 'src/base/base_entity';
import { Entity, Column, PrimaryGeneratedColumn, OneToMany, CreateDateColumn,UpdateDateColumn} from 'typeorm';

@Entity()
export class FileEntity extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ name: "file_name", nullable: false })
  fileName: string;

  @Column({ name: "key", unique: true })
  key: string;

  @Column({ name: "url", nullable: false })
  imageUrl: string;
}