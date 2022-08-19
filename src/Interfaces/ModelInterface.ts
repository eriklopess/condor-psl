/* eslint-disable no-unused-vars */

export interface Model<T> {
    create(obj: T): Promise<T>;
    read(): Promise<T[]>;
    readOne(id: string): Promise<T | null>;
    readOneByEmail(email: string): Promise<T | null>;
    readOneByPhone(phone: string): Promise<T | null>;
    update(id: string, obj: T): Promise<T | null>;
    delete(id: string): Promise<T | null>;
  }
