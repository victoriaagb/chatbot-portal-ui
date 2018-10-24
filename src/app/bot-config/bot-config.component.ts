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
    console.log("The whole JSON in bot config");
    console.log (menu);
    this.botConfigMenu = [];

    //Construct an array of menu items for the bot config object
    Object.keys(menu.CREATE_NEW_BOT).forEach(key =>{
      this.botConfigMenu.push(menu.CREATE_NEW_BOT[key]);
    });
  }

}
