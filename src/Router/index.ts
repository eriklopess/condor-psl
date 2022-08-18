import { Router } from 'express';

class CustomRouter<T> {
  public router: Router;

  constructor() {
    this.router = Router();
  }

  public addRoutes(): void {
  }
}

export default CustomRouter;
