import express from 'express';
import { CommonRoutes } from './route';

export class LoginRoutes extends CommonRoutes {
  constructor(app: express.Application) {
    super(app, 'VpcsRoutes');
  }

  configureRoutes(): express.Application {
    this.app.route(`/login`)
      .post((req: express.Request, res: express.Response) => {
        res.status(200).send('login success.');
      });
    return this.app;
  }
}