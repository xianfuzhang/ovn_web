import {Component, OnInit, Inject} from '@angular/core';
import { Title } from '@angular/platform-browser';
import { DOCUMENT } from '@angular/common';
import { environment } from '../environments/environment';
// import {Observable} from 'rxjs';
// import {ThemeService} from './core/services/theme.service';

@Component({
  selector: 'app-root',
  // templateUrl: './app.component.html',
  // template: `
  //   <div class="app-root" [ngClass]="{'dark-theme': isDarkTheme | async}">
  //     <router-outlet></router-outlet>
  //   </div>`,
  template: `<router-outlet></router-outlet>`,
  // styleUrls: ['./app.component.scss'],
})
export class AppComponent implements OnInit {
  // isDarkTheme: Observable<boolean>;
  constructor(
    // @Inject(DOCUMENT) private doc,
    // private titleService: Title
  ) {
  
  }

  ngOnInit() {
    // this.isDarkTheme = this.themeService.isDarkTheme;
    // this.titleService.setTitle(environment.webTitle);
    // this.doc
    //   .getElementById('appFavicon')
    //   .setAttribute('href', '/assets/company/' + environment.companyFloderName + '/favicon.ico');
  }
}
