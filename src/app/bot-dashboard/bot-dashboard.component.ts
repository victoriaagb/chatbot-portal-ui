import { Component, OnInit } from '@angular/core';
import { AppService } from '../app.service';
import { menu } from '../constants/menu.constants';

@Component({
  selector: 'bot-dashboard',
  templateUrl: './bot-dashboard.component.html',
  styleUrls: ['./bot-dashboard.component.scss']
})
export class BotDashboardComponent implements OnInit {

  public botDashboardMenu : Array<any>;
  public step : string;

  constructor(private appService: AppService) { }

  ngOnInit() {
    this.step = 'ALL_BOTS';
    this.botDashboardMenu = [];
    Object.keys(menu.YOUR_BOTS).forEach(key => {
      if (key === this.step){
        menu.YOUR_BOTS[key]['active'] =true;
      }
      this.botDashboardMenu.push(menu.YOUR_BOTS[key]);
    })
    this.getBotConfigList();
  }
  getBotConfigList() {
    this.appService.getBotConfigList().subscribe(
      data => {
        console.log(data);
        // this.botConfigList.forEach(function (entry) {
        //   console.log("entry" + entry);
        //   let string = JSON.stringify(entry.value);
        //   let temp =JSON.parse(string);
        //   let value = JSON.parse(temp);
        //   entry.value = value;
        // });
      },
      error => console.log("ERROR ::" + error)
    );
  }

}
