import { IsBoolean, IsNotEmpty, IsString, MaxLength } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CreateClientDto {
  constructor(client) {}

  @ApiProperty({ description: 'Имя клиента', nullable: false })
  @MaxLength(50)
  @IsNotEmpty()
  @IsString()
  name: string;

  @ApiProperty({ description: 'Фамилия клиента', nullable: false })
  @IsNotEmpty()
  @IsString()
  lastName: string;

  @ApiProperty({ description: 'VIP', default: false })
  @IsNotEmpty()
  @IsBoolean()
  vip: boolean;
}
