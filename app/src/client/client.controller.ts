import {
  Body,
  Controller,
  Delete,
  Get,
  HttpCode,
  HttpStatus,
  Post,
  Put,
  Query,
} from '@nestjs/common';
import { ClientService } from './client.service';
import { CreateClientDto } from './dto/createClient.dto';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { ClientResponseDto } from './dto/clientResponse.dto';

@Controller('client')
export class ClientController {
  constructor(private readonly clientService: ClientService) {}

  @ApiTags('Client')
  @ApiOperation({ summary: 'Создать клиента' })
  @ApiResponse({
    status: HttpStatus.OK,
    description: 'Успешно',
    type: ClientResponseDto,
  })
  @HttpCode(200)
  @Post()
  public async create(
    @Body() client: CreateClientDto,
  ): Promise<ClientResponseDto> {
    return await this.clientService.create(client);
  }

  @ApiTags('Client')
  @ApiOperation({ summary: 'Получить всех клиентов' })
  @ApiResponse({
    status: HttpStatus.OK,
    description: 'Успешно',
    type: [ClientResponseDto],
  })
  @HttpCode(200)
  @Get()
  public async getAll(): Promise<any> {
    return await this.clientService.getAll();
  }

  @ApiTags('Client')
  @ApiOperation({ summary: 'Получить одного клиента' })
  @ApiResponse({
    status: HttpStatus.OK,
    description: 'Успешно',
    type: ClientResponseDto,
  })
  @HttpCode(200)
  @Get('/:id')
  public async getOne(@Query('id') id: number): Promise<any> {
    return await this.clientService.getOne(id);
  }

  @ApiTags('Client')
  @ApiOperation({ summary: 'Обновить клиента' })
  @ApiResponse({
    status: HttpStatus.OK,
    description: 'Успешно',
    type: ClientResponseDto,
  })
  @HttpCode(200)
  @Put('/:id')
  public async update(@Body() client, @Query('id') id: number): Promise<any> {
    return await this.clientService.update(client, id);
  }

  @ApiTags('Client')
  @ApiOperation({ summary: 'Удалить клиента' })
  @ApiResponse({ status: HttpStatus.OK, description: 'Успешно', type: Array })
  @HttpCode(200)
  @Delete('/:id')
  public async delete(@Query('id') id: number): Promise<any> {
    return await this.clientService.delete(id);
  }
}
