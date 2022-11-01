import { IsNotEmpty, IsNumber } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';
import { CreateRoomDto } from './createRoom.dto';
import { RoomEntity } from '../entitites/room.entity';

export class ResponseRoomDto extends CreateRoomDto {
  constructor(room: RoomEntity) {
    super(room);

    this.id = room.id;
    this.price = room.price;
    this.square = room.square;
    this.type = room.type;
  }

  @ApiProperty({ description: 'ID клиента', nullable: false })
  @IsNotEmpty()
  @IsNumber()
  id: number;
}
