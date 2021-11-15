import {Injectable} from '@angular/core';
import {ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot} from '@angular/router';
import { concat, merge, Observable, of, zip } from 'rxjs';
import { concatAll, map, take } from 'rxjs/operators';

import {AuthService} from './auth.service';
import { ApplicationService } from "./component/application.service";

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {
  constructor(private authService: AuthService, private router: Router, private app: ApplicationService) {
  }

  canActivate(next: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<boolean> {
    return this.authService.pageLoader().pipe(map(res=>{
      return true;
    }))
  }
}
