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
  spec: {
    finalizers: string[];
  }; 
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
  status: NamespaceStatus
}
export interface NamespaceList {
  apiVersion: string;
  kind: string;
  metadata: object;
  items: NamespaceItem[];
}
export interface NamespacePodList {
  apiVersion: string;
  kind: string;
  metadata: object;
  items: PodItem[];
}