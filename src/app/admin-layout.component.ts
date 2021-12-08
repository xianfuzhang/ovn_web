import { AfterViewInit, Component, ElementRef, OnInit, ViewChild, ViewEncapsulation } from '@angular/core';
import { NavService } from "./core/services/nav.service";
import { NavItem } from "./core/models/nav-item";
import { ActivatedRoute, Router } from "@angular/router";

@Component({
  selector: 'app-base-layout',
  templateUrl: './admin-layout.component.html',
  styleUrls: ['./admin-layout.component.scss'],
  encapsulation: ViewEncapsulation.None,
  providers: [NavService]
})
export class AdminLayoutComponent implements OnInit, AfterViewInit {
  @ViewChild('appDrawer') appDrawer: ElementRef<HTMLInputElement>;

  navItems: NavItem[] = [
    {
      displayName: 'Topology',
      iconName: 'multiple_stop',
      route: 'topo'
    },
  ]

  constructor(private navService: NavService,
              private router: Router,
              private routeAc: ActivatedRoute) {

  }

  ngOnInit(): void {

  }

  ngAfterViewInit() {
    this.navService.appDrawer = this.appDrawer;
  }
}
