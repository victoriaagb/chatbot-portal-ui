import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AppService } from '../app.service';
import { SharedService } from '../shared/shared.service';
import { menu } from '../constants/menu.constants';
import { BotConfigRepository } from '../shared/model/bot-config-repository.model';

@Component({
  selector: 'bot-dashboard',
  templateUrl: './bot-dashboard.component.html',
  styleUrls: ['./bot-dashboard.component.scss']
})
export class BotDashboardComponent implements OnInit {

  public botDashboardMenu: Array<any>;
  public step: string;
  public botConfigList: Array<BotConfigRepository>;

  constructor(private appService: AppService,
              private sharedService: SharedService,
              private router: Router) { }

  ngOnInit() {
    this.step = 'ALL_BOTS';
    this.botDashboardMenu = [];
    Object.keys(menu.YOUR_BOTS).forEach(key => {
      if (key === this.step) {
        menu.YOUR_BOTS[key]['active'] = true;
      }
      this.botDashboardMenu.push(menu.YOUR_BOTS[key]);
    });
    this.getBotConfigList();
  }

  getBotConfigList() {
    this.appService.getBotConfigList().subscribe(
      data => {
        console.log(data);
        this.botConfigList = data;
        // this.botConfigList.forEach(function (entry) {
        //   console.log("entry" + entry);
        //   let string = JSON.stringify(entry.value);
        //   let temp =JSON.parse(string);
        //   let value = JSON.parse(temp);
        //   entry.value = value;
        // });
      },
      error => console.log('ERROR ::' + error)
    );
  }

  // sets the chat bot in the editting workspace
  editBotConfig(botConfig: BotConfigRepository) {
    console.log('route to edit');
    this.updateCurrentBot(botConfig);
    const botName = botConfig.value.name.botName.split(' ').join('-');
    this.router.navigate(['/bot-config', botName]);
  }

  updateCurrentBot(botConfig): void {
    this.sharedService.sendCurrentBot(botConfig);
  }

  clearMessage(): void {
    this.sharedService.clearMessage();
  }

}
