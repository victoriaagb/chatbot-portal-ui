import { Component, OnInit , Input } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.scss']
})
export class MenuComponent implements OnInit {

  @Input() menuItems: any;
  activeIndex = 0;

  constructor(private router: Router,
              private route: ActivatedRoute) { }

  ngOnInit() {
  }

  selectMenuItem(newActive: number) {
    this.activeIndex = newActive;
    this.router.navigate(['./', this.menuItems[newActive].routerLink], { relativeTo: this.route });
  }

}
