import { Module } from '@nestjs/common';
import { ClientModule } from './client/client.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ClientEntity } from './client/entities/client.entity';
import { OrderModule } from './order/order.module';
import { OrderEntity } from './order/entities/order.entity';
import { RoomModule } from './room/room.module';
import { RoomEntity } from './room/entitites/room.entity';

@Module({
  imports: [
    ClientModule,
    OrderModule,
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: 'localhost',
      port: 5432,
      username: 'user',
      password: 'password',
      database: 'hotel',
      entities: [ClientEntity, OrderEntity, RoomEntity],
      synchronize: true,
    }),
    RoomModule,
  ],
})
export class AppModule {}
