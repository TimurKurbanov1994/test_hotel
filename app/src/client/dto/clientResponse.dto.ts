import { IsNotEmpty, IsNumber } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';
import { CreateClientDto } from './createClient.dto';

export class ClientResponseDto extends CreateClientDto {
  @ApiProperty({ description: 'ID клиента', nullable: false })
  @IsNotEmpty()
  @IsNumber()
  id: number;
}
