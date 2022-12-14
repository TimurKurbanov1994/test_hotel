import { IsNotEmpty, IsNumber, IsString, MaxLength } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';
import { RoomEntity } from '../entitites/room.entity';

export class CreateRoomDto {
  constructor(room: RoomEntity) {}

  @ApiProperty({ description: 'Тип комнаты в отеле', nullable: false })
  @MaxLength(50)
  @IsNotEmpty()
  @IsString()
  type: string;

  @ApiProperty({ description: 'Цена комнаты', nullable: false })
  @IsNotEmpty()
  @IsNumber()
  price: number;

  @ApiProperty({ description: 'Площадь комнаты', nullable: false })
  @IsNotEmpty()
  @IsNumber()
  square: number;
}
