import {
  Body,
  Controller,
  Get,
  HttpCode,
  HttpStatus,
  Post,
  Query,
} from '@nestjs/common';
import { RoomService } from './room.service';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { CreateRoomDto } from './dto/createRoom.dto';
import { ClientResponseDto } from '../client/dto/clientResponse.dto';

@Controller('room')
export class RoomController {
  constructor(private readonly roomService: RoomService) {}

  @ApiTags('Room')
  @ApiOperation({ summary: 'Создать комнату' })
  @ApiResponse({
    status: HttpStatus.OK,
    description: 'Успешно',
    type: Array,
  })
  @HttpCode(200)
  @Post()
  public async create(@Body() room: CreateRoomDto): Promise<any> {
    return await this.roomService.create(room);
  }

  @ApiTags('Room')
  @ApiOperation({ summary: 'Получить комнату' })
  @ApiResponse({
    status: HttpStatus.OK,
    description: 'Успешно',
    type: ClientResponseDto,
  })
  @HttpCode(200)
  @Get('/:id')
  public async getOne(@Query('id') id: number): Promise<any> {
    return await this.roomService.getOne(id);
  }
}
