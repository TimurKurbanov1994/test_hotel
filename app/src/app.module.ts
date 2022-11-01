import { Module } from '@nestjs/common';
import { ClientModule } from './client/client.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ClientEntity } from './client/entities/client.entity';
import { OrderModule } from './order/order.module';
import { OrderEntity } from './order/entities/order.entity';
import { RoomModule } from './room/room.module';
import { RoomEntity } from './room/entitites/room.entity';
import { ConfigModule } from '@nestjs/config';

@Module({
  imports: [
    ClientModule,
    OrderModule,
    RoomModule,
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: '.env',
    }),
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: process.env.DB_HOST,
      port: 5432,
      username: process.env.POSTGRES_USER,
      password: process.env.POSTGRES_PASSWORD,
      database: process.env.POSTGRES_DB,
      entities: [ClientEntity, OrderEntity, RoomEntity],
      synchronize: true,
    }),
  ],
})
export class AppModule {}
