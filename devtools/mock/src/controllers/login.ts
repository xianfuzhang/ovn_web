import express from 'express';
import { CommonRoutes } from './route';

export class LoginRoutes extends CommonRoutes {
  constructor(app: express.Application) {
    super(app, 'LoginRoutes');
  }

  configureRoutes(): express.Application {
    this.app.route(`/v1/login`)
      .post((req: express.Request, res: express.Response) => {
        if (req.body.userName === 'karaf' && req.body.password === 'karaf') {
          res.status(200).send({status: 'login success'});
        } else {
          res.status(401).send({msg: 'wrong password'});
        }
      });
    this.app.route(`/v1/logout`)
      .post((req: express.Request, res: express.Response) => {
        res.status(200).send({status: 'logout success'});
      });
    return this.app;
  }
}