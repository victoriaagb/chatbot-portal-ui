import { Component, OnInit } from '@angular/core';
import { menu } from '../constants/menu.constants';

@Component({
  selector: 'bot-config',
  templateUrl: './bot-config.component.html',
  styleUrls: ['./bot-config.component.scss']
})
export class BotConfigComponent implements OnInit {

  public botConfigMenu : Array<any>;
  public step : string;

  constructor() { }

  ngOnInit() {
    this.step = 'CREATE_BOT';
    this.botConfigMenu = [];

    //Construct an array of menu items for the bot config object
    Object.keys(menu.CREATE_NEW_BOT).forEach(key =>{
      this.botConfigMenu.push(menu.CREATE_NEW_BOT[key]);
      if (key === this.step){
        menu.CREATE_NEW_BOT[key]['active'] =true;
      }
    });
  }

}
