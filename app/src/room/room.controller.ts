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
import { ResponseRoomDto } from './dto/responseRoom.dto';

@Controller('room')
export class RoomController {
  constructor(private readonly roomService: RoomService) {}

  @ApiTags('Room')
  @ApiOperation({ summary: 'Создать номер в отеле' })
  @ApiResponse({
    status: HttpStatus.OK,
    description: 'Успешно',
    type: ResponseRoomDto,
  })
  @HttpCode(200)
  @Post()
  public async create(@Body() room: CreateRoomDto): Promise<ResponseRoomDto> {
    const roomEntity = await this.roomService.create(room);
    return new ResponseRoomDto(roomEntity);
  }

  @ApiTags('Room')
  @ApiOperation({ summary: 'Получить все номера в отеле' })
  @ApiResponse({
    status: HttpStatus.OK,
    description: 'Успешно',
    type: [ResponseRoomDto],
  })
  @HttpCode(200)
  @Get()
  public async getAll(): Promise<ResponseRoomDto[]> {
    const roomsEntity = await this.roomService.getAll();
    return roomsEntity.map((item) => new ResponseRoomDto(item));
  }

  @ApiTags('Room')
  @ApiOperation({ summary: 'Получить номер в отеле' })
  @ApiResponse({
    status: HttpStatus.OK,
    description: 'Успешно',
    type: ResponseRoomDto,
  })
  @HttpCode(200)
  @Get('/:id')
  public async getOne(@Query('id') id: number): Promise<ResponseRoomDto> {
    const roomEntity = await this.roomService.getOne(id);
    return new ResponseRoomDto(roomEntity);
  }
}
