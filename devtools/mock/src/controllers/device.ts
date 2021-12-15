import express from 'express';
import { CommonRoutes } from './route';
const devices = require('../assets/ovn_devices.json');
const links = require('../assets/ovn_links.json');
const nats = require('../assets/ovn_nats.json');

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

    this.app.route(`/ovn/v1/devices/:deviceId/ports`)
      .get((req: express.Request, res: express.Response) => {
        const deviceId = req.params.deviceId;
        const device = devices["devices"].find((item: any) => item['uid'] === deviceId);
        const result = {
          ports: device['ports']
        };
        res.status(200).send(result);
      });

    this.app.route(`/ovn/v1/devices/:deviceId/nats`)
      .get((req: express.Request, res: express.Response) => {
        const deviceId = req.params.deviceId;
        const natList = nats[deviceId] || [];
        const result = {
          nats: natList
        };
        res.status(200).send(result);
      });

    return this.app;
  }
}