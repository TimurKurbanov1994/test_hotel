import { IsNotEmpty, IsNumber } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CreateCancelDto {
  @ApiProperty({ description: 'ID бронь', nullable: false })
  @IsNotEmpty()
  @IsNumber()
  order_id: number;
}
