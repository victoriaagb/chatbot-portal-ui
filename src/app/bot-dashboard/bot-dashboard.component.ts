import { Component, OnInit } from '@angular/core';
import { menu } from '../constants/menu.constants';

@Component({
  selector: 'bot-dashboard',
  templateUrl: './bot-dashboard.component.html',
  styleUrls: ['./bot-dashboard.component.scss']
})
export class BotDashboardComponent implements OnInit {

  public botDashboardMenu : Array<any>;

  constructor() { }

  ngOnInit() {
    this.botDashboardMenu = [];
    Object.keys(menu.YOUR_BOTS).forEach(key => {
      this.botDashboardMenu.push(menu.YOUR_BOTS[key]);
    })
  }

}
