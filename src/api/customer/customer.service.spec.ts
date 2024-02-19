import { Test } from '@nestjs/testing';
import { DeepMocked, createMock } from '@golevelup/ts-jest';

import { Customer } from './entities';
import { CreateCustomerDto } from './dto';
import { CustomerService } from './customer.service';
import { getRepositoryToken } from '@nestjs/typeorm';
import { CustomerRepository } from './customer.repository';
import { UserAlreadyException } from '../auth/auth.exceptions';

describe('CustomerService', () => {
  let customerService: CustomerService;
  let customerRepository: DeepMocked<CustomerRepository>;

  beforeEach(async () => {
    const module = await Test.createTestingModule({
      providers: [
        CustomerService,
        {
          provide: getRepositoryToken(Customer),
          useValue: {
            save: jest.fn(),
            create: jest.fn(),
            findOneBy: jest.fn(),
          },
        },
      ],
    })
      .useMocker(createMock)
      .compile();

    customerService = module.get(CustomerService);
    customerRepository = module.get(getRepositoryToken(Customer));
  });

  describe('create', () => {
    it('should create new user', async () => {
      const customer: CreateCustomerDto = {
        name: 'test',
        password: 'testpassword',
        email: 'test@example.com',
      };

      customerRepository.findOneBy.mockResolvedValueOnce(null);
      customerRepository.create.mockReturnValueOnce({
        ...customer,
        toResponse: () => customer,
      } as unknown as Customer);

      const result = await customerService.create(customer);

      expect(result).toEqual(customer);
      expect(customerRepository.save).toHaveBeenCalled();
    });
  });

  it('should throw when create existing user', async () => {
    const customer: CreateCustomerDto = {
      name: 'test',
      password: 'testpassword',
      email: 'test@example.com',
    };

    customerRepository.findOneBy.mockResolvedValueOnce(
      customer as unknown as Customer,
    );

    const result = customerService.create(customer);

    await expect(result).rejects.toBeInstanceOf(UserAlreadyException);
  });
});
