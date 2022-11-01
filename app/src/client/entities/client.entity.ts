import {
  Column,
  Entity,
  JoinColumn,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { OrderEntity } from '../../order/entities/order.entity';

@Entity('client')
export class ClientEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ nullable: false })
  name: string;

  @Column({ nullable: false })
  lastName: string;

  @Column({ default: false })
  vip: boolean;

  @OneToMany(() => OrderEntity, (order: OrderEntity) => order.client)
  @JoinColumn()
  orders: OrderEntity[];
}
