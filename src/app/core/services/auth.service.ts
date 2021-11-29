import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { HttpResponse } from '@angular/common/http';
import { Observable, of, Subject } from 'rxjs';
import { map } from 'rxjs/operators';
import { User } from '../models/user';
import { LoginService } from "../https/login";
// import { CookieOptions, CookieService } from "ngx-cookie";

const APP_LOGIN_USER: string = 'app_login_user';
export const APP_USER_GROUP: string = 'app_user_group';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private loginUser: string = '';
  private isloggedIn: boolean = false;

  constructor(private router: Router,
    // private cookieService: CookieService,
    private loginService: LoginService) {
  }

  login(user: User): Observable<any> {
    return this.loginService.login({
      userName: user.userName,
      password: user.password
    })
      .pipe(
        // take(1),
        map((res: HttpResponse<any>) => {
          console.log(res);
          this.isloggedIn = true;
          this.loginUser = user.userName;
          localStorage.setItem(APP_LOGIN_USER, user.userName);
          // let group_mark = "1";
          // if (res.body.groups[0] == 'admingroup') {
          //   group_mark = "3";
          // } else if (res.body.groups[0] == 'managergroup') {
          //   group_mark = "2";
          // }
          // localStorage.setItem(APP_USER_GROUP, group_mark);

          // let sessionId = res.headers.get('MARS_G_SESSION_ID');
          // let option: CookieOptions = {'path': "/"}
          // this.cookieService.put('marsGSessionId', sessionId, option);
          return res;
        }));
  }

  logout() {
    this.loginService.logout({userName: this.loginUser})
      .subscribe((res) => {
        console.log(res);
      });
    this.loginUser = '';
    this.isloggedIn = false;
    localStorage.removeItem(APP_LOGIN_USER);
    // this.cookieService.remove('marsGSessionId');
    this.router.navigate(['/login']);
  }

  isUserLogin(): boolean {
    return this.isloggedIn;
  }

}
