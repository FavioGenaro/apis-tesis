import { Column, CreateDateColumn, Entity, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";

@Entity()
export class Brand {

  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column('text', {
    nullable: false
  })
  name: string;

  @Column('boolean', {
    default: true
  })
  is_active: boolean;

  @CreateDateColumn()
  created_at: Date;

  @UpdateDateColumn()
  updated_at: Date;

}
