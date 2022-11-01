import { Module } from '@nestjs/common';
import { OrderController } from './order.controller';
import { OrderService } from './order.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { OrderEntity } from './entities/order.entity';
import { ClientEntity } from '../client/entities/client.entity';
import { ClientService } from '../client/client.service';
import { RoomService } from '../room/room.service';
import { RoomEntity } from '../room/entitites/room.entity';

@Module({
  imports: [TypeOrmModule.forFeature([OrderEntity, ClientEntity, RoomEntity])],
  controllers: [OrderController],
  providers: [OrderService, ClientService, RoomService],
})
export class OrderModule {}
