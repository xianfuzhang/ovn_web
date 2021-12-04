interface Gateway {
  node: string;
  ip: string;
}
interface Peer {
  name: string;
  ip: string;
  port: number;
}
export interface NetworkModel {
  apiVersion: string;
  kind: string;
  metadata: {
    name: string;
  };
  spec: {
    cidr: string;
    subnetLength: number;
    gateways?: Gateway[];
    peers?: Peer[];
  };
}
export interface SubnetModel {
  apiVersion: string;
  kind: string;
  metadata: {
    name: string;
    namespace: string;
  };
  spec: {
    vpc: string;
    cidr?: string;
  };
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
export interface Subnet {
  apiVersion: string;
  kind: string;
  metadata: {
    name: string;
    namespace: string;
    uid: string;
    creationTimestamp: string;
  };
  spec: {
    vpc: string;
    cidr?: string;
  };
  status: string;
}
export interface SubnetList {
  apiVersion: string;
  kind: string;
  metadata: object;
  items: Subnet[]
}