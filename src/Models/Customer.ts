import { Schema, model as createModel, Document } from 'mongoose';
import { Customer } from '../Interfaces/CustomerInterface';
import MongoModel from './MongoModel';

interface CustomerDocument extends Customer, Document {}

const customerSchema = new Schema<CustomerDocument>({
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  phone: { type: String, required: true, unique: true },
  password: { type: String, required: true, minlength: 6 }
});

export default class CustomerModel extends MongoModel<CustomerDocument> {
  constructor() {
    super(createModel<CustomerDocument>('Customer', customerSchema));
  }
}
