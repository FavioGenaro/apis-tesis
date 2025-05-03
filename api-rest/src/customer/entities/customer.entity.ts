import { Column, CreateDateColumn, Entity, JoinColumn, OneToMany, OneToOne, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";
import { Address } from './address.entity';

@Entity()
export class Customer {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ type: 'varchar', length: 100 })
  first_name: string;

  @Column({ type: 'varchar', length: 100 })
  last_name: string;

  @Column({ type: 'varchar', length: 150, unique: true })
  email: string;

  @Column({ type: 'varchar', length: 20, nullable: true })
  phone: string;

  // @Column({ type: 'char', length: 3, default: 'USD' })
  // currency: string;

  @Column({ type: 'text', nullable: false })
  password: string; // Aquí se almacena el hash de la contraseña

  // @OneToOne(() => Address, (address) => address.id, { cascade: false, eager: true })
  // @JoinColumn({ name: 'id_default_address' }) // campo que se guarda en la tabla `customers`
  // default_address: Address | null;

  @OneToMany(
    () => Address,
    (address) => address.customer,
    { cascade: true, eager: true }
  )
  addresses: Address[];

  @CreateDateColumn()
  created_at: Date;

  @UpdateDateColumn()
  updated_at: Date;

}
