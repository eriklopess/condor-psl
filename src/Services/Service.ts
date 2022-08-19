import { ZodError } from 'zod';
import Model from '../Models/MongoModel';

export interface ServiceError {
  error: ZodError;
}

export default abstract class Service<T> {
  protected model: Model<T>;

  constructor(model: Model<T>) {
    this.model = model;
  }

  public async create(obj: T): Promise<T | null | ServiceError> {
    return this.model.create(obj);
  }

  public async read(): Promise<T[]> {
    return this.model.read();
  }

  public async readOne(id: string): Promise<T | null> {
    return this.model.readOne(id);
  }

  public async update(id: string, obj: T): Promise<T | null | ServiceError> {
    return this.model.update(id, obj);
  }

  public async delete(id: string): Promise<T | null | ServiceError> {
    return this.model.delete(id);
  }

  public async readOneByEmail(email: string): Promise<T | null> {
    return this.model.readOneByEmail(email);
  }

  public async readOneByPhone(phone: string): Promise<T | null> {
    return this.model.readOneByPhone(phone);
  }
}
