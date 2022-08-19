import { Request, Response } from 'express';
import { Customer } from '../Interfaces/CustomerInterface';
import CustomerService from '../Services/Customer';
import Controller, { RequestWithBody, ResponseError } from './Controller';

export default class CustomerController extends Controller<Customer> {
  constructor(service = new CustomerService(), route = '/customers') {
    super(service, route);
  }

  create = async (req: RequestWithBody<Customer>, res: Response<Customer
  | ResponseError>):
  Promise<typeof res> => {
    try {
      const findPhone = await this.service.readOneByPhone(req.body.phone);
      if (findPhone) {
        return res.status(400).json({ error: this.errors.phoneUsed });
      }
      const findEmail = await this.service.readOneByEmail(req.body.email);
      if (findEmail) {
        return res.status(400).json({ error: this.errors.emailUsed });
      }
      const data = await this.service.create(req.body);
      if (!data) {
        return res.status(500).json({ error: this.errors.internal });
      }
      if ('error' in data) {
        return res.status(400).json(data);
      }
      return res.status(201).json(data);
    } catch (error) {
      return res.status(500).json({ error: this.errors.internal });
    }
  };

  readOne = async (
    req: Request<{ id: string }>,
    res: Response<Customer | ResponseError>
  ): Promise<typeof res> => {
    const { id } = req.params;
    if (id.length !== 24) {
      return res.status(400).json({ error: this.errors.idError });
    }
    try {
      const data = await this.service.readOne(id);
      return data ? res.json(data)
        : res.status(404).json({ error: this.errors.notFound });
    } catch (error) {
      return res.status(500).json({ error: this.errors.internal });
    }
  };

  update = async (
    req: RequestWithBody<Customer>,
    res: Response<Customer | ResponseError>
  ): Promise<typeof res> => {
    const { id } = req.params;

    try {
      const data = await this.service.update(id, req.body);
      if (!data) {
        return res.status(404).json({ error: this.errors.notFound });
      }
      if ('error' in data) {
        return res.status(400).json(data);
      }
      return res.status(200).json(data);
    } catch (error) {
      return res.status(400).json({ error: this.errors.idError });
    }
  };

  delete = async (
    req: Request<{ id: string }>,
    res: Response<Customer | ResponseError>
  ): Promise<typeof res> => {
    const { id } = req.params;

    try {
      const data = await this.service.readOne(id);
      if (!data) {
        return res.status(404).json({ error: this.errors.notFound });
      }
      await this.service.delete(id);
      return res.status(204).json();
    } catch (error) {
      return res.status(400).json({ error: this.errors.idError });
    }
  };
}
