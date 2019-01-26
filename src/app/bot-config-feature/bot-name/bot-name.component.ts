import { Component, OnInit } from '@angular/core';
import { SharedService } from '../../shared/shared.service';
import { BotConfigRepository } from '../../shared/model/bot-config-repository.model';
import { Subscription } from 'rxjs/Subscription';
import * as _ from 'lodash';
import { BotConfig } from '../../shared/model/bot-config.model';

@Component({
  selector: 'app-bot-name',
  templateUrl: './bot-name.component.html',
  styleUrls: ['./bot-name.component.scss']
})
export class BotNameComponent implements OnInit {

  currentBot: BotConfigRepository;

  constructor(private sharedService: SharedService) {}

  ngOnInit() {
    if (_.isNull(this.sharedService.currentBot)) {
      this.sharedService.currentBot = <BotConfigRepository>{};
      this.sharedService.currentBot.value = <BotConfig>{
        name: {
          botName: '',
          botDescription: ''
        }
      };
    }
    this.currentBot = this.sharedService.currentBot;
  }
}
