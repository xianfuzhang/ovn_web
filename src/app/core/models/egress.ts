interface EgressFirewallPort {
  protocol: string;
  port: number;
}
interface EgressFirewallDestination {
  cidrSelector?: string;
  dnsName?: string;
}
interface EgressFirewallRule {
  type: string;
  ports?: EgressFirewallPort[];
  to: EgressFirewallDestination;
}
export interface LabelSelector {
  matchLabels?: object;
  matchExpressions?: [];
}
export interface EgressFirewallModel {
  apiVersion: string;
  kind: string;
  metadata: {
    name: string;
    namespace: string;
  };
  spec: {
    egress: EgressFirewallRule[]
  };
}
export interface EgressFirewall {
  apiVersion: string;
  kind: string;
  metadata: {
    name: string;
    namespace: string;
    creationTimestamp: string;
    uid: string;
  };
  spec: {
    egress: EgressFirewallRule[]
  };
  status: {
    status: string;
  }
}
export interface EgressFirewallList {
  apiVersion: string;
  kind: string;
  metadata: object;
  items: EgressFirewall[];
}
export interface EgressIpModel {
  apiVersion: string;
  kind: string;
  metadata: {
    name: string;
  };
  spec: {
    egressIPs: string[];
    namespaceSelector?: LabelSelector;
    podSelector?: LabelSelector;
  };
}
export interface EgressIp {
  apiVersion: string;
  kind: string;
  metadata: {
    name: string;
    creationTimestamp: string;
    uid: string;
  };
  spec: {
    egressIPs: string[];
    namespaceSelector?: LabelSelector;
    podSelector?: LabelSelector;
  };
}
export interface EgressIpList {
  apiVersion: string;
  kind: string;
  metadata: object;
  items: EgressIp[]
}