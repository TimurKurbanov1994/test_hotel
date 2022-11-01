import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { ClientEntity } from './entities/client.entity';
import { Repository } from 'typeorm';
import { CreateClientDto } from './dto/createClient.dto';

@Injectable()
export class ClientService {
  constructor(
    @InjectRepository(ClientEntity)
    private readonly clientsModel: Repository<ClientEntity>,
  ) {}

  public async create(clientsBody: CreateClientDto): Promise<ClientEntity> {
    return await this.clientsModel.save(clientsBody);
  }

  public async getAll(): Promise<ClientEntity[]> {
    return await this.clientsModel.find();
  }

  public async getOne(id: number): Promise<ClientEntity> {
    const clientEntity = await this.clientsModel.findOne({
      where: { id },
      relations: { orders: true },
    });

    if (!clientEntity) {
      throw new NotFoundException(`Клиент с id = ${id} не существует!`);
    }
    return clientEntity;
  }

  public async update(body, id): Promise<ClientEntity> {
    await this.clientsModel.update({ id }, body);
    return this.clientsModel.findOne({ where: { id } });
  }

  public async delete(id): Promise<void> {
    await this.clientsModel.delete({ id });
  }
}
