import { IsNotEmpty, IsNumber } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CreateCancelDto {
  @ApiProperty({ description: 'ID бронь', nullable: false })
  @IsNotEmpty()
  @IsNumber()
  order_id: number;

  @ApiProperty({ description: 'ID клиента', nullable: false })
  @IsNotEmpty()
  @IsNumber()
  client_id: number;
}
