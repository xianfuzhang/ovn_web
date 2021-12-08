import express from 'express';
import { CommonRoutes } from './route';
const devices = require('../assets/ovn_devices.json');
const links = require('../assets/ovn_links.json');

export class DeviceRoutes extends CommonRoutes {
  constructor(app: express.Application) {
    super(app, 'DeviceRoutes');
  }

  configureRoutes(): express.Application {
    this.app.route(`/ovn/v1/devices`)
      .get((req: express.Request, res: express.Response) => {
        res.status(200).send(devices);
      });

    this.app.route(`/ovn/v1/links`)
      .get((req: express.Request, res: express.Response) => {
        res.status(200).send(links);
      });

    return this.app;
  }
}