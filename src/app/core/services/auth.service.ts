import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { HttpClient, HttpErrorResponse, HttpResponse } from '@angular/common/http';
import { Observable, of, Subject, throwError } from 'rxjs';
import { map, take } from 'rxjs/operators';
import { User } from '../models/user';
import { environment } from '../../../environments/environment';
import { LoginService } from "../https/login";
// import { CookieOptions, CookieService } from "ngx-cookie";
// import { ApplicationService } from "./component/application.service";

const APP_LOGIN_USER: string = 'app_login_user';
export const APP_USER_GROUP: string = 'app_user_group';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  // private loggedIn$: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);
  // private loginUser: User;
  // public routeState = {};

  constructor(private router: Router,
              // private cookieService: CookieService,
              private loginService: LoginService,
              // private applicationService: ApplicationService,
              private http: HttpClient) {
  }

  login(user: User): Observable<any> {
    return this.loginService.login({
      userName: user.userName,
      password: user.password
    });
    // .subscribe((res) => {
    //   console.log(res);
    // });
      // .pipe(
      //   take(1),
      //   map((res: HttpResponse<any>) => {
      //     // this.loggedIn$.next(true);
      //     this.loginUser = {
      //       userName: user.userName,
      //       // group: res.groups[0]
      //     }
      //     localStorage.setItem(APP_LOGIN_USER, user.userName);
      //     let group_mark = "1";
      //     if (res.body.groups[0] == 'admingroup') {
      //       group_mark = "3";
      //     } else if (res.body.groups[0] == 'managergroup') {
      //       group_mark = "2";
      //     }
      //     localStorage.setItem(APP_USER_GROUP, group_mark);

      //     let sessionId = res.headers.get('MARS_G_SESSION_ID');
      //     let option: CookieOptions = {'path': "/"}
      //     this.cookieService.put('marsGSessionId', sessionId, option);
      //     return res;
      //   }));
  }
  
  logout() {
    localStorage.removeItem(APP_LOGIN_USER);
    // this.cookieService.remove('marsGSessionId');
    this.router.navigate(['/login']);
  }

}
