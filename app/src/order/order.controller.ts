import {
  Body,
  Controller,
  Get,
  HttpCode,
  HttpStatus,
  Post,
  Query,
} from '@nestjs/common';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { OrderService } from './order.service';
import { CreateOrderDto } from './dto/createOrder.dto';
import { CreateCancelDto } from './dto/cancelOrder.dto';
import { ResponseOrderDto } from './dto/responseOrder.dto';
import { ResponseRoomDto } from '../room/dto/responseRoom.dto';
import { inputDateDto } from './dto/inputDate.dto';

@Controller('order')
export class OrderController {
  constructor(private readonly orderService: OrderService) {}

  @ApiTags('Order')
  @ApiOperation({ summary: 'Создать бронь' })
  @ApiResponse({
    status: HttpStatus.OK,
    description: 'Успешно',
    type: ResponseOrderDto,
  })
  @HttpCode(200)
  @Post()
  public async createBooking(
    @Body() order: CreateOrderDto,
  ): Promise<ResponseOrderDto> {
    const orderEntity = await this.orderService.createBooking(order);
    return new ResponseOrderDto(orderEntity);
  }

  @ApiTags('Order')
  @ApiOperation({ summary: 'Получить все брони' })
  @ApiResponse({
    status: HttpStatus.OK,
    description: 'Успешно',
    type: [ResponseOrderDto],
  })
  @HttpCode(200)
  @Get()
  public async getAll(): Promise<ResponseOrderDto[]> {
    const ordersEntity = await this.orderService.getAll();
    return ordersEntity.map((item) => new ResponseOrderDto(item));
  }

  @ApiTags('Order')
  @ApiOperation({ summary: 'Получить бронь' })
  @ApiResponse({
    status: HttpStatus.OK,
    description: 'Успешно',
    type: ResponseOrderDto,
  })
  @HttpCode(200)
  @Get('/:id')
  public async getOne(@Query('id') id: number): Promise<ResponseOrderDto> {
    const orderEntity = await this.orderService.getOne(id);
    return new ResponseOrderDto(orderEntity);
  }

  @ApiTags('Order')
  @ApiOperation({
    summary: 'Получить список свободных номеров на определенную дату',
  })
  @ApiResponse({
    status: HttpStatus.OK,
    description: 'Найденные свободные номера в отеле',
    type: [ResponseRoomDto],
  })
  @HttpCode(200)
  @Post('/available')
  public async getAvailableRooms(
    @Body() order: inputDateDto,
  ): Promise<ResponseRoomDto[]> {
    const roomsEntity = await this.orderService.getAvailableRooms(order);
    return roomsEntity.map((item) => new ResponseRoomDto(item));
  }

  @ApiTags('Order')
  @ApiOperation({
    summary: 'Отменить бронь',
  })
  @ApiResponse({
    status: HttpStatus.OK,
    description: 'Успешно',
    type: ResponseOrderDto,
  })
  @HttpCode(200)
  @Post('/cancel')
  public async cancelBooking(
    @Body() order: CreateCancelDto,
  ): Promise<ResponseOrderDto> {
    const orderEntity = await this.orderService.cancelBooking(order);
    return new ResponseOrderDto(orderEntity);
  }
}
