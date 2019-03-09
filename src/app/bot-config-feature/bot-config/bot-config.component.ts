import { Component, OnInit } from '@angular/core';
import { menu } from '../../constants/menu.constants';
import { BotConfigRepository } from '../../shared/model/bot-config-repository.model';
import { BotConfigService } from '../bot-config.service';
import { Subscription } from 'rxjs/Subscription';
import { SharedService, BotAction } from '../../shared/shared.service';

@Component({
  selector: 'bot-config',
  templateUrl: './bot-config.component.html',
  styleUrls: ['./bot-config.component.scss'],
})
export class BotConfigComponent implements OnInit {

  public botConfigMenu: Array<any>;
  public step: string;
  private subscription: Subscription;
  currentBot: BotConfigRepository;

  constructor(private sharedService: SharedService,
              private botConfigService: BotConfigService) {
    this.subscription = this.sharedService.getBotAction().subscribe( data => {
      this.currentBot = this.sharedService.currentBot;
      if (data.action === BotAction.CREATE) {
        this.createBot();
      } else if (data.action === BotAction.UPDATE) {
        this.updateBot();
      }

    });
  }

  ngOnInit() {
    this.step = 'CREATE_BOT';
    this.botConfigMenu = [];

    // Construct an array of menu items for the bot config object
    Object.keys(menu.CREATE_NEW_BOT).forEach(key => {
      this.botConfigMenu.push(menu.CREATE_NEW_BOT[key]);
      if (key === this.step) {
        menu.CREATE_NEW_BOT[key]['active'] = true;
      }
    });
  }

  createBot() {
    this.botConfigService.createBotConfig(this.currentBot).subscribe(
      data => {
        console.log('Create Bot Message :: ' + data);
      },
      error => console.log('ERROR ::' + error)
    );
  }

  updateBot() {
    this.botConfigService.updateBotConfig(this.currentBot).subscribe(
      data => {
        console.log('Update Bot Message :: ' + data);
      },
      error => console.log('ERROR ::' + error)
    );
  }

}
