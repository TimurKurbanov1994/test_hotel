import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { ClientEntity } from './entities/client.entity';
import { Repository } from 'typeorm';
import { CreateClientDto } from './dto/createClient.dto';
import { ClientResponseDto } from './dto/clientResponse.dto';

@Injectable()
export class ClientService {
  constructor(
    @InjectRepository(ClientEntity)
    private readonly clientsModel: Repository<ClientEntity>,
  ) {}

  public async create(
    clientsBody: CreateClientDto,
  ): Promise<ClientResponseDto> {
    return await this.clientsModel.save(clientsBody);
  }

  public async getAll(): Promise<any> {
    return await this.clientsModel.find();
  }

  public async getOne(id: number): Promise<any> {
    return await this.clientsModel.findOne({
      where: { id },
      relations: { orders: true },
    });
  }

  public async update(body, id): Promise<any> {
    return await this.clientsModel.update({ id }, body);
  }

  public async delete(id): Promise<any> {
    return await this.clientsModel.delete({ id });
  }
}
