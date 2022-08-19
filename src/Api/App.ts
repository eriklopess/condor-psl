import express, { Router } from 'express';
import connectToDatabase from './connection';
class App {
  public app: express.Application;

  constructor() {
    this.app = express();
    this.app.use(express.json());
    this.app.use('/files', express.static('uploads'));
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

  public getApp(): express.Application {
    return this.app;
  }
}

export default App;
