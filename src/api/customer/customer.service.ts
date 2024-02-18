import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';

import type { DeleteResult } from 'typeorm';

import { UserRole } from '@/common/enums';
import { UserAlreadyException } from '@/api/auth/auth.exceptions';

import { Customer } from './entities/customer.entity';
import { CustomerRepository } from './customer.repository';

import type {
  GotCustomerDto,
  CreateCustomerDto,
  UpdateCustomerDto,
  CreatedCustomerDto,
  GotCustomerDetailDto,
} from './dto';
import { TokenService } from '../token/token.service';

@Injectable()
export class CustomerService {
  constructor(
    @InjectRepository(Customer)
    private customerRepository: CustomerRepository,
    private tokenService: TokenService,
  ) {}

  public async create(data: CreateCustomerDto): Promise<CreatedCustomerDto> {
    const { email } = data;

    const customer = await this.findOneByEmail(email);
    if (customer) {
      throw new UserAlreadyException();
    }

    const createdCustomer = await this.customerRepository.create(data);

    await this.customerRepository.save(createdCustomer);

    return createdCustomer.toResponse();
  }

  public async findOneByEmail(email: string): Promise<Customer> {
    return this.customerRepository.findOneBy({ email });
  }

  public async getAll(): Promise<GotCustomerDto[]> {
    const customers = await this.customerRepository.find();

    return customers.map((customer) => customer.toResponse());
  }

  public async getDetailById(id: string): Promise<GotCustomerDetailDto> {
    const customer = await this.customerRepository.findOneBy({ id });

    const sessions = await this.tokenService.getAllByUser({
      id,
      role: UserRole.CUSTOMER,
    });

    return customer.toResponseHavingSessions(sessions);
  }

  private async handleUpdateCustomer({
    customer,
    data,
  }: {
    customer: Customer;
    data: UpdateCustomerDto;
  }): Promise<Customer> {
    const updatedCustomer: Customer = customer;
    Object.assign(updatedCustomer, data);

    await this.customerRepository.update(
      { email: customer.email },
      updatedCustomer,
    );

    return updatedCustomer;
  }

  public async updateById({
    id,
    data,
  }: {
    id: string;
    data: UpdateCustomerDto;
  }): Promise<GotCustomerDto> {
    const customer = await this.customerRepository.findOneBy({ id });

    const updatedCustomer = await this.handleUpdateCustomer({ customer, data });

    return updatedCustomer.toResponse();
  }

  public async updateByCustomer({
    customer,
    data,
  }: {
    customer: Customer;
    data: UpdateCustomerDto;
  }): Promise<GotCustomerDto> {
    const updatedCustomer = await this.handleUpdateCustomer({ customer, data });

    return updatedCustomer.toResponse();
  }

  public async deleteById(id: string): Promise<DeleteResult> {
    return this.customerRepository.delete({ id });
  }
}
