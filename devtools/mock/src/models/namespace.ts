const chance = require('chance')();
import { v4 as uuidv4 } from 'uuid';
import { utc } from 'moment';

interface NamespaceMetadata {
  creationTimestamp: string;
  name: string;
  uid: string;
  labels: object;
}
interface NamespaceStatus {
  phase: string;
}
interface NamespaceItem {
  metadata: NamespaceMetadata;
  spec: object;
  status: NamespaceStatus;
}
interface PodIp {
  ip: string;
}
interface PodItem {
  metadata: {
    creationTimestamp: string;
    labels: object;
    uid: string;
    name: string;
    namespace: string;
  };
  spec: {
    nodeName: string;
  };
  status: {
    phase:string;
    podIP: string;
    podIPs: PodIp[];
  }
}
export interface NamespaceModel {
  apiVersion: string;
  kind: string;
  metadata: {
    name: string;
  }
}
export interface Namespace {
  apiVersion: string;
  kind: string;
  metadata: NamespaceMetadata;
  spec: object;
  status: NamespaceStatus
}
export interface NamespaceList {
  apiVersion: string;
  kind: string;
  metadata: object;
  items: Namespace[];
}
export interface NamespacePodList {
  apiVersion: string;
  kind: string;
  metadata: object;
  items: PodItem[];
}

export class NamespaceBuilder {
  private namepace: Namespace;

  constructor(name?: string) {
    this.namepace = {
      apiVersion: 'v1',
      kind: 'Namespace',
      metadata: {
        name: name ? name : chance.city(),
        uid: uuidv4(),
        creationTimestamp: utc().format(),
        labels: {}
      },
      spec: {},
      status: {
        phase: "Active"
      }
    };
  }

  getNamespace(): Namespace {
    return this.namepace;
  }
}

export class NamespaceListBuilder {
  private namespaceList: NamespaceList;

  constructor() {
    this.namespaceList = {
      apiVersion: 'v1',
      kind: 'NamespaceList',
      metadata: {},
      items: []
    }
  }

  getNamespaceList(): NamespaceList {
    return this.namespaceList;
  }

  getNamespaceListItems(): Namespace[] {
    return this.namespaceList.items;
  }

  addNamespace(namespace: Namespace) {
    this.namespaceList.items.push(namespace);
  }
}

export class NamespacePodListBuilder {
  private podList: NamespacePodList;

  constructor() {
    this.podList = {
      apiVersion: 'v1',
      kind: 'PodList',
      metadata: {},
      items: []
    }
  }

  getPodList(): NamespacePodList {
    return this.podList;
  }

  addPod(namespaceName: string, nodeName: string) {
    const pod: PodItem = {
      metadata: {
        creationTimestamp: utc().format(),
        labels: {},
        uid: uuidv4(),
        name: chance.word(),
        namespace: namespaceName
      },
      spec: {
        nodeName: nodeName
      },
      status: {
        phase: 'Running',
        podIPs: [{ip: chance.ip()}],
        podIP: ''
      }
    };
    pod.status.podIP = pod.status.podIPs[0].ip;
    this.podList.items.push(pod);
  }
}