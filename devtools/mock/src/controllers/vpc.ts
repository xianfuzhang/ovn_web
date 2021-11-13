import express from 'express';
import { CommonRoutes } from './route';
import { VpcModel } from '../models/vpc';

export class VpcRoutes extends CommonRoutes {
  constructor(app: express.Application) {
    super(app, 'VpcsRoutes');
  }

  configureRoutes(): express.Application {
    this.app.route(`/vpcs`)
      .get((req: express.Request, res: express.Response) => {
        const vpcs: VpcModel[] = [
          { name: 'vpc1' }, { name: 'vpc2' }
        ];
        res.status(200).send(vpcs);
      })
      .post((req: express.Request, res: express.Response) => {
        res.status(200).send(null);
      });

    this.app.route(`/vpcs/:vpcName`)
      .get((req: express.Request, res: express.Response) => {
        res.status(200).send(`GET requested for id ${req.params.vpcName}`);
      })
      .put((req: express.Request, res: express.Response) => {
        res.status(200).send(`PUT requested for id ${req.params.vpcName}`);
      })
      .delete((req: express.Request, res: express.Response) => {
        res.status(200).send(`DELETE requested for id ${req.params.vpcName}`);
      });

    return this.app;
  }
}