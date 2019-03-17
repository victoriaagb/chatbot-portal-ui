import { Component, OnInit , Input, OnDestroy } from '@angular/core';
import { Router, ActivatedRoute, NavigationStart } from '@angular/router';
import * as _ from 'lodash';
import { Subscription } from 'rxjs/Subscription';

@Component({
  selector: 'menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.scss']
})
export class MenuComponent implements OnInit, OnDestroy {

  @Input() menuItems: any;
  navigationSubscription: Subscription;
  activeIndex = 0;

  constructor(private router: Router,
              private route: ActivatedRoute) {
    this.navigationSubscription = this.router.events.subscribe((e: any) => {
      if (e instanceof NavigationStart) {
        this.setCurrentMenuItem(e.url);
      }
    });
  }

  ngOnInit() {
  }

  ngOnDestroy() {
    this.navigationSubscription.unsubscribe();
  }

  selectMenuItem(newActive: number) {
    this.activeIndex = newActive;
    this.router.navigate(['./', this.menuItems[newActive].routerLink], { relativeTo: this.route });
  }

  setCurrentMenuItem(url: string) {
    const segments = url.split('/');
    const lastSegment = _.last(segments);
    if (lastSegment !== '') {
      for (let _i = 0; _i < _.get(this.menuItems, 'length', 0); _i++) {
        if (this.menuItems[_i].routerLink === lastSegment) {
          this.activeIndex = _i;
        }
      }
    }
  }

}
