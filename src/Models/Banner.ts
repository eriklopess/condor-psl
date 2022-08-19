import { Schema, model as createModel, Document } from 'mongoose';
import { Banner } from '../Interfaces/BannerInterface';
import MongoModel from './MongoModel';

interface BannerDocument extends Banner, Document {}

const bannerSchema = new Schema<BannerDocument>({
  name: { type: String, required: true },
  image: { type: String, required: true },
  customerID: { type: Schema.Types.ObjectId, ref: 'Customer' },
  endAt: { type: String, required: true },
  startAt: { type: String, required: true },
  status: { type: Boolean, required: true }
});

export default class BannerModel extends MongoModel<Banner> {
  constructor(public model = createModel('Banner', bannerSchema)) {
    super(model);
  }

  read = async (): Promise<Banner[]> => this.model.find({}, { __v: 0 }).populate('customerID', {
    banners: 0, _id: 0, __v: 0, password: 0
  });

  readOne = async (id: string): Promise<Banner | null> => this.model.findOne({ _id: id })
    .populate('customerID', {
      banners: 0, _id: 0, __v: 0, password: 0
    });
}
