import { LabelSelector } from './egress';
export interface FloatingIpProviderModel {
  apiVersion: string;
  kind: string;
  metadata: {
    name: string;
  };
  spec: {
    floatingIPs: string[];
    vpcSelector: LabelSelector;
  };
}
export interface FloatingIpClaimModel {
  apiVersion: string;
  kind: string;
  metadata: {
    name: string;
  };
  spec: {
    provider: string;
    floatingIPs: string[];
    namespaceSelector: LabelSelector;
    podSelector: LabelSelector;
  };
}
export interface FloatingIpModel {
  apiVersion: string;
  kind: string;
  metadata: {
    name: string;
  };
  spec: {
    floatingIPClaim: string;
    pod: string;
    podNamespace: string;
  };
}
export interface FloatingIpProvider {
  apiVersion: string;
  kind: string;
  metadata: {
    name: string;
    creationTimestamp: string;
    uid: string;
  };
  spec: {
    floatingIPs: string[];
    vpcSelector: LabelSelector;
  };
  status: {
    floatingIPClaims: string[];
    phase: string;
  };
}
export interface FloatingIpProviderList {
  apiVersion: string;
  kind: string;
  metadata: object;
  items: FloatingIpProvider[]
}
export interface FloatingIpClaim {
  apiVersion: string;
  kind: string;
  metadata: {
    name: string;
    creationTimestamp: string;
    uid: string;
  };
  spec: {
    provider: string;
    floatingIPs: string[];
    namespaceSelector: LabelSelector;
    podSelector: LabelSelector;
  };
  status: {
    assignedIPs: string[];
    phase: string;
  }
}
export interface FloatingIpClaimList {
  apiVersion: string;
  kind: string;
  metadata: object;
  items: FloatingIpClaim[]
}
export interface FloatingIp {
  apiVersion: string;
  kind: string;
  metadata: {
    name: string;
    creationTimestamp: string;
    uid: string;
  };
  spec: {
    floatingIPClaim: string;
    pod: string;
    podNamespace: string;
  };
}
export interface FloatingIpList {
  apiVersion: string;
  kind: string;
  metadata: object;
  items: FloatingIp[]
}