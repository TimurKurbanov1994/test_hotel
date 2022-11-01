import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import { ClientEntity } from '../../client/entities/client.entity';
import { RoomEntity } from '../../room/entitites/room.entity';

@Entity('order')
export class OrderEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ unique: false, nullable: false, type: 'date' })
  start_date: Date;

  @Column({ unique: false, nullable: true, type: 'date' })
  end_date: Date;

  @Column({ default: true })
  booked: boolean;

  @Column({ nullable: false })
  vip: boolean;

  @ManyToOne(() => ClientEntity, (client) => client.orders, {
    nullable: false,
    onDelete: 'CASCADE',
  })
  client: ClientEntity;

  @ManyToOne(() => RoomEntity, (room) => room.orders, { nullable: false })
  room: RoomEntity;
}
