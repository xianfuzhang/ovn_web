import { Component, OnDestroy, OnInit } from '@angular/core';
import { NavService } from '../../services/nav.service';
import { AuthService } from '../../services/auth.service';
import { forkJoin, Subscription } from "rxjs";
import { map } from "rxjs/operators";
import { NotifyService } from "../../services/notify.service";

@Component({
  selector: 'app-top-nav',
  templateUrl: './top-nav.component.html',
  styleUrls: ['./top-nav.component.scss'],
})
export class TopNavComponent implements OnInit, OnDestroy {
  userName: string = '';
  isDataChange = false;

  constructor(public navService: NavService,
              private notifyService: NotifyService,
              private authService: AuthService) {
   
  }

  ngOnInit(): void {
    this.userName = localStorage.getItem('app_login_user') || '';
  }

  // clickForLogout(): void {
  //   this.authService.logout();
  // }

  ngOnDestroy(): void {
  }

}
