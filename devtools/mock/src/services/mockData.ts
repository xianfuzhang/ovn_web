import * as _ from 'lodash';
import { config } from '../config';
import {
  NamespaceList,
  NamespacePodList,
  NamespaceBuilder,
  NamespaceListBuilder,
  NamespacePodListBuilder
} from '../models/namespace';
import {
  NetworkBuilder,
  NetworkList,
  NetworkListBuilder
} from '../models/vpc';

class MockData {
  private isInit: boolean = false;
  private namespaceList!: NamespaceList;
  private nsListBilder!: NamespaceListBuilder;
  private namespacePodListMap = new Map<string, NamespacePodList>();
  private networkList!: NetworkList;
  private networkListBuilder!: NetworkListBuilder;

  hasInit(): boolean {
    return this.isInit;
  }

  getNamespaceList(): NamespaceList {
    return this.namespaceList;
  }

  getNamespaceListBuilder(): NamespaceListBuilder {
    return this.nsListBilder;
  }

  getNamespacePodListMap(): Map<string, NamespacePodList> {
    return this.namespacePodListMap;
  }

  getNetworkList(): NetworkList {
    return this.networkList;
  }

  init() {
    console.log('init mock now.......');

    // namespace
    this.nsListBilder = new NamespaceListBuilder();
    _.times(config.namespaceNumber, () => {
      this.nsListBilder.addNamespace(new NamespaceBuilder().getNamespace());
    });
    this.namespaceList = this.nsListBilder.getNamespaceList();

    //namespace pods
    const namespaces: string[] = this.nsListBilder
      .getNamespaceListItems()
      .map((item) => {
        return item.metadata.name;
      });
    namespaces.forEach((name) => {
      const time = _.random(config.MAX_POD_NUM);
      const podListBuilder = new NamespacePodListBuilder();
      _.times(time, () => {
        podListBuilder.addPod(name, config.nodeNames[_.random(config.nodeNames.length - 1)]);
      });
      this.namespacePodListMap.set(name, podListBuilder.getPodList());
    });

    //vpc network
    this.networkListBuilder = new NetworkListBuilder();
    _.times(config.vpcNetworkNumber, () => {
      this.networkListBuilder.addNetwork(new NetworkBuilder().getNetwork());
    });
    this.networkList = this.networkListBuilder.getNetworkList();
    

    this.isInit = true;
  }
}

class MockDataBuilder {
  static mockData: MockData = new MockData();

  static getMockData(): MockData {
    return this.mockData;
  }
}

export { MockDataBuilder };