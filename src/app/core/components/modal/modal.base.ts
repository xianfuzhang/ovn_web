import { OnInit } from "@angular/core";
import { Observable } from "rxjs";

export abstract class BaseModal {
  abstract submit(): Observable<any>;
}
