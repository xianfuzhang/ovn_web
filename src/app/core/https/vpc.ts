import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { NetworkModel, SubnetModel } from '../models/vpc';
import { EgressFirewallModel, EgressIpModel } from '../models/egress';
import { FloatingIpProviderModel, FloatingIpClaimModel, FloatingIpModel } from '../models/floatingip';

@Injectable({
  providedIn: 'root'
})
export class LoginService {
  constructor(private http: HttpClient) { }

  createNetwork(model: NetworkModel) {
    return this.http.post(`/apis/k8s.ovn.org/v1/vpcnetworks`, model);
  }

  getNetworkList() {
    return this.http.get(`/apis/k8s.ovn.org/v1/vpcnetworks`);
  }

  updateNetwork(networkName: string, model: NetworkModel) {
    return this.http.put(`/apis/k8s.ovn.org/v1/vpcnetworks/${networkName}`, model);
  }

  deleteNetwork(networkName: string) {
    return this.http.delete(`/apis/k8s.ovn.org/v1/vpcnetworks/${networkName}`);
  }

  createSubnet(namespace: string, model: SubnetModel) {
    return this.http.post(`/apis/k8s.ovn.org/v1/namespaces/${namespace}/vpcsubnets`, model);
  }

  getSubnetList() {
    return this.http.get(`/apis/k8s.ovn.org/v1/vpcsubnets`);
  }

  updateSubnet(namespace: string, subnetName: string, model: SubnetModel) {
    return this.http.put(`/apis/k8s.ovn.org/v1/namespaces/${namespace}/vpcsubnets/${subnetName}`, model);
  }

  deleteSubnet(namespace: string, subnetName: string) {
    return this.http.delete(`/apis/k8s.ovn.org/v1/namespaces/${namespace}/vpcsubnets/${subnetName}`);
  }

  createEgressFirewall(namespace: string, model: EgressFirewallModel) {
    return this.http.post(`/apis/k8s.ovn.org/v1/namespaces/${namespace}/egressfirewalls`, model);
  }

  getEgressFirewallList() {
    return this.http.get(`/apis/k8s.ovn.org/v1/egressfirewalls`);
  }

  updateEgressFirewall(namespace: string, firewallName: string, model: EgressFirewallModel) {
    return this.http.put(`/apis/k8s.ovn.org/v1/namespaces/${namespace}/egressfirewalls/${firewallName}`, model);
  }

  deleteEgressFirewall(namespace: string, firewallName: string) {
    return this.http.delete(`/apis/k8s.ovn.org/v1/namespaces/${namespace}/egressfirewalls/${firewallName}`);
  }

  createEgressIp(model: EgressIpModel) {
    return this.http.post(`/apis/k8s.ovn.org/v1/egressips`, model);
  }

  getEgressIpList() {
    return this.http.get(`/apis/k8s.ovn.org/v1/egressips`);
  }

  updateEgressIp(egressIPName: string, model: EgressIpModel) {
    return this.http.put(`/apis/k8s.ovn.org/v1/egressips/${egressIPName}`, model);
  }

  deleteEgressIp(egressIPName: string) {
    return this.http.delete(`/apis/k8s.ovn.org/v1/egressips/${egressIPName}`);
  }
  
  createFloatingIpProvider(model: FloatingIpProviderModel) {
    return this.http.post(`/apis/k8s.ovn.org/v1/floatingipproviders`, model);
  }

  getFloatingIpProviderList() {
    return this.http.get(`/apis/k8s.ovn.org/v1/floatingipproviders`);
  }

  updateFloatingIpProvider(providerName: string, model: FloatingIpProviderModel) {
    return this.http.put(`/apis/k8s.ovn.org/v1/floatingipproviders/${providerName}`, model);
  }

  deleteFloatingIpProvider(providerName: string) {
    return this.http.delete(`/apis/k8s.ovn.org/v1/floatingipproviders/${providerName}`);
  }

  createFloatingIpClaim(model: FloatingIpClaimModel) {
    return this.http.post(`/apis/k8s.ovn.org/v1/floatingipclaims`, model);
  }

  getFloatingIpClaimList() {
    return this.http.get(`/apis/k8s.ovn.org/v1/floatingipclaims`);
  }

  updateFloatingIpClaim(claimName: string, model: FloatingIpClaimModel) {
    return this.http.put(`/apis/k8s.ovn.org/v1/floatingipclaims/${claimName}`, model);
  }

  deleteFloatingIpClaim(claimName: string) {
    return this.http.delete(`/apis/k8s.ovn.org/v1/floatingipclaims/${claimName}`);
  }

  createFloatingIp(model: FloatingIpModel) {
    return this.http.post(`/apis/k8s.ovn.org/v1/floatingips`, model);
  }

  getFloatingIpList() {
    return this.http.get(`/apis/k8s.ovn.org/v1/floatingips`);
  }

  updateFloatingIp(floatingIpName: string, model: FloatingIpModel) {
    return this.http.put(`/apis/k8s.ovn.org/v1/floatingips/${floatingIpName}`, model);
  }

  deleteFloatingIp(floatingIpName: string) {
    return this.http.delete(`/apis/k8s.ovn.org/v1/floatingips/${floatingIpName}`);
  }
}