import { Request, Response } from 'express';
import { Banner } from '../Interfaces/BannerInterface';
import BannerService from '../Services/Banner';
import CustomerService from '../Services/Customer';
import Controller, { RequestWithBody, ResponseError } from './Controller';

export default class CustomerController extends Controller<Banner> {
  private customer: CustomerService;

  constructor(
    customer: CustomerService = new CustomerService(),
    service: BannerService = new BannerService(),
    route = '/banners'
  ) {
    super(service, route);
    this.customer = customer;
  }

  create = async (req: RequestWithBody<Banner>, res: Response<Banner
  | ResponseError>):
  Promise<typeof res> => {
    try {
      // Verifica se o customerID está correto
      if (!req.body.customerID || req.body.customerID.length !== 24) {
        return res.status(400).json({ error: this.errors.idError });
      }

      // Verifica se o usuário é valido
      const customer = await this.customer.readOne(req.body.customerID);
      if (!customer) {
        return res.status(400).json({ error: this.errors.userNotFound });
      }

      const endDate = req.body.endAt.split('/');
      const startDate = req.body.startAt.split('/');

      const [endAt, startAt] = [
        new Date(Number(endDate[2]), Number(endDate[1]) - 1, Number(endDate[0])),
        new Date(Number(startDate[2]), Number(startDate[1]) - 1, Number(startDate[0]))
      ];

      if (startAt < new Date()) {
        return res.status(400).json({ error: this.errors.startAtLowerCurrentYear });
      }

      if (endAt <= startAt) {
        return res.status(400).json({ error: this.errors.endAtHigherStartAt });
      }

      const data = await this.service.create({
        ...req.body,
        startAt: startAt.toUTCString(),
        endAt: endAt.toUTCString(),
        image: '/',
        status: true
      });

      if (!data) {
        return res.status(500).json({ error: this.errors.internal });
      }

      if ('error' in data) {
        return res.status(400).json(data);
      }

      // eslint-disable-next-line no-underscore-dangle
      await this.customer.updateBannerList(data.customerID, data._id);
      return res.status(201).json(data);
    } catch (error) {
      console.log(error);
      return res.status(500).json({ error: this.errors.internal });
    }
  };

  readOne = async (
    req: Request<{ id: string }>,
    res: Response<Banner | ResponseError>
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
    req: RequestWithBody<Banner>,
    res: Response<Banner | ResponseError>
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
    res: Response<Banner | ResponseError>
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

  uploadImage = async (
    req: Request<{ id: string }>,
    res: Response<Banner | ResponseError | null>
  ): Promise<typeof res> => {
    const { id } = req.params;
    try {
      req.body.image = `/files/${req.file?.filename}`;
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
}
