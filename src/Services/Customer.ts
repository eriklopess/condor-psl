import CustomerModel from '../Models/Customer';
import { Customer, customerSchema } from '../Interfaces/CustomerInterface';
import Service, { ServiceError } from './Service';

export default class CustomerService extends Service<Customer> {
  constructor(model = new CustomerModel()) {
    super(model);
  }

  public async create(customer: Customer): Promise<Customer | null | ServiceError> {
    const parsed = customerSchema.safeParse(customer);

    if (!parsed.success) {
      return { error: parsed.error };
    }

    return this.model.create(customer);
  }

  public async update(id: string, customer: Customer): Promise<Customer
  | null | ServiceError> {
    const parsed = customerSchema.safeParse(customer);

    if (!parsed.success) {
      return { error: parsed.error };
    }

    return this.model.update(id, customer);
  }
}
