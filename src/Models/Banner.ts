import { Schema, model as createModel, Document } from 'mongoose';
import { Banner } from '../Interfaces/BannerInterface';
import MongoModel from './MongoModel';

interface BannerDocument extends Banner, Document {}

const bannerSchema = new Schema<BannerDocument>({
  name: { type: String, required: true },
  image: { type: String, required: true },
  customerID: { type: String, required: true },
  endAt: { type: String, required: true },
  startAt: { type: String, required: true },
  status: { type: Boolean, required: true }
});

export default class BannerModel extends MongoModel<Banner> {
  constructor(public model = createModel('Customer', bannerSchema)) {
    super(model);
  }
}
