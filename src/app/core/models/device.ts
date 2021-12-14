export interface Port {
  name: string;
  type: string;
  routerPort?: string;
  macAddress?: string;
  ipAddresses?: string[];
  networks?: string[]; 
}

export interface Device {
  uid: string;
  name: string;
  type: string;
  role?: string;
  ports: Port[];
}

export interface TopoDeviceNode {
  id: string;
  name: string;
  type: string;
}

export interface Link {
  srcDeviceId: string;
  srcDeviceName: string;
  srcPort: string;
  dstDeviceId: string;
  dstDeviceName: string;
  dstPort: string;
}

export interface Nat {
  uid: string;
  type: string;
  logicalIp: string;
  externalIp: string;
  logicalPort?: string;
  externalMac?: string;
}