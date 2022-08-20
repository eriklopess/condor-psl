import { Schema, model as createModel, Document } from 'mongoose';
import { Customer } from '../Interfaces/CustomerInterface';
import MongoModel from './MongoModel';

interface CustomerDocument extends Customer, Document {}

const customerSchema = new Schema<CustomerDocument>({
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  phone: { type: String, required: true, unique: true },
  password: { type: String, required: true, minlength: 6 },
  banners: [{ type: Schema.Types.ObjectId, ref: 'Banner' }]
});

export default class CustomerModel extends MongoModel<Customer> {
  constructor(public model = createModel('Customer', customerSchema)) {
    super(model);
  }

  read = async (): Promise<Customer[]> => this.model.find({}, { password: 0 });

  readOne = async (id: string): Promise<Customer
  | null> => this.model.findOne({ _id: id }, { password: 0 });
}
