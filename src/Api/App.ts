import express, { Router } from 'express';
import swaggerUi from 'swagger-ui-express';
import { readFile } from 'fs/promises';

import connectToDatabase from './connection';
import path from 'path';
class App {
  public app: express.Application;

  constructor() {
    this.app = express();
    this.app.disable('x-powered-by');
    this.app.use(express.json());
    this.app.use('/files', express.static('uploads'));
    this.setupSwagger();
  }

  public addRouter(router: Router) {
    this.app.use(router);
  }

  public startServer(PORT: string | number): void {
    connectToDatabase();
    this.app.listen(PORT, () => {
      console.log(`Server is running on port ${PORT}`);
    });
  }

  private async setupSwagger(): Promise<void> {
    const json = JSON.parse(await readFile(path.resolve(__dirname, '..', 'config', 'apischema.json'), 'utf8'));
    this.app.use('/docs', swaggerUi.serve, swaggerUi.setup(json));
  }

  public getApp(): express.Application {
    return this.app;
  }
}

export default App;
