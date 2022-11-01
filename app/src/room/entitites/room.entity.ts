import {
  Column,
  Entity,
  JoinColumn,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { OrderEntity } from '../../order/entities/order.entity';

@Entity('room')
export class RoomEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ unique: false, nullable: false })
  type: string;

  @Column({ unique: false, nullable: false })
  price: number;

  @Column({ unique: false, nullable: false })
  square: number;

  @OneToMany(() => OrderEntity, (order: OrderEntity) => order.room)
  @JoinColumn()
  orders: OrderEntity[];
}
