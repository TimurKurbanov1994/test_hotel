import { IsDate, IsNotEmpty } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';
import { Type } from 'class-transformer';

export class inputDateDto {
  @ApiProperty({
    description: 'Начало даты заселения',
    nullable: false,
  })
  @IsNotEmpty()
  @IsDate()
  @Type(() => Date)
  start_date: Date;

  @ApiProperty({
    description: 'Конец даты заселения',
    nullable: true,
  })
  @IsDate()
  @Type(() => Date)
  end_date: Date;
}
