import { IsDate, IsNotEmpty, IsNumber } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';
import { Type } from 'class-transformer';
import { OrderEntity } from '../entities/order.entity';

export class CreateOrderDto {
  constructor(order: OrderEntity) {}

  @ApiProperty({ description: 'ID клиента', nullable: false })
  @IsNotEmpty()
  @IsNumber()
  client_id: number;

  @ApiProperty({ description: 'ID комнаты в отеле', nullable: false })
  @IsNotEmpty()
  @IsNumber()
  room_id: number;

  @ApiProperty({
    description: 'Начало даты заселения',
    nullable: false,
  })
  @IsNotEmpty()
  @IsDate()
  @Type(() => Date)
  start_date: Date;

  @ApiProperty({
    description: 'Конец даты заселения',
    nullable: true,
  })
  @IsDate()
  @Type(() => Date)
  end_date: Date;
}
