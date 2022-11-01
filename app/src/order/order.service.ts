import {
  BadRequestException,
  HttpException,
  HttpStatus,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Between, Repository } from 'typeorm';
import { OrderEntity } from './entities/order.entity';
import { CreateOrderDto } from './dto/createOrder.dto';
import { ClientService } from '../client/client.service';
import { RoomService } from '../room/room.service';
import { CreateCancelDto } from './dto/cancelOrder.dto';
import { RoomEntity } from '../room/entitites/room.entity';
import { inputDateDto } from './dto/inputDate.dto';

@Injectable()
export class OrderService {
  constructor(
    @InjectRepository(OrderEntity)
    private readonly ordersRepo: Repository<OrderEntity>,
    private readonly clientService: ClientService,
    private readonly roomService: RoomService,
  ) {}

  public async createBooking(dto: CreateOrderDto): Promise<OrderEntity> {
    const clientDB = await this.clientService.getOne(dto.client_id);
    if (!clientDB) {
      throw new NotFoundException(
        `Клиент с id = ${dto.client_id} не существует!`,
      );
    }

    const roomDB = await this.roomService.getOne(dto.room_id);
    if (!roomDB) {
      throw new NotFoundException(
        `Клиент с id = ${dto.client_id} не существует!`,
      );
    }

    if (dto.end_date < dto.start_date) {
      throw new BadRequestException('startDate has to be earlier than endDate');
    }
    const freeOrder = await this.ordersRepo.find({
      where: [
        {
          start_date: Between(dto.start_date, dto.end_date),
          room: {
            id: dto.room_id,
          },
          booked: true,
        },
      ],
      relations: { room: true },
    });
    if (freeOrder.length) {
      throw new HttpException(
        { message: 'На эту дату занято', start_date: dto.start_date },
        HttpStatus.BAD_REQUEST,
      );
    }
    const entity: OrderEntity = {
      id: undefined,
      start_date: dto.start_date,
      end_date: dto.end_date,
      vip: clientDB.vip,
      booked: true,
      client: clientDB,
      room: roomDB,
    };

    const orderEntity = this.ordersRepo.create(entity);
    return await this.ordersRepo.save(orderEntity);
  }

  public async getAll(): Promise<OrderEntity[]> {
    return await this.ordersRepo.find({
      relations: { client: true, room: true },
    });
  }

  public async getAvailableRooms(dto: inputDateDto): Promise<RoomEntity[]> {
    const { start_date, end_date } = dto;
    return await this.roomService.getAvailableRooms({
      start_date,
      end_date,
    });
  }

  public async getOne(id: number): Promise<OrderEntity> {
    const orderEntity = await this.ordersRepo.findOne({
      where: { id },
      relations: { client: true, room: true },
    });
    if (!orderEntity) {
      throw new NotFoundException(`Бронь с id = ${id} не существует!`);
    }
    return orderEntity;
  }

  public async cancelBooking(dto: CreateCancelDto): Promise<OrderEntity> {
    const { order_id } = dto;
    await this.ordersRepo.update({ id: order_id }, { booked: false });
    return this.getOne(order_id);
  }
}
