import { Component, OnInit , Input } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import * as _ from 'lodash';

@Component({
  selector: 'menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.scss']
})
export class MenuComponent implements OnInit {

  @Input() menuItems: any;
  activeIndex = 0;

  constructor(private router: Router,
              private route: ActivatedRoute) {

    router.events.subscribe(value => {
      this.setCurrentMenuItem();
    });
  }

  ngOnInit() {
  }

  selectMenuItem(newActive: number) {
    this.activeIndex = newActive;
    this.router.navigate(['./', this.menuItems[newActive].routerLink], { relativeTo: this.route });
  }

  setCurrentMenuItem() {
    const segments = this.router.url.split('/');
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
