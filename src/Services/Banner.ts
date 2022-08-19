import BannerModel from '../Models/Banner';
import { Banner, bannerSchema } from '../Interfaces/BannerInterface';
import Service, { ServiceError } from './Service';

export default class BannerService extends Service<Banner> {
  constructor(model = new BannerModel()) {
    super(model);
  }

  public async create(banner: Banner): Promise<Banner | null | ServiceError> {
    const parsed = bannerSchema.safeParse(banner);

    if (!parsed.success) {
      return { error: parsed.error };
    }

    return this.model.create(banner);
  }

  public async update(id: string, banner: Banner): Promise<Banner
  | null | ServiceError> {
    const parsed = bannerSchema.safeParse(banner);

    if (!parsed.success) {
      return { error: parsed.error };
    }

    return this.model.update(id, banner);
  }
}
