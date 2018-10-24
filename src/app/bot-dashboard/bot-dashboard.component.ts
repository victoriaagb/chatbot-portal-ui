import { Component, OnInit } from '@angular/core';
import { menu } from '../constants/menu.constants';

@Component({
  selector: 'bot-dashboard',
  templateUrl: './bot-dashboard.component.html',
  styleUrls: ['./bot-dashboard.component.scss']
})
export class BotDashboardComponent implements OnInit {

  public botDashboardMenu : Array<any>;
  public step : string;

  constructor() { }

  ngOnInit() {
    this.step = 'ALL_BOTS';
    this.botDashboardMenu = [];
    Object.keys(menu.YOUR_BOTS).forEach(key => {
      if (key === this.step){
        menu.YOUR_BOTS[key]['active'] =true;
      }
      this.botDashboardMenu.push(menu.YOUR_BOTS[key]);
    })
  }

}
