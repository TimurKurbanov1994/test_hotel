import { IsNotEmpty, IsNumber, IsString } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';
import { CreateOrderDto } from './createOrder.dto';
import { ClientResponseDto } from '../../client/dto/clientResponse.dto';
import { ResponseRoomDto } from '../../room/dto/responseRoom.dto';
import { OrderEntity } from '../entities/order.entity';

export class ResponseOrderDto extends CreateOrderDto {
  constructor(order: OrderEntity) {
    super(order);

    this.id = order.id;
    this.start_date = order.start_date;
    this.end_date = order.end_date;
    this.client = new ClientResponseDto(order.client);
    this.room = new ResponseRoomDto(order.room);
    this.booked = order.booked;
  }

  @ApiProperty({ description: 'ID брони', nullable: false })
  @IsNotEmpty()
  @IsNumber()
  id: number;

  @ApiProperty({ description: 'ID брони', nullable: false })
  @IsNotEmpty()
  @IsString()
  booked: boolean;

  @ApiProperty({ description: 'Клиент брони', nullable: false })
  @IsNotEmpty()
  client: ClientResponseDto;

  @ApiProperty({ description: 'Карточка номера', nullable: false })
  @IsNotEmpty()
  room: ResponseRoomDto;
}
