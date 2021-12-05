import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { NamespaceModel } from '../models/namespace';

@Injectable({
  providedIn: 'root'
})
export class LoginService {
  constructor(private http: HttpClient) { }

  createNamespace(model: NamespaceModel) {
    return this.http.post(`/api/v1/namespaces`, model);
  }

  getNamespaceList() {
    return this.http.get(`/api/v1/namespaces`);
  }

  getNamespacePodList(namespaceName: string) {
    return this.http.get(`/api/v1/namespaces/${namespaceName}/pods`);
  }

  deleteNamespace(namespaceName: string) {
    return this.http.delete(`/api/v1/namespaces/${namespaceName}`);
  }
}