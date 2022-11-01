import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { RoomEntity } from './entitites/room.entity';
import { Between, In, Not, Repository } from 'typeorm';
import { CreateRoomDto } from './dto/createRoom.dto';

@Injectable()
export class RoomService {
  constructor(
    @InjectRepository(RoomEntity)
    private readonly roomService: Repository<RoomEntity>,
  ) {}

  public async create(dto: CreateRoomDto): Promise<RoomEntity> {
    const room: RoomEntity = {
      id: undefined,
      type: dto.type,
      square: dto.square,
      price: dto.price,
      orders: [],
    };
    const roomEntity = await this.roomService.create(room);
    return await this.roomService.save(roomEntity);
  }

  public async getOne(id: number): Promise<RoomEntity> {
    const roomEntity = await this.roomService.findOne({
      where: { id },
    });
    if (!roomEntity) {
      throw new NotFoundException(`Номер в отеле с id = ${id} не существует!`);
    }
    return roomEntity;
  }

  public async getAvailableRooms(dto: {
    start_date: Date;
    end_date: Date;
  }): Promise<RoomEntity[]> {
    const { start_date, end_date } = dto;
    const roomIds = await this.roomService.find({
      where: [
        {
          orders: {
            start_date: Between(start_date, end_date),
            booked: true,
          },
        },
      ],
      select: ['id'],
    });
    const room_id = roomIds.map((item) => item.id);
    return await this.roomService.find({
      where: {
        id: Not(In(room_id)),
      },
    });
  }

  public async getAll(): Promise<RoomEntity[]> {
    return await this.roomService.find();
  }
}
