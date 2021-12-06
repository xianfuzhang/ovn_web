import express from 'express';
import { CommonRoutes } from './route';
import { MockDataBuilder } from '../services/mockData';
import { 
  Namespace,
  NamespaceList,
  NamespaceBuilder,
  NamespacePodListBuilder
} from '../models/namespace';

export class NamespaceRoutes extends CommonRoutes {
  constructor(app: express.Application) {
    super(app, 'NamespaceRoutes');
  }

  configureRoutes(): express.Application {
    this.app.route(`/api/v1/namespaces`)
      .get((req: express.Request, res: express.Response) => {
        const namespaceList: NamespaceList =
          MockDataBuilder.getMockData().getNamespaceList();
        res.status(200).send(namespaceList);
      })
      .post((req: express.Request, res: express.Response) => {
        const name = req.body.metadata.name;
        const exists = this.getNamespaceByName(name);
        if (exists) {
          res.status(403).send({ message: `${name} 已经存在` });
          return;
        }
        const namespace = new NamespaceBuilder(name).getNamespace();
        MockDataBuilder.getMockData().getNamespaceListBuilder().addNamespace(namespace);
        res.status(200).send(null);
      });

    this.app.route(`/api/v1/namespaces/:namespaceName`)
      .delete((req: express.Request, res: express.Response) => {
        const name = req.params.namespaceName;
        this.removeNamespaceByName(name);
        res.status(200).send({ message: `Namespace ${name} 已经删除成功` });
      });

    this.app.route(`/api/v1/namespaces/:namespaceName/pods`)
      .get((req: express.Request, res: express.Response) => {
        const name = req.params.namespaceName;
        const exists = this.getNamespaceByName(name);
        if (!exists) {
          res.status(403).send({ message: `Namespace ${name} 不存在` });
          return;
        }
        const namespacePodListMap = MockDataBuilder
          .getMockData()
          .getNamespacePodListMap();
        let podList = namespacePodListMap.get(name);
        if (!podList) {
          podList = new NamespacePodListBuilder().getPodList();
        }
        res.status(200).send(podList);
      });

    return this.app;
  }

  getNamespaceByName(namespaceName: string): Namespace | undefined {
    const namespaceItems: Namespace[] = MockDataBuilder
      .getMockData()
      .getNamespaceListBuilder()
      .getNamespaceListItems();
    const result = namespaceItems.find(
      (item) => item.metadata.name === namespaceName);
    return result;
  }

  removeNamespaceByName(namespaceName: string) {
    const namespaceItems: Namespace[] = MockDataBuilder
      .getMockData()
      .getNamespaceListBuilder()
      .getNamespaceListItems();
    const index = namespaceItems.findIndex(
      (item) => item.metadata.name === namespaceName);
    if (index > -1) {
      namespaceItems.splice(index, 1);
    }
  }
}