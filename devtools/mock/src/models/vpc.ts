import Chance from 'chance';
import { v4 as uuidv4 } from 'uuid';
import { utc } from 'moment';
import * as _ from 'lodash';

const chance = Chance();

interface Gateway {
  node: string;
  ip: string;
}
interface Peer {
  name: string;
  ip: string;
  port: number;
}
export interface Network {
  apiVersion: string;
  kind: string;
  metadata: {
    name: string;
    uid: string;
    annotations: object;
    creationTimestamp: string;
  };
  spec: {
    cidr: string;
    subnetLength: number;
    gateways?: Gateway[];
    peers?: Peer[];
  };
  status: {
    subnets: string;
  }
}
export interface NetworkList {
  apiVersion: string;
  kind: string;
  metadata: object;
  items: Network[];
}

export class NetworkBuilder {
  private network: Network;
  private subnets!: string[];

  constructor() {
    this.network = {
      apiVersion: 'k8s.ovn.org/v1',
      kind: 'VPCNetwork',
      metadata: {
        name: 'network-' + chance.syllable(),
        uid: uuidv4(),
        annotations: {},
        creationTimestamp: utc().format()
      },
      spec: {
        cidr: '10.' + _.random(100, 200) + '.0.0/16',
        subnetLength: 24
      },
      status: {
        subnets: ''
      }
    }
  }

  getNetwork(): Network {
    return this.network;
  }

  addSubnet(subnetName: string) {
    this.subnets.push(subnetName);
  }

  updateNetworkSubnets() {
    this.network.status.subnets = this.subnets.toString();
  }
}

export class NetworkListBuilder {
  private networkList: NetworkList;

  constructor() {
    this.networkList = {
      apiVersion: 'k8s.ovn.org/v1',
      kind: 'VPCNetworkList',
      metadata: {},
      items: []
    }
  }

  getNetworkList(): NetworkList {
    return this.networkList;
  }

  addNetwork(item: Network) {
    this.networkList.items.push(item);
  }

  getNetworkListItems(): Network[] {
    return this.networkList.items;
  }
}