import { IsNotEmpty, IsNumber } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';
import { CreateClientDto } from './createClient.dto';
import { ClientEntity } from '../entities/client.entity';

export class ClientResponseDto extends CreateClientDto {
  @ApiProperty({ description: 'ID клиента', nullable: false })
  @IsNotEmpty()
  @IsNumber()
  id: number;

  constructor(client: ClientEntity) {
    super(client);

    this.id = client.id;
    this.name = client.name;
    this.lastName = client.lastName;
    this.vip = client.vip;
  }
}
