import {
  Body,
  Controller,
  Delete,
  Get,
  HttpCode,
  HttpStatus,
  Post,
  Query,
} from '@nestjs/common';
import { ClientResponseDto } from '../client/dto/clientResponse.dto';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { OrderService } from './order.service';
import { CreateOrderDto } from './dto/createOrder.dto';
import { CreateCancelDto } from './dto/cancelOrder.dto';

@Controller('order')
export class OrderController {
  constructor(private readonly orderService: OrderService) {}

  @ApiTags('Order')
  @ApiOperation({ summary: 'Создать бронь' })
  @ApiResponse({ status: HttpStatus.OK, description: 'Успешно', type: Array })
  @HttpCode(200)
  @Post()
  public async createBooking(
    @Body() order: CreateOrderDto,
  ): Promise<ClientResponseDto> {
    return await this.orderService.createBooking(order);
  }

  @Get()
  public async getAll(): Promise<any> {
    return await this.orderService.getAll();
  }

  @ApiTags('Order')
  @ApiOperation({ summary: 'Получить бронь' })
  @ApiResponse({ status: HttpStatus.OK, description: 'Успешно', type: Array })
  @HttpCode(200)
  @Get('/:id')
  public async getOne(@Query('id') id: number): Promise<any> {
    return await this.orderService.getOne(id);
  }

  @ApiTags('Order')
  @ApiOperation({
    summary: 'Получить список свободных номеров на определенную дату',
  })
  @ApiResponse({ status: HttpStatus.OK, description: 'Успешно', type: Array })
  @HttpCode(200)
  @Post('/available')
  public async getAvailableRooms(
    @Body() order: CreateOrderDto,
  ): Promise<ClientResponseDto> {
    return await this.orderService.getAvailableRooms(order);
  }

  @ApiTags('Order')
  @ApiOperation({
    summary: 'Отменить бронь',
  })
  @ApiResponse({ status: HttpStatus.OK, description: 'Успешно', type: Array })
  @HttpCode(200)
  @Post('/cancel')
  public async cancelBooking(@Body() order: CreateCancelDto): Promise<any> {
    return await this.orderService.cancelBooking(order);
  }

  @Delete()
  public async delete(@Query() id): Promise<any> {
    return await this.orderService.delete(id);
  }
}
