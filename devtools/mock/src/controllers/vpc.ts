import express from 'express';
import { CommonRoutes } from './route';
import { MockDataBuilder } from '../services/mockData';
// import { VpcModel } from '../models/vpc';

export class VpcRoutes extends CommonRoutes {
  constructor(app: express.Application) {
    super(app, 'VpcsRoutes');
  }

  configureRoutes(): express.Application {
    this.app.route(`/apis/k8s.ovn.org/v1/vpcnetworks`)
      .get((req: express.Request, res: express.Response) => {
        const vpcs: any[] = [];
        res.status(200).send(vpcs);
      })
      .post((req: express.Request, res: express.Response) => {
        res.status(200).send(null);
      });

    this.app.route(`/apis/k8s.ovn.org/v1/vpcnetworks/:networkName`)
      .put((req: express.Request, res: express.Response) => {
        res.status(200).send(`PUT requested for id ${req.params.networkName}`);
      })
      .delete((req: express.Request, res: express.Response) => {
        res.status(200).send(`DELETE requested for id ${req.params.networkName}`);
      });

    return this.app;
  }
}